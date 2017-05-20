$(document).ready(() => {
    init();
    google.maps.event.addDomListener(window, 'load', init);
    });

function init() {
  var input = document.getElementById('address');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert('Autocomplete’s returned place contains no geometry');
      return;
    }
    var location = {};
    // Location details
    for (let i = 0; i < place.address_components.length; i++) {
      if (place.address_components[i].types[0] === 'postal_code') {
      location.postalcode = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'country') {
      location.country = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'route') {
      location.street = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'street_number') {
      location.streetNo = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'sublocality_level_1') {
      location.neighborhood = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'locality') {
      location.city = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'administrative_area_level_1') {
      location.state = place.address_components[i].long_name;
      }
      if (place.address_components[i].types[0] === 'administrative_area_level_1') {
      location.state = place.address_components[i].long_name;
      }
    }
    location.lat = place.geometry.location.lat();
    location.lng = place.geometry.location.lng();

    $( "#city" ).val(location.city);
    $( "#street" ).val(location.street);
    $( "#postCode" ).val(location.postalcode);
    $( "#country" ).val(location.country);
    $("#lat").val(location.lat);
    $("#lng").val(location.lng);
    if(!location.hasOwnProperty("street")) {
      $("#address").val("");
    }
  });
}
