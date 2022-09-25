import validate from "../validation.js"
import bcrypt from "bcrypt"
import db from "../database.js"

export default
{
    register: async (parent, args) =>
    {
        //validate user input
        validate.user.validate(args)

        //hash password
        args.password = bcrypt.hashSync(args.password, 10)

        //insert into database and return user
        const user = await db.user.create(
            {
                data: args
            }
        )

        return await db.session.create(
            {
                data:
                {
                    user:
                    {
                        connect:
                        {
                            email: user.email
                        }
                    }
                }
            }
        )
    },
    login: async (parent, args) =>
    {
        //find user from database
        const user = await db.user.findUniqueOrThrow(
            {
                where:
                {
                    email: args.email
                }
            }
        )

        //verify password
        if(!bcrypt.compareSync(args.password, user.password))
        {
            throw Error("Incorrect username or password")
        }

        //create session and return
        return await db.session.create(
            {
                data:
                {
                    user:
                    {
                        connect:
                        {
                            email: user.email
                        }
                    }
                }
            }
        )
    },
    createStrategy: async (parent, args) =>
    {
        //find session from db
        const session = await db.session.findUnique(
            {
                where:
                {
                    id: args.sessionId
                }
            }
        )

        if(!session)
        {
            throw new Error("No valid session")
        }

        //validate strategy
        validate.strategy.validate(args)

        //make strategy
        const strategy = await db.strategy.create(
            {
                data:
                {
                    name: args.strategy.name,
                    transactions:
                    {
                        create: args.strategy.transactions.map((transaction) =>
                                {
                                    return {
                                        stock:
                                        {
                                            connect:
                                            {
                                                ticker: transaction.ticker
                                            }
                                        },
                                        percent: transaction.percent,
                                        buyDateTime: new Date(transaction.buyDateTime),
                                        sellDateTime: new Date(transaction.sellDateTime)
                                    }
                                })
                    },
                    owner:
                    {
                        connect:
                        {
                            email: session.userId
                        }
                    }
                }
            }
        )

        return strategy
    },
    updatePricing: async (parent, args) =>
    {
        if(args.secretKey !== process.env.SECRET_KEY)
        {
            throw new Error("Invalid secret key")
        }

        args.tickers.forEach(async (ticker, index) => 
        {
            await db.stock.update(
                {
                    where:
                    {
                        ticker: ticker
                    },
                    data:
                    {
                        currentPrice: args.prices[index]
                    }
                }
            )
            await db.pricePoint.create(
                {
                    data:
                    {
                        price: args.prices[index],
                        dateTime: Math.floor(Date.now() / 60000) * 60000,
                        stock:
                        {
                            connect:
                            {
                                ticker: ticker
                            }
                        }
                    }
                }
            )

            await db.transaction.updateMany(
                {
                    where:
                    {
                        buyDateTime:
                        {
                            lte: new Date()
                        },
                        stockId: ticker,
                        buyPrice: null
                    },
                    data:
                    {
                        buyPrice: args.prices[index]
                    }
                }
            )

            await db.transaction.updateMany(
                {
                    where:
                    {
                        sellDateTime:
                        {
                            lte: new Date()
                        },
                        stockId: ticker,
                        sellPrice: null
                    },
                    data:
                    {
                        sellPrice: args.prices[index]
                    }
                }
            )
        });

        return true
    },
    deleteStrategy: async (parent, args) =>
    {
        const deleteTransactions = db.transaction.deleteMany(
            {
                where:
                {
                    strategyId: args.id
                }
            }
        )

        const deleteStrategy = db.strategy.delete(
            {
                where:
                {
                    id: args.id
                }
            }
        )

        await db.$transaction([deleteTransactions, deleteStrategy])

        return true
    }
}