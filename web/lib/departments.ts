export type DepartmentCode = "LEO" | "SAFD" | "SAEMS" | "DISPATCH" | "CIV";

export type DepartmentAccent = "blue" | "red" | "amber";

export interface DepartmentPortalInfo {
  equipment: string[];
  callsigns: string[];
  rules: string[];
  roster: { name: string; title: string }[];
}

export interface DepartmentInfo {
  code: DepartmentCode;
  slug: string;
  name: string;
  summary: string;
  features: string[];
  accent: DepartmentAccent;
  // Whether the public department page links to the apply form. The apply
  // route itself always works regardless of this flag - see
  // app/departments/[slug]/apply/page.tsx - so staff can exercise the full
  // submission flow before advertising it.
  recruitmentOpen: boolean;
  // Placeholder rank ladder and entry requirements shown on the department
  // detail page - replace with the community's actual structure before
  // launch, same as rules/page.tsx's RULE_SECTIONS.
  ranks: string[];
  requirements: string[];
  // Optional grouped roster of real in-universe agencies this one
  // recruitment page stands in for (e.g. LEO covers many state/local
  // agencies through a single application) - rendered on the department
  // detail page when present.
  agencyGroups?: { heading: string; agencies: string[] }[];
  portal: DepartmentPortalInfo;
}

export const DEFAULT_DEPARTMENTS: DepartmentInfo[] = [
  {
    code: "LEO",
    slug: "leo",
    name: "Law Enforcement (LEO)",
    summary: "One recruitment page covering all of San Andreas' law enforcement agencies - patrol, investigations, and tactical response.",
    features: ["Multiple LEO agencies, one application", "Patrol & investigations", "Structured rank progression"],
    accent: "blue",
    recruitmentOpen: false,
    ranks: ["Recruit Officer", "Officer", "Senior Officer", "Sergeant", "Senior Sergeant", "Inspector"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Clean in-character record for at least 7 days",
      "Comfortable with radio codes and basic RP procedure",
      "Available for at least one shift per week once appointed",
    ],
    portal: {
      equipment: [
        "Duty uniform, radio, and body worn equipment",
        "Patrol issued sidearm and standard issue kit",
        "Department identification, callsign patch, and SOP folder",
      ],
      callsigns: [
        "Patrol: 10-1 to 10-99 depending on unit assignment",
        "Command: Chief, Deputy Chief, and Shift Supervisor",
        "Operations: Investigations, Traffic, and K-9 support units",
      ],
      rules: [
        "Follow department SOPs and radio discipline at all times",
        "Maintain professionalism in every interaction and dispatch call",
        "Report any policy issue or welfare concern to command immediately",
      ],
      roster: [
        { name: "Chief of Police", title: "Command" },
        { name: "Deputy Chief", title: "Command" },
        { name: "Shift Supervisor", title: "Operations" },
        { name: "Patrol Sergeant", title: "Patrol" },
        { name: "Detective Unit", title: "Investigations" },
      ],
    },
    agencyGroups: [
      {
        heading: "State Agencies",
        agencies: [
          "San Andreas District Court",
          "SA Attorney General's Office",
          "SA Dept of Law Enforcement (SADLE)",
          "SADLE Criminal Investigation Division",
          "SADLE State Trooper",
          "SADLE State Emergency Response Team",
          "SADLE Dept of Coroner",
          "San Andreas Department of Public Safety (SADPS)",
          "SADPS Dept of Revenue",
          "SADPS State Trooper Division",
          "San Andreas Department of Transportation",
          "San Andreas State Prison Authority",
          "State Constable Division",
          "State Game Warden Division",
          "State Ranger Division",
        ],
      },
      {
        heading: "Local Agencies",
        agencies: [
          "Blaine County Sheriff's Office",
          "Senora Valley Police Department",
          "Paleto Bay Police Department",
          "Grapeseed Township Police Department",
          "Los Santos Sheriff's Department",
          "Los Santos Police Department",
        ],
      },
    ],
  },
  {
    code: "SAFD",
    slug: "safd",
    name: "San Andreas Fire & Rescue Services (SAFD)",
    summary: "Fire, EMS, and dispatch operations covering emergency response, medical support, and coordinated incident command.",
    features: ["Fire & rescue response", "EMS support operations", "Dispatch & incident coordination"],
    accent: "red",
    recruitmentOpen: false,
    ranks: ["Recruit Firefighter", "Firefighter", "Senior Firefighter", "Station Officer", "Senior Station Officer"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Willingness to train on apparatus, rescue, and medical support operations",
      "Comfortable coordinating with police, dispatch, and multi-agency scenes",
      "Available for at least one shift per week once appointed",
    ],
    portal: {
      equipment: [
        "Turnout gear, SCBA, and rescue tools",
        "Portable radios, medical kits, and dispatch reference materials",
        "Station-issued hydrant and hazard response lookup guides",
      ],
      callsigns: [
        "Engine: E-1, E-2, E-3",
        "Rescue: R-1 and heavy rescue assignments",
        "Command: Battalion, duty officers, and dispatch coordination",
      ],
      rules: [
        "Follow scene safety and command structure on every incident",
        "Provide proper radio traffic, patient handoff, and dispatch communication",
        "Coordinate with police and medical crews on all multi-agency responses",
      ],
      roster: [
        { name: "Fire Chief", title: "Command" },
        { name: "Battalion Officer", title: "Operations" },
        { name: "Engineer", title: "Station" },
        { name: "Paramedic Lead", title: "Medical" },
        { name: "Dispatch Supervisor", title: "Communications" },
      ],
    },
  },
  {
    code: "DISPATCH",
    slug: "dispatch",
    name: "San Andreas Dispatch",
    summary: "Regional communications, radio operations, and dispatch coordination for emergency services.",
    features: ["Regional emergency dispatch", "Radio & call handling", "Multi-agency coordination"],
    accent: "blue",
    recruitmentOpen: false,
    ranks: ["Trainee Dispatcher", "Dispatcher", "Senior Dispatcher", "Shift Supervisor", "Operations Supervisor"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Comfortable managing radio traffic and incident flow",
      "Strong communication and coordination skills under pressure",
      "Available for at least one shift per week once appointed",
    ],
    portal: {
      equipment: [
        "Dispatch console, radio system, and incident log",
        "Regional map access and callout checklists",
        "Operational SOPs and channel management references",
      ],
      callsigns: [
        "Dispatch: D-1 to D-5 by region",
        "Supervisor: duty chief and shift lead",
        "Operations: command coordination and event support",
      ],
      rules: [
        "Maintain accurate and clear radio traffic at all times",
        "Prioritize active incidents and scene safety communications",
        "Coordinate timely updates with police, fire, and EMS personnel",
      ],
      roster: [
        { name: "Dispatch Director", title: "Command" },
        { name: "Shift Supervisor", title: "Operations" },
        { name: "Lead Dispatcher", title: "Communications" },
        { name: "Regional Call Desk", title: "Support" },
        { name: "Coordination Desk", title: "Planning" },
      ],
    },
  },
  {
    code: "CIV",
    slug: "civ",
    name: "San Andreas Civilian Community",
    summary: "Civilian life, community support, and non-emergency public engagement across the state.",
    features: ["Civilian roleplay", "Community engagement", "Non-emergency support"],
    accent: "amber",
    recruitmentOpen: false,
    ranks: ["Resident", "Community Member", "Senior Community Member", "Support Lead", "Community Mentor"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Willingness to participate in community events and RP scenes",
      "Friendly, respectful communication with all community members",
      "Available for regular in-character community activity",
    ],
    portal: {
      equipment: [
        "Community profile and roleplay access",
        "Local knowledge and event participation tools",
        "Public-facing RP guides and support references",
      ],
      callsigns: [
        "Civilian: community callsigns and local role references",
        "Support: public events and services",
        "Public: community engagement and local activity",
      ],
      rules: [
        "Treat all community members with respect and professionalism",
        "Participate positively in roleplay and public-facing events",
        "Support the wider server culture and community standards",
      ],
      roster: [
        { name: "Community Director", title: "Leadership" },
        { name: "Event Coordinators", title: "Support" },
        { name: "Resident Leads", title: "Community" },
        { name: "Public Services", title: "Support" },
        { name: "Community Mentors", title: "Guidance" },
      ],
    },
  },
];

export const DEPARTMENTS_STORAGE_KEY = "sa1r-admin-departments";

export function getStoredDepartments(): DepartmentInfo[] {
  if (typeof window === "undefined") {
    return DEFAULT_DEPARTMENTS;
  }

  try {
    const saved = window.localStorage.getItem(DEPARTMENTS_STORAGE_KEY);
    if (!saved) {
      return DEFAULT_DEPARTMENTS;
    }

    const parsed = JSON.parse(saved) as DepartmentInfo[];
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Ignore malformed local storage data and fall back to defaults.
  }

  return DEFAULT_DEPARTMENTS;
}

export function saveStoredDepartments(departments: DepartmentInfo[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(departments));
}

export function getDepartments(): DepartmentInfo[] {
  return getStoredDepartments();
}

export const DEPARTMENTS: DepartmentInfo[] = DEFAULT_DEPARTMENTS;

export function getDepartmentBySlug(slug: string): DepartmentInfo | undefined {
  return getDepartments().find((department) => department.slug === slug);
}

export function slugifyAgency(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface AgencyInfo {
  heading: string;
  name: string;
  slug: string;
}

export function getAgencyBySlug(department: DepartmentInfo, agencySlug: string): AgencyInfo | undefined {
  for (const group of department.agencyGroups ?? []) {
    const match = group.agencies.find((agency) => slugifyAgency(agency) === agencySlug);
    if (match) {
      return { heading: group.heading, name: match, slug: agencySlug };
    }
  }
  return undefined;
}

// Full class strings (not built via template interpolation) so Tailwind's
// content scan can find them - see tailwind.config.ts's content globs.
export const DEPARTMENT_ACCENT_CLASSES: Record<
  DepartmentAccent,
  { border: string; text: string; iconBg: string }
> = {
  blue: { border: "border-t-blue-500", text: "text-blue-400", iconBg: "bg-gradient-to-br from-blue-500 to-blue-800" },
  red: { border: "border-t-red-500", text: "text-red-400", iconBg: "bg-gradient-to-br from-red-500 to-red-800" },
  amber: {
    border: "border-t-amber-500",
    text: "text-amber-400",
    iconBg: "bg-gradient-to-br from-amber-500 to-amber-800",
  },
};
