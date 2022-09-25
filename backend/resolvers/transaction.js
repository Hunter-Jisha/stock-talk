import db from "../database.js"

export default
{
    stock: async(parent) =>
    {
        return await db.transaction.findUniqueOrThrow(
            {
                where:
                {
                    id: parent.id
                }
            }
        ).stock()
    }
}