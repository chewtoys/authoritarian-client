
import {
	User,
	Profile,
	Question,
	Settings,
	CardClues,
	AuthTokens,
	AccessToken,
	ScheduleEvent,
	QuestionDraft,
	AuthDealerTopic,
	TokenStoreTopic,
	PaywallLiaisonTopic,
	ScheduleSentryTopic,
	SettingsSheriffTopic,
	QuestionsBureauTopic,
	LiveshowGovernorTopic,
	ProfileMagistrateTopic,
} from "authoritarian/dist/interfaces.js"

import {AuthModel} from "./models/auth-model.js"
import {DetailsModel} from "./models/details-model.js"
import {PaywallModel} from "./models/paywall-model.js"
import {ScheduleModel} from "./models/schedule-model.js"
import {QuestionsModel} from "./models/questions-model.js"
import {LiveshowViewModel, LiveshowModel} from "./models/liveshow-model.js"

import * as loading from "./toolbox/loading.js"
import {CSSResult, CSSResultArray} from "lit-element"
import {Logger} from "authoritarian/dist/toolbox/logger/interfaces.js"

export interface MetalConfig {
	["mock"]: string
	["auth-server"]: string
	["profile-server"]: string
	["paywall-server"]: string
	["schedule-server"]: string
	["liveshow-server"]: string
	["questions-server"]: string
}

export type CSS = CSSResult | CSSResultArray
export type ConstructorFor<T extends {} = {}> = new(...args: any[]) => T

export interface MetalOptions {
	logger: Logger
	authDealer: AuthDealerTopic
	tokenStore: TokenStoreTopic
	paywallLiaison: PaywallLiaisonTopic
	scheduleSentry: ScheduleSentryTopic
	settingsSheriff: SettingsSheriffTopic
	questionsBureau: QuestionsBureauTopic
	liveshowGovernor: LiveshowGovernorTopic
	profileMagistrate: ProfileMagistrateTopic
	//—
	checkoutPopupUrl: string
	decodeAccessToken: DecodeAccessToken
	triggerAccountPopup: TriggerAccountPopup
	triggerCheckoutPopup: TriggerCheckoutPopup
}

export interface AuthContext {
	user: User
	exp: number
	accessToken: AccessToken
}

export type GetAuthContext = () => Promise<AuthContext>
export type TriggerAccountPopup = () => Promise<AuthTokens>
export type DecodeAccessToken = (accessToken: AccessToken) => AuthContext
export type TriggerCheckoutPopup = (o: {stripeSessionId: string}) => Promise<void>

export interface LoginWithAccessToken {
	(accessToken: AccessToken): Promise<void>
}

export interface AuthPayload {
	getAuthContext: GetAuthContext
}

export interface QuestionValidation {
	angry: boolean
	message: string
	postable: boolean
}

export interface QuestionsBureauUi {
	fetchQuestions(o: {
			board: string
		}): Promise<Question[]>
	postQuestion(o: {
			draft: QuestionDraft
		}): Promise<Question>
	deleteQuestion(o: {
			questionId: string
		}): Promise<void>
	likeQuestion(o: {
			like: boolean
			questionId: string
		}): Promise<Question>
	purgeQuestions(o: {board: string}): Promise<void>
}

export interface VideoPayload {
	vimeoId: string
}

export type PrepareHandleLikeClick = (o: {
	like: boolean
	questionId: string
}) => (event: MouseEvent) => void

//
// supermodel
//

export interface Supermodel {
	auth: AuthModel
	details: DetailsModel
	paywall: PaywallModel
	schedule: ScheduleModel
	liveshow: LiveshowModel
	questions: QuestionsModel
}

export enum ProfileMode {
	Error,
	Loading,
	Loaded,
	None,
}

export enum BillingPremiumSubscription {
	Unsubscribed,
	Subscribed,
}

export enum PremiumStatus {
	NotPremium,
	Premium,
}

export enum PrivilegeLevel {
	Unknown,
	Unprivileged,
	Privileged,
}

//
// component shares
//

export interface AccountShare {
	login: () => Promise<void>
	logout: () => Promise<void>
	authLoad: loading.Load<AuthPayload>
}

export interface MyAvatarShare {
	profile: Profile
	premium: boolean
}

export interface AdminModeShare {
	authLoad: loading.Load<AuthPayload>
	settingsLoad: loading.Load<Settings>
	setAdminMode(adminMode: boolean): Promise<void>
}

export interface AdminOnlyShare {
	authLoad: loading.Load<AuthPayload>
	settingsLoad: loading.Load<Settings>
}

export interface DetailsShare {
	user: User
	profile: Profile
	settings: Settings
	authLoad: loading.Load<AuthPayload>
	profileLoad: loading.Load<Profile>
	settingsLoad: loading.Load<Settings>
	saveProfile: (profile: Profile) => Promise<void>
}

export interface PaywallShare {
	authLoad: loading.Load<AuthPayload>
	settingsLoad: loading.Load<Settings>
	premiumClaim: boolean
	premiumExpires: number
	premiumSubscription: {
		card: CardClues
	}
	checkoutPremium(): Promise<void>
	updatePremium(): Promise<void>
	cancelPremium(): Promise<void>
}

export interface QuestionsShare {
	user: User
	profile: Profile
	uiBureau: QuestionsBureauUi
	fetchCachedQuestions(board: string): Question[]
}

export interface CountdownShare {
	authLoad: loading.Load<AuthPayload>
	profileLoad: loading.Load<Profile>
	events: {[key: string]: ScheduleEvent}
	loadEvent: (name: string) => Promise<ScheduleEvent>
	saveEvent: (name: string, event: ScheduleEvent) => Promise<void>
}

export interface LiveshowShare {
	authLoad: loading.Load<AuthPayload>
	makeViewModel(options: {videoName: string}): {
		dispose: () => void
		viewModel: LiveshowViewModel
	}
}
