
import {autorun} from "mobx"

import {mocks} from "./auth-machinery/mocks"
import {consoleCurry} from "./toolbox/console-curry"
import {installAuthoritarianClient} from "./top-level/install-authoritarian-client"

const info = consoleCurry("main", console.info)
const debug = consoleCurry("main", console.debug)

demo().catch(error => console.error(error))

/**
 * Demonstration of authoritarian-client
 */
async function demo() {

	// install the client machinery and panel ui
	const auth = installAuthoritarianClient({
		element: document.querySelector(".auth-panel"),
		tokenApi: {
			async obtainAccessToken(...args) {
				debug(`obtainAccessToken`)
				return mocks.tokenApi.obtainAccessToken(...args)
			},
			async clearTokens(...args) {
				debug(`clearTokens`)
				return mocks.tokenApi.clearTokens(...args)
			}
		},
		loginApi: {
			async userLoginRoutine(...args) {
				debug(`userLoginRoutine`)
				return mocks.loginApi.userLoginRoutine(...args)
			}
		},
		decodeAccessToken: (...args) => {
			debug(`decodeAccessToken`)
			return mocks.decodeAccessToken(...args)
		}
	})

	// console log for whenever login/logout happens on the store
	autorun(() => auth.panelStore.accessData
		? info(`logged in as "${auth.panelStore.accessData.name}"`)
		: info(`logged out`)
	)

	// perform the initial passive check
	await auth.passiveCheck()

	// demo script is done
	console.log("🤖")
}