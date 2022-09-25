import { request, gql } from 'graphql-request'
import * as dotenv from 'dotenv'
dotenv.config()

setTimeout(genNewPrices, 10000)

async function genNewPrices()
{   
    const allStocks = (await request(process.env.BACKEND_URL, gql`{allStocks{ticker pricePoints{price}}}`)).allStocks

    var stocks = allStocks.map((stock) => `"${stock.ticker}"`)

    var prices = allStocks.map((stock) => Math.round(stock.pricePoints[stock.pricePoints.length - 1].price * (0.95 + (0.1 * Math.random())) * 100) / 100)

    await request(process.env.BACKEND_URL, gql`mutation{updatePricing(secretKey: "${process.env.SECRET_KEY}", tickers: [${stocks}], prices: [${prices}])}`)

    setTimeout(genNewPrices, 60000)
}