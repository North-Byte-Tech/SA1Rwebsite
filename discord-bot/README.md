# sa1r-discord-bot

Standalone Node.js process (not a FiveM resource). Ported from the main SFOS
repo (`SFRP_Core`)'s `services/discord-bot` into this website workspace, with
extra website integration. Run it on a host that can reach the game database and
the website; it also needs network access to FXServer for permission sync.

Jobs:
1. **Role sync** — keeps `permission_grants` in sync with Discord role
   membership. Grants flow from Discord roles into `permission_grants`, and
   the bot notifies FXServer through `FXSERVER_SYNC_URL`.
2. **Slash commands** (`/grant-permission`, `/revoke-permission`,
   `/lookup-player`) for staff to manage a linked player's permissions.
3. **Audit log** (optional) — posts an embed to a Discord channel for game
   events (connect/disconnect, character creation, duty status, etc.).
4. **Live status board** (optional, website) — keeps a single message in a
   channel up to date by polling the website's public `GET /api/status`.

## Website integration

The website integrations added on top of the ported bot are:

- **Recruitment notifications** — the website posts application lifecycle
   events directly to this bot's `POST /recruitment/:event` endpoint. The bot
   DMs applicants, and can assign configured department roles on acceptance.
   It also posts an update to that department's configured Discord webhook.
   This is independent of the game audit log and does not require
   `DISCORD_LOG_CHANNEL_ID`. Configure the website's `DISCORD_BOT_WEBHOOK_URL`
   and `DISCORD_BOT_WEBHOOK_SECRET`; the secret must match this bot's
   `DISCORD_RECRUITMENT_SECRET` (or its `FXSERVER_LOG_SECRET` fallback).
- **Live status board** — this bot polls the website's public `GET /api/status`
   every `STATUS_POLL_SECONDS` and edits one message in
   `DISCORD_STATUS_CHANNEL_ID`. No secret is needed. It only edits when the
   snapshot's `updatedAt` changes, and reuses its most recent board message
   across restarts rather than posting duplicates.

Both optional features are independent: leave `DISCORD_STATUS_CHANNEL_ID` blank
to disable the status board, or omit the website webhook settings to disable
recruitment notifications. `DISCORD_LOG_CHANNEL_ID` only controls game audit
embeds.

## Setup

1. Create a Discord application/bot at https://discord.com/developers/applications.
2. Under **Bot**, enable the **Server Members Intent** (privileged) — required
   to read role membership. Copy the bot token, and copy the **Application ID**
   from General Information (this is `DISCORD_CLIENT_ID`, not the bot token).
3. Invite the bot with both the `bot` and `applications.commands` scopes.
4. Copy `.env.example` to `.env` and fill in `DISCORD_BOT_TOKEN`,
   `DISCORD_CLIENT_ID`, `DISCORD_GUILD_ID`, DB credentials, and
   `FXSERVER_SYNC_URL`/`FXSERVER_SYNC_SECRET`. Set `FXSERVER_LOG_SECRET` if
   FXServer will post audit logs. For website recruitment notifications, set
   `DISCORD_RECRUITMENT_SECRET` and configure the website with the same value
   as `DISCORD_BOT_WEBHOOK_SECRET`, plus `DISCORD_BOT_WEBHOOK_URL` pointing to
   this bot's reachable base URL (for example,
   `http://127.0.0.1:30121`). For acceptance roles, set the relevant
   `DISCORD_ROLE_LEO`, `DISCORD_ROLE_SAFD`, and/or `DISCORD_ROLE_SAEMS` role
   IDs. Set each optional `DISCORD_RECRUITMENT_WEBHOOK_LEO`,
   `DISCORD_RECRUITMENT_WEBHOOK_SAFD`, `DISCORD_RECRUITMENT_WEBHOOK_DISPATCH`,
   and `DISCORD_RECRUITMENT_WEBHOOK_CIV` to that department's Discord webhook
   URL. For the status board, set `DISCORD_STATUS_CHANNEL_ID` and
   `WEB_BASE_URL` to the deployed website's base URL.
5. Populate `discord_role_mappings` (see the main SFOS repo's
   `database/migrations/0002_permissions.sql`) with your Discord role IDs
   mapped to `sa1r.role.*` permissions.
6. `pnpm install` (from repo root), then `pnpm --filter sa1r-discord-bot dev`
   for local iteration, or `pnpm --filter sa1r-discord-bot build && pnpm
   --filter sa1r-discord-bot start` to run compiled.

Slash commands are registered automatically (guild-scoped) on every start.

## Debug logging

Set `DEBUG=true` in `.env` (restart required) for verbose console output:
role sync decisions, slash command invocations, `/log` payloads received,
FXServer notification results, and status board polling.
