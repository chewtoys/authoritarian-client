import { TokenStorageTopic } from "authoritarian/dist/interfaces.js";
import { UserModel, LoginPopupRoutine, DecodeAccessToken } from "../system/interfaces.js";
export declare function createUserModel({ tokenStorage, loginPopupRoutine, decodeAccessToken, }: {
    tokenStorage: TokenStorageTopic;
    loginPopupRoutine: LoginPopupRoutine;
    decodeAccessToken: DecodeAccessToken;
}): UserModel;
