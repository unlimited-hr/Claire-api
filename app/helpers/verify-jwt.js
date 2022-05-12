const {verifyToken} = require("./jwt");
/**
 * De
 * @param token
 * @return {Promise<*|{payload: *, protectedHeader: *}>}
 */
async function verify(token) {
    try {
        const {payload, protectedHeader} = await verifyToken(token, process.env.JWK_PUBLIC_KEY)
        console.log(payload)
        return {payload, protectedHeader}
    } catch (e) {
        console.log(e)
        return  e.message
    }
}

module.exports = verify
