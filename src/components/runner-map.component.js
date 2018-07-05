import {Locator} from '../device/locator.device';
import {SnackBar} from './snack-bar.component';
import {RunnerWay} from './runner-way.component';
import {MapStyle} from '../models/map-style.model';

export class RunnerMap {

    constructor() {
        this.locator = new Locator;
        this.snackBar = new SnackBar;
        this.mapStyle = new MapStyle;
        this.runnerWay = new RunnerWay;
    }

    onInit() {
        this.locator.watch(this.success.bind(this), this.error.bind(this));
    }

    onPlay() {

    }

    onPause() {

    }

    onLongClick() {
        var id;
        google.maps.event.addListener(this.map, 'mousedown', (event) => {
            id = setTimeout(this.runnerWay.trace.bind(this.runnerWay, event, this), 500);
        });

        google.maps.event.addListener(this.map, 'mouseup', (event) => {
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
        this.runnerWay.onInit();
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
        this.snackBar.display("Erreur de runnerMap", (event) => {});
    }

    geocodePosition(geocoder, map, infowindow, position) {
        geocoder.geocode({
            'location': position
        }, (results, status) => {
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