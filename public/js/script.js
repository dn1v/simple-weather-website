// function getWeatherData(address) {
//   fetch("http://localhost:3000/weather?address=" + address)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.error) return data.error;

//       return
//         data.description +
//         ". Temperature in " +
//         data.location +
//         " is " +
//         data.temperature +
//         ", feels like " +
//         data.feelslike +
//         "."
//       );
//       // console.log(data.location);
//       // console.log(data.country);
//       // console.log(data.temperature);
//       // console.log(data.description);
//     });
// }

console.log("Hello express.");

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("input");
  const answer = document.querySelector(".answer");
  answer.textContent = "Loading...";
  const address = search.value;
  fetch("http://localhost:3000/weather?address=" + address)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) answer.textContent = data.error;
      else {
        answer.textContent =
          data.description +
          ". Temperature in " +
          data.location +
          " is " +
          data.temperature +
          ", feels like " +
          data.feelslike +
          ".";
      }
    });
});
