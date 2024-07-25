const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 8000;


app.use(bodyParser.json());
app.use(cors());

// Setting of PostgreSQL
// Sequelize: simple and powerful way to interact with relational databases
const sequelize = new Sequelize('word_quiz', 'misatoseki', '', {
    host: 'localhost',
    dialect: 'postgres'
})

// Define word model
const Word = sequelize.define('Word', {
    word: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.TEXT
    }
},{
    tableName: 'word_quiz',
    timestamps: false
});

// Create endpoint
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

// Run server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
