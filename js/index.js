// DOM Elements
const monstCont = document.querySelector('#monster-container')
const formDiv = document.querySelector('#create-monster')
const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

// Event Listeners
window.addEventListener('load', getMonsters)

window.addEventListener('load', renderForm)

formDiv.addEventListener('submit', function(e){
    e.preventDefault()

    const name = e.target.name.value
    const age = e.target.age.value
    const description = e.target.description.value
    const newMonster = {name, age, description}

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(newMonsterData => renderOneMon(newMonsterData))

    e.target.reset()
})


document.addEventListener('click', function(e) {
    if (e.target === backBtn){
        console.log("Previous monsters pls")

    }
    else if (e.target === forwardBtn){
        console.log('More Monsters pls')
        getMonsters()
    }
})

// Logic Handlers
function getMonsters(){
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(response => response.json())
    .then(monstersData => renderMonsters(monstersData))
}

function renderMonsters(monsters){
    monsters.forEach(monster => renderOneMon(monster))
}

function renderOneMon(monster) {
    const monstDiv = document.createElement('div')
    monstDiv.className = 'monster-info'
    monstDiv.innerHTML = `
    <b>Name</b>: ${monster.name} <br /> 
    <b>Age</b>: ${monster.age} <br /> 
    <b>Description</b>: ${monster.description} <hr />
    `
    monstCont.append(monstDiv)
}

function renderForm(){
    console.log('A form')
    const newMonsterForm = document.createElement('div')
    newMonsterForm.Id = 'add-monster'
    newMonsterForm.innerHTML = `
    <form>
        <label for='name'>Monster Name:</label><br>
        <input type='text' id="monster-name" name="name"><br>
        <label for='age'>Monster Age:</label><br>
        <input type='number' id="monster-age" name="age"><br>
        <label for='description'>Monster Description:</label><br>
        <input type='text' id="monster-description" name="description"><br>
        <input type='submit' value="Create a Monster"><hr />
    </form>
    `
    formDiv.append(newMonsterForm)
}

