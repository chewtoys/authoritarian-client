import { VimeoState } from "../system/interfaces.js";
import { LoadableElement } from "../toolbox/loadable-element.js";
export declare class PrivateVimeo extends LoadableElement {
    vimeoState: VimeoState;
    onUpdateVideo: (vimeostring: string) => void;
    updated(): void;
    static readonly styles: (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    private _renderLoggedOut;
    private _renderUnprivileged;
    private _renderViewer;
    private _renderPrivileged;
    private _handleClickUpdateLivestream;
    private _renderAdmin;
    renderReady(): import("lit-element").TemplateResult;
}
