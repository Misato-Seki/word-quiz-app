const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');

const app = express();
const port = 8000;

// BodyParser: used in Express.js applications to handle request bodies 
app.use(bodyParser.json()); // to support JSON-encoded bodies
// CORS: Cross-Origin Resource Sharing
// CORS: allows applications running at one origin (domain) to make requests to resources hosted at a different origin
app.use(cors());

// Setting of PostgreSQL
// Sequelize: simple and powerful way to interact with relational databases
const sequelize = new Sequelize('word_quiz', 'misatoseki', '', {
    host: 'localhost',
    dialect: 'postgres'
})

// Define word model
const Word = sequelize.define('Word', {
    finnish: {
        type: DataTypes.STRING,
        allowNull: false
    },
    english: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'word_quiz',
    timestamps: false
});

// GET: random word
app.get('/random-word', async(req, res) => {
    try {
        const word = await Word.findOne({
            order: sequelize.random()
        });
        console.log(word);
        res.json(word);        
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.'})
    }
});


// POST: new word
app.post('/word', async(req, res) => {
    const { finnish, english, image } = req.body;

    try {
        if(!finnish || !english || !image) {
            return res.status(400).json({error: 'All fields are required'})
        }
        const newWord = await Word.create({
            finnish,
            english,
            image
        });
        res.status(201).json(newWord);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.'})
    }
})

// PUT: update word
app.put('/word/:id', async(req, res) => {
    const { id } = req.params;
    const { finnish, english, image } = req.body;

    try {
        const word = await Word.findByPk(id);
        if(!word){
            res.status(404).json({error: 'Word not found'})
        }
        if(!finnish || !english || !image) {
            return res.status(400).json({error: 'All fields are required'})
        }
        word.finnish = finnish;
        word.english = english;
        word.image = image;
        word.save();
        res.json(word);        
    } catch (error) {
        res.status(500).json({error:'Something went wrong.'})
    }

})

// DELETE: delete word
app.delete('/word/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const word = await Word.findByPk(id);
        if(!word){
            res.status(500).json({error:'Word not found.'});
        }
        await word.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(404).json({error: 'Something went wrong.'})
    }
})

// GET: find word
app.get('/word', async(req, res) => {
    const { word } = req.query
    try {
        const foundWord = await Word.findOne({
            where: {[Op.or] : [
                {finnish: word},
                {english: word}
            ]}
        })
        if(!foundWord) {
            res.status(500).json({error:'Word not found.'});
        }
        res.json(foundWord);
        
    } catch (error) {
        res.status(404).json({error: 'Something went wrong.'});
    }
})

// Run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
