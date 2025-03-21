import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";


export const createInstitution = mutation({
    args: {
        name: v.string(),
        adminId: v.string()
    },
    handler: async (ctx, args) => {
        const lowerName = args.name.toLowerCase();
        const existingInstitution = await ctx.db
            .query("institution")
            .filter((q) => q.eq(q.field("name"), lowerName))
            .unique();
        if (existingInstitution) {
            return 404
        }

        const institutionId = await ctx.db.insert("institution", { name: lowerName, adminId: args.adminId });

        const admin = await ctx.db.get(args.adminId as Id<"admin">);

        const updatedInstitutions = admin?.institution || [];
        updatedInstitutions.push(institutionId);

        await ctx.db.patch(args.adminId as Id<"admin">, { institution: updatedInstitutions });

        return institutionId;
    },
});




export const getInstitution = query({
    args: {
        id: v.id("institution")
    },
    handler: async (ctx, args) => {
        const institution = await ctx.db.get(args.id);
        if (!institution) {
            throw new Error("Institution not found");
        }
        return institution;
    }
});
