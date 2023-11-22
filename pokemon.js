let pokemonId = ''
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    pokemonId = urlParams.get('id')

    fetch('../assets/pokedex.json')
    .then(response => response.json())
    .then(data => {
        const pokemonDetails = data.find(pokemon => pokemon.id === parseInt(pokemonId))
        setPokemonDetails(pokemonDetails)
    })
})

function setPokemonDetails(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name.english
    document.getElementById('pokemon-img').src = `assets/images/${pokemonId}.png`
    document.getElementById('pokemon-id').textContent = pokemon.id
    document.getElementById('pokemon-type').textContent = pokemon.type

    const statsList = document.getElementById('pokemon-stats')
    statsList.innerHTML = '' 
    Object.keys(pokemon.base).forEach(stat => {
        let li = document.createElement('li')
        li.innerHTML = `<strong>${stat}:</strong> ${pokemon.base[stat]}`
        statsList.appendChild(li)
    })
    document.getElementById('pokemon-total').textContent = `${pokemon.base.HP + pokemon.base.Attack + pokemon.base.Defense + pokemon.base['Sp. Attack'] + pokemon.base['Sp. Defense'] + pokemon.base.Speed}`
}

setPokemonDetails(pokemonId)