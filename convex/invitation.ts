import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createInvitation = mutation({
    args: { institutionId: v.id("institution") },
    handler: async ({ db }, { institutionId }) => {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const createdAt = Date.now();
        const invitationId = await db.insert("invitation", {
            token,
            status: "pending",
            institutionId,
            createdAt,
        });

        const institution = await db.get(institutionId);
        if (!institution) {
            throw new Error("Institution not found");
        }

        // Store the invitation ID instead of the full URL
        const updatedInvitationLinks = [...(institution.invitationLinks || []), invitationId];
        await db.patch(institutionId, {
            invitationLinks: updatedInvitationLinks
        });
        return { token };
    },
});

export const getInstitutionName = query({
    args: {
        token: v.string()
    },
    handler: async ({ db }, { token }) => {
        const invitation = await db
            .query("invitation")
            .filter(q => q.eq(q.field("token"), token))
            .first();

        if (!invitation) {
            throw new Error("Invalid invitation token.");
        }

        const institution = await db
            .query("institution")
            .filter(q => q.eq(q.field("_id"), invitation.institutionId))
            .first();

        return institution?.name;
    }
});

export const registerFaculty = mutation({
    args: {
        token: v.string(),
        name: v.string(),
        email: v.string()
    },
    handler: async ({ db }, { token, name, email }) => {
        const invitation = await db
            .query("invitation")
            .filter(q => q.eq(q.field("token"), token))
            .first();

        if (!invitation) {
            throw new Error("Invalid invitation token.");
        }
        // Check if a faculty member with this email already exists
        const existingFaculty = await db
            .query("faculty")
            .filter(q => q.eq(q.field("email"), email))
            .first();

        if (existingFaculty) {
            return 404
        }

        const facultyId = await db.insert("faculty", {
            name,
            institution: invitation.institutionId,
            status: "pending",
            email,
        });

        return { facultyId };
    },
});

export const approveFaculty = mutation({
    args: { facultyId: v.id("faculty") },
    handler: async ({ db }, { facultyId }) => {
        await db.patch(facultyId, { status: "approved" });
        return { success: true };
    },
});
