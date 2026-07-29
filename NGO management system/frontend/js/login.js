document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if(user == null){
        alert("No account found. Please register first.");
        return;
    }

    if(email === user.email && password === user.password){

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Email or Password");

    }

});