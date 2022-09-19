const dt = new Date();
document.getElementById("date").innerHTML =
  ("0" + dt.getDate()).slice(-2) +
  "." +
  ("0" + (dt.getMonth() + 1)).slice(-2) +
  "." +
  dt.getFullYear() +
  " " +
  ("0" + dt.getHours()).slice(-2) +
  ":" +
  ("0" + dt.getMinutes()).slice(-2);

const daysRow = document.getElementById("week-days");

const cities = [{ name: "Ankara" }, { name: "İstanbul" }, { name: "Bursa" }, { name: "İzmir" }, { name: "Kayseri" }
, { name: "Antalya" }, { name: "Muğla" }, { name: "Trabzon" }, { name: "Samsun" }, { name: "Ordu" }
, { name: "Aydın" }, { name: "Afyonkarahisar" }, { name: "Mersin" }, { name: "Denizli" }, { name: "Eskişehir" }
];

const citySelect = document.getElementById("cities");
for (let index = 0; index < cities.length; index++) {
  const element = cities[index];
  citySelect.options[citySelect.options.length] = new Option(
    element.name,
    element.name
  );
}

const daysWeather = [
  {
    title: "Monday",
    degree: 24,
    condition: "Rainy",
  },
  {
    title: "Tuesday",
    degree: 30,
    condition: "Sunny",
  },

  {
    title: "Wednesday",
    degree: 25,
    condition: "Cloudy",
  },
  {
    title: "Thursday",
    degree: 28,
    condition: "Sunny",
  },
  {
    title: "Friday",
    degree: 21,
    condition: "Cloudy",
  },
  {
    title: "Saturday",
    degree: 23,
    condition: "Rainy",
  },
  {
    title: "Sunday",
    degree: 30,
    condition: "Sunny",
  },
];
daysWeather.forEach((element) => {
  const { condition, title, degree } = element;
  const div = `
                <div class="days">
              <ul class="daysItems">
                <li>${condition}</li>
                <li class="daysB">${title} </li>
                <li>${degree} </li>
              </ul>
            </div>
    `;
  daysRow.innerHTML += div;
});

// const daysItems = document.getElementsByClassName("daysItems");
const daysItems = document.getElementsByClassName("daysItems");

for (let index = 0; index < daysItems.length; index++) {
  const element = daysItems[index];
  element.addEventListener("click", (e) => {
    if (e.target.classList.value === "daysB") {
      console.log("e", e.target.innerHTML);
      const selectedDay = daysWeather.filter(
        (elm) => elm.title === e.target.innerHTML.replace(" ", "")
      );
      console.log("selectedDay", selectedDay[0]);
      document.getElementById("degree").innerHTML = selectedDay[0].degree;
      document.getElementById("condition").innerHTML = selectedDay[0].condition;
    }
  });
}


const degree = document.getElementById("degree")

// daysItems.forEach(function (element) {
//   element.addEventListener("click", (e) => {
//     console.log("e", e.target.innerHTML);
//   });
// });
