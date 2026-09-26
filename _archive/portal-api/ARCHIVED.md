# Archived

This service is retired and no longer part of the running system - it is
not in the pnpm workspace, not deployed, and nothing imports or calls it.
Every feature it used to provide (game-linked accounts, characters, staff
roster, bans, notes, permissions, applications) has been rebuilt directly
on `web`'s own Postgres database - see `web/lib/adminData.ts`,
`web/lib/applications.ts`, and `web/lib/status.ts`.

Kept here for reference only (e.g. if the FiveM MySQL schema it queried is
ever useful to look up again). See the root README's "Getting started"
section for the current architecture.
