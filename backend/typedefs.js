import {gql} from "apollo-server"

const typeDefs = gql`
  type Query 
  {
    ping: String!
    session(id: String!): Session!   
    allStocks(recordTimeValue: Int, recordTimeUnit: String, intervalUnit: String): [Stock]!
    searchForUserByName(name: String!): [User]!
    getUserByEmail(email: String!): User!
  }

  type Mutation 
  {
    register(username: String!, email: String!, password: String!): Session!
    login(email: String!, password: String!): Session!
    createStrategy(sessionId: String!, strategy: InputStrategy!): Strategy
    updatePricing(secretKey: String!, tickers: [String]!, prices: [Float]!): Boolean!
    deleteStrategy(sessionId: String!, id: Int!): Boolean!
    follow(sessionId: String!, email: String!): Boolean
    unfollow(sessionId: String!, email: String!): Boolean
  }

  type User 
  {
    email: String!
    username: String!
    strategies: [Strategy]!
    following: [Follow]!
    followers: [Follow]!
  }

  type Follow
  {
    follower: User!
    following: User!
  }

  type Session 
  {
    id: String!
    user: User!
  }

  type Strategy
  {
    id: Int!
    name: String!

    transactions: [Transaction]
  }

  input InputStrategy
  {
    name: String!
    transactions: [InputTransaction]
  }

  type Stock
  {   
    ticker: String!
    pricePoints: [PricePoint]!
    currentPrice: Float!
  }

  type Transaction
  {
    id: Int!
    stock: Stock!
    percent: Int!
    buyDateTime: Float!
    sellDateTime: Float!
    buyPrice: Float
    sellPrice: Float
  }

  input InputTransaction
  {
    ticker: String!
    percent: Int!
    buyDateTime: Float!
    sellDateTime: Float!
  }

  type PricePoint
  {
    price: Float!
    dateTime: Float!
  }
`

export default typeDefs;