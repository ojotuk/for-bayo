const streets = document.querySelector("#streets");
const search = document.querySelector("#search");
const API_KEY = "a6vGKHoy6BqCWx_HWgDB";

// BASE_URL = `https://api.winnipegtransit.com/v3/streets.json?name=maryland&api-key=${API_KEY}`;

BASE_URL_STOPS = `https://api.winnipegtransit.com/v3/stops/10064/schedule.json&api-key=a6vGKHoy6BqCWx_HWgDB`;

function searchStreet(streetName) {
  streets.innerHTML = ``;
  BASE_URL = `https://api.winnipegtransit.com/v3/streets.json?name=${streetName}&api-key=a6vGKHoy6BqCWx_HWgDB`;
  let promise = new Promise((resolve, reject) => {
    fetch(BASE_URL).then((data) => resolve(data.json()));
  });

  promise.then((data) => {
    const streetsResult = data.streets;
    console.log(data.streets);
    streetsResult.forEach((street) => {
      let link = document.createElement("a");
      link.setAttribute("data-attribute", street.key);
      link.setAttribute("href", "#");
      link.addEventListener("click", () => getdata(street.key));
      link.append(street.name);
      streets.append(link);
    });
  });
}

function getdata(key) {
  let promise = new Promise((resolve, reject) => {
    fetch(
      `https://api.winnipegtransit.com/v3/stops/${key}/schedule.json&api-key=a6vGKHoy6BqCWx_HWgDB`
    ).then((data) => resolve(data.json()));
  });
  promise.then((data) => {
    console.log(data);
  });
}

search.addEventListener("keypress", (e) => {
  //   e.preventDefault();
  if (e.key === "Enter") {
    // console.log(e);
    let searchString = search.value;
    searchStreet(searchString);
  }
});
