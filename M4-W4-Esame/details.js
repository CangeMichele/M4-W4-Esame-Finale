//-------------------------_____________------------------------------------------------------------
//------------------------|     API     | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQwYzlhZDE2N2U1MzAwMTVmYTY4NmIiLCJpYXQiOjE3MTU2MDY1MjgsImV4cCI6MTcxNjgxNjEyOH0.ZsycQtGsBFEQnyuswNydanZizmFUbONKwkYCjllT_gY';
const URL_api = 'https://striveschool-api.herokuapp.com/api/product/';

//-------------------------_____________------------------------------------------------------------
//------------------------|   DETAILS   | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

const params = new URLSearchParams(window.location.search);
const idRequest = params.get('id');

const detailURL = URL_api+idRequest;

fetch(detailURL, {
    headers: {
        "Authorization": `Bearer ${apiKey}`,
    },
})
    .then((response) => response.json())
    .then((article) =>{

        const articolo = article.name;
        const brand = article.brand;
        const descrizione = article.description;
        const prezzo = article.price;
        const immagine = article.imageUrl;

        const cardTitle = document.getElementById('articolo');
        cardTitle.textContent = articolo;

        const pBrand = document.getElementById('brand');
        pBrand.textContent = brand;

        const pDescrizone = document.getElementById('descrizione');
        pDescrizone.textContent = descrizione;

        const pPrezzo = document.getElementById('prezzo');
        pPrezzo.textContent = '$'+ prezzo;

        const cardImg = document.getElementById('card-img');
        cardImg.setAttribute('src', immagine);
        cardImg.setAttribute('alt', articolo);

    })

    .catch((error) =>{
        alert('ERRORE: vedi console');
        console.log(error);
    })// 