const resultsNav = document.getElementById("results-nav");
const favoritesNav = document.getElementById("favorites-nav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

//NASA API
const count = 11;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

//Show content
function showContent(page) {
    window.scrollTo({ top: 0, behavior: 'instant'});
    if(page === 'results') {
        resultsNav.classList.remove("hidden");
        favoritesNav.classList.add("hidden");
    } else {
        resultsNav.classList.add("hidden");
        favoritesNav.classList.remove("hidden");
    }
    loader.classList.add("hidden");
}

//Create DOM Nodes
function createDOMNodes(page) {
    const pageRes = page === 'results' ? resultsArray : Object.values(favorites);
    console.log("current Array;", page, pageRes);

    pageRes.forEach((result) => {
        //Card Container
        const card = document.createElement("div");
        card.classList.add("card");

        //link to wrap image
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.title = "View Full Image";
        link.target = "_blank";
        card.appendChild(link);

        //Image
        const image = document.createElement("img");
        image.src = result.url;
        image.alt = "NASA Picture of the Day";
        image.loading = "lazy";
        image.classList.add("card-img-top");
        link.appendChild(image);

        //Card Body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody);

        //Card Title
        const cardTitle = document.createElement("h2");
        cardTitle.textContent = result.title;
        cardTitle.classList.add("card-title");
        cardBody.appendChild(cardTitle);

        //Add to favourites link
        const addToFav = document.createElement("p");
        addToFav.classList.add("clickable");
        if(page === "results" ) {
            addToFav.textContent = "Add To Favourites";
            addToFav.setAttribute("onclick", `saveFavorite('${result.url}')`);
        } else {
            addToFav.textContent = "Remove From Favourites";
            addToFav.setAttribute("onclick", `deleteFavorite('${result.url}')`);
        }

        cardBody.appendChild(addToFav);

        //Add Description of the image
        const description = document.createElement("p");
        description.textContent = result.explanation;
        cardBody.appendChild(description);

        //Add Date and copyright
        const infoCont = document.createElement("small");
        infoCont.classList.add("text-muted");
        cardBody.appendChild(infoCont);
        const date = document.createElement("strong");
        date.textContent = result.date;
        infoCont.appendChild(date);
        const copyright = document.createElement("span");
        if(result.copyright) {
            copyright.textContent =` Copyright by ${result.copyright}`;
            infoCont.appendChild(copyright);
        }
        imagesContainer.appendChild(card);
    });
}

//Populate data to the website
function updateDOM(page) {
    //Get favourites from local storage
    if(localStorage.getItem("favoriteUrl")) {
        favorites = JSON.parse(localStorage.getItem("favoriteUrl"));
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
    showContent(page);
}

//Get 10 images from NASA
async function fetchNasa() {
    //Show the loader
    loader.classList.remove("hidden");
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        updateDOM("results");
    } catch(err){
        console.log("Something went wrong:", err);
    }
}

//Call the function
fetchNasa();

//Saving to favorites
function saveFavorite(itemUrl) {
    resultsArray.forEach((item) => {
        if(item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item;
            //Show Confirmation
            saveConfirmed.classList.remove("hidden");
            setTimeout(() => saveConfirmed.classList.add("hidden"), 3000);

            //Save item to local Storage
            localStorage.setItem('favoriteUrl', JSON.stringify(favorites));
        }
    })
}

//Removing favorites from the Local Storage
function deleteFavorite(itemUrl) {
    if(favorites[itemUrl]) {
        delete favorites[itemUrl];
        localStorage.setItem('favoriteUrl', JSON.stringify(favorites));
        updateDOM("favorites");
    }
}

