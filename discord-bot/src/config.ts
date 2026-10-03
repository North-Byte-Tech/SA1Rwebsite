import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  debug: process.env.DEBUG === "true",
  discordBotToken: required("DISCORD_BOT_TOKEN"),
  discordClientId: required("DISCORD_CLIENT_ID"),
  discordGuildId: required("DISCORD_GUILD_ID"),
  discordLogChannelId: process.env.DISCORD_LOG_CHANNEL_ID ?? "",
  db: {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: required("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: required("DB_NAME"),
  },
  fxserver: {
    syncUrl: required("FXSERVER_SYNC_URL"),
    syncSecret: required("FXSERVER_SYNC_SECRET"),
    logSecret: process.env.FXSERVER_LOG_SECRET ?? "",
  },
  bot: {
    httpPort: Number(process.env.BOT_HTTP_PORT ?? 30121),
  },
  recruitment: {
    eventSecret: process.env.DISCORD_RECRUITMENT_SECRET ?? process.env.FXSERVER_LOG_SECRET ?? "",
    mainDiscordInviteUrl: process.env.DISCORD_MAIN_INVITE_URL?.trim() ?? "",
    roleIds: {
      LEO: process.env.DISCORD_ROLE_LEO ?? "",
      SAFD: process.env.DISCORD_ROLE_SAFD ?? "",
      SAEMS: process.env.DISCORD_ROLE_SAEMS ?? "",
    },
  },
};
