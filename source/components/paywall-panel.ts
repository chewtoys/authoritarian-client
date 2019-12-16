
import {html, css, LitElement} from "lit-element"

import {star} from "../system/icons.js"
import {PaywallMode} from "../models/paywall-model.js"
import {mixinLoadable, LoadableState} from "../framework/mixin-loadable.js"
import {mixinModelSubscription} from "../framework/mixin-model-subscription.js"

import {PaywallModel} from "../interfaces.js"

export class PaywallPanel extends
	mixinLoadable(
		mixinModelSubscription<PaywallModel, typeof LitElement>(
			LitElement
		)
	)
{

	loadingMessage = "loading paywall panel"

	onMakeUserPremium = async() => {
		this.model.makeUserPremium()
	}

	onRevokeUserPremium = async() => {
		this.model.revokeUserPremium()
	}

	updated() {
		if (!this.model) throw new Error("paywall panel requires model")
		const {mode} = this.model.reader.state
		switch (mode) {
			case PaywallMode.Loading:
				this.loadableState = LoadableState.Loading
				break
			case PaywallMode.Error:
				this.loadableState = LoadableState.Error
				break
			default:
				this.loadableState = LoadableState.Ready
		}
	}

	static get styles() {return [super.styles, css`
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
	`]}

	private _renderNotPremium() {return html`
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
	`}

	private _renderPremium() {return html`
		<header>
			<div class="icon">${star}</div>
			<h3>You are a premium supporter!</h3>
		</header>
		<section>
			<p>You have the cool features!</p>
		</section>
		<footer class="coolbuttonarea">
			<button @click=${this.onRevokeUserPremium}>Unsubscribe</button>
			<span class="remaining">You have X days remaining</span>
		</footer>
	`}

	renderReady() {
		const {mode} = this.model.reader.state
		if (mode === undefined) return html``
		switch (mode) {
			case PaywallMode.LoggedOut: return html``
			case PaywallMode.NotPremium: return this._renderNotPremium()
			case PaywallMode.Premium: return this._renderPremium()
		}
	}
}
