import cities from "./cities/turkey.json" assert { type: "json" };
// console.log("cities", cities);
const dt = new Date();
const displayDate = moment().format("YYYY-MM-DD hh:mm");
document.getElementById("date").innerHTML = displayDate;

// document.getElementById("date").innerHTML =
//   ("0" + dt.getDate()).slice(-2) +
//   "." +
//   ("0" + (dt.getMonth() + 1)).slice(-2) +
//   "." +
//   dt.getFullYear() +
//   " " +
//   ("0" + dt.getHours()).slice(-2) +
//   ":" +
//   ("0" + dt.getMinutes()).slice(-2);

var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
const currentDate = moment().format("YYYY-MM-DD");

const apiKey = "294af91f708cf77db246ef91935af7d7";
// const latitude = "37.7648";
// const longitude = "38.2786";

const daysRow = document.getElementById("week-days");

// const cities = [
//   { name: "Ankara" },
//   { name: "İstanbul" },
//   { name: "Bursa" },
//   { name: "İzmir" },
//   { name: "Kayseri" },
//   { name: "Antalya" },
//   { name: "Muğla" },
//   { name: "Trabzon" },
//   { name: "Samsun" },
//   { name: "Ordu" },
//   { name: "Aydın" },
//   { name: "Afyonkarahisar" },
//   { name: "Mersin" },
//   { name: "Denizli" },
//   { name: "Eskişehir" },
// ];

const citySelect = document.getElementById("cities");
for (let index = 0; index < cities.length; index++) {
  const element = cities[index];
  citySelect.options[citySelect.options.length] = new Option(
    element.name,
    JSON.stringify(element)
  );
}

citySelect.addEventListener("change", (e) => {
  const value = e.target.value;
  console.log("e", JSON.parse(value));
  const { latitude, longitude } = JSON.parse(value);
  console.log("lat", latitude, longitude);

  daysRow.innerHTML = "";
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((res) => {
      console.log("res", res);
      // const group = groupBy(res.list, "dt_txt");
      // console.log("group", group);
      const filteredList = res.list.filter((item) =>
        item.dt_txt.includes(currentDate)
      );
      console.log("filteredList", filteredList);

      filteredList.forEach((element) => {
        const hour = element.dt_txt.split(" ")[1];
        const div = `
                <div class="days">
              <ul class="daysItems">
                <li>${element.weather[0].description}</li>
                <li class="daysB">${element.weather[0].main} </li>
                <li>${element.main.temp} </li>
                <li>${hour} </li>
              </ul>
            </div>
    `;
        daysRow.innerHTML += div;
      });
    });
});

// const daysWeather = [
//   {
//     title: "Monday",
//     degree: 24,
//     condition: "Rainy",
//   },
//   {
//     title: "Tuesday",
//     degree: 30,
//     condition: "Sunny",
//   },

//   {
//     title: "Wednesday",
//     degree: 25,
//     condition: "Cloudy",
//   },
//   {
//     title: "Thursday",
//     degree: 28,
//     condition: "Sunny",
//   },
//   {
//     title: "Friday",
//     degree: 21,
//     condition: "Cloudy",
//   },
//   {
//     title: "Saturday",
//     degree: 23,
//     condition: "Rainy",
//   },
//   {
//     title: "Sunday",
//     degree: 30,
//     condition: "Sunny",
//   },
// ];

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

const degree = document.getElementById("degree");

// daysItems.forEach(function (element) {
//   element.addEventListener("click", (e) => {
//     console.log("e", e.target.innerHTML);
//   });
// });
