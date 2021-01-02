
function error(){
    console.log('error');
}

export default function getLocation() {
    let latitude = 0;
    let longitude = 0;

    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    }, error);

    console.log(latitude);
}
