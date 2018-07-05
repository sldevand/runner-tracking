import {Locator} from './../device/Locator.device';
import {SnackBar} from './SnackBar.component';
import {MapStyle} from '../models/MapStyle.model'; 

export class RunnerMap {

    constructor() {
        console.log("RunnerMap constructor");
        this.locator = new Locator;
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.snackBar = new SnackBar;
        this.mapStyle = new MapStyle;
        
    }

    onInit(){    
        console.log("RunnerMap onInit");   
        document.getElementById("clear").addEventListener('click',this.clear.bind(this));
        this.locator.watch(this.success.bind(this), this.error.bind(this));
    }

    onPlay(){

    }

    onPause(){

    }

    trace(event){
        console.log(this);
        
        this.directionsDisplay.setMap(this.map);

        var directionsService = new google.maps.DirectionsService();
        var selectedMode = google.maps.TravelMode["WALKING"];

        var request = {
            origin: this.marker.position,
            destination: event.latLng,
            travelMode: selectedMode
        };
      
        directionsService.route(request, function (response, status) {            
            if ("OK" === status) {
                this.directionsDisplay.setDirections(response);
                document.getElementById("clear").style.display = "block";
                return;
            }            
            this.snackBar.display("Erreur de tracé : le serveur ne répond pas",function(event){});
        }.bind(this));
    }

    clear(){
        this.directionsDisplay.setMap(null);
        document.getElementById("clear").style.display = "none";
    }

    onLongClick() {

        var id;
        google.maps.event.addListener(this.map, 'mousedown', function (event) {
      
            id = setTimeout(this.trace.bind(this,event), 500);
        }.bind(this));

        google.maps.event.addListener(this.map, 'mouseup', function (event) {
            clearTimeout(id);
        });
    }

    createMap(position) {
        this.map = new google.maps.Map(document.getElementById('runnerMap'), {
            center: position,
            zoom: 18,
            minZoom: 16,
            maxZoom: 20,
            disableDefaultUI: true,
            mapTypeId: 'terrain',
            styles: this.mapStyle.getRetroModel()

        }); 
    }

    createMarker(position) {
        this.marker = new google.maps.Marker({
            map: this.map,
            position: position,
            title: 'Me'
        });
    }

    success(position) {
        if (!this.map) {
            this.createMap(position);
            this.createMarker(position);
            this.onLongClick();
            var geocoder = new google.maps.Geocoder;
            var infowindow = new google.maps.InfoWindow;
            this.geocodePosition(geocoder, this.map, infowindow, position);
            return;
        }

        this.map.panTo(position);
        this.marker.setPosition(position);
    }

    error() {
        this.snackBar.display("Erreur de runnerMap",function(event) {});
    }

    geocodePosition(geocoder, map, infowindow, position) {

        geocoder.geocode({
            'location': position
        }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, this.marker);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    };

}