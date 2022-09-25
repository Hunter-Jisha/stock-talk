import db from "../database.js"

export default
{
    pricePoints: async(parent) =>
    {
        return await db.stock.findUniqueOrThrow(
            {
                where:
                {
                    ticker: parent.ticker
                }
            }
        ).pricePoints()
    }
}