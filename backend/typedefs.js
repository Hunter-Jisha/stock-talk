import {gql} from "apollo-server"

const typeDefs = gql`
  type Query 
  {
    ping: String!
    session(id: String!): Session!
  }
  type Mutation 
  {
    register(email: String!, password: String!): Session!
    login(email: String!, password: String!): Session!
  }
  type User 
  {
    email: String!
  }
  type Session 
  {
    id: String!
    user: User!
  }
`

export default typeDefs;