export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
const isSet = (a) => (a !== null && a !== undefined);
export function deepEqual(a, b) {
    for (const [key, aValue] of Object.entries(a)) {
        if (!b.hasOwnProperty(key))
            return false;
        const bValue = b[key];
        switch (typeof aValue) {
            case "object":
                if (!deepEqual(aValue, bValue))
                    return false;
                break;
            case "function":
                if (!isSet(bValue) || aValue.toString() !== bValue.toString())
                    return false;
                break;
            default:
                if (aValue !== bValue)
                    return false;
        }
    }
    return true;
}
//# sourceMappingURL=deep.js.map