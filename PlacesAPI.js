initialize = () => {
  let options = {
    types: ["(cities)"]
  };
  let input = document.getElementById("search-txt");
  let autocomplete = new google.maps.places.Autocomplete(input, options);
};
google.maps.event.addDomListener(window, "load", initialize);
