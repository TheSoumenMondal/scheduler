import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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