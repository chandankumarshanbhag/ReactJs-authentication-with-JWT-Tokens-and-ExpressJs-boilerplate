import jwt from "jsonwebtoken"
import Config from "../config"

export function generateKey(data) {
    return jwt.sign(data, Config.privateKey,{ expiresIn: Config.expiresIn });
}

export async function validateKey(data) {
    return await jwt.verify(data, Config.privateKey);
}
