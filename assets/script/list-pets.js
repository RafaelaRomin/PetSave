let list = [];

window.onload = function(){
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#cargo").innerText = localStorage.getItem("userType");

    getProjects() 
}

function getProjects() {
    fetch("https://64a72358096b3f0fcc811ba5.mockapi.io/api/pets")
    .then(response => response.json())
    .then(response => {
        list = response;
        buildTable();
    })
}

function goToEdit(id) {
    window.location.href=`create-edit-pet.html?id=${id}`;
}

function deletePet(id) {
    fetch(`https://64a72358096b3f0fcc811ba5.mockapi.io/api/pets/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        list = list.filter(pet => pet.id != id);

        buildTable();
    })
}

function buildTable() {

    document.querySelector("#table-body").innerHTML='';
    const idClient = localStorage.getItem('idClient');

    list = list.filter(el => el.idClient == idClient);

    list.forEach(el => {
        let template = `
        <div class="row">
            <div class="pet-description">
                <h6 class="pet">${el.namePet}</h6>
                <p class="description">${el.description}</p>
            </div>
            <div class="specie">${el.specie}</div>
            <div class="actions">
                <span class="edit material-symbols-outlined" onclick="goToEdit(${el.id})">edit</span> 
                <span class="delete material-symbols-outlined" onclick="deletePet(${el.id})">delete</span>
            </div>
        </div>
    `

    document.querySelector("#table-body").insertAdjacentHTML("beforeend", template)
    });
}