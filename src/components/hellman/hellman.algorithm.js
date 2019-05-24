const zip = (...arrays) => {
    const maxLength = Math.max(...arrays.map(x => x.length));
    return Array.from({ length: maxLength }).map((_, i) => {
        return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
    });
};

export const getArrayColumns = arr => {
    return zip(...arr).map(
        e =>
            e.reduce(
                (collector, value) => (value === 1 ? collector + 1 : collector),
                0
            ) > 1
    );
};

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
export const getColor = (i, j, cell, value) => {
    let color = 2;
    if (i !== 0 && j !== 0) {
        color = value ? 1 : 0;
        color = cell === 1 ? 3 : color;
    }
    return color;
};
