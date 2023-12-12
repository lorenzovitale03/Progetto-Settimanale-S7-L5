const Url = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MmJiOWMwNTgzNTAwMTg1MjJkODciLCJpYXQiOjE3MDIzNzQzMjksImV4cCI6MTcwMzU4MzkyOX0.DjD5ILx8_np-WY65s86ZkHBCl5ttpWK63OFVEpzqr-g";

function getProdotti() {
  fetch(Url, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      showCard(data);
      console.log(data);
    });
}

function postProdotti(name,description,brand,imageUrl,price) {
  fetch(Url, {
    method: 'POST',
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      name: name,
      description: description,
      brand: brand,
      imageUrl: imageUrl,
      price: price
    })
    
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

getProdotti();

function deleteCard(productId){
  fetch(Url + productId, {
    method: 'DELETE',
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },  
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    location.reload();
    });
}

function getDetails(productId){
  fetch(Url + productId, {
    method: 'GET',
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },  
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

function showCard(prodotti) {
  prodotti.forEach((element) => {
    let card = document.createElement("div");
    console.log(element._id);
    card.innerHTML = ` <div class="card" style="width: 18rem;">
        <img src="${element.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.description}</p>
          <p class="bg-black w-25 text-white text-center">${element.price} €</p>
          <a onclick="deleteCard('${element._id}');" class="btn btn-primary">Delete</a>
          <button onclick="showMore()">Scopri di piu'</button>
          
        </div>
      </div>`;
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.appendChild(card);
  });
}

function onSubmitPost(){
  let name = document.getElementById("name").value;
  let description = document.getElementById("desc").value;
  let brand = document.getElementById("brand").value;
  let imageUrl = document.getElementById("image").value;
  let price = document.getElementById("price").value;

  postProdotti(name,description,brand,imageUrl,price);

}

function showMore(){
  window.location.href="dettaglio.html";
}