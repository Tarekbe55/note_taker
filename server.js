const express = require('express')
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = process.env.PORT || 3500
let dataB = require('./db/db.json')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))
app.get('/api/notes', (req, res) => fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
  if (err) throw err;
  res.send(data)
}))

app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  const newN = req.body;
  dataB.push(newN);
  fs.writeFileSync('./db/db.json', JSON.stringify(dataB));
  res.json(dataB);

})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  dataB = dataB.filter(notes => notes.id != id);
  fs.writeFileSync('./db/db.json', JSON.stringify(dataB));
  res.json(dataB);
})

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));