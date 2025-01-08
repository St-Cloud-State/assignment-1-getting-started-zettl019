// Function to fetch and display all books from the server
function showAllBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('allbooks');
            bookList.innerHTML = ''; // Clear existing book list
            console.log(data);
            bookList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all books:', error);
        });
}



