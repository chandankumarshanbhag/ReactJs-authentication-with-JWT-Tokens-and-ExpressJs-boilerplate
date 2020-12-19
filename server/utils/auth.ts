import jwt from "jsonwebtoken"
import Config from "./../config"

export function generateKey(data) {
    return jwt.sign(data, Config.privateKey);
}

export function validateKey(data) {
    return jwt.verify(data, Config.privateKey);
}
