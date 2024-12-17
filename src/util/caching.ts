export function cacheResponse<T>(cache: Map<string, T>, fn: (...args: any[]) => T) {

    return function (...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}