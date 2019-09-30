import { Profile, AuthTokens, AccessToken, TokenStorageTopic, PaywallGuardianTopic, ProfileMagistrateTopic, PrivateVimeoGovernorTopic } from "authoritarian/dist/interfaces.js";
import { AuthContext, LoginPopupRoutine } from "./interfaces.js";
export declare const mockLoginPopupRoutine: LoginPopupRoutine;
export declare const mockDecodeAccessToken: (accessToken: string) => AuthContext;
export declare class MockPrivateVimeoGovernor implements PrivateVimeoGovernorTopic {
    private _vimeoId;
    getVimeo(options: {
        accessToken: AccessToken;
        videoName: string;
    }): Promise<{
        vimeoId: string;
    }>;
    setVimeo({ vimeoId }: {
        accessToken: AccessToken;
        vimeoId: string;
        videoName: string;
    }): Promise<void>;
}
export declare class MockTokenStorage implements TokenStorageTopic {
    passiveCheck(): Promise<string>;
    writeTokens(tokens: AuthTokens): Promise<void>;
    writeAccessToken(accessToken: AccessToken): Promise<void>;
    clearTokens(): Promise<void>;
}
export declare class MockTokenStorageAdmin extends MockTokenStorage {
    passiveCheck(): Promise<string>;
}
export declare class MockTokenStorageLoggedOut extends MockTokenStorage {
    passiveCheck(): Promise<any>;
}
export declare class MockProfileMagistrate implements ProfileMagistrateTopic {
    private _profile;
    getPublicProfile({ userId }: {
        userId: any;
    }): Promise<Profile>;
    getFullProfile(options: any): Promise<Profile>;
    setFullProfile({ profile }: {
        profile: any;
    }): Promise<void>;
}
export declare class MockPaywallGuardian implements PaywallGuardianTopic {
    makeUserPremium(options: {
        accessToken: AccessToken;
    }): Promise<string>;
    revokeUserPremium(options: {
        accessToken: AccessToken;
    }): Promise<string>;
}
