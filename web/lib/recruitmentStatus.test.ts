import test from "node:test";
import assert from "node:assert/strict";

import { getApplicationStatusLabel, normalizeApplicationStatus } from "./recruitmentStatus.ts";

test("legacy pending values are normalized to submitted", () => {
  assert.equal(normalizeApplicationStatus("pending"), "pending");
  assert.equal(normalizeApplicationStatus("submitted"), "pending");
});

test("workflow labels match the recruitment stages", () => {
  assert.equal(getApplicationStatusLabel("pending"), "Submitted");
  assert.equal(getApplicationStatusLabel("interview_scheduled"), "Interview Scheduled");
  assert.equal(getApplicationStatusLabel("awaiting_brad_decision"), "Awaiting Brad Decision");
  assert.equal(getApplicationStatusLabel("accepted"), "Accepted");
});
