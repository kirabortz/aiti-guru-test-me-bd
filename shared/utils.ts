export function isArraysEqualUnordered(arr1: number[], arr2: number[]): boolean {
    const freqMap = new Map<number, number>();
    
    for (const num of arr1) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    for (const num of arr2) {
        const count = freqMap.get(num);
        if (!count) return false;
        freqMap.set(num, count - 1);
    }
    
    return true;
}