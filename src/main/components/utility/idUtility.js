'use strict';

const possibleCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const length = 10;

const generateId = () => {
  let id = '';
  for (let i = length; i > 0; --i) id += possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
  return id;
};

const validateId = (id) => {
  const pattern = new RegExp(/^[0-9a-zA-Z]{10}$/i);
  return pattern.test(id);
};

module.exports = {
  generateId,
  validateId
};
