import joi from "joi"

export default
{
    user: joi.object(
        {
            email: joi.string()
            .email(),
            password: joi.string()
            .min(6)
            .max(16)
        }
    )
}