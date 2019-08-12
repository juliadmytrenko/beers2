const endpoint = 'https://api.punkapi.com/v2/beers?';


    $.getJSON(endpoint, function(data) {
        console.log(data);

        function displayTiles(beers) {
            // build html with filted data
            $(".tiles").html("")
            
            let beerHtml = beers.map(beer => {
                // console.log(beer.ingredients);
                let hopsTable = [];
                let malts = [];
                beer.ingredients.hops.forEach(obj => {
                    hopsTable.push(obj.name);
                });
                beer.ingredients.malt.forEach(obj => {
                    malts.push(obj.name);
                }); //it can be written shorter
                const foodPairings = beer.food_pairing.map(dish => {
                    return `<li>${dish}</li>`;
                }).join("");
        
                const uniqHops = [...new Set(hopsTable)];

                let beerAbv = beer.abv;
                if (beer.abv >= 7.5) {
                    beerAbv = `<span class="strong-beer">${beer.abv}</span>`;
                }
                if (beer.abv >= 20) {
                    beerAbv = `<span class="very-strong-beer">${beer.abv}</span>`;
                }
                
                
        
        //         const hop = uniqHops.map(hop => {
        //             return `<li class="hop-name">${hop}</li>
                
        // `
        //         }).join('');
        //         console.log(hop);
                // console.log(uniqHops);
                // console.log(uniqHops);
                return `
                <div class = 'tile'>
                    <div class="flip-card">
                        <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <h2 class="beer-name">${beer.name}</h2>
                                        <div class="beer-img-container">
                                            <img class="beer-img" src = "${beer.image_url}" onerror="this.onerror=null; this.src='not-found.png'">
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
                    `
            });
        
                
                $(".tiles").append(beerHtml);
                // hopsList = document.querySelector('.suggestions');
            }
        
        function displaySearchList(beers) {
            let dishes = [];
            beers.forEach( beer => {
                beer.food_pairing.forEach( dish => {
                    dishes.push(dish);
                });     
            });
            dishes = [...new Set(dishes)];
            // console.log(dishes);
            const regex = new RegExp(document.querySelector('.search').value, 'gi');
            dishes = dishes.filter( dish => {
                return dish.match(regex);
            });
            
            const html = dishes.map( dish => {
                const regex = new RegExp(searchInput.value, 'gi');
                const dishName = dish.replace(regex, `<span class="hl">${searchInput.value}</span>`);
                // console.log(dishName);
                return `
                <li><span class="name">${dishName}</span></li>
`;
            }).join("");
            suggestions.innerHTML = html;
            
        
        }

function showMatchingBeers(e) {
    console.log(e.target);
    

    if(e.target.matches('li')) {
        // console.log(e.target.firstElementChild.textContent);
        e.target.classList.toggle('listItemClicked');
        
    } 
    else if (e.target.matches('.hl')) {
        // console.log(e.target.parentNode.textContent);
        e.target.parentNode.parentNode.classList.toggle('listItemClicked');
       
    } else {
        // console.log(e.target.textContent);
        e.target.parentNode.classList.toggle('listItemClicked');
        
    }

 
        // searchInput.value = 
}
        
        



        function displayMatches() {
            const food = searchInput.value ;
            $.getJSON(endpoint+"food="+food +'&per_page=25' , function(matchingBeers) {
                displayTiles(matchingBeers);
                // !! displaySearchList(matchingBeers);
                // console.log(html);
                // suggestions.innerHTML = html;
                // console.log(match);
                const tiles = document.querySelectorAll('.tile');
                console.log(tiles);
                tiles.forEach(tile => tile.addEventListener('click', () => {tile.classList.toggle('tile-clicked')}));

            });
        }
            const searchInput = document.querySelector('.search');
            const suggestions = document.querySelector('.suggestions');
            
            searchInput.addEventListener('change', displayMatches);
            searchInput.addEventListener('keyup', displayMatches);

            // tiles.forEach(tile => tile.addEventListener('click', () => {this.classList.add('tile-clicked')}));
            // suggestions.addEventListener('click', showMatchingBeers);
    });
    

    