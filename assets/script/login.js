function checkIfAnyCargoIsChecked(){
    let list = document.getElementsByName("cargo");
    let counter = 0;

    for(let radioButton of list){
        if(radioButton.checked === false){
            counter++;
        }
    }
    return counter != list.length;
}

function cadastrar() {

    if(checkIfAnyCargoIsChecked()==false){
        Swal.fire({
            title: 'Ops, faltou algo!',
            text: 'Selecione uma opção entre Tutor e Clínica Veterinária!',
            icon: 'question',
            confirmButtonColor: '#DB6364',
            confirmButtonText: 'Voltar'
        })
        return;
    }

    let payload = {
        cargo: document.getElementsByName("cargo")[0].checked == true ? 'Tutor' : 'Clínica Veterinária',
        fullName: document.querySelector("#fullName").value,
        cityState: document.querySelector("#cityState").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("https://64a72358096b3f0fcc811ba5.mockapi.io/api/users", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        Swal.fire({
            title: 'Muito bom!',
            text: "Cadastrado com sucesso!",
            icon: 'sucess',
            confirmButtonColor: '#DB6364',
            confirmButtonText: 'Continuar'
        }).then((result) => {
            if (result.isConfirmed) {

                localStorage.setItem("userName", response.fullName);
                localStorage.setItem("userType", response.cargo == "Tutor" ? "Tutor" : "Clínica Veterinária");
                localStorage.setItem("idClient", response.id);
                window.location.href = "pet-list.html";
            }
        })
    })
}