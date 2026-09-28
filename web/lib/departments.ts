export type DepartmentCode = "LEO" | "SAFD" | "SAEMS";

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

export const DEPARTMENTS: DepartmentInfo[] = [
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
    summary: "Structure fires, road crash rescue, and hazmat response.",
    features: ["Structure fire response", "Road crash rescue", "Hazmat & rescue ops"],
    accent: "red",
    recruitmentOpen: false,
    ranks: ["Recruit Firefighter", "Firefighter", "Senior Firefighter", "Station Officer", "Senior Station Officer"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Willingness to train on apparatus and rescue tools in-character",
      "Comfortable working alongside Police and EMS on scene",
      "Available for at least one shift per week once appointed",
    ],
    portal: {
      equipment: [
        "Turnout gear, SCBA, and rescue tools",
        "Portable radios and EMS medical kit",
        "Station-issued hydrant and hazard response lookup guides",
      ],
      callsigns: [
        "Engine: E-1, E-2, E-3",
        "Rescue: R-1 and heavy rescue assignments",
        "Command: Battalion and duty officers",
      ],
      rules: [
        "Follow scene safety and command structure on every incident",
        "Provide proper radio traffic and patient handoff procedures",
        "Coordinate with police and EMS on all multi-agency responses",
      ],
      roster: [
        { name: "Fire Chief", title: "Command" },
        { name: "Battalion Officer", title: "Operations" },
        { name: "Engineer", title: "Station" },
        { name: "Paramedic Lead", title: "Medical" },
        { name: "Rescue Specialist", title: "Special Ops" },
      ],
    },
  },
  {
    code: "SAEMS",
    slug: "saems",
    name: "San Andreas Emergency Medical Services",
    summary: "Ambulance and emergency medical response.",
    features: ["Emergency medical response", "Ambulance operations", "Hospital & triage RP"],
    accent: "amber",
    recruitmentOpen: false,
    ranks: ["Trainee EMT", "EMT", "Paramedic", "Senior Paramedic", "Shift Supervisor"],
    requirements: [
      "Linked Discord and FiveM account in good standing",
      "Comfortable with medical roleplay and treatment procedure",
      "Willingness to train on triage and transport protocol",
      "Available for at least one shift per week once appointed",
    ],
    portal: {
      equipment: [
        "Ambulance kit, trauma bag, and radio pack",
        "Medical PPE and transport response gear",
        "Department call sheets and triage reference cards",
      ],
      callsigns: [
        "Medic: M-1 to M-5 depending on area",
        "Supervisor: EMS duty lead and shift commander",
        "Transport: ambulance assignments and support units",
      ],
      rules: [
        "Maintain patient confidentiality and proper medical RP",
        "Follow dispatch instructions and transport protocols",
        "Coordinate with fire and police for multi-agency scenes",
      ],
      roster: [
        { name: "EMS Director", title: "Command" },
        { name: "Shift Supervisor", title: "Operations" },
        { name: "Lead Paramedic", title: "Medical" },
        { name: "Advanced Life Support", title: "Response" },
        { name: "Transport Crew", title: "Operations" },
      ],
    },
  },
];

export function getDepartmentBySlug(slug: string): DepartmentInfo | undefined {
  return DEPARTMENTS.find((department) => department.slug === slug);
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
