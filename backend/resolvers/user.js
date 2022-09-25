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
    }
}