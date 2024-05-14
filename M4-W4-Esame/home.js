//-------------------------_____________------------------------------------------------------------
//------------------------|     API     | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQwYzlhZDE2N2U1MzAwMTVmYTY4NmIiLCJpYXQiOjE3MTU2MDY1MjgsImV4cCI6MTcxNjgxNjEyOH0.ZsycQtGsBFEQnyuswNydanZizmFUbONKwkYCjllT_gY';
const URL_api = 'https://striveschool-api.herokuapp.com/api/product/';

//-------------------------_____________------------------------------------------------------------
//------------------------|     HOME    | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

    fetch(URL_api, {
        headers: {
            "Authorization": `Bearer ${apiKey}`,
        },
    })

    .then((response) => response.json())

    .then((articles) => {

        cardsCreate(articles); //creo le cards

    }) 
    
    .catch((error) =>{
        alert('ERRORE: vedi console');
        console.log(error);
    })// 



//--------------------------------FUNZIONI-------------------------------


//funzione CREA CARD -------------

function cardsCreate(articles) {
    const cardRow = document.getElementById('card-row');
    cardRow.innerHTML = '';

    articles.forEach(element => {
        const id = element['_id'];
        const articolo = element.name;
        const brand = element.brand;
        const descrizone = element.description;
        const prezzo = element.price;
        const immagine = element.imageUrl;

        const col = document.createElement('div');
        col.className = 'col';

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', id);

        const img = document.createElement('img');
        img.className = 'card-img-top mx-auto';
        img.setAttribute('src', immagine);
        img.setAttribute('alt', `${articolo}`);

        const cardBody =  document.createElement('div');
        cardBody.className = 'card-body';

        const h5 = document.createElement('h5');
        h5.className = 'card-title';
        h5.textContent = articolo;

        const pPrice = document.createElement('p');
        pPrice.className = 'price';
        pPrice.innerText = `$${prezzo}`;

        const pBrand = document.createElement('p');;
        pBrand.textContent = brand;

        const buttonDetails = document.createElement('button');
        buttonDetails.className = 'btn btn-secondary btn-sm';
        buttonDetails.setAttribute('type', 'button');
        buttonDetails.textContent = 'dettagli';

        //al click sul bottone vado nella pagina dettagli e mi porto dietro l'id 
        buttonDetails.onclick = ()=> 
            (window.location = `details.html?id=${id}`);

        
        
        //popolo la card con gli elementi creati
        cardBody.appendChild(h5);
        cardBody.appendChild(pPrice);
        cardBody.appendChild(pBrand);
     
        cardBody.appendChild(buttonDetails);
        
        
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);

        cardRow.appendChild(col);


    })
}
