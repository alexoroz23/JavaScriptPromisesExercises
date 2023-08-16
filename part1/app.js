let favNumber = 0;
let baseURL = "http://numbersapi.com";

// 1st
$.getJSON(`${baseURL}/${favNumber}?json`)
  .then(singleData => {
    console.log(singleData);
  });

// 2nd
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`)
  .then(arrayData => {
    console.log(arrayData);
  });

// 3rd
const numberOfRequests = 4;
const factPromises = Array.from({ length: numberOfRequests }, () => {
  return $.getJSON(`${baseURL}/${favNumber}?json`);
});

Promise.all(factPromises)
  .then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  });