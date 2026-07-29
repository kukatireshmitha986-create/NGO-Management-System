let donations = JSON.parse(localStorage.getItem("donations")) || [];
let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];
let beneficiaries = JSON.parse(localStorage.getItem("beneficiaries")) || [];
let events = JSON.parse(localStorage.getItem("events")) || [];

document.getElementById("totalDonations").textContent = donations.length;
document.getElementById("totalVolunteers").textContent = volunteers.length;
document.getElementById("totalBeneficiaries").textContent = beneficiaries.length;
document.getElementById("totalEvents").textContent = events.length;

let totalAmount = 0;

donations.forEach(function(donation){
    totalAmount += Number(donation.amount);
});

document.getElementById("totalAmount").textContent = "₹" + totalAmount;