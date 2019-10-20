var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, html, css, svg } from "lit-element";
import { PaywallMode } from "../models/paywall-model.js";
import { LoadableElement, LoadableState } from "../toolbox/loadable-element.js";
const icons = {
    star: svg `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/></svg>`
};
export class PaywallPanel extends LoadableElement {
    constructor() {
        super(...arguments);
        this.onMakeUserPremium = async () => { };
        this.onRevokeUserPremium = async () => { };
        this.loadingMessage = "loading paywall panel";
    }
    updated() {
        if (!this.paywallState)
            return;
        const { mode } = this.paywallState;
        switch (mode) {
            case PaywallMode.Loading:
                this.loadableState = LoadableState.Loading;
                break;
            case PaywallMode.Error:
                this.loadableState = LoadableState.Error;
                break;
            default:
                this.loadableState = LoadableState.Ready;
        }
    }
    static get styles() {
        return [super.styles, css `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		:host {
			display: block;
			padding: 1em 0;
		}

		header .icon {
			float: right;
		}

		header .icon svg {
			width: 4em;
			height: 4em;
			margin-right: 0.5em;
			fill: yellow;
		}

		section {
			padding: 1em 0;
		}

		footer > * {
			padding: 0 0.5em;
		}

		footer > span {
			font-size: 0.8em;
			opacity: 0.8;
		}
	`];
    }
    _renderNotPremium() {
        return html `
		<header>
			<h3>Become a premium supporter!</h3>
		</header>
		<section>
			<p>It comes with cool features!</p>
		</section>
		<footer class="coolbuttonarea">
			<button @click=${this.onMakeUserPremium}>Subscribe</button>
			<span class="price">$5<small>/month</small></span>
		</footer>
	`;
    }
    _renderPremium() {
        return html `
		<header>
			<div class="icon">${icons.star}</div>
			<h3>You are a premium supporter!</h3>
		</header>
		<section>
			<p>You have the cool features!</p>
		</section>
		<footer class="coolbuttonarea">
			<button @click=${this.onRevokeUserPremium}>Unsubscribe</button>
			<span class="remaining">You have X days remaining</span>
		</footer>
	`;
    }
    renderReady() {
        const { mode } = this.paywallState;
        if (mode === undefined)
            return html ``;
        switch (mode) {
            case PaywallMode.LoggedOut: return html ``;
            case PaywallMode.NotPremium: return this._renderNotPremium();
            case PaywallMode.Premium: return this._renderPremium();
        }
    }
}
__decorate([
    property({ type: Object })
], PaywallPanel.prototype, "paywallState", void 0);
//# sourceMappingURL=paywall-panel.js.map