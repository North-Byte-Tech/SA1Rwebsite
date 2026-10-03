local function getDiscordId(playerId)
    for _, identifier in ipairs(GetPlayerIdentifiers(playerId)) do
        local discordId = identifier:match('^discord:(%d+)$')
        if discordId then
            return discordId
        end
    end

    return nil
end

AddEventHandler('playerConnecting', function(_, _, deferrals)
    local playerId = source
    deferrals.defer()
    Wait(0)
    deferrals.update('Checking Discord whitelist...')

    local discordId = getDiscordId(playerId)
    if not discordId then
        deferrals.done('Connect Discord to FiveM and try again. Your Discord account must have the server whitelist role.')
        return
    end

    local ok, whitelisted = pcall(function()
        return MySQL.scalar.await(
            'SELECT 1 FROM discord_whitelist WHERE discord_id = ? LIMIT 1',
            { discordId }
        )
    end)

    if not ok then
        print(('[sa1r_whitelist] database check failed for discord:%s: %s'):format(discordId, tostring(whitelisted)))
        deferrals.done('The whitelist is temporarily unavailable. Please try again or contact staff.')
        return
    end

    if whitelisted then
        deferrals.done()
    else
        deferrals.done('You are not on the server whitelist. Join the community Discord and obtain the whitelist role.')
    end
end)
