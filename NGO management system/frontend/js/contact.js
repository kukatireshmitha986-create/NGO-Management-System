document.getElementById("contactForm").addEventListener("submit", function(event){

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push({
        name,
        email,
        phone,
        message
    });

    localStorage.setItem("contacts", JSON.stringify(contacts));

    alert("Message sent successfully!");

    document.getElementById("contactForm").reset();

});