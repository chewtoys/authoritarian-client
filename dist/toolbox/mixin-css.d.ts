import { CSSResult, LitElement } from "lit-element";
export declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare function mixinCss(styles: CSSResult | CSSResult[], Class: typeof LitElement): typeof LitElement;
