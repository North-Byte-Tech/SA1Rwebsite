"use client";

import { useState, type FormEvent } from "react";
import type { DepartmentCode } from "@/lib/departments";
import { getApplicationTypeByDepartment } from "@/lib/applicationTypes";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type SubmitState = "idle" | "submitting" | "success" | "error";

const TEXTAREA_CLASSES =
  "mt-1.5 w-full rounded-md border border-line bg-ink px-3 py-2 text-sm text-bone placeholder:text-muted "
  + "focus:border-trooper-500 focus:outline-none focus:ring-1 focus:ring-trooper-500";

export function ApplicationForm({ departmentCode }: { departmentCode: DepartmentCode }) {
  const applicationType = getApplicationTypeByDepartment(departmentCode);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department: departmentCode, answers }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <Card className="text-center text-sm text-muted">
        Application submitted. Staff will review it and reach out on Discord.
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        {applicationType.fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.name} className="text-sm font-medium text-bone">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                required={field.required}
                rows={3}
                className={TEXTAREA_CLASSES}
                placeholder={field.placeholder}
                value={answers[field.name] ?? ""}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, [field.name]: event.target.value }))
                }
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                required={field.required}
                className={TEXTAREA_CLASSES}
                value={answers[field.name] ?? ""}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, [field.name]: event.target.value }))
                }
              >
                <option value="">Select one</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type="text"
                required={field.required}
                className={TEXTAREA_CLASSES}
                placeholder={field.placeholder}
                value={answers[field.name] ?? ""}
                onChange={(event) =>
                  setAnswers((prev) => ({ ...prev, [field.name]: event.target.value }))
                }
              />
            )}
          </div>
        ))}
        <button type="submit" disabled={state === "submitting"} className={buttonClasses("primary", "w-full")}>
          {state === "submitting" ? "Submitting..." : "Submit application"}
        </button>
        {state === "error" && <p className="text-sm text-red-400">Something went wrong — try again.</p>}
      </form>
    </Card>
  );
}
