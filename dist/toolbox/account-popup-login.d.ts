import { AuthTokens } from "authoritarian/dist/interfaces.js";
import { AccountPopupLogin } from "../system/interfaces";
/**
 * Curry away the url parameter
 * - prepare the url ahead of time
 * - you provide the mockable account popup login function
 */
export declare function prepareLoginPopupRoutine(authServerUrl: string, accountPopupLoginFunc: AccountPopupLogin): () => Promise<AuthTokens>;
/**
 * Trigger an account popup to appear, harvest and return the auth tokens
 * - must be called from user-initiated callstack (like a click event),
 *   otherwise popup blockers will prevent functionality
 * - custom post-message logic communicates with the popup
 * - add a 'message' event listener to window for popup communication
 */
export declare function accountPopupLogin(authServerUrl: string): Promise<AuthTokens>;
