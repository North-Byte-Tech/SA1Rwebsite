import mysql from "mysql2/promise";
import { config } from "./config.js";
// Same MySQL database sfos-core reads from via oxmysql. This bot writes
// directly to permission_grants; sfos-core's cache is refreshed by the
// HTTP notification in fxsync.ts, not by this pool.
export const pool = mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 5,
});
export async function getActiveRoleMappings() {
    const [rows] = await pool.query("SELECT discord_role_id, permission FROM discord_role_mappings WHERE is_active = 1");
    return rows;
}
export async function getAccountIdByDiscordId(discordId) {
    const [rows] = await pool.query("SELECT account_id FROM accounts WHERE discord_identifier = ? LIMIT 1", [discordId]);
    return rows.length > 0 ? rows[0].account_id : null;
}
export async function getDiscordSourcedPermissions(accountId) {
    const [rows] = await pool.query("SELECT permission FROM permission_grants WHERE account_id = ? AND source = 'discord'", [accountId]);
    return new Set(rows.map((row) => row.permission));
}
export async function grantDiscordPermission(accountId, permission) {
    // Deliberately does NOT overwrite `source` on conflict: if this permission
    // was already granted manually by an admin, it must stay 'manual' so a
    // later Discord role removal doesn't incorrectly revoke it (see
    // revokeDiscordPermission and roleSync.ts's "manual grants are untouched"
    // comment). Only a fresh INSERT ever sets source = 'discord'.
    await pool.query("INSERT INTO permission_grants (account_id, permission, granted_by, source) VALUES (?, ?, NULL, 'discord') " +
        "ON DUPLICATE KEY UPDATE granted_at = NOW()", [accountId, permission]);
}
export async function revokeDiscordPermission(accountId, permission) {
    await pool.query("DELETE FROM permission_grants WHERE account_id = ? AND permission = ? AND source = 'discord'", [
        accountId,
        permission,
    ]);
}
export async function getAccountSummary(discordId) {
    const [rows] = await pool.query("SELECT account_id, fivem_username, created_at FROM accounts WHERE discord_identifier = ? LIMIT 1", [discordId]);
    return rows.length > 0 ? rows[0] : null;
}
export async function getAllPermissions(accountId) {
    const [rows] = await pool.query("SELECT permission, source FROM permission_grants WHERE account_id = ? ORDER BY permission", [accountId]);
    return rows;
}
export async function getCharactersForAccount(accountId) {
    const [rows] = await pool.query("SELECT character_id, first_name, last_name, agency_code, duty_status FROM characters "
        + "WHERE account_id = ? AND status = 'active' ORDER BY last_played_at DESC", [accountId]);
    return rows;
}
// Slash-command-issued grants ARE explicit staff decisions, unlike the
// Discord-role auto-sync ones - so unlike grantDiscordPermission, this one
// deliberately DOES set source = 'manual' on conflict too.
export async function grantManualPermission(accountId, permission) {
    await pool.query("INSERT INTO permission_grants (account_id, permission, granted_by, source) VALUES (?, ?, NULL, 'manual') "
        + "ON DUPLICATE KEY UPDATE source = 'manual', granted_at = NOW()", [accountId, permission]);
}
export async function revokeManualPermission(accountId, permission) {
    await pool.query("DELETE FROM permission_grants WHERE account_id = ? AND permission = ?", [accountId, permission]);
}
