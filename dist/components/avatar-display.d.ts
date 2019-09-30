import { AvatarState } from "../system/interfaces.js";
import { LitElement } from "lit-element";
export declare class AvatarDisplay extends LitElement {
    avatarState: AvatarState;
    defaultPicture: import("lit-element").TemplateResult;
    static readonly styles: import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
