'use strict';

//  Lấy sidebar
const sidebar = document.getElementById('sidebar');

// Active sidebar
sidebar.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Template data when start
const template = [
  {
    id: 'P001',
    name: 'Luna',
    age: 5,
    type: 'Dog',
    weight: 7,
    lengthPet: 4,
    color: '#000000',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(),
  },
  {
    id: 'P002',
    name: 'Lina',
    age: 2,
    type: 'Dog',
    weight: 5,
    lengthPet: 5,
    color: '#000000',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(),
  },
  {
    id: 'P003',
    name: 'Mimi',
    age: 4,
    type: 'Cat',
    weight: 3,
    lengthPet: 4,
    color: '#000000',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: true,
    sterilized: true,
    date: new Date(),
  },

  {
    id: 'P004',
    name: 'Mangchi',
    age: 4,
    type: 'Cat',
    weight: 7,
    lengthPet: 5,
    color: '#000000',
    breed: 'Tabby',
    vaccinated: true,
    dewormed: false,
    sterilized: false,
    date: new Date(),
  },
];

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultVal) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultVal;
}

// Retrieve petArr from localStorage with a default value of template
const storedPetArr = getFromStorage('petArr', template);
