let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

let editIndex = -1;

displayVolunteers();

document.getElementById("volunteerForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("volunteerName").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    let volunteer = {
        name,
        phone,
        email
    };

    if(editIndex === -1){

        volunteers.push(volunteer);

    }else{

        volunteers[editIndex] = volunteer;
        editIndex = -1;

        document.querySelector("#volunteerForm button").innerText = "Add Volunteer";

    }

    localStorage.setItem("volunteers", JSON.stringify(volunteers));

    document.getElementById("volunteerForm").reset();

    displayVolunteers();

});

function displayVolunteers(){

    let tbody = document.querySelector("#volunteerTable tbody");

    tbody.innerHTML = "";

    volunteers.forEach((volunteer,index)=>{

        tbody.innerHTML += `
        <tr>
            <td>${volunteer.name}</td>
            <td>${volunteer.phone}</td>
            <td>${volunteer.email}</td>
            <td>
                <button onclick="editVolunteer(${index})">Edit</button>
                <button onclick="deleteVolunteer(${index})">Delete</button>
            </td>
        </tr>
        `;

    });

}

function editVolunteer(index){

    document.getElementById("volunteerName").value = volunteers[index].name;
    document.getElementById("phone").value = volunteers[index].phone;
    document.getElementById("email").value = volunteers[index].email;

    editIndex = index;

    document.querySelector("#volunteerForm button").innerText = "Update Volunteer";

}

function deleteVolunteer(index){

    if(confirm("Are you sure you want to delete this volunteer?")){

        volunteers.splice(index,1);

        localStorage.setItem("volunteers", JSON.stringify(volunteers));

        displayVolunteers();

    }

}

function searchVolunteer(){

    let input = document.getElementById("searchVolunteer").value.toLowerCase();

    let rows = document.querySelectorAll("#volunteerTable tbody tr");

    rows.forEach(function(row){

        let volunteer = row.cells[0].textContent.toLowerCase();

        if(volunteer.includes(input)){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

}