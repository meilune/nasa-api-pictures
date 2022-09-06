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

//Populate data to the website
function updateDOM() {
    resultsArray.forEach((result) => {
        //Card Container
        const card = document.createElement("div");
        card.classList.add("card");
        //link to wrap image
        const link = document.createElement("a");
        link.href = result.hdurl;
        link.Title = "View Full Image";
        link.target = "_blank";
        card.appendChild(link)
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




    });
}

//Get 10 images from NASA
async function fetchNasa() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch(err){
        console.log(err);
    }
}

//Call the function
fetchNasa();
