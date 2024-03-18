const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from public folder

let categories = ['funnyJoke', 'lameJoke'];

// Array of jokes for each category
let funnyJoke = [
  {joke: 'What would the Terminator be called in his retirement?', response: 'The Exterminator' },
  {"joke":"Why don't skeletons fight each other?","response":"They don't have the guts."}
];
let lameJoke = [
  { joke: 'Why did Iron Man apply for a job at the bakery?', response: 'Because he heard they need a hero with a lot of dough'},
  {joke: 'Why did the chicken cross the road?', response: 'I dont know' }
];

// GET endpoint for jokebook categories
app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

// GET for a specific category
app.get('/jokebook/joke/:category', (req, res) => {
  const { category } = req.params;
  const { limit } = req.query;

  let jokeArray = category === 'funnyJoke' ? funnyJoke : category === 'lameJoke' ? lameJoke : null;

  if (!jokeArray) {
    res.status(404).json({ error: `No category listed fir that` });
    return;
  }

  // Limit the number of jokes returned
  if (limit) {
    jokeArray = jokeArray.slice(0, Number(limit));
  }

  res.json(jokeArray);
});

// POST endpoint to add a new joke
app.post('/jokebook/joke/new', (req, res) => {
  const { category, joke, response } = req.body;

  if (!category || !joke || !response || !(category === 'funnyJoke' || category === 'lameJoke')) {
    res.status(400).json({ error: 'Whoah, hold up, invalid input' });
    return;
  }

  const newJoke = { joke, response };
  if (category === 'funnyJoke') {
    funnyJoke.push(newJoke);
  } else if (category === 'lameJoke') {
    lameJoke.push(newJoke);
  }

  res.json(newJoke);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
