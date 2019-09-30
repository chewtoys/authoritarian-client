export function mixinCss(styles, Class) {
    const css = Array.isArray(styles) ? styles : [styles];
    return class ClassWithCss extends Class {
        static get styles() {
            return [
                ...css,
                super.styles
            ];
        }
    };
}
//# sourceMappingURL=mixin-css.js.map