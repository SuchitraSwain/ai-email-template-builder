import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUsers = mutation({
  argrs: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    // if user already exists, return user
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // else create user
    if (user?.length === 0) {
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 3,
      });
      return result;
    }
    return user[0];
  },
});
