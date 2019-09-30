import { CSSResult, LitElement, CSSResultArray } from "lit-element";
export declare enum LoadableState {
    Loading = 0,
    Error = 1,
    Ready = 2
}
declare const _state: unique symbol;
declare const _renderError: unique symbol;
declare const _renderLoading: unique symbol;
/**
 * Add loading and error states to your component
 * - currently a lit-element subclass
 */
export declare class LoadableElement extends LitElement {
    errorMessage: string;
    loadingMessage: string;
    private [_state];
    loadableState: LoadableState;
    static readonly styles: CSSResult | CSSResultArray;
    renderReady(): void;
    private [_renderLoading];
    private [_renderError];
    render(): void | import("lit-element").TemplateResult;
}
export {};
