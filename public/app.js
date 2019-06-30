const socket = io('http://10.185.5.75:3000')
let character = new Character(window.prompt('Please enter your name:'))

socket.emit('join', character.state, function(otherCharacters){
    otherCharacters.forEach( other => {
        let character = new Character(other.name)
        character.state = other.state
        socket.on(character.name, function(state){
            character.state = state
        })
    })
})

socket.on('joined', function(joined){
    let character = new Character(joined.name)
    character.state = joined.state
    socket.on(character.name, function(state){
        character.state = state
    })
})

document.addEventListener('keydown', function(event){
    switch(event.key){
        case 'ArrowDown':
            character.walkSouth()
        break;
        case 'ArrowUp':
            character.walkNorth()
        break;
        case 'ArrowLeft':
            character.walkWest()
        break;
        case 'ArrowRight':
            character.walkEast()
        break;
    }
    socket.emit('update', character.state)
})
    document.addEventListener('keyup', function(event) {
        switch(event.key){
            case 'ArrowDown':
                character.stopSouth()
            break;
            case 'ArrowUp':
                character.stopNorth()
            break;
            case 'ArrowLeft':
                character.stopWest()
            break;
            case 'ArrowRight':
                character.stopEast()
            break;
        }
        socket.emit('update', character.state)
    })