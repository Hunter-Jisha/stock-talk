import { request, gql } from 'graphql-request'
import * as dotenv from 'dotenv'
dotenv.config()

//setTimeout(genNewPrices, 10000)
genNewPrices()

async function genNewPrices()
{   
    try
    {
        const allStocks = (await request(process.env.BACKEND_URL, gql`{allStocks{ticker currentPrice}}`)).allStocks
        var stocks = allStocks.map((stock) => `"${stock.ticker}"`)
        var prices = allStocks.map((stock) => Math.round(stock.currentPrice * (0.95 + (0.1 * Math.random())) * 100) / 100)
        await request(process.env.BACKEND_URL, gql`mutation{updatePricing(secretKey: "${process.env.SECRET_KEY}", tickers: [${stocks}], prices: [${prices}])}`)
    }
    catch(error)
    {
        console.log(error)
    }

    setTimeout(genNewPrices, 60000)
}