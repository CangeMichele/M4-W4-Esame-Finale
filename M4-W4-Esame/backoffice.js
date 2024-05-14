//-------------------------_____________------------------------------------------------------------
//------------------------|     API    | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQwYzlhZDE2N2U1MzAwMTVmYTY4NmIiLCJpYXQiOjE3MTU2MDY1MjgsImV4cCI6MTcxNjgxNjEyOH0.ZsycQtGsBFEQnyuswNydanZizmFUbONKwkYCjllT_gY';
const URL_api = 'https://striveschool-api.herokuapp.com/api/product/';

//-------------------------_____________------------------------------------------------------------
//------------------------|  BACKOFFICE | ----------------------------------------------------------
//------------------------ ————————————— -----------------------------------------------------------

//costanti bottoni
const btnById = document.getElementById('btn-by-id');
const btnPost = document.getElementById('btn-post');
const btnAll = document.getElementById('btn-all');



document.addEventListener('DOMContentLoaded', function () {

    //----- POST -----//
    btnPost.addEventListener('click', async function () {
        const formInput = dataForm();
        await articlePOST(formInput);
    })

    //----- tutti gli articoli -----//
    btnAll.addEventListener('click', function () {
        allArticles();
    })




})//addEventListener DOMContentLoaded


//--------------------------------FUNZIONI-------------------------------

// mostra e nascondi spinner di caricamento
function spinner() {
    if (document.getElementById("spinner").style.display === "block") {
        document.getElementById("spinner").style.display = "none";

    } else if (document.getElementById("spinner").style.display === "none")
        document.getElementById("spinner").style.display = "block";
}



//prendo i valori del form e creo un oggetto nel formato richiesto dall'API
function dataForm() {
    const dataForm = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: parseFloat(document.getElementById('price').value),
        id: document.getElementById('id').value,

    }
    return dataForm
};

//funzione GET -------------
async function articleGET() {
    spinner();

    try {
        const response = await fetch(URL_api, {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }

        const dataGet = response.json();
        spinner()
        return dataGet;

    } catch (error) {
        spinner();
        alert('ERRORE: vedi console');
        console.log(error);
    }

}// articleGET

//funzione POST -------------
async function articlePOST(dataForm) {
    spinner();

    if (dataForm['name'] === '' || dataForm['name'] === undefined) {
        spinner();
        return alert('campo articolo mancante');
    }

    if (dataForm['brand'] === '' || dataForm['brand'] === undefined) {
        spinner();
        return alert('campo brand mancante');
    }

    if (dataForm['description'] === '' || dataForm['description'] === undefined) {
        spinner();
        return alert('campo descrizione mancante');
    }

    if (dataForm['imageUrl'] === '' || dataForm['imageUrl'] === undefined) {
        spinner();
        return alert('campo img mancante');
    }

    if (dataForm['price'] === '' || dataForm['price'] === undefined) {
        spinner();
        return alert('campo price mancante');
    }

    delete dataForm['id'];

    console.log(dataForm);

    try {
        const response = await fetch(URL_api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify(dataForm)
        });

        if (!response.ok) {
            throw new Error('Errore durante la richiesta');
        }

        const responseData = await response.json();
        console.log('Dati inviati con successo:', responseData);

    } catch (error) {
        console.error('Si è verificato un errore:', error.message);
    }


    spinner();


}// articlePOST


//visualizza tutti gli articoli
async function allArticles() {
    try {
        const data = await articleGET();
        spinner();

        let container = document.getElementById('result');
        container.innerHTML = "";
        container.innerHTML = "<h2>ARTICOLI: </h2>";

        data.forEach(element => {
            const id = element['_id'];
            const articolo = element.name;
            const brand = element.brand;
            const descrizione = element.description;
            const prezzo = element.price;
            const immagine = element.imageUrl;

            container.innerHTML += ` 
            <div class="card" >
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>articolo =</b>${articolo}</li>
                        <li class="list-group-item"><b>id =</b> ${id} </p></li>
                        <li class="list-group-item">br<b>brand =</b>and = ${brand}</li>
                        <li class="list-group-item"><b>descrizone =</b> = ${descrizione}</li>
                        <li class="list-group-item"><b>prezzo =</b> = ${prezzo}</li>
                        <li class="list-group-item"><b>immagine =</b> = ${immagine} /li>
                        <li>
                        <div>
                        <button type="button" class="btn btn-primary" onClick="articlePUT">modifica</button>
                        <button type="button" class="btn btn-danger " onClick="articlePUT">DELETE</button>
                        </div>

                        </li>
                    </ul>
                </div>
            </div>`
        });

        spinner();

    } catch (error) {
        spinner();
        alert('ERRORE: vedi console');
        console.log(error);
        spinner();

    }

}


//cerca tramite id
async function byId(){
    const idApi = document.getElementById('id').value;


fetch(URL_api+idApi, {
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
        
        let container = document.getElementById('result');
        container.innerHTML = "";
        container.innerHTML = ` 
            <div class="card" >
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>articolo =</b>${articolo}</li>
                        <li class="list-group-item"><b>id =</b> ${id} </p></li>
                        <li class="list-group-item">br<b>brand =</b>and = ${brand}</li>
                        <li class="list-group-item"><b>descrizone =</b> = ${descrizione}</li>
                        <li class="list-group-item"><b>prezzo =</b> = ${prezzo}</li>
                        <li class="list-group-item"><b>immagine =</b> = ${immagine} /li>
                        <li>
                        <div>
                        <button type="button" class="btn btn-primary" onClick="articlePUT">modifica</button>
                        <button type="button" class="btn btn-danger " onClick="articlePUT">DELETE</button>
                        </div>

                        </li>
                    </ul>
                </div>
            </div>`

        
    })

    .catch((error) =>{
        alert('ERRORE: vedi console');
        console.log(error);
    })// 

}








//funzione PUT -------------




function articlePUT(dataForm) {

    if (dataForm['id'] === '' || dataForm['id'] === undefined) {
        return alert('campo id mancante');
    }


    spinner();

    fetch(URL_api + dataForm['id'], {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: newDataForm
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta.');
            }
            response.json()
        })
        .then((articoli) => {
            spinner()
            alert('vedi console')
            console.log(articoli);
        })

        .catch((error) => {
            spinner();
            alert('ERRORE: vedi console');
            console.log(error);
        })
}// articlePUT



//funzione DELETE -------------
function articleDELETE(dataForm) {
    spinner();

    const id = dataForm['id'];

    fetch(URL_api + id, { method: "DELETE" })
        .then((response) => {
            spinner();
            if (!response.ok) {
                throw new Error('Errore nella richiesta.');
            }
            response.json()
        })
        .catch((error) => {
            spinner();
            alert('ERRORE: vedi console');
            console.log(error);
        })

}// articleDELETE





