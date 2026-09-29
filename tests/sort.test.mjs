import assert from "node:assert/strict";
import { test } from "node:test";
import { applySavedOrder, moveItem } from "../lib/sort.ts";

const rows = [{ id: "a" }, { id: "b" }, { id: "c" }];

test("moveItem moves in both directions without changing the input", () => {
  assert.deepEqual(moveItem(rows, "a", "c").map((row) => row.id), ["b", "c", "a"]);
  assert.deepEqual(moveItem(rows, "c", "a").map((row) => row.id), ["c", "a", "b"]);
  assert.deepEqual(rows.map((row) => row.id), ["a", "b", "c"]);
});

test("saved order keeps new rows visible in their original order", () => {
  assert.deepEqual(applySavedOrder(rows, ["c", "a"]).map((row) => row.id), ["c", "a", "b"]);
});
