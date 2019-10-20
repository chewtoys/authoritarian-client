var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, html, css } from "lit-element";
import { select } from "../toolbox/selects.js";
import { Debouncer } from "../toolbox/debouncer.js";
import { deepClone, deepEqual } from "../toolbox/deep.js";
import { LoadableElement, LoadableState } from "../toolbox/loadable-element.js";
export class ProfilePanel extends LoadableElement {
    constructor() {
        super(...arguments);
        this.onProfileSave = async (profile) => { };
        this.errorMessage = "error in profile panel";
        this.loadingMessage = "loading profile panel";
        this._changedProfile = null;
        this._inputDebouncer = new Debouncer({
            delay: 1000,
            action: () => this._handleInputChange()
        });
        this._handleInputChange = () => {
            const { profile } = this.profileState;
            if (!profile)
                return;
            const newProfile = this._generateNewProfileFromInputs();
            const changes = !deepEqual(profile, newProfile);
            this._changedProfile = changes ? newProfile : null;
        };
        this._handleSaveClick = async () => {
            const { _changedProfile } = this;
            this._changedProfile = null;
            await this.onProfileSave(_changedProfile);
        };
    }
    reset() {
        this._changedProfile = null;
    }
    updated() {
        if (this.profileState) {
            const { error, loading } = this.profileState;
            this.loadableState = error
                ? LoadableState.Error
                : loading
                    ? LoadableState.Loading
                    : LoadableState.Ready;
        }
    }
    static get styles() {
        return [super.styles, css `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		.container {
			display: flex;
			flex-direction: row;
		}
		avatar-display {
			flex: 0 0 auto;
			--avatar-display-size: 25%;
			border: 5px solid rgba(255,255,255, 0.5);
		}
		.container > div {
			flex: 1 1 auto;
			display: flex;
			padding: 0.5em;
			flex-direction: column;
			justify-content: center;
		}
		.container > div > * + * {
			margin-top: 0.25em;
		}
		button.save {
			margin-left: auto;
		}
		ul > li {
			opacity: 0.7;
			font-size: 0.7em;
			display: inline-block;
			padding: 0.2em 0.5em;
			border-radius: 0.5em;
			font-family: monospace;
			border: 1px solid;
		}
		input {
			width: 100%;
		}
		h3 {
			font-size: 1.1em;
		}
		@media (max-width: 600px) {
			.container {
				flex-direction: column;
				align-items: flex-start;
			}
			avatar-display {
				--avatar-display-size: 5em;
				margin: auto;
			}
		}
	`];
    }
    _generateNewProfileFromInputs() {
        const profile = deepClone(this.profileState.profile);
        {
            const input = select("input[name=nickname]", this.shadowRoot);
            profile.public.nickname = input.value;
        }
        return profile;
    }
    renderReady() {
        if (!this.avatarState || !this.profileState)
            return;
        const { avatarState, _inputDebouncer, _handleSaveClick, _handleInputChange, } = this;
        const { profile, admin, premium } = this.profileState;
        const showSaveButton = !!this._changedProfile;
        if (!profile)
            return html ``;
        return html `
			<div class="container formarea coolbuttonarea">
				<avatar-display .avatarState=${avatarState}></avatar-display>
				<div>
					<ul>
						${admin ? html `<li data-tag="admin">Admin</li>` : html ``}
						${premium ? html `<li data-tag="premium">Premium</li>` : html ``}
					</ul>
					<h3>${profile.private.realname}</h3>
					<input
						type="text"
						name="nickname"
						spellcheck="false"
						autocomplete="off"
						placeholder="nickname"
						@change=${_handleInputChange}
						@keyup=${_inputDebouncer.queue}
						.value=${profile.public.nickname}
						/>
					${showSaveButton
            ? html `<button class="save" @click=${_handleSaveClick}>Save</button>`
            : html ``}
				</div>
			</div>
		`;
    }
}
__decorate([
    property({ type: Object })
], ProfilePanel.prototype, "avatarState", void 0);
__decorate([
    property({ type: Object })
], ProfilePanel.prototype, "profileState", void 0);
__decorate([
    property({ type: Object })
], ProfilePanel.prototype, "_changedProfile", void 0);
//# sourceMappingURL=profile-panel.js.map