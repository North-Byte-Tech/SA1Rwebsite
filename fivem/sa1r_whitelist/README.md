# SA1R FiveM whitelist

Standalone FiveM resource that blocks connections unless the player's Discord
account has the configured whitelist role. The Discord bot syncs role
membership into `discord_whitelist`; the resource checks that shared MySQL
table during `playerConnecting`.

## Install

1. Run [`sql/install.sql`](sql/install.sql) against the same MySQL database
   configured for the Discord bot.
2. Copy `sa1r_whitelist` into each FiveM server's resources directory.
3. Ensure `oxmysql` starts before this resource, then add `ensure sa1r_whitelist`
   to each server's `server.cfg`.
4. Configure `DISCORD_WHITELIST_ROLE_ID` in the Discord bot's environment,
   restart the bot, and ensure it is in the configured guild with the Server
   Members intent enabled.
5. Make sure every FiveM server's `oxmysql` connection points to that shared
   database. The same Discord role then grants access to all installed servers.

The resource fails closed if the database query errors or the connecting
player does not have a Discord identifier. Players must have Discord running
and linked to FiveM so `GetPlayerIdentifiers` includes `discord:<id>`.

When a member receives the role, the bot adds their Discord ID to the table.
Removing the role or leaving the configured Discord guild removes the row.
The change applies on the player's next connection attempt.
