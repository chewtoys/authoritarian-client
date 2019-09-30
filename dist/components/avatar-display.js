var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, property, html, css, svg } from "lit-element";
const defaultPicture = html `${svg `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M12 14.002a.998.998 0 0 1-.998.998H1.001A1 1 0 0 1 0 13.999V13c0-2.633 4-4 4-4s.229-.409 0-1c-.841-.62-.944-1.59-1-4 .173-2.413 1.867-3 3-3s2.827.586 3 3c-.056 2.41-.159 3.38-1 4-.229.59 0 1 0 1s4 1.367 4 4v1.002z"/></svg>`}`;
export class AvatarDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this.defaultPicture = defaultPicture;
    }
    static get styles() {
        return css `
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		:host {
			display: block;
			width: var(--avatar-display-size, 3em);
			height: var(--avatar-display-size, 3em);
			max-width: 100%;
		}
		:host([hidden]) {
			display: none;
		}
		svg, img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		img[data-premium] {
			border: 2px solid yellow;
		}
	`;
    }
    render() {
        const { url, premium } = this.avatarState || { url: null, premium: false };
        return url
            ? html `<img src=${url} ?data-premium=${premium} alt=""/>`
            : this.defaultPicture;
    }
}
__decorate([
    property({ type: Object })
], AvatarDisplay.prototype, "avatarState", void 0);
__decorate([
    property({ type: Object })
], AvatarDisplay.prototype, "defaultPicture", void 0);
//# sourceMappingURL=avatar-display.js.map