var data_arr = [];

const search_button = document
  .querySelector("#search-button")
  .addEventListener("click", function () {
    const brewery = document.querySelector("#input-search").value;
    document.querySelector("#input-search").value = "";
    let temp_arr = [];
    data_arr.forEach((el) => {
      if (el.name.toLowerCase().includes(brewery.toString())) {
        temp_arr.push(el);
      }
    });
    if (temp_arr.length > 0) {
      data_arr = temp_arr;
      const container = document.querySelector(".brewery-container");
      container.innerHTML = "";
      data_arr.forEach((element) => {
        createEl(element);
      });
    } else {
      const container = document.querySelector(".brewery-container");
      container.innerHTML = "<strong>No results found</strong>";
    }
  });

const reset_button = document
  .querySelector("#clear-search-button")
  .addEventListener("click", function () {
    data_arr = [];
    getBreweries()
      .then(() => {
        const container = document.querySelector(".brewery-container");
        container.innerHTML = "";
        data_arr.forEach((element) => {
          createEl(element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
// making API calls

async function getBreweries() {
  try {
    const response = await fetch("https://api.openbrewerydb.org/breweries", {
      method: "GET",
    });
    const data = await response.json();
    await data.forEach((element) => {
      temp = {
        name: element.name,
        country: element.country,
        type: element.brewery_type,
        city: element.city,
        phone: element.phone,
        street: element.street,
        state: element.state,
        website: element.website_url,
      };
      data_arr.push(temp);
    });
    return data_arr;
  } catch (error) {
    console.log(error);
  }
}

const createEl = (element) => {
  const container = document.querySelector(".brewery-container");
  const brewery = document.createElement("div");
  const name = document.createElement("h3");
  const phone = document.createElement("p");
  const address = document.createElement("p");
  const website = document.createElement("a");
  const type = document.createElement("p");
  brewery.className = "brewery";
  name.innerHTML = element.name;
  if (element.phone) {
    phone.innerHTML = "<strong>Phone: </strong> " + element.phone;
  } else {
    phone.innerHTML = "<strong>Phone: </strong> " + "Currently Unavailable";
  }
  let add = "";
  if (element.city) {
    add += element.city;
    add += ", ";
  }
  if (element.state) {
    add += element.state;
    add += ", ";
  }
  if (element.country) {
    add += element.country;
  }
  if (element.website) {
    website.innerHTML = "Visit us";
    website.setAttribute("href", element.website);
  }
  type.innerHTML = "<strong>Type: </strong> " + element.type.toUpperCase();
  address.innerHTML = "<strong>Address: </strong>" + add;
  brewery.append(name, type, phone, address, website);
  container.append(brewery);
};

getBreweries()
  .then(() => {
    data_arr.forEach((element) => {
      createEl(element);
    });
  })
  .catch((error) => {
    console.log(error);
  });
