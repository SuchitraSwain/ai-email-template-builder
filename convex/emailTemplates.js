import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplates = mutation({
  args: {
    tid: v.string(),
    design: v.any(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("emailTemplates", {
        tid: args.tid,
        design: args.design,
        email: args.email,
      });
      return result;
    } catch (e) {
      console.error("Error inserting data:", e);
      throw new Error("Failed to save template");
    }
  },
});

export const GetTemplatesDesign = query({
  args: {
    email: v.string(),
    tid: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("emailTemplates")
        .filter((q) =>
          q.and(
            q.eq(q.field("tid"), args.tid),
            q.eq(q.field("email"), args.email)
          )
        )
        .collect();

      return result[0];
    } catch (e) {
      console.error("Error fetching templates:", e);
      throw new Error("Failed to fetch templates");
    }
  },
});
