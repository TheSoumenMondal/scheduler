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
        adminId: v.string()
    },
    handler: async (ctx, args) => {
        const institutions = await ctx.db.query("institution").filter(q => q.eq(q.field("adminId"), args.adminId)).collect();
        return institutions;
    }
})

