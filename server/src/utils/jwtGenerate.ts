import jwt from "jsonwebtoken"

export const jwtGenerate = (user_id: Number) => {
    const payload = {
        user: {
            id: user_id
        }
    }

    return jwt.sign(payload, process.env.JWTSECRET as string, {expiresIn: 60 * 60 * 1000 })
}
