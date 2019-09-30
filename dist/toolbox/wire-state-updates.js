export function wireStateUpdates({ reader, components, updateComponent, }) {
    reader.subscribe(state => {
        for (const component of components)
            updateComponent(component, state);
    });
}
//# sourceMappingURL=wire-state-updates.js.map