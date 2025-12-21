const apiKey = "3f1dd337d2001db3fbc2e4ad9e1049e6";

function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Şehir gir!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=tr&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("weather").style.display = "block";
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
            document.getElementById("desc").innerText = data.weather[0].description;
            document.getElementById("feels").innerText = `Hissedilen: ${Math.round(data.main.feels_like)}°C`;
            document.getElementById("humidity").innerText = `Nem: %${data.main.humidity}`;
            document.getElementById("wind").innerText = `Rüzgar: ${data.wind.speed} m/s`;
            document.getElementById("icon").src =
                `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(err => {
            alert("API hatası (401) veya şehir bulunamadı");
            console.error(err);
        });
}
