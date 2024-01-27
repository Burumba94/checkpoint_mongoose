const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, UseUnifiedTopology: true });

//Creation et enregistrement d'un modèle
const Person = require('./models/person.js');

const newPerson = new Person({
    name: 'Abdou Niang',
    age: 29,
    favoriteFoods: ['Mafe', 'Thieb'],
});

newPerson.save(function(err, data) {
    if (err) return console.error(err);
    console.log('Person saved:', data);
})

//enregistrement avec `Model.create()`
const arrayOfPeople = [
    { name: 'Paul', age: 15, favoriteFoods: ['Milk', 'Soup'] },
    { name: 'Xavier', age: 32, favoriteFoods: ['Etodiay', 'thieb'] },
];

Person.create(arrayOfPeople, function(err, data){
    if (err) return console.error(err);
    console.log('People created:', data);
} );

//Utilisation de `model.find()`pour la recherche 
Person.find({ name: 'Abdou Niang'})
    .then(people => {
        console.log('People found', people);
    })
    .catch(err => {
        console.error(err);
    });

//recherche d'une personne avec un aliment spécifique avec `model.findOne()`
Person.findOne({ favoriteFoods: 'Thieb' })
    .then(person => {
        console.log('Person found:', person);
    })
    .catch(err => {
        console.error(err);
    });


//recherche d'une personne par son _id avec `model.finById()`
const personId = ''; //ID de la personne
// Utilisation de Promesses (Promises)
Person.findById(personId) // Recherche d'une personne par son ID
  .then(person => { // Exécute si la recherche réussit
    console.log('Person found by ID:', person);
    })
  .catch(err => { // Exécute si une erreur se produit pendant la recherche
    console.error(err);
    });


//Màj avec `find`, `edit`, et `save`
//trouver une personne avec son ID et ajouter "hamburger" à ses aliments préférés
const personIdToUpdate = ''; //ID de la personne 
// Utilisation de Promesses (Promises)
Person.findById(personIdToUpdate)
    .then(person => {
    if (!person) {
        console.log('Person not found.');
        return Promise.reject(new Error('Person not found'));
    }

    //ajouter "hamburger" à la liste des aliments préférés
    person.favoriteFoods.push('Hamburger');

    // Mise à jour des données de la personne 
    person.name = 'Nouveau Nom';

    // Enregistrement des modifications et retourne une nouvelle promesse
    return person.save();
    })
    .then(updatedPerson => {
    console.log('Person updated:', updatedPerson);
    })
    .catch(err => {
    console.error(err);
    });


