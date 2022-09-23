import validate from "../validation.js"
import bcrypt from "bcrypt"
import db from "../database.js"
import randomstring from "randomstring"

export default
{
    register: async (parent, args) =>
    {
        //validate user input
        validate.user.validate(args)

        //hash password
        args.password = bcrypt.hashSync(args.password, 10)

        //insert into database and return user
        return await db.user.create(
            {
                data: args
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
    }
}