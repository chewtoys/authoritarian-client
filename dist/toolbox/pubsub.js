export function pubsub() {
    let listeners = [];
    return {
        publish: (async (...args) => {
            const operations = listeners.map(listener => listener(...args));
            await Promise.all(operations);
        }),
        subscribe(func) {
            listeners.push(func);
            return () => {
                listeners = listeners.filter(listener => listener !== func);
            };
        }
    };
}
export function pubsubs(obj) {
    const publishers = {};
    const subscribers = {};
    for (const [key, original] of Object.entries(obj)) {
        publishers[key] = original.publish;
        subscribers[key] = original.subscribe;
    }
    return { publishers, subscribers };
}
//# sourceMappingURL=pubsub.js.map