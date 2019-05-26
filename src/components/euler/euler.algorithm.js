const SieveOfEratosthenes = (n, prime, primesquare, a) => {
    for (let i = 2; i <= n; i++) {
        prime[i] = true;
    }
    for (let i = 0; i < n * n + 1; i++) {
        primesquare[i] = false;
    }
    prime[1] = false;
    for (let p = 2; p * p <= n; p++) {
        if (prime[p]) {
            for (let i = p * 2; i <= n; i += p) {
                prime[i] = false;
            }
        }
    }
    let j = 0;
    for (let p = 2; p <= n; p++) {
        if (prime[p]) {
            a[j++] = p;
            primesquare[p * p] = true;
        }
    }
};

const countDivisors = n => {
    if (n === 1) return 1;
    const prime = [n + 1];
    const primesquare = [n * n + 1];
    const a = [n];
    SieveOfEratosthenes(n, prime, primesquare, a);
    let ans = 1;
    for (let i = 0; ; i++) {
        if (a[i] * a[i] * a[i] > n) break;
        let cnt = 1;
        while (n % a[i] === 0) {
            n /= a[i];
            cnt += 1;
        }
        ans *= cnt;
    }
    if (prime[n]) ans *= 2;
    else if (primesquare[n]) ans *= 3;
    else if (n !== 1) ans *= 4;
    return ans;
};

export const euler = n => {
    const array = [];
    for (let i = 1; i <= n; i++) {
        array[i] = countDivisors(i);
    }
    return array;
};
