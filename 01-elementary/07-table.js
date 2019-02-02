/*
 * Print the multiplication table from 1 to 12
 **/

for (let first = 1; first <= 12; first++) {
    for (let second = 1; second <= 12; second++) {
        let product = first * second;
        console.log(`${first} X ${second} = ${product}`);
    }
    console.log(" ");
}
