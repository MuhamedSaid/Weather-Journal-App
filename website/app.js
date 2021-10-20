/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  d.getDate() + '.' + Number(d.getMonth() + 1) + '.' + d.getFullYear();

// API Key
// my key:   2dc371dd36fa288cdb6e4d58800e89fd

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=2dc371dd36fa288cdb6e4d58800e89fd';

document.getElementById('generate').addEventListener('click', generate);

function generate(evt) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeatherInfo(baseURL, zipCode, apiKey).then(function (data) {
    console.log(data);
    postData('/add', {
      date: newDate,
      temp: data.list[0].main.temp,
      content: feelings
    });
    updateUI(); // at the end of the file
  });
}

// getting weather info from the API

const getWeatherInfo = async (baseURL, zip, key) => {
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
    document.getElementById('date').innerHTML = `Date: ${newDate}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(
      allData[0].temp - 273.15
    )} &#x2103;`;
    document.getElementById(
      'content'
    ).innerHTML = `I feel: ${allData[0].content}`;
  } catch (error) {
    console.log('error', error);
  }
};
