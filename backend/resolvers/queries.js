import db from "../database.js"

export default
{
    ping: () => "Pong!",
    session: async (parent, args) =>
    {
        return await db.session.findUniqueOrThrow({where:{id: args.id}})
    }
}