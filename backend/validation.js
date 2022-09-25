import joi from "joi"

export default
{
    user: joi.object(
        {
            username: joi.string()
            .min(3)
            .max(16),
            email: joi.string()
            .email(),
            password: joi.string()
            .min(6)
            .max(16)
        }
    ),
    strategy: joi.object(
        {
            name: joi.string()
            .min(3)
            .max(24)
        }
    )
}