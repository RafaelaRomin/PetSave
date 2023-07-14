const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const screenType = params.id ? 'edit': 'create';
    
    function checkIfAnySpecieIsChecked(){
        let list = document.getElementsByName("specie");
        let counter = 0;

        for(let radioButton of list){
            if(radioButton.checked === false){
                counter++;
            }
        }
        return counter != list.length;
    }

    function checkIfAnyTypeIsChecked(){
        let list = document.getElementsByName("typePet");
        let counter = 0;

        for(let radioButton of list){
            if(radioButton.checked === false){
                counter++;
            }
        }
        return counter != list.length;
    }
        


        function createOrEdit() {

            if(checkIfAnySpecieIsChecked() == false)
            {
                Swal.fire({
                    title: 'Ops, faltou algo!',
                    text: 'Selecione uma espécie',
                    icon: 'error',
                    confirmButtonColor: '#DB6364',
                    confirmButtonText: 'Voltar'
                })
                return;
            }
            if(checkIfAnyTypeIsChecked() == false)
            {
                Swal.fire({
                    title: 'Ops, faltou algo!',
                    text: 'Selecione se o pet será doador ou receptor!',
                    icon: 'error',
                    confirmButtonColor: '#DB6364',
                    confirmButtonText: 'Voltar'
                })
                return;
            }

            let payload = {
                namePet: document.querySelector("#namePet").value,
                description: document.querySelector("#description").value,
                specie: document.getElementsByName("specie")[0].checked == true ? 'Canino' : 'Felino',
                typePet: document.getElementsByName("typePet")[0].checked == true ? 'Doador' : 'Receptor',
                idClient: localStorage.getItem("idClient")
            }

            fetch(`https://64a72358096b3f0fcc811ba5.mockapi.io/api/pets${screenType === 'edit' ? ('/' + params.id) : ''}`, {
                method: screenType === 'edit' ? 'PUT' : 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                if (screenType === 'edit' ){
                    Swal.fire({
                    title: 'Muito bom!',
                    text: "Alterações salvas com sucesso!",
                    icon: 'sucess',
                    confirmButtonColor: '#DB6364',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed){
                        window.location.href = "pet-list.html";
                    }
                }
                    //alert("Pet editado com sucesso!");
                )} else {
                    Swal.fire({
                    title: 'Muito bom!',
                    text: "Cadastrado com sucesso!",
                    icon: 'sucess',
                    confirmButtonColor: '#DB6364',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed){
                        window.location.href = "pet-list.html";
                    }
                }
                )}
            })
        }

window.onload = function() {
    setScreenTypeTexts();
    fillInputs();
}  //ESPERA O CÓD SER CARREGADO PARA EXECUTAR AS FUNÇÕES

function fillInputs() {
    if (screenType === 'edit'){
        fetch(`https://64a72358096b3f0fcc811ba5.mockapi.io/api/pets/${params.id}`)
        .then(response => response.json())
        .then(pet =>{
            document.querySelector('#namePet').value = pet.namePet;
            document.querySelector('#description').value = pet.description;
        })
    }
}

function setScreenTypeTexts() {
        //modo CREATE
if (screenType == 'create') {
    document.querySelector('#main-title').innerText = "Cadastre um novo pet!";
    document.querySelector('#action-button').innerText = "Cadastrar";
    }

    //modo EDIT
    if (screenType == 'edit') {
        document.querySelector('#main-title').innerText = "Editar pet";
        document.querySelector('#action-button').innerText = "Salvar alterações";
    }
}   

