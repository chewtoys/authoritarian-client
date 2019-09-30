import { PaywallState } from "../system/interfaces.js";
import { LoadableElement } from "../toolbox/loadable-element.js";
export declare class PaywallPanel extends LoadableElement {
    paywallState: PaywallState;
    onMakeUserPremium: () => Promise<void>;
    onRevokeUserPremium: () => Promise<void>;
    loadingMessage: string;
    updated(): void;
    static readonly styles: (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    private _renderNotPremium;
    private _renderPremium;
    renderReady(): import("lit-element").TemplateResult;
}
