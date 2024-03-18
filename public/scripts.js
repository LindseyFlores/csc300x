//Random Joke
document.getElementById('showRandomJokeBtn').addEventListener('click', getRandomJoke);

function getRandomJoke() {
    fetch('http://localhost:3000/jokebook/joke/funnyJoke') // Corrected URL
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


//POST joke