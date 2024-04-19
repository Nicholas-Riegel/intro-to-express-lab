import express from 'express';
const app = express()

// 1. Be Polite, Greet the User
app.get('/greetings/:name', (req, res)=>{
    res.send(`<h1>Hello there, ${req.params.name}! How are you today?</h1>`)
})

// 2. Rolling the Dice
app.get('/roll/:number', (req, res)=>{

    const input = parseInt(req.params.number)

    if (input && typeof input === 'number'){

        const answer = Math.floor(Math.random() * (input -1)) + 1

        res.send(`<p>You rolled a ${answer}!</p>`)

    } else {

        res.send(`<p>You must specify a number.</p>`)

    }
})

// 3. I Want THAT One!
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res)=>{
    
    const i = req.params.index;

    if (collectibles[i]){
        res.send(`So, you want the ${collectibles[i].name}? For ${collectibles[i].price}, it can be yours!`)
    } else {
        res.send("This item is not yet in stock. Check back soon!")
    }
})

// 4. Filter Shoes by Query Parameters
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res)=>{
    
    const type = req.query.type;
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const list = []
    let string = ''

if (type && minPrice && maxPrice){
    shoes.forEach(x => {
        if (x.type === type && x.price >= minPrice && x.price <= maxPrice){
            list.push(x.name)
        }
    })
} else if (type && minPrice){
    shoes.forEach(x => {
        if (x.type === type && x.price >= minPrice){
            list.push(x.name)
        }
    })
} else if (type && maxPrice){
    shoes.forEach(x => {
        if (x.type === type && x.price < maxPrice)
        list.push(x.name)
})
} else if (minPrice && maxPrice){
    shoes.forEach(x => {
        if (x.price >= minPrice && x.price <= maxPrice){
            list.push(x.name)
        }
    })
} else if (type){
    shoes.forEach(x => {
        if (x.type === type){
            list.push(x.name)
        }
    })
} else if (minPrice){
    shoes.forEach(x => {
        if (x.price > minPrice){
            list.push(x.name)
        }
    })
} else if (maxPrice){
    shoes.forEach(x => {
        if (x.price < maxPrice){
            list.push(x.name)
        }
    })
} else {
    shoes.forEach(x => (
        list.push(x.name)
    ))
}

    list.forEach(x => {
        string += `<li>${x}</li>`
    })
    
    res.send(`<ul>${string}</ul>`)
})

app.listen(3000, ()=>{
    console.log(`App listening on port ${3000}`);
})