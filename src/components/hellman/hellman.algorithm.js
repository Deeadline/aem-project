export const diffieHellman = (p, g) => {
    const array = new Array(g);
    for (let i = 0; i <= g; i++) {
        array[i] = new Array(g);
    }
    array[0][0] = 'k/g';
    for (let i = 1; i <= g; i++) {
        array[0][i] = i;
    }
    for (let i = 0; i <= g; i++) {
        for (let j = 1; j <= g; j++) {
            array[j][i] = 0;
        }
    }
    for (let i = 1; i <= g; i++) {
        array[i][0] = i;
        for (let j = 1; j <= g; j++) {
            const power = Math.pow(j, i) % p;
            array[i][j] = power;
        }
    }
    return array;
};
