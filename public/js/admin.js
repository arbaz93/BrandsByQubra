

async function retrieveJson() {
    const request = await fetch('./data/product-data.json')
    const data = await request.json();

    console.log(data)
    return data
}

retrieveJson();