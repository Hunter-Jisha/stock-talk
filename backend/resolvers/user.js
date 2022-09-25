import db from "../database.js"

export default
{
    strategies: async(parent) =>
    {
        return await db.user.findUniqueOrThrow(
            {
                where:
                {
                    email: parent.email
                }
            }
        ).strategies()
    },
    following: async(parent) =>
    {
        return await db.follows.findMany(
            {
                where:
                {
                    followerId: parent.email
                }
            }
        )
    },
    followers: async(parent) =>
    {
        return await db.follows.findMany(
            {
                where:
                {
                    followingId: parent.email
                }
            }
        )
    }
}