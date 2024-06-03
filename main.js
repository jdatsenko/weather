const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const countryOutput = document.querySelector('.country');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const capitalOutput = document.querySelector('.capital');
const windOutput = document.querySelector('.wind');
const humidityOutput = document.querySelector('.humidity');
const form = document.getElementById("locationInput")
const search = document.querySelector(".search")
const btn = document.querySelector(".submit")
const cities = document.querySelectorAll(".city")
const currencyOutput = document.querySelector('.currency');
const flag = document.querySelector('.flag');
const value = document.querySelector('.value');

let cityInput = "London";
let dateInput = "2021-09-01";

const count = document.querySelector('.count');
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.querySelector('.modal');
const closeModalSpan = document.querySelector('.close');
const forecast = document.getElementById('forecastBtn');
const modal1 = document.querySelector('.modal1');
const closeModalSpan2 = document.querySelector('.close');


forecast.addEventListener('click', () => {
    console.log('Forecast button clicked');
    fetchForecastData();
    modal1.classList.remove('hidden');
});


closeModalSpan2.addEventListener('click', () => {
    console.log('Forecast button clicked');
    modal1.classList.add('hidden');
});

openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModalSpan.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
    if (event.target === modal1) {
        modal1.classList.add('hidden');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetchForecastData();

    const forecastDurationSelect = document.getElementById('forecast-duration');
    forecastDurationSelect.addEventListener('change', function () {
        fetchForecastData();
    });
});

function fetchForecastData() {
    const selectedDuration = document.getElementById('forecast-duration').value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=2b747747f64f4738b5e174009241804&q=${cityInput}&days=${selectedDuration}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const forecastData = data.forecast.forecastday;
            document.getElementById('location').textContent = data.location.name + ', ' + data.location.country;
            const forecastTable = document.querySelector('.forecast-table');
            forecastTable.innerHTML = '';

            const tableHeaders = `
                <thead>
                    <tr>
                        <th class="px-2 pt-5 text-center">Date</th>
                        <th class="px-2 pt-5 text-center">Condition</th>
                        <th class="px-2 pt-5 text-center">Average Temperature (°C)</th>
                        <th class="px-2 pt-5 text-center">Max / Min Temperature (°C)</th>
                        <th class="px-2 pt-5 text-center">Weather</th>
                    </tr>
                </thead>
            `;
            forecastTable.innerHTML = tableHeaders;

            forecastData.forEach(day => {
                const date = day.date;
                const dayOfWeek = day.day.condition.text;
                const temp = day.day.avgtemp_c;
                const maxTemp = day.day.maxtemp_c;
                const minTemp = day.day.mintemp_c;
                const icon = day.day.condition.icon;
                const row = `
                    <tr>
                        <td class="px-2 py-2 text-center">${date}</td>
                        <td class="px-2 py-2 text-center">${dayOfWeek}</td>
                        <td class="px-2 py-2 text-center">${temp}&#176;</td>
                        <td class="px-2 py-2 text-center">${maxTemp}&#176; / ${minTemp}&#176;</td>
                        <td class="px-2 py-2 text-center"><img src="${icon}" alt="Weather icon" class="mx-auto"></td>
                    </tr>
                `;
                forecastTable.innerHTML += row;
            });
        })

        .catch(error => {
            console.error('Error fetching forecast data:', error);
        });
}


function fetchDestinations(selectedCountry) {

    console.log('Selected Country:', selectedCountry);
    $.ajax({
        url: 'index.php',
        method: 'POST',
        data: {
            action: 'fetch_destination_data',
            countryFilter: selectedCountry
        },
        success: function (response) {
            console.log('Response:', response);
            const destinationData = JSON.parse(response);
            const tbody = $('.destination-table');
            tbody.empty();
            destinationData.forEach(function (destination) {
                const row = '<tr><td class="px-2 py-2 text-center">' + destination.destination + '</td><td class="px-4 py-2 text-center">' + destination.country + '</td><td class="px-4 py-2 text-center">' + destination.search_count + '</td></tr>';
                tbody.append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching destinations:', error);
        }
    });
}

function updateDestinations(selectedCountry) {
    fetchDestinations(selectedCountry);
}

$(document).ready(function () {
    const selectedCountry = '';
    updateDestinations(selectedCountry);
});


$(document).ready(function () {
    $.ajax({
        url: 'index.php',
        method: 'POST',
        data: { action: 'count_visit' },
        success: function (response) {
            console.log('Unique visitor count during 60 min:', response);
            $('.visitors').text(response);
        },
        error: function (xhr, status, error) {
            console.error('Error counting visit:', error);
        }
    });

    $.ajax({
        url: 'time.php',
        method: 'POST',
        data: { action: 'fetch_visitor_counts' },
        success: function (response) {
            const visitorCounts = JSON.parse(response);
            const tbody = $('.visitors-table');
            tbody.empty();
            Object.keys(visitorCounts).forEach(function (interval) {
                const count = visitorCounts[interval];
                const row = '<tr><td class="px-2 py-2 text-center">' + interval + '</td><td class="px-4 py-2 text-center">' + count + '</td></tr>';
                tbody.append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching visitor counts:', error);
        }
    });

    $.ajax({
        url: 'index.php',
        method: 'POST',
        data: { action: 'fetch_countries' },
        success: function (response) {
            const countries = JSON.parse(response);
            const countryFilter = $('#countryFilter');
            countries.forEach(function (country) {
                countryFilter.append(`<option value="${country}">${country}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching countries:', error);
        }
    });

    $('#countryFilter').on('change', function () {
        const selectedCountry = $(this).val();
        updateDestinations(selectedCountry);
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const cityHeader = document.getElementById('city-header');
    cityHeader.addEventListener('click', () => {
        sortTableByCity();
    });
});

let ascendingOrder = true;

function sortTableByCity() {
    const tableBody = document.querySelector('.destination-table');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    const headerRow = rows.shift();

    const sortedRows = rows.sort((a, b) => {
        const cityA = a.cells[0].textContent.trim();
        const cityB = b.cells[0].textContent.trim();

        const comparison = ascendingOrder ? cityA.localeCompare(cityB) : cityB.localeCompare(cityA);

        return comparison;
    });

    ascendingOrder = !ascendingOrder;

    sortedRows.unshift(headerRow);
    tableBody.innerHTML = '';
    sortedRows.forEach(row => {
        tableBody.appendChild(row);
    });
}




function logDestination(destination, country) {
    $.ajax({
        url: 'index.php',
        method: 'POST',
        data: {
            action: 'log_destination',
            destination: destination,
            country: country
        },
        success: function (response) {
            console.log('Destination logged successfully');
        },
        error: function (xhr, status, error) {
            console.error('Error logging destination:', error);
        }
    });
}


cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
    e.preventDefault();
});


function dayOfTheWeek(day, month, year) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[new Date(`${month}/${day}/${year}`).getDay()];
};


function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=2b747747f64f4738b5e174009241804&q=${cityInput}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 400) {
                    const errorMessage = document.getElementById('error-message');
                    errorMessage.textContent = "Invalid city name. Please enter a valid city name.";
                    app.style.opacity = "1";
                    throw new Error('Invalid city name');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
            countryOutput.innerHTML = data.location.country;
            const tz_id = data.location.tz_id;
            const cityName = tz_id.split("/")[1];
            capitalOutput.innerHTML = cityName;

            nameOutput.innerHTML = data.location.name;
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./icons/" + iconId;
            cloudOutput.innerHTML = data.current.cloud + "%";
            windOutput.innerHTML = data.current.wind_kph + " km/h";
            humidityOutput.innerHTML = data.current.humidity + "%";
            let timeOfDay = "day";
            const code = data.current.condition.code;
            document.getElementById('error-message').textContent = "";
            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay === "night") {
                    btn.style.background = "#fa6d1b";
                }
            }
            else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1087 || code == 1273 || code == 1276 || code == 1279 || code == 1282 || code == 1135) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay === "night") {
                    btn.style.background = "181e27";
                }
            }
            else if (code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240
                || code == 1243 || code == 1246 || code == 1249 || code == 1252) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay === "night") {
                    btn.style.background = "325c80";
                }
            }
            else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay === "night") {
                    btn.style.background = "1b1b1b";
                }
            }
            app.style.opacity = "1";
            fetchCountryCurrency(countryOutput.textContent);
            logDestination(cityInput, countryOutput.textContent);

            fetchDestinations(null);

        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}



function fetchCountryCurrency(countryName) {
    fetch(`https://restcountries.com/v3/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currencies = data[0].currencies;
            const cut = data[0].cca2;
            if (currencies && Object.keys(currencies).length > 0) {
                const currencyCode = Object.keys(currencies)[0];
                currencyOutput.textContent = `${currencyCode}`;
            } else {
                currencyOutput.textContent = 'Currency information not available';
            }
            fetchFlag(cut);
            fetchExchangeRate(currencyOutput.textContent);
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            currencyOutput.textContent = 'Currency information not available';
        });
}

function fetchExchangeRate(currency) {
    fetch(`https://v6.exchangerate-api.com/v6/fdf41e98f6b5d243d8efa58b/latest/EUR`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const conversionRates = data.conversion_rates;
            if (currency === 'EUR') {
                document.querySelector('.value').textContent = '';
                document.querySelector('.valueText').textContent = '';
            } else if (currency in conversionRates) {
                const exchangeRate = conversionRates[currency];
                const euroEquivalent = 1 / exchangeRate;
                document.querySelector('.value').textContent = euroEquivalent.toFixed(4) + " ";
                document.querySelector('.currency').textContent = currency;
                document.querySelector('.valueText').textContent = 'EUR in 1';
            } else {
                throw new Error('Currency not found in the conversion rates');
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rate data:', error);
            currencyOutput.textContent = 'Error fetching exchange rate data';
        });
}




function fetchFlag(cut) {
    const flagUrl = `https://flagsapi.com/${cut}/flat/64.png`;
    flag.src = flagUrl;
}


fetchWeatherData();
app.style.opacity = "1";
