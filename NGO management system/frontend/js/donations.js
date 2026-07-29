let donations = JSON.parse(localStorage.getItem("donations")) || [];

let editIndex = -1;

displayDonations();

document.getElementById("donationForm").addEventListener("submit", function(e){

    e.preventDefault();

    let donor = document.getElementById("donorName").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;

    let donation = {
        donor,
        amount,
        date
    };

    if(editIndex === -1){

        donations.push(donation);

    }else{

        donations[editIndex] = donation;

        editIndex = -1;

        document.querySelector("#donationForm button").innerText = "Add Donation";
    }

    localStorage.setItem("donations", JSON.stringify(donations));

    document.getElementById("donationForm").reset();

    displayDonations();

});

function displayDonations(){

    let tbody = document.querySelector("#donationTable tbody");

    tbody.innerHTML = "";

    donations.forEach((d,index)=>{

        tbody.innerHTML += `
        <tr>
            <td>${d.donor}</td>
            <td>${d.amount}</td>
            <td>${d.date}</td>
            <td>
                <button onclick="editDonation(${index})">Edit</button>

                <button onclick="deleteDonation(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

}

function editDonation(index){

    document.getElementById("donorName").value = donations[index].donor;
    document.getElementById("amount").value = donations[index].amount;
    document.getElementById("date").value = donations[index].date;

    editIndex = index;

    document.querySelector("#donationForm button").innerText = "Update Donation";

}

function deleteDonation(index){

    if(confirm("Delete this donation?")){

        donations.splice(index,1);

        localStorage.setItem("donations", JSON.stringify(donations));

        displayDonations();

    }

}
function searchDonation(){

    let input = document.getElementById("searchDonation").value.toLowerCase();

    let rows = document.querySelectorAll("#donationTable tbody tr");

    rows.forEach(function(row){

        let donor = row.cells[0].textContent.toLowerCase();

        if(donor.includes(input)){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

}