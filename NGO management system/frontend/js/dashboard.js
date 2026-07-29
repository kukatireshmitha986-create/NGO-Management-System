// Load data from Local Storage

let donations = JSON.parse(localStorage.getItem("donations")) || [];
let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
let beneficiaries = JSON.parse(localStorage.getItem("beneficiaries")) || [];
let events = JSON.parse(localStorage.getItem("events")) || [];

// Display dashboard counts

document.getElementById("donationCount").textContent = donations.length;
document.getElementById("volunteerCount").textContent = volunteers.length;
document.getElementById("beneficiaryCount").textContent = beneficiaries.length;
document.getElementById("eventCount").textContent = events.length;

// Dashboard Chart

const ctx = document.getElementById("donationChart");

new Chart(ctx, {

    type: "bar",

    data: {

        labels: [
            "Donations",
            "Volunteers",
            "Beneficiaries",
            "Events"
        ],

        datasets: [{

            label: "NGO Statistics",

            data: [

                donations.length,
                volunteers.length,
                beneficiaries.length,
                events.length

            ],

            backgroundColor: [

                "#0d6efd",
                "#198754",
                "#ffc107",
                "#dc3545"

            ],

            borderColor: [

                "#0d6efd",
                "#198754",
                "#ffc107",
                "#dc3545"

            ],

            borderWidth: 1

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: true

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        }

    }

});