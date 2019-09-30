import { bdecode } from "authoritarian/dist/bdecode.js";
/**
 * Simply read what's in an access token
 * - no logic to check expiration, or anything like that
 */
export const decodeAccessToken = accessToken => {
    const data = bdecode(accessToken);
    const { payload, exp } = data;
    const { user } = payload;
    return { exp, user, accessToken };
};
//# sourceMappingURL=decode-access-token.js.map