import { AuthoritarianStartupError } from "../system/errors.js";
const err = (message) => new AuthoritarianStartupError(message);
export function parse(element) {
    if (!element)
        throw err(`<authoritarian-config> required, missing`);
    return {
        mock: element.getAttribute("mock"),
        debug: element.hasAttribute("debug"),
        authServer: element.getAttribute("auth-server"),
        profileServer: element.getAttribute("profile-server"),
        paywallServer: element.getAttribute("paywall-server"),
        privateVimeoServer: element.getAttribute("private-vimeo-server"),
    };
}
//# sourceMappingURL=parse.js.map