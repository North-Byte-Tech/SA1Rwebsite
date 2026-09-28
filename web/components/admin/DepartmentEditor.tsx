"use client";

import { useEffect, useState } from "react";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  DEFAULT_DEPARTMENTS,
  getStoredDepartments,
  saveStoredDepartments,
  type DepartmentInfo,
} from "@/lib/departments";

function parseLines(value: string): string[] {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatLines(value: string[]): string {
  return value.join("\n");
}

function parseRoster(value: string): { name: string; title: string }[] {
  return value
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", ...rest] = line.split("|");
      return {
        name: name.trim(),
        title: rest.join("|").trim() || "Member",
      };
    })
    .filter((item) => item.name);
}

function formatRoster(value: { name: string; title: string }[]): string {
  return value.map((member) => `${member.name} | ${member.title}`).join("\n");
}

export function DepartmentEditor() {
  const [departments, setDepartments] = useState<DepartmentInfo[]>(() => getStoredDepartments());

  useEffect(() => {
    saveStoredDepartments(departments);
    window.dispatchEvent(new Event("sa1r-departments-updated"));
  }, [departments]);

  const updateDepartment = (code: string, updater: (department: DepartmentInfo) => DepartmentInfo) => {
    setDepartments((current) => current.map((department) => (department.code === code ? updater(department) : department)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-steel">Website content</p>
          <h1 className="mt-1 text-3xl font-black text-bone">Department Editor</h1>
        </div>
        <button
          type="button"
          onClick={() => setDepartments(DEFAULT_DEPARTMENTS)}
          className={buttonClasses("secondary", "rounded-xl border border-line bg-surface px-3 py-2.5")}
        >
          Reset defaults
        </button>
      </div>

      <div className="space-y-5">
        {departments.map((department) => (
          <Card key={department.code} className="space-y-5 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-steel">{department.code}</p>
                <h2 className="mt-1 text-2xl text-bone">{department.name}</h2>
              </div>

              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={department.recruitmentOpen}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      recruitmentOpen: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-line bg-surface text-trooper-500"
                />
                Recruitment open
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Name</span>
                <input
                  value={department.name}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>

              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Slug</span>
                <input
                  value={department.slug}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      slug: event.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>
            </div>

            <label className="block text-sm text-muted">
              <span className="mb-2 block text-bone">Summary</span>
              <textarea
                rows={3}
                value={department.summary}
                onChange={(event) =>
                  updateDepartment(department.code, (entry) => ({
                    ...entry,
                    summary: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Features</span>
                <textarea
                  rows={5}
                  value={formatLines(department.features)}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      features: parseLines(event.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>

              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Requirements</span>
                <textarea
                  rows={5}
                  value={formatLines(department.requirements)}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      requirements: parseLines(event.target.value),
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Equipment</span>
                <textarea
                  rows={4}
                  value={formatLines(department.portal.equipment)}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      portal: {
                        ...entry.portal,
                        equipment: parseLines(event.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>

              <label className="block text-sm text-muted">
                <span className="mb-2 block text-bone">Callsigns</span>
                <textarea
                  rows={4}
                  value={formatLines(department.portal.callsigns)}
                  onChange={(event) =>
                    updateDepartment(department.code, (entry) => ({
                      ...entry,
                      portal: {
                        ...entry.portal,
                        callsigns: parseLines(event.target.value),
                      },
                    }))
                  }
                  className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
                />
              </label>
            </div>

            <label className="block text-sm text-muted">
              <span className="mb-2 block text-bone">Rules</span>
              <textarea
                rows={4}
                value={formatLines(department.portal.rules)}
                onChange={(event) =>
                  updateDepartment(department.code, (entry) => ({
                    ...entry,
                    portal: {
                      ...entry.portal,
                      rules: parseLines(event.target.value),
                    },
                  }))
                }
                className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
              />
            </label>

            <label className="block text-sm text-muted">
              <span className="mb-2 block text-bone">Roster (one per line as Name | Title)</span>
              <textarea
                rows={4}
                value={formatRoster(department.portal.roster)}
                onChange={(event) =>
                  updateDepartment(department.code, (entry) => ({
                    ...entry,
                    portal: {
                      ...entry.portal,
                      roster: parseRoster(event.target.value),
                    },
                  }))
                }
                className="w-full rounded-xl border border-line bg-[#12160f] px-3 py-2.5 text-base text-bone outline-none focus:border-trooper-500"
              />
            </label>
          </Card>
        ))}
      </div>
    </div>
  );
}
