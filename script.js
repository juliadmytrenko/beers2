const endpoint = 'https://api.punkapi.com/v2/beers?';



function displayTiles(beers) {
    // build html with filted data
    $(".tiles").html("")
    let beerHtml = beers.map(beer => {
        return `
        <div class = 'tile'>
            <img class="beer-img" src = "${beer.image_url}">
            <div class="beer-name">${beer.name}</div>
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