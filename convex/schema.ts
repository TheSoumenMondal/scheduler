import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    admin: defineTable({
        name: v.string(),
        email: v.string(),
        institution: v.optional(v.array(v.id("institution"))),
    }),
    institution: defineTable({
        name: v.string(),
        adminId: v.string(),
        location: v.optional(v.string()),
        faculties: v.optional(v.array(v.id("faculty"))),
        routines: v.optional(v.array(v.any())),
        invitationLinks: v.optional(v.array(v.id("invitation"))),
    }),
    faculty: defineTable({
        name: v.string(),
        email: v.optional(v.string()),
        department : v.optional(v.string()),
        subjectExpert : v.optional(v.string()),
        status: v.string(),
        institution: v.id("institution"),
        courses: v.optional(v.array(v.id("course"))),
        routines: v.optional(v.array(v.any())),
    }),
    course: defineTable({
        name: v.string(),
        faculty: v.id("faculty"),
    }),
    invitation: defineTable({
        token: v.string(),
        institutionId: v.id("institution"),
        createdAt: v.number(),
        status : v.string(),
    }),
});
