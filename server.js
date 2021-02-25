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

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', '/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public', '/notes.html')));