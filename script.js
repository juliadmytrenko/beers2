const endpoint = 'https://api.punkapi.com/v2/beers?';



function displayTiles(beers) {
    // build html with filted data
    $(".tiles").html("")
    let beerHtml = beers.map(beer => {
        console.log(beer.ingredients);
        return `
        <div class = 'tile'>
            <div class="flip-card">
                <div class="flip-card-inner">
                            <div class="flip-card-front">
                                <h3 class="beer-name">${beer.name}</h3>
                                <div class="beer-img-container">
                                    <img class="beer-img" src = "${beer.image_url}">
                                </div>
                            
                                <p>${beer.ingredients.yeast}</p>
                                <p class ="beer__tagline">${beer.tagline}</p>
                            </div>
                            
                            <div class="flip-card-back">
                                <h1>Ingredients:</h1>
                                
                                <p>ciunwiuvn8ewunf9u</p>
                            </div>
                </div>
            </div>
       </div>
            `
    });
    
        $(".tiles").append(beerHtml);
    }




$.getJSON(endpoint, function(data) {
    console.log(data);

    function displayMatches() {
        const food = searchInput.value ;
        $.getJSON(endpoint+"food="+food, function(matchingBeers) {
            displayTiles(matchingBeers);
        });
    }

    const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
});