let events = JSON.parse(localStorage.getItem("events")) || [];

let editIndex = -1;

displayEvents();

document.getElementById("eventForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("eventName").value;
    let date = document.getElementById("eventDate").value;
    let location = document.getElementById("location").value;
    let description = document.getElementById("description").value;

    let event = {
        name,
        date,
        location,
        description
    };

    if(editIndex === -1){

        events.push(event);

    }else{

        events[editIndex] = event;
        editIndex = -1;

        document.querySelector("#eventForm button").innerText = "Add Event";

    }

    localStorage.setItem("events", JSON.stringify(events));

    document.getElementById("eventForm").reset();

    displayEvents();

});

function displayEvents(){

    let tbody = document.querySelector("#eventTable tbody");

    tbody.innerHTML = "";

    events.forEach((event,index)=>{

        tbody.innerHTML += `
        <tr>
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.description}</td>
            <td>
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });

}

function editEvent(index){

    document.getElementById("eventName").value = events[index].name;
    document.getElementById("eventDate").value = events[index].date;
    document.getElementById("location").value = events[index].location;
    document.getElementById("description").value = events[index].description;

    editIndex = index;

    document.querySelector("#eventForm button").innerText = "Update Event";

}

function deleteEvent(index){

    if(confirm("Are you sure you want to delete this event?")){

        events.splice(index,1);

        localStorage.setItem("events", JSON.stringify(events));

        displayEvents();

    }

}

function searchEvent(){

    let input = document.getElementById("searchEvent").value.toLowerCase();

    let rows = document.querySelectorAll("#eventTable tbody tr");

    rows.forEach(function(row){

        let eventName = row.cells[0].textContent.toLowerCase();

        if(eventName.includes(input)){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

}