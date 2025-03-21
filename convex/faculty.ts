
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getFacultiesForInstitution = query({
    args: { institutionId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("faculty")
            .filter((q) => q.eq(q.field("institution"), args.institutionId))
            .collect();
    },
});


export const createFaculty = mutation({
    args: {
        name: v.string(),
        institutionId: v.string(),
        courses: v.optional(v.array(v.id("course"))),
        routines: v.optional(v.array(v.any())),
    },
    handler: async (ctx, args) => {
        const existingFaculty = await ctx.db
            .query("faculty")
            .filter((q) => q.eq(q.field("name"), args.name))
            .unique();
        if (existingFaculty) return 404
        const lowercaseName = args.name.toLowerCase()
        await ctx.db.insert("faculty", {
            name: lowercaseName,
            status: "pending",
            institution: args.institutionId as Id<"institution">,
            courses: args.courses,
            routines: args.routines
        })

        return 200
    }
})


export const updateFaculty = mutation({
    args: {
        status: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const faculty = await ctx.db.query("faculty")
            .filter((q) => q.eq(q.field("email"), args.email))
            .unique();

        if (!faculty) {
            return {
                success: false,
                code: 404,
                message: "Faculty not found"
            };
        }

        try {
            await ctx.db.patch(faculty._id, {
                status: args.status
            });
            return {
                success: true,
                code: 200,
                message: "Faculty status updated successfully"
            };
        } catch (error) {
            return {
                success: false,
                code: 500,
                message: "Failed to update faculty status"
            };
        }
    }
});



export const getVerifiedFaculty = query({
    args : {
        institutionId : v.string(),
    },
    handler : async (ctx, args) => {
        return await ctx.db
        .query("faculty")
        .filter((q) => q.eq(q.field("institution"), args.institutionId))
        .filter((q) => q.eq(q.field("status"), "approved"))
        .collect();
    }
})