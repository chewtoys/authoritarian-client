var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, html, css } from "lit-element";
import { LoadableElement, LoadableState } from "../toolbox/loadable-element.js";
export class UserPanel extends LoadableElement {
    constructor() {
        super(...arguments);
        this["logged-in"] = false;
        this.onLoginClick = () => { };
        this.onLogoutClick = () => { };
        this.loadingMessage = "loading user panel";
        this.errorMessage = "user account system error";
        this._renderLoggedIn = () => html `
		<slot></slot>
		<div class="logout coolbuttonarea">
			<button @click=${this.onLogoutClick}>
				Logout
			</button>
		</div>
	`;
        this._renderLoggedOut = () => html `
		<div class="login coolbuttonarea">
			<button @click=${this.onLoginClick}>
				Login
			</button>
		</div>
	`;
    }
    updated() {
        if (!this.userState)
            return;
        const { loading, error, loggedIn } = this.userState;
        this["logged-in"] = loggedIn;
        this.loadableState = error
            ? LoadableState.Error
            : loading
                ? LoadableState.Loading
                : LoadableState.Ready;
    }
    static get styles() {
        return [super.styles, css `
			:host {
				display: block;
			}
			div {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
			.login {
				justify-content: var(--user-panel-login-justify, center);
			}
			.logout {
				justify-content: var(--user-panel-logout-justify, flex-end);
			}
			* + div {
				margin-top: var(--user-panel-margins, 0.5em);
			}
			::slotted(*) {
				display: block;
				margin-top: var(--user-panel-margins, 0.5em) !important;
			}
			::slotted(*:first-child) {
				margin-top: unset !important;
			}
		`];
    }
    renderReady() {
        const { _renderLoggedIn, _renderLoggedOut } = this;
        const { loggedIn } = this.userState;
        return html `
			<slot name="top"></slot>
			${loggedIn ? _renderLoggedIn() : _renderLoggedOut()}
			<slot name="bottom"></slot>
		`;
    }
}
__decorate([
    property({ type: Object })
], UserPanel.prototype, "userState", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], UserPanel.prototype, "logged-in", void 0);
//# sourceMappingURL=user-panel.js.map