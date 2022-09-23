import { ApolloServer } from 'apollo-server-express'
import typedefs from "./typedefs.js"
import resolvers from "./resolvers/index.js"
import express from 'express'
import "dotenv/config"

const server = express()

const api = new ApolloServer(
    {
        typeDefs: typedefs,
        resolvers: resolvers
    }
)

await api.start()

api.applyMiddleware({app: server, path: "/api"})

server.listen(process.env.PORT || 8000, () =>
{
    console.log("Running...")
})