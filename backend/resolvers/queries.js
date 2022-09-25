import db from "../database.js"

export default
{
    ping: () => "Pong!",
    session: async (parent, args) =>
    {
        return await db.session.findUniqueOrThrow({where:{id: args.id}})
    },
    allStocks: async (parent, args) =>
    {
        return await db.stock.findMany({})
    },
    searchForUserByName: async (parent, args) =>
    {
        return await db.user.findMany(
            {
                where:
                {
                    username:
                    {
                        contains: args.name,
                        mode: 'insensitive'
                    }
                }
            }
        )
    },
    getUserByEmail: async (parent, args) =>
    {
        return await db.user.findUniqueOrThrow(
            {
                where:
                {
                    email: args.email
                }
            }
        )
    }
}