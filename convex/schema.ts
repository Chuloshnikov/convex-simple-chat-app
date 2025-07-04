import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    user: v.string(),
    body: v.string(),
    _creationTime: v.number(), // Для сортировки по времени
  }),
});