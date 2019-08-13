const favouritesEndpoint = 'https://my-json-server.typicode.com/wku-trent/hello/favourites';

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
    option.value = destination.id;
    option.text = destination.name;
    favouritesSelect.add(option);
  });
  display('favouritesSelect', true);
  display('spinner', false);
}

function display(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}