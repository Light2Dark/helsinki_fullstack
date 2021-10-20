let animals = [
    {name: "Flyyf", species: "dog"},
    {name: "Sfue", species: "cat"},
    {name: "Fish", species: "fish"},
    {name: "Milo", species: "dog"}
] 

let isAnimal = function(animal) {
    return animal.species === animal
}

let dogs = animals.filter((animal) => animal.species === "dog")
let cats = animals.filter(isAnimal)
//let otherAnimals = animals.reject(isAnimal)

// there's also find

let animalNames = animals.map(animal => animal.name)

var orders = [
    {amount: 50},
    {amount: 20},
    {amount: 30}
]

let sum = orders.reduce(function(sum, order) {
    return sum += order
}, 0) // the second argument of 0 is the starting point
// each return will pass the sum value to the next iteration