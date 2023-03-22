const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');

// the flashcard definitions
const termsDefs = [
  { term: "Ampullae", definition: "- Sensory structures located on a shark’s body that detect electrical impulses over a short range." },
  { term: "Dermal Denticles", definition: "- aka “skin teeth;” the protective (placoid) scales that cover a sharks body." },
  { term: "Tapetum lucidum", definition: "- A tissue present in shark eyes, helps reflect light to the retina and increase their visibility in dark waters." }
];

// textbox defenitions
const textBox = [
  { answer: "Overfishing", question: "1.   - What is the greatest danger to shark populations?" },
  { answer: "Worldwide", question: "2.   - Where can you find the Oceanic Whitetip Shark's habitat?" },
  { answer: "Endangered", question: "3.   - What is the word used to describe a population that is in danger of extintion?" }
];

app.use(express.static(path.join(__dirname, 'main')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'sharks_main.html'));
});

app.get('/termsDefs', (req, res) => {
  res.json(termsDefs);
});

app.get('/textBox', (req, res) => {
  res.json(textBox);
});

app.post('/checkAnswers', (req, res) => {
  const answers = req.body.answers;
  const results = [];

  answers.forEach((answer, index) => {
    const correctAnswer = textBox[index].answer.trim().toLowerCase(); 
    const userAnswer = answer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    if (!isCorrect) {
      // sends the user's answer to the Merrian webster API to get suggestions
      const API_KEY = '82221f79-5c2c-46a0-868c-81e55dac7429';
      const url = `https://dictionaryapi.com/api/v3/references/collegiate/json/${userAnswer}?key=${API_KEY}`;
      console.log('URL:', url);
      https.get(url, (response) => {  
        let data = '';
        response.on('data', (chunk) => {
          // console.log('received data:', chunk);
          data += chunk;
          console.log('received data:', chunk);

        });        
        response.on('end', () => {
          const responseArr = JSON.parse(data);
          const suggestions = responseArr.length > 0 && responseArr[0].suggestion ? responseArr[0].suggestion : [];
          results.push({ question: textBox[index].question, userAnswer: userAnswer, correctAnswer: correctAnswer, isCorrect: isCorrect, suggestions: suggestions });
          if (results.length === answers.length) {
            res.json(results);
          }
        });
        
      }).on('error', (error) => {
        console.log(`Error: ${error}`);
        results.push({ question: textBox[index].question, userAnswer: userAnswer, correctAnswer: correctAnswer, isCorrect: isCorrect, suggestions: [] });
        if (results.length === answers.length) {
          res.json(results);
        }
      });
    } else {
      results.push({ question: textBox[index].question, userAnswer: userAnswer, correctAnswer: correctAnswer, isCorrect: isCorrect, suggestions: [] });
      if (results.length === answers.length) {
        res.json(results);
      }
    }
  });

});

//http://localhost:3000/sharks_main.html
app.listen(8000, () => {
  console.log('Server started. Go to http://localhost:8000/sharks_main.html');
});

