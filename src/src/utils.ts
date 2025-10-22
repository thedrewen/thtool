export function loading() {
    const P = ['\\', '|', '/', '-'];
    let x = 0;
    return setInterval(() => {
        process.stdout.write(`\r${P[x++]}`);
        x %= P.length;
    }, 250);
}