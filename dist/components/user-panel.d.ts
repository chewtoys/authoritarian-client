import { UserState } from "../system/interfaces.js";
import { LoadableElement } from "../toolbox/loadable-element.js";
export declare class UserPanel extends LoadableElement {
    userState: UserState;
    ["logged-in"]: boolean;
    onLoginClick: (event: MouseEvent) => void;
    onLogoutClick: (event: MouseEvent) => void;
    loadingMessage: string;
    errorMessage: string;
    updated(): void;
    static readonly styles: (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    private _renderLoggedIn;
    private _renderLoggedOut;
    renderReady(): import("lit-element").TemplateResult;
}
