// set up the page

var geoBtn = document.querySelector('.btnGps');

// draw the google map, or not

geoBtn.onclick = function() {
  handlePermission();
};

var revealPosition = function(position) {
  geoBtn.style.display = 'none';
  console.log(position.coords.latitude);
  console.log(position.coords.longitude); 
};

// test for geolocation support, provide geolocation settings, determine location of the user's device

if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
  
// Start everything off

function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state === 'granted') {
      report(result.state);
      geoBtn.style.display = 'none';
    } else if (result.state === 'prompt') {
      report(result.state);
      navigator.geolocation.getCurrentPosition(revealPosition);
    } else if (result.state === 'denied') {
      report(result.state);
      geoBtn.style.display = 'inline';
    }
    result.onchange = function() {
      report(result.state);
    };
  });
}

function report(state) {
  console.log('Permission: ' + state);
}

