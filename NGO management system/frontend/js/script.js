// ===============================
// Donation Form Handling
// ===============================


const donationForm = document.getElementById("donationForm");


if (donationForm) {


    donationForm.addEventListener("submit", async function(event) {


        event.preventDefault();


        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let amount = document.getElementById("amount").value;
        let purpose = document.getElementById("purpose").value;



        if(name === "" || email === "" || amount === "") {

            alert("Please fill all fields");

            return;

        }



        let donation = {

            donorName:name,
            donorEmail:email,
            donationAmount:amount,
            donationPurpose:purpose,
            date:new Date().toLocaleDateString()

        };



        let donations = JSON.parse(
            localStorage.getItem("donations")
        ) || [];



        donations.push(donation);



        localStorage.setItem(
            "donations",
            JSON.stringify(donations)
        );



        alert("Thank you for your donation!");



        donationForm.reset();


    });

}





// ===============================
// Signup API Connection
// ===============================


const signupForm = document.getElementById("signupForm");


if(signupForm){


    signupForm.addEventListener("submit", async function(event){


        event.preventDefault();



        let name = document.getElementById("signupName").value;

        let email = document.getElementById("signupEmail").value;

        let password = document.getElementById("signupPassword").value;



        try{


            let response = await fetch(
                "http://localhost:5000/api/users/signup",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },


                    body:JSON.stringify({

                        name:name,

                        email:email,

                        password:password

                    })

                }
            );



            let data = await response.json();



            alert(data.message);



            if(response.ok){

                window.location.href="login.html";

            }



        }

        catch(error){

            alert("Server connection failed");

            console.log(error);

        }


    });


}







// ===============================
// Login API Connection
// ===============================


const loginForm = document.getElementById("loginForm");



if(loginForm){


    loginForm.addEventListener("submit", async function(event){


        event.preventDefault();



        let email = document.getElementById("loginEmail").value;

        let password = document.getElementById("loginPassword").value;



        try{


            let response = await fetch(

                "http://localhost:5000/api/users/login",

                {


                    method:"POST",


                    headers:{

                        "Content-Type":"application/json"

                    },


                    body:JSON.stringify({

                        email:email,

                        password:password

                    })


                }

            );




            let data = await response.json();



            alert(data.message);



            if(response.ok){


                localStorage.setItem(
                    "loggedUser",
                    data.user
                );


                window.location.href="dashboard.html";


            }



        }


        catch(error){


            alert("Server connection failed");

            console.log(error);


        }


    });


}







// ===============================
// Dashboard Data
// ===============================



const totalDonationElement =
document.getElementById("totalDonation");



const totalDonorsElement =
document.getElementById("totalDonors");





if(totalDonationElement && totalDonorsElement){



    let donations = JSON.parse(

        localStorage.getItem("donations")

    ) || [];



    let totalAmount = 0;



    donations.forEach(function(donation){


        totalAmount += Number(
            donation.donationAmount
        );


    });



    totalDonationElement.innerHTML =
    "$" + totalAmount;



    totalDonorsElement.innerHTML =
    donations.length;



}
// ===============================
// Dashboard Data From Backend
// ===============================


const dashboardDonation =
document.getElementById("totalDonation");


const dashboardDonors =
document.getElementById("totalDonors");



if(dashboardDonation && dashboardDonors){


    fetch("http://localhost:5000/api/donations")

    .then(response => response.json())

    .then(data => {


        let total = 0;


        data.forEach(donation => {


            total += Number(donation.amount);


        });



        dashboardDonation.innerHTML =
        "$" + total;



        dashboardDonors.innerHTML =
        data.length;



    })

    .catch(error => {


        console.log(
            "Dashboard Error:",
            error
        );


    });


}