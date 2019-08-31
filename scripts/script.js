const endpoint = 'https://api.punkapi.com/v2/beers?';


function displayTiles(beers) {
    $(".tiles").html("");
    let beerHtml = beers.map(beer => {
        const hops = beer.ingredients.hops.map(obj => obj.name);
        const uniqHops = [...new Set(hops)];
        const malts = beer.ingredients.malt.map(obj => obj.name);

        const foodPairings = beer.food_pairing.map(dish => {
            return `<li>${dish}</li>`;
        }).join("");
        
        let beerAbv = beer.abv;
        if (beer.abv >= 20) {
            beerAbv = `<span class="very-strong-beer">${beer.abv}</span>`;
        }
        if (beer.abv >= 7.5) {
            beerAbv = `<span class="strong-beer">${beer.abv}</span>`;
        }

        return `
            <div class = 'tile'>
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front data-simplebar">
                            <h2 class="beer-name">${beer.name}</h2>
                            <div class="beer-img-container">
                                <img class="beer-img" src = "${beer.image_url}" onerror="this.onerror=null; this.src='images/not-found.png'">
                            </div>
                            <div class="percent"><p>abv: </p><p>${beerAbv}<i class="fa fa-percent"></i></p></div>
                        
                            <p>${beer.ingredients.yeast}</p>
                            <p class ="beer__tagline">${beer.tagline}</p>
                        </div>
                        
                        <div class="flip-card-back" data-simplebar>
                            <h2>Ingredients</h2>
                            <h3>Hops: </h3><p>${uniqHops.join(", ")}</p>
                            </br>
                            <h3>Malts: </h3><p>${malts.join(", ")}</p>
                            </br>

                            <div class="food-pairing"><h2>Food Pairing: </h2>
                                <ul>
                                    ${foodPairings}                                      
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                    
         `;
    });
    
    $(".tiles").append(beerHtml);
}
    
function displayMatches() {
    const food = searchInput.value;
    $.getJSON(endpoint + "food=" + food + '&per_page=24' + '&page=1', function(matchingBeers) {
        displayTiles(matchingBeers);
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => tile.addEventListener('click', () => { tile.classList.toggle('tile-clicked') }));  
    });
}


const searchInput = document.querySelector('.search');

searchInput.addEventListener('input', displayMatches);