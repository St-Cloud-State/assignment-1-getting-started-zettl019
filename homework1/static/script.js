// Array to store user IDs
const userIDs = [];

// Function to add a user to the list and send it to the server
function addApplicant() {
    const applicantName = document.getElementById('applicantName').value.trim(); 
    const applicantZipcode = document.getElementById('applicantZipcode').value.trim();
    const errorMessageDiv = document.getElementById('errorMessage');
    if(!applicantName || !applicantZipcode){
        errorMessageDiv.innerText = "Please enter both the name and zipcode!"
        console.error("Please enter both the name and zipcode!")
        return; 
    }
    // Create a JSON object with user data
    const userID = {
        id: applicantName + "_" + applicantZipcode,
        status: "received"
    };

    // Send the user data to the server via POST request
    fetch('/api/add_applicant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userID)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            errorMessageDiv.innerText = ""; 

            // Add new user data to the userIDs array
            userIDs.push(userID);
            console.log(userIDs);
        })
        .catch(error => {
            console.error('Error adding applicant:', error);
            errorMessageDiv.innerText = "Error adding applicant, please try again!"
        });
}

// Check a users application status using the ID
function checkApplicationNum() {
    let flag = false; 
    const applicationNumber = document.getElementById('applicationNumber').value;
    const statusMessageDiv = document.getElementById('statusMessage');

    fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.users.length; i++) {  
            if (applicationNumber === data.users[i].id) { 
                let message = "Status of: " + data.users[i].id + " is " + data.users[i].status;
                statusMessageDiv.innerText = message;
                console.log(message);
                flag = true; 
                break; 
            }
        }
    
        if (!flag) {
            let errorMessage = "Applicant could not be found!";
            statusMessageDiv.innerText = errorMessage;
            console.log(errorMessage);
        }
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    }); 
}

// Change a users application status by user ID
function changeApplicationStatus() {
    const changeStatusMessageDiv = document.getElementById('changeStatusMessage');
    let flag = false; 
    const applicantID = document.getElementById('applicantID').value; 
    const selectedStatus = document.getElementById('statusDropdown').value;
    fetch('/api/update_status', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: applicantID, status: selectedStatus })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Backend response:", data);


        return fetch('/api/users');  
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.users.length; i++) {
            if (applicantID === data.users[i].id) {
                let message = data.users[i].id + " application status changed to " + data.users[i].status + " successfully!";
                changeStatusMessageDiv.innerText = message;
                console.log(message);
                flag = true; 
                break;
            }
        }

        if (!flag) {
            let errorMessage = "Error changing applicant status. Make sure the applicant ID was entered correctly!";
            changeStatusMessageDiv.innerText = errorMessage;
            console.log(errorMessage);
        }
    })
    .catch(error => {
        console.error('Error updating status:', error);
        changeStatusMessageDiv.innerText = "Error occured, make sure user ID is correct!";
    });
}


// Function to fetch and display all users from the server
function showAllUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('allusers'); // Fixed ID
            userList.innerHTML = ''; // Clear existing user list
            console.log(data);
            userList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all users:', error);
        });
}
