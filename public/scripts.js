//Random Joke
document.getElementById('randomJoke').addEventListener('click', getRandomJoke);

function getRandomJoke() {
    // Assuming there's an endpoint '/jokebook/joke/:category' that returns jokes by category
    fetch('/jokebook/joke/funnyJoke') // Example: Fetching a funny joke
        .then(response => response.json())
        .then(jokes => {
            if (jokes.length > 0) {
                const randomIndex = Math.floor(Math.random() * jokes.length);
                const joke = jokes[randomIndex];
                document.getElementById('displayJoke').innerText = joke.joke + " - " + joke.response;
            } else {
                document.getElementById('displayJoke').innerText = "No jokes found!";
            }
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('displayJoke').innerText = "Failed to load joke.";
        });
}
//GET Joke Categories
document.addEventListener('DOMContentLoaded', fetchCategories);


function fetchCategories() {
    fetch('/jokebook/categories')
        .then(response => response.json())
        .then(categories => {
            const list = document.getElementById('categoriesList');
            list.innerHTML = ''; // Clear existing list items
            categories.forEach(category => {
                const listItem = document.createElement('li');
                listItem.textContent = category; // Adjust if your category names need formatting
                list.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

//POST joke
document.getElementById('newJokeForm').addEventListener('submit', function(event){
    event.preventDefault();
    const joke = document.getElementById('jokeInput').value;
    const response = document.getElementById('responseInput').value; 
    const category = document.getElementById('selectCategory').value;

    fetch('/jokebook/joke/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, joke, response }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Joke added successfully!');
        // Clear the form fields...
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to add joke. Please try again.');
    });
});
