import db from "../database.js"

export default
{
    transactions: async(parent) =>
    {
        return await db.strategy.findUniqueOrThrow(
            {
                where:
                {
                    id: parent.id
                }
            }
        ).transactions()
    }
}