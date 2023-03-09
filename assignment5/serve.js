const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));

// I kept messing this portion up at first thank you tutorialspoint :)
app.use(bodyParser.json());

// the flashcard definitions
const definitions = {
  "Ampullae": " Sensory structures located on a shark’s body that detect electrical impulses over a short range.",
  "Dermal Denticles": " Also known as “skin teeth;” the protective (placoid) scales that cover a sharks body.",
  "Tapetum Lucidum": " A tissue present in shark eyes, helps reflect light to the retina and increase their visibility in dark waters."
};

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
