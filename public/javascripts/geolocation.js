if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log('center: ', center);
    $('#lat').val(Number(center.lat));
    $('#lng').val(Number(center.lng));
  }, function () {
    console.log('Error!');
  });
} else {
  console.log('Not supported!');
}
