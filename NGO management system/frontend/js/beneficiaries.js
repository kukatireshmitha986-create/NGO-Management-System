let beneficiaries = JSON.parse(localStorage.getItem("beneficiaries")) || [];

let editIndex = -1;

displayBeneficiaries();

document.getElementById("beneficiaryForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("beneficiaryName").value;
    let age = document.getElementById("age").value;
    let support = document.getElementById("supportType").value;

    let beneficiary = {
        name,
        age,
        support
    };

    if(editIndex === -1){

        beneficiaries.push(beneficiary);

    }else{

        beneficiaries[editIndex] = beneficiary;
        editIndex = -1;

        document.querySelector("#beneficiaryForm button").innerText = "Add Beneficiary";

    }

    localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));

    document.getElementById("beneficiaryForm").reset();

    displayBeneficiaries();

});

function displayBeneficiaries(){

    let tbody = document.querySelector("#beneficiaryTable tbody");

    tbody.innerHTML = "";

    beneficiaries.forEach((beneficiary,index)=>{

        tbody.innerHTML += `
        <tr>
            <td>${beneficiary.name}</td>
            <td>${beneficiary.age}</td>
            <td>${beneficiary.support}</td>
            <td>
                <button onclick="editBeneficiary(${index})">Edit</button>
                <button onclick="deleteBeneficiary(${index})">Delete</button>
            </td>
        </tr>
        `;

    });

}

function editBeneficiary(index){

    document.getElementById("beneficiaryName").value = beneficiaries[index].name;
    document.getElementById("age").value = beneficiaries[index].age;
    document.getElementById("supportType").value = beneficiaries[index].support;

    editIndex = index;

    document.querySelector("#beneficiaryForm button").innerText = "Update Beneficiary";

}

function deleteBeneficiary(index){

    if(confirm("Are you sure you want to delete this beneficiary?")){

        beneficiaries.splice(index,1);

        localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));

        displayBeneficiaries();

    }

}

function searchBeneficiary(){

    let input = document.getElementById("searchBeneficiary").value.toLowerCase();

    let rows = document.querySelectorAll("#beneficiaryTable tbody tr");

    rows.forEach(function(row){

        let name = row.cells[0].textContent.toLowerCase();

        if(name.includes(input)){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

}