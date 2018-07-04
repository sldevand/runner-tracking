var runnerMap = (function () {

    var map;
    var marker;
    var directionsDisplay;

    function trace() {
        directionsDisplay.setMap(map);

        var directionsService = new google.maps.DirectionsService();
        var selectedMode = google.maps.TravelMode["WALKING"];

        var request = {
            origin: marker.position,
            destination: this.latLng,
            travelMode: selectedMode
        };
      
        directionsService.route(request, function (response, status) {            
            if ("OK" === status) {
                directionsDisplay.setDirections(response);
                // document.getElementById("clear").classList.add("visible");
                // document.getElementById("clear").classList.remove("hidden");
                document.getElementById("clear").style.display = "block";
                return;
            }            
            snackBar.display("Erreur de tracé : le serveur ne répond pas",function(event){});
        });
    }

    function clear(){
        directionsDisplay.setMap(null);
        // document.getElementById("clear").classList.add("hidden");
        // document.getElementById("clear").classList.remove("visible");
        document.getElementById("clear").style.display = "none";
    }

    function onLongClick() {

        var id;
        google.maps.event.addListener(map, 'mousedown', function (event) {
            id = setTimeout(trace.bind(event), 500);
        });

        google.maps.event.addListener(map, 'mouseup', function (event) {
            clearTimeout(id);
        });
    }

    function createMap(position) {
        map = new google.maps.Map(document.getElementById('runnerMap'), {
            center: position,
            zoom: 18,
            minZoom: 16,
            maxZoom: 20,
            disableDefaultUI: true,
            mapTypeId: 'terrain',
            styles: mapStyleRetroModel

        });
 
    };

    function createMarker(position) {
        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: 'Me'
        });
    };

    function success(position) {
        if (!map) {
            createMap(position);
            createMarker(position);
            onLongClick();
            geocoder = new google.maps.Geocoder;
            infowindow = new google.maps.InfoWindow;
            geocodePosition(geocoder, map, infowindow, position);
            return;
        }

        map.panTo(position);
        marker.setPosition(position);
    }

    function error() {
        snackBar.display("Erreur de runnerMap",function(event) {});
    }

    var geocodePosition = function (geocoder, map, infowindow, position) {

        geocoder.geocode({
            'location': position
        }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };

    /**
     * @returns (Object) runnerMap module
     */
    return {
        onInit: function () {
            directionsDisplay = new google.maps.DirectionsRenderer();
            document.getElementById("clear").addEventListener('click',clear);
            locator.watch(success, error.bind(this));
            
        },
        onPlay: function () {

        },
        onPause: function () {

        }
    };

})();