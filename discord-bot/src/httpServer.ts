import express from "express";
import { Client } from "discord.js";
import { config } from "./config.js";
import { debugLog } from "./debug.js";

interface LogPayload {
  event: string;
  fields: Record<string, string>;
}

interface EventPresentation {
  title: string;
  color: number;
}

const EVENT_PRESENTATION: Record<string, EventPresentation> = {
  player_connected: { title: "🟢 Player Connected", color: 0x3fb27f },
  player_disconnected: { title: "🔴 Player Disconnected", color: 0xe0554a },
  character_created: { title: "🧑 Character Created", color: 0x2f7de1 },
  role_selected: { title: "🎭 Role Selected", color: 0x2f7de1 },
  permission_granted: { title: "✅ Permission Granted", color: 0x3fb27f },
  permission_revoked: { title: "❌ Permission Revoked", color: 0xe0554a },
  duty_started: { title: "🟢 On Duty", color: 0x3fb27f },
  duty_ended: { title: "🔴 Off Duty", color: 0xe0554a },
  agency_membership_hired: { title: "🎖️ Agency Hire", color: 0x3fb27f },
  agency_membership_fired: { title: "🎖️ Agency Termination", color: 0xe0554a },
  agency_membership_promoted: { title: "🎖️ Agency Rank Change", color: 0x2f7de1 },
  aop_changed: { title: "🗺️ AOP Changed", color: 0x2f7de1 },
  // Mirrors sfos-aop/server/main.lua's priority.status values exactly
  // ('available' | 'active' | 'cooldown' | 'hold') - PostLog builds the
  // event name as 'priority_' .. status, so these keys must match verbatim.
  priority_active: { title: "🚨 Priority Call Active", color: 0xe0554a },
  priority_cooldown: { title: "⏳ Priority Call Cooldown", color: 0xdba13a },
  priority_hold: { title: "⏸️ Priority Call On Hold", color: 0xdba13a },
  priority_available: { title: "✅ Priority Call Available", color: 0x3fb27f },
  incident_created: { title: "📋 Incident Opened", color: 0x2f7de1 },
  report_submitted: { title: "📝 Report Filed", color: 0x2f7de1 },
  warrant_issued: { title: "📜 Warrant Issued", color: 0xc9a227 },
  bolo_created: { title: "🚨 BOLO Issued", color: 0xe0554a },
  player_jailed: { title: "🔒 Player Jailed", color: 0xc9a227 },
  person_created: { title: "🆔 Person Record Created", color: 0x8b98a5 },
  player_downed: { title: "🩸 Player Downed", color: 0xe0554a },
  player_revived: { title: "💉 Player Revived", color: 0x3fb27f },
  // Website recruitment flow - these three event types are defined for the
  // same /log contract as everything above, but nothing currently posts
  // them: portal-api used to relay them here on submit/accept/reject before
  // it was retired, and that relay hasn't been rebuilt on web's side yet.
  application_submitted: { title: "📨 Application Submitted", color: 0x2f7de1 },
  application_accepted: { title: "✅ Application Accepted", color: 0x3fb27f },
  application_rejected: { title: "❌ Application Rejected", color: 0xe0554a },
};

// Started only if a log channel is configured (see index.ts) - this is an
// optional feature, same graceful-degradation stance as the Lua side taking
// no action when sfos_discord_log_url/secret aren't set.
export function startLogHttpServer(client: Client): void {
  const app = express();
  app.use(express.json());

  app.post("/recruitment/:event", async (req, res) => {
    const providedSecret = req.header("x-sfos-log-secret");
    const recruitmentSecret = config.recruitment.eventSecret;
    if (!recruitmentSecret || providedSecret !== recruitmentSecret) {
      res.status(401).json({ ok: false, error: "unauthorized" });
      return;
    }

    const event = req.params.event as string;
    const payload = req.body as Record<string, unknown>;

    try {
      await handleRecruitmentEvent(client, event, payload);
      res.json({ ok: true });
    } catch (err) {
      console.error(`[httpServer] recruitment event failed: event=${event}`, err);
      res.status(500).json({ ok: false, error: "internal_error" });
    }
  });

  app.post("/log", (req, res) => {
    const providedSecret = req.header("x-sfos-log-secret");
    if (!config.fxserver.logSecret || providedSecret !== config.fxserver.logSecret) {
      res.status(401).json({ ok: false, error: "unauthorized" });
      return;
    }

    const payload = req.body as Partial<LogPayload>;
    if (typeof payload?.event !== "string" || typeof payload.fields !== "object" || payload.fields === null) {
      res.status(400).json({ ok: false, error: "invalid_payload" });
      return;
    }

    debugLog("httpServer", `/log event=${payload.event} fields=${JSON.stringify(payload.fields)}`);
    res.json({ ok: true });
    void postLogEmbed(client, payload as LogPayload);
  });

  app.listen(config.bot.httpPort, () => {
    console.log(`[sa1r-discord-bot] log HTTP server listening on port ${config.bot.httpPort}`);
  });
}

async function handleRecruitmentEvent(client: Client, event: string, payload: Record<string, unknown>): Promise<void> {
  const discordId = typeof payload.discordId === "string" ? payload.discordId : null;
  const department = typeof payload.department === "string" ? payload.department : "";
  const username = typeof payload.discordUsername === "string" ? payload.discordUsername : "applicant";
  const interviewDate = typeof payload.interviewDate === "string" ? payload.interviewDate : null;
  const messageText = typeof payload.message === "string" ? payload.message : null;

  if (!discordId) {
    return;
  }

  const user = await client.users.fetch(discordId).catch(() => null);
  if (!user) {
    return;
  }

  switch (event) {
    case "application_submitted":
      await user.send(`Thanks for applying to the ${department || "department"} recruitment team, ${username}! Your application has been received and staff will review it shortly.`);
      break;
    case "interview_scheduled":
      await user.send(`Your interview for ${department || "the department"} has been scheduled for ${interviewDate ?? "your selected time"}. Please keep an eye on Discord for updates.`);
      break;
    case "interview_completed":
      await user.send("Your interview has been completed. The department is reviewing your application and Brad will make the final decision.");
      break;
    case "awaiting_brad_decision":
      await user.send("Your application has moved to Brad for the final decision. We will let you know the outcome as soon as it is approved or rejected.");
      break;
    case "application_accepted": {
      const roleIds = Object.entries(config.recruitment.roleIds)
        .filter(([key, value]) => key === department || value)
        .map(([, value]) => value)
        .filter(Boolean);

      await user.send(`Congratulations! Your application for ${department || "the department"} has been accepted. Welcome aboard.`);

      if (roleIds.length > 0) {
        const guild = await client.guilds.fetch(config.discordGuildId).catch(() => null);
        if (guild) {
          const member = await guild.members.fetch(discordId).catch(() => null);
          if (member) {
            await member.roles.add(roleIds.filter((roleId): roleId is string => Boolean(roleId)));
          }
        }
      }
      break;
    }
    case "application_rejected":
      await user.send(`Thanks for taking the time to apply to ${department || "the department"}. After review, we have decided not to move forward with your application this time. We wish you the very best.`);
      break;
    default:
      if (messageText) {
        await user.send(messageText);
      }
      break;
  }
}

async function postLogEmbed(client: Client, payload: LogPayload): Promise<void> {
  try {
    const channel = await client.channels.fetch(config.discordLogChannelId);
    if (!channel || !channel.isTextBased() || !("send" in channel)) {
      console.warn(`[httpServer] configured log channel ${config.discordLogChannelId} isn't a sendable text channel`);
      return;
    }

    const presentation = EVENT_PRESENTATION[payload.event] ?? { title: payload.event, color: 0x8b98a5 };

    await channel.send({
      embeds: [
        {
          title: presentation.title,
          color: presentation.color,
          fields: Object.entries(payload.fields).map(([name, value]) => ({
            name,
            value: String(value),
            inline: true,
          })),
          timestamp: new Date().toISOString(),
        },
      ],
    });
  } catch (err) {
    console.error(`[httpServer] failed to post log embed for event=${payload.event}:`, err);
  }
}
