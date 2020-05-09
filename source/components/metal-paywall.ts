
import {PaywallShare} from "../interfaces.js"
import * as loading from "../toolbox/loading.js"
import {star as starIcon} from "../system/icons.js"
import {styles} from "./styles/metal-paywall-styles.js"
import {mixinStyles} from "../framework/mixin-styles.js"
import {MetalshopComponent, html, property, TemplateResult} from "../framework/metalshop-component.js"

 @mixinStyles(styles)
export class MetalPaywall extends MetalshopComponent<PaywallShare> {

	 @property({type: Object})
	paywallLoad: loading.Load<void> = loading.ready<void>()

	render() {
		const {paywallLoad} = this
		const {authLoad, settingsLoad, premiumClaim, premiumSubscription} = this.share
		const totalLoad = loading.meta(authLoad, paywallLoad, settingsLoad)
		return html`
			<iron-loading .load=${totalLoad} class="coolbuttonarea">
				${premiumClaim
					? this.renderPanelPremium()
					: this.renderPanelNoPremium()}
				${premiumSubscription
					? this.renderPanelSubscription()
					: this.renderPanelNoSubscription()}
			</iron-loading>
		`
	}

	private renderPanelPremium() {
		return html`
			<div class="panel premium">
				<div class="banner">
					${starIcon}
					<h3>You are Premium!</h3>
				</div>
			</div>
		`
	}

	private renderPanelNoPremium() {
		return html`
			<div class="panel no-premium">
				<h3>Not premium</h3>
			</div>
		`
	}

	private renderPanelSubscription() {
		const {premiumSubscription} = this.share
		const {brand, last4, expireYear, expireMonth} = premiumSubscription.card
		return html`
			<div class="panel subscription">
				<h3>Billing subscription is active</h3>
				<p>${brand} card ending in ${last4}, card expires ${expireYear}/${expireMonth}</p>
				<div class="buttonbar">
					<button class="update" @click=${this.handleUpdatePremiumClick}>
						Update card
					</button>
					<button class="cancel" @click=${this.handleCancelPremiumClick}>
						Cancel subscription
					</button>
				</div>
			</div>
		`
	}

	private renderPanelNoSubscription () {
		const {premiumExpires} = this.share
		return html`
			<div class="panel no-subscription">
				<p>No active billing subscription</p>
				${premiumExpires ? (() => {
					const duration = premiumExpires - Date.now()
					const days = Math.ceil(duration / (1000 * 60 * 60 * 24))
					return html`<p>Remaining: ${days} day${days === 1 ? "" : "s"}</p>`
				})() : null}
				<button class="subscribe" @click=${this.handleCheckoutPremiumClick}>
					Subscribe
				</button>
			</div>
		`
	}

	private loadingOp = async<P extends any>(func: () => Promise<P>): Promise<P> => {
		this.paywallLoad = loading.loading()
		try {
			const result = await func()
			this.paywallLoad = loading.ready()
			return result
		}
		catch (error) {
			console.error(error)
			this.paywallLoad = loading.error()
			throw error
		}
	}

	private async handleCheckoutPremiumClick() {
		await this.loadingOp(async() => this.share.checkoutPremium())
	}

	private async handleUpdatePremiumClick() {
		await this.loadingOp(async () => this.share.updatePremium())
	}

	private async handleCancelPremiumClick() {
		await this.loadingOp(async () => this.share.cancelPremium())
	}
}
