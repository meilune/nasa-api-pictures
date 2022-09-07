const resultsNav = document.getElementById("results-nav");
const favoritesNav = document.getElementById("favorites-nav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

//NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

//Populate data to the website
function updateDOM() {
    resultsArray.forEach((result) => {
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
        addToFav.textContent = "Add To Favourites";
        addToFav.classList.add("clickable");
        addToFav.setAttribute("onclick", `saveFavorite('${result.url}')`);
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

//Get 10 images from NASA
async function fetchNasa() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        updateDOM();
    } catch(err){
        console.log(err);
    }
}

//Call the function
fetchNasa();

//Saving to favorites
function saveFavorite(itemUrl) {
    console.log(itemUrl);
    resultsArray.forEach((item) => {
        if(    item.url.includes(itemUrl)) {
            favorites[itemUrl] = item;
            console.log(favorites);
        }
    })


}