// fetch anrop till server
async function getData() {
    try {
        const response = await fetch('https://studenter.miun.se/~mallar/dt211g/cats/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function readData() {
    const data = await getData();
    console.log(data);
    const dogs = data.filter(pet => pet.type === 'dog');
    const cats = data.filter(pet => pet.type === 'cat');
    console.table(dogs);
    console.table(cats);
}

readData();