import { validateKey } from "../../utils/auth"

export default async function (req, res) {
    if (typeof req.body == "object" && typeof req.body.key == "string") {
        let { key } = req.body;
        //Validate key
        let user = null;
        try {
            
            user = await validateKey(key);
        } catch (e) { }
        if (typeof user == "object") {
            res.json({ ok: 0, user: { ...user, key } });
        }
        else {
            res.json({ ok: -1, error: "INVALID_CREDENTIALS", errorMessage: "Invalid Credentials" });
        }
    }
}