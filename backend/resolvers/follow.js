import db from "../database.js"

export default
{
    follower: async(parent) =>
    {
        return await db.user.findUniqueOrThrow(
            {
                where:
                {
                    email: parent.followerId
                }
            }
        )
    },
    following: async(parent) =>
    {
        return await db.user.findUniqueOrThrow(
            {
                where:
                {
                    email: parent.followingId
                }
            }
        )
    }
}