document.getElementById('randomJoke').addEventListener('click', randomJoke);
document.addEventListener('DOMContentLoaded', getCategories);

function getRandomJoke() {
    // Get a random joke from the server
}

//Trying to list categories
function getCategories() {
    fetch('/jokebook/categories')
        .then(response => response.json())
        .then(categories => {
            const list = document.getElementById('categoriesList');
            categories.forEach(category => {
                const item = document.createElement('li');
                item.textContent = category;
                list.appendChild(item);
            });
        });
}

//POST endpoint to add a new joke 