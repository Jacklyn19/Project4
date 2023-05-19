document.querySelector("#search-form").onsubmit = function (event) {
    event.preventDefault();

    // Get the user's input
    let searchInput = document.querySelector("#search-id").value.trim();

    let endpoint = `https://api.themoviedb.org/3/search/movie?api_key=ca6dcfc150954f623e62fd2b0b8736a3&language=en-US&query=${encodeURI(searchInput)}&page=1&include_adult=false`;

    // Make a HTTP request via AJAX to Movies
    let httpRequest = new XMLHttpRequest();

    // .open() - Create a new request
    // 1st arg: the method
    // 2nd arg: the endpoint URL
    httpRequest.open("GET", endpoint);
    httpRequest.send();

    // Eventually Movies will send us back a response. When it does, it will trigger the function below
    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status = 200) {
                // status 200 means success ! we have a successful and full response back from Movies
                console.timeLog(httpRequest.responseText);
                displayResults(httpRequest.responseText)
            }
            else {
                alert("AJAX ERROR");
            }
        }
    }
}

function displayResults(resultsString) {
    // This function will display the results

    // Convert the JSON string into JS objects
    let resultsJS = JSON.parse(resultsString);

    // Display the result count
    if (resultsJS.results.length < 20) {
        document.querySelector("#num-results").innerHTML = resultsJS.results.length;
    }
    else {
        document.querySelector("#num-results").innerHTML = 20;
    }
    document.querySelector("#total-results").innerHTML = resultsJS.total_results;

    document.querySelector(".movieContent").innerHTML = "";

    if(resultsJS.results.length == 0){
        document.querySelector(".movieContent").innerHTML += "No movies found";
    }

    for (let i = 0; i < resultsJS.results.length; i++) {
        let movieDescription = resultsJS.results[i].overview;
        console.log(movieDescription.length);
        if (movieDescription.length > 200)
            movieDescription = movieDescription.substring(0, 200);
        movieDescription += "...";


        let movieImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";

        if (resultsJS.results[i].poster_path != null) {
            movieImage = "https://image.tmdb.org/t/p/w500" + resultsJS.results[i].poster_path;
        }

        console.log(movieImage);

        let htmlString = `
        <div class="thumbnail col-md-4 col-lg-3 col-6">
            <div class="justify-content-center">
                <img class="movieImg" src=${movieImage}>
            </div>
            <div class="movieText">
                ${resultsJS.results[i].original_title}
                ${resultsJS.results[i].release_date}
            </div>
            <div class="overlay">
            <p> Rating: ${resultsJS.results[i].vote_average} </p>
            <p> ${movieDescription} </p>
            </div>
        </div>`
        document.querySelector(".movieContent").innerHTML += htmlString;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // This function will display the current movies playing
    let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=ca6dcfc150954f623e62fd2b0b8736a3&language=en-US&page=1";

    // Make a HTTP request via AJAX to Movies
    let httpRequest = new XMLHttpRequest();

    // .open() - Create a new request
    // 1st arg: the method
    // 2nd arg: the endpoint URL
    httpRequest.open("GET", endpoint);
    httpRequest.send();

    // Eventually Movies will send us back a response. When it does, it will trigger the function below
    httpRequest.onreadystatechange = function () {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status = 200) {
                // status 200 means success ! we have a successful and full response back from Movies
                //console.timeLog(httpRequest.responseText);

                displayResults(httpRequest.responseText);
            }
            else {
                alert("AJAX ERROR");
            }
        }
    }
}, false);