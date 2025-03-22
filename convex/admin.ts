import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createAdmin = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        institution: v.optional(v.array(v.id("institution")))
    },
    handler: async (ctx, args) => {
        const ifExists = await ctx.db.query("admin").filter(q => q.eq(q.field("email"), args.email)).unique();
        if (!ifExists) {
            const adminId = await ctx.db.insert("admin", {
                name: args.name,
                email: args.email,
                institution: args.institution
            });
            return adminId;
        }
        return ifExists._id;
    }
})

export const getAllExistingInstitutions = query({
    args: {
        adminId: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const query = ctx.db.query("institution");
        if (args.adminId) {
            return await query.filter(q => q.eq(q.field("adminId"), args.adminId)).collect();
        }
        return await query.collect();
    }
})

export const getAdminId = query({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const admin = await ctx.db.query("admin").filter(q => q.eq(q.field("email"), args.email)).unique();
        if (!admin) {
            return null;
        }
        return admin._id;
    }
})


export const addFaculty = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        institutionId: v.string(),
        department: v.string(),
        subjectExpert: v.string(),
        status: v.string()
    },
    handler: async (ctx, args) => {
        const newFaculty = await ctx.db.insert("faculty", {
            name: args.name,
            email: args.email,
            department: args.department,
            subjectExpert: args.subjectExpert,
            status: "approved",
            institution: args.institutionId as Id<"institution">
        });

        const institution = await ctx.db.get(args.institutionId as Id<"institution">);
        if (!institution) {
            return "institution not found";
        }

        const existingFaculties = institution.faculties || [];
        const updatedInstitution = await ctx.db.patch(institution._id, {
            faculties: [...existingFaculties, newFaculty]
        });
        return "success"
    }

})