const mobius = n => {
    if (n === 1) return 1;
    else if (n === 2) return -1;
    let p = 0;
    if (n % 2 === 0) {
        n /= 2;
        p++;
        if (n % 2 === 0) return 0;
    }
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
            n /= i;
            p++;
            if (n % i === 0) return 0;
        }
    }
    return p % 2 === 0 ? -1 : 1;
};

export const generateMobius = n => {
    const mobiusResult = [];
    for (let i = 1; i <= n; i++) {
        mobiusResult[i] = mobius(i);
    }
    return mobiusResult;
};
