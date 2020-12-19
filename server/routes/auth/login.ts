import { generateKey } from "../../utils/auth"


export default function (req, res) {
    if (typeof req.body == "object" && typeof req.body.username == "string" && typeof req.body.password == "string") {
        let { username, password } = req.body;
        // Read DB and authenticate user
        if (username == "admin" && password == "admin") {
            
            let key = generateKey({ username, password });

            //send actual user data
            res.json({ ok: 0, user: { username, password, key }, key });
        }
        else {
            res.json({ ok: -1, error: "INVALID_CREDENTIALS", errorMessage: "Invalid Credentials" });
        }
    }
}