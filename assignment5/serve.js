const express    = require('express'); //does this count for part 3 of the assignment?
const app        = express();
const path       = require('path');
const bodyParser = require('body-parser');

// the flashcard definitions
const definitions = {
  "Ampullae": " Sensory structures located on a shark’s body that detect electrical impulses over a short range.",
  "Dermal Denticles": " Also known as “skin teeth;” the protective (placoid) scales that cover a sharks body.",
  "Tapetum Lucidum": " A tissue present in shark eyes, helps reflect light to the retina and increase their visibility in dark waters."
};


app.use(express.static(path.join(__dirname, 'main')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'sharks_main.html'));
});

// I kept messing this portion up at first thank you tutorialspoint :)
app.use(bodyParser.json());

app.post('/flashcard', (req, res) => {
  console.log('Received /flashcard');
  const button = req.body.button;
  const definition = definitions[button];
  res.json({ definition });
});
//http://localhost:8000/sharks_main.html
app.listen(8000, () => {
  console.log('Server started. Go to http://localhost:8000/sharks_main.html');
});
