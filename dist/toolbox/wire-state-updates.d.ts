import { Reader } from "../system/interfaces.js";
export declare function wireStateUpdates<S extends {} = {}, C extends HTMLElement = HTMLElement>({ reader, components, updateComponent, }: {
    components: C[];
    reader: Reader<S>;
    updateComponent: (component: C, state: S) => void;
}): void;
