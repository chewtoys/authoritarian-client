import { signToken } from "authoritarian/dist/crypto.js";
import { privateKey } from "./mock-keys.js";
const debug = (message) => console.debug(`mock: ${message}`);
const nap = (multiplier = 1) => new Promise(resolve => setTimeout(resolve, multiplier * 250));
async function createMockAccessToken({ claims = { cool: true }, expiresIn = "20m" } = {}) {
    debug("createMockAccessToken");
    return signToken({
        payload: { user: { userId: "u123", claims } },
        expiresIn,
        privateKey
    });
}
async function createMockRefreshToken({ expiresIn = "60d" } = {}) {
    debug("createMockRefreshToken");
    return signToken({
        payload: { userId: "u123" },
        expiresIn,
        privateKey
    });
}
const mockRefreshToken = createMockRefreshToken();
const mockAccessToken = createMockAccessToken({ claims: { premium: false } });
const mockPremiumAccessToken = createMockAccessToken({ claims: { premium: true } });
const mockAdminAccessToken = createMockAccessToken({ claims: { admin: true, premium: true } });
export const mockLoginPopupRoutine = async () => {
    debug("mockLoginPopupRoutine");
    await nap();
    return {
        accessToken: await mockAccessToken,
        refreshToken: await mockRefreshToken
    };
};
export const mockDecodeAccessToken = (accessToken) => {
    debug("mockDecodeAccessToken");
    return ({
        exp: (Date.now() / 1000) + 10,
        user: { userId: "u123", claims: { premium: true } },
        accessToken
    });
};
export class MockPrivateVimeoGovernor {
    constructor() {
        this._vimeoId = "109943349";
    }
    async getVimeo(options) {
        const { _vimeoId: vimeoId } = this;
        return { vimeoId };
    }
    async setVimeo({ vimeoId }) {
        this._vimeoId = vimeoId;
    }
}
export class MockTokenStorage {
    async passiveCheck() {
        debug("passiveCheck");
        await nap();
        return mockAccessToken;
    }
    async writeTokens(tokens) {
        debug("writeTokens");
        await nap();
    }
    async writeAccessToken(accessToken) {
        debug("writeAccessToken");
        await nap();
    }
    async clearTokens() {
        debug("clearTokens");
        await nap();
    }
}
export class MockTokenStorageAdmin extends MockTokenStorage {
    async passiveCheck() {
        debug("passiveCheck admin");
        await nap();
        return mockAdminAccessToken;
    }
}
export class MockTokenStorageLoggedOut extends MockTokenStorage {
    async passiveCheck() {
        debug("passiveCheck loggedout");
        await nap();
        return null;
    }
}
export class MockProfileMagistrate {
    constructor() {
        this._profile = {
            userId: "fake-h31829h381273h",
            public: {
                nickname: "ℒord ℬrimshaw Đuke-Ŵellington",
                picture: "https://picsum.photos/id/375/200/200",
            },
            private: {
                realname: "Captain Branstock Dudley-Faddington",
            }
        };
    }
    async getPublicProfile({ userId }) {
        debug("getPublicProfile");
        await nap();
        return {
            ...this._profile,
            userId,
        };
    }
    async getFullProfile(options) {
        debug("getFullProfile");
        await nap();
        return this._profile;
    }
    async setFullProfile({ profile }) {
        debug("setFullProfile");
        await nap();
        this._profile = profile;
        return undefined;
    }
}
export class MockPaywallGuardian {
    async makeUserPremium(options) {
        debug("makeUserPremium");
        await nap();
        return mockPremiumAccessToken;
    }
    async revokeUserPremium(options) {
        debug("revokeUserPremium");
        await nap();
        return mockAccessToken;
    }
}
//# sourceMappingURL=mocks.js.map