/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  d.getDate() + '.' + Number(d.getMonth() + 1) + '.' + d.getFullYear();

// API Key
// my key:   2dc371dd36fa288cdb6e4d58800e89fd

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2dc371dd36fa288cdb6e4d58800e89fd&units=metric';

document.getElementById('generate').addEventListener('click', generate);

function generate(evt) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)
    .then((data) => {
      postData('/data', {
        currentDate: newDate,
        temper: data.main.temp,
        contentOfFeelings: feelings
      });
    })
    .then(() => {
      updateUI();
    });
}

// getting weather info from the API

const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

// POSTING data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Updating the UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      'temp'
    ).innerHTML = `Temperature: ${allData.temp} &#x2103;`;
    document.getElementById('content').innerHTML = `I feel: ${allData.content}`;
  } catch (err) {
    console.log('error', err);
  }
};
