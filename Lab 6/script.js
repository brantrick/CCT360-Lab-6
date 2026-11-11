const url = "https://api.wheretheiss.at/v1/satellites/25544";

function getISS() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const lat = data.latitude.toFixed(2);
      const lon = data.longitude.toFixed(2);
      const speed = Math.round(data.velocity);
      const height = Math.round(data.altitude);
      const visibility = data.visibility;

      document.getElementById("location").textContent = "Lat " + lat + ", Long " + lon;
      document.getElementById("speed").textContent = "Speed: " + speed + " km/h";
      document.getElementById("height").textContent = "Height: " + height + " km above Earth";
      document.getElementById("updated").textContent =
        "Last updated: " + new Date().toLocaleTimeString();

      if (visibility === "daylight") {
        document.body.style.backgroundColor = "skyblue";
        document.body.style.color = "black";
        document.getElementById("emoji").textContent = "☀️";
        document.getElementById("message").textContent = "The ISS is in sunlight right now.";
      } else {
        document.body.style.backgroundColor = "midnightblue";
        document.body.style.color = "white";
        document.getElementById("emoji").textContent = "🌙";
        document.getElementById("message").textContent = "The ISS is in Earth's shadow right now.";
      }
    })
    .catch(function (error) {
      document.getElementById("location").textContent = "Could not load ISS data";
      console.log(error);
    });
}

getISS();

setInterval(getISS, 5000);

document.getElementById("refresh").addEventListener("click", getISS);
