const favouritesEndpoint = 'https://my-json-server.typicode.com/wku-trent/hello/favourites';
const locations = new Object();
let map;

function onLoad() {
  loadFavorites();
}

function loadFavorites() {
  fetch(favouritesEndpoint)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          setFavourites(data);
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

function setFavourites(list) {
  const favouritesSelect = document.getElementById('favouritesSelect');
  list.map(destination => {
    const option = document.createElement('option');
    option.value = destination.name;
    option.text = destination.name;
    favouritesSelect.add(option);

    locations[destination.name] = destination.location;
  });
  loadMap(locations[list[0].name]);
  display('favouritesSelect', true);
  display('map', true);
  display('spinner', false);
}

function display(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}

function loadMap(location) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 11
  });
}

function selectLocation(v) {
  loadMap(locations[v]);
}
