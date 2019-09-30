import { Profile } from "authoritarian/dist/interfaces";
import { ProfileState, AvatarState } from "../system/interfaces.js";
import { LoadableElement } from "../toolbox/loadable-element.js";
export declare class ProfilePanel extends LoadableElement {
    avatarState: AvatarState;
    profileState: ProfileState;
    onProfileSave: (profile: Profile) => Promise<void>;
    errorMessage: string;
    loadingMessage: string;
    _changedProfile: Profile;
    private _inputDebouncer;
    reset(): void;
    updated(): void;
    static readonly styles: (import("lit-element").CSSResult | import("lit-element").CSSResultArray)[];
    private _handleInputChange;
    private _handleSaveClick;
    private _generateNewProfileFromInputs;
    renderReady(): import("lit-element").TemplateResult;
}
