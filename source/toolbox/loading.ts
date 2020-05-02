
export enum LoadState {
	None,
	Loading,
	Error,
	Ready,
}

export interface LoadBase {
	state: LoadState
}

export interface LoadNone {
	state: LoadState.None
}

export interface LoadLoading extends LoadBase {
	state: LoadState.Loading
}

export interface LoadError extends LoadBase {
	state: LoadState.Error
	reason: string
}

export interface LoadReady<P> extends LoadBase {
	state: LoadState.Ready
	payload: P
}

export type Load<Payload> = LoadNone
	| LoadLoading
	| LoadError
	| LoadReady<Payload>

export function load<Payload>(): Load<Payload> {
	return {state: LoadState.None}
}

export function select<Payload, R>(
		load: Load<Payload>,
		{none, loading, error, ready}: {
			none: () => R
			loading: () => R
			error: (reason: string) => R
			ready: (payload: Payload) => R
		}
	) {
	switch (load.state) {
		case LoadState.None: return none()
		case LoadState.Loading: return loading()
		case LoadState.Error: return error(load.reason)
		case LoadState.Ready: return ready(load.payload)
	}
}

export function none(): LoadNone {
	return {state: LoadState.None}
}

export function loading(): LoadLoading {
	return {state: LoadState.Loading}
}

export function error(reason: string): LoadError {
	return {state: LoadState.Error, reason}
}

export function ready<Payload>(payload: Payload): LoadReady<Payload> {
	return {state: LoadState.Ready, payload}
}

export function payload<Payload>(load: Load<Payload>) {
	return (load.state == LoadState.Ready)
		? load.payload
		: null
}
