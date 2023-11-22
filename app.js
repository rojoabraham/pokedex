let listContainer = document.querySelector('.pokemon-list')
let selectTypes = document.querySelector('#type-filter')
let orderPokemon = document.querySelector('#order-by')
let activeData = ''


document.addEventListener('DOMContentLoaded', function() {
    fetch('/assets/pokedex.json')
        .then(response => response.json())
        .then(data => {
            activeData = data
            popularListaPokemon(data)
        })

    fetch('/assets/types.json')
        .then(response => response.json())
        .then(data => {
            popularTypes(data)
        })
})

function popularListaPokemon(pokemonObj) {
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    pokemonObj.forEach(pokemon => {
        let pokemonNumber = pokemon.id.toString().padStart(3,'0')
        let pokemonType = ''
        pokemon.type.forEach((element) => pokemonType = pokemonType + element + "/" )
        pokemonType = pokemonType.slice(0, -1)
        const col = document.createElement('div')
        col.className = 'col-lg-2 col-md-3 col-sm-6 col-8 pokemon-cell'
        col.innerHTML = `
            <div class="pokemon-info">
                <img src="/assets/images/${pokemonNumber}.png" alt="${pokemon.name.english}" class="pokemon-img">
                <h5>${pokemon.name.english}</h5>
                <p><strong>Type:</strong> ${pokemonType}</p>
                <p><strong>Total Stats</strong>: ${pokemon.base.HP + pokemon.base.Attack + pokemon.base.Defense + pokemon.base['Sp. Attack'] + pokemon.base['Sp. Defense'] + pokemon.base.Speed}</p>
            </div>
        `;
        listContainer.appendChild(col)

        col.addEventListener('click', function() {
            window.location.href= `/pokemon.html?id=${pokemonNumber}`
        })
    });
}

function popularTypes(pokemonType) {
    selectTypes.options[0] = new Option('Any')
    pokemonType.forEach(type => {
        selectTypes.options[selectTypes.options.length] = new Option(type.english,type.english)
})
}

selectTypes.addEventListener('change', function(e) {
    let type = e.target.value
    fetch('/assets/pokedex.json')
    .then(response => response.json())
    .then(data => {
        if(type === 'Any'){
            popularListaPokemon(data)
            activeData = data
        } else{
            const pokemonType = data.filter(pokemon => pokemon.type[0] === type || pokemon.type[1] === type)
            popularListaPokemon(pokemonType)
            activeData = pokemonType
        }

    })
})

orderPokemon.addEventListener('change', function(e){
    let selectedStat = e.target.value
    // fetch('../assets/pokedex.json')
    // .then(response => response.json())
    // .then(data => {
    //     data.sort((a, b) => b.base[selectedStat] - a.base[selectedStat]);
    //     popularListaPokemon(data);
    // })
    if(selectedStat === 'id'){
        activeData.sort((a, b) => a.id - b.id)
    }else if(selectedStat === 'Total'){
        activeData.sort(function (a, b) {
            let aTotalStats = a.base.HP + a.base.Attack + a.base.Defense + a.base['Sp. Attack'] + a.base['Sp. Defense'] + a.base.Speed
            let bTotalStats = b.base.HP + b.base.Attack + b.base.Defense + b.base['Sp. Attack'] + b.base['Sp. Defense'] + b.base.Speed    
            return bTotalStats - aTotalStats})
    }else {
        activeData.sort((a, b) => b.base[selectedStat] - a.base[selectedStat])
    }
    popularListaPokemon(activeData)

})


