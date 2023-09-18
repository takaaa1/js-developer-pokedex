const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <ol class="pokemons">
    <div class="card_front">
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>
          <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
      </li>
    </div>
    <div class="card_back ${pokemon.type}">
      <h3>${pokemon.name}</h3>
      <li>${pokemon.stats_name[0]}: ${pokemon.stats_base[0]}</li>
      <li>${pokemon.stats_name[1]}: ${pokemon.stats_base[1]}</li>
      <li>${pokemon.stats_name[2]}: ${pokemon.stats_base[2]}</li>
      <li>${pokemon.stats_name[3]}: ${pokemon.stats_base[3]}</li>
      <li>${pokemon.stats_name[4]}: ${pokemon.stats_base[4]}</li>
      <li>${pokemon.stats_name[5]}: ${pokemon.stats_base[5]}</li>
    </div>
  </ol>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
