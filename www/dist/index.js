(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RunnerMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _locator = require('../device/locator.device');

var _snackBar = require('./snack-bar.component');

var _runnerWay = require('./runner-way.component');

var _mapStyle = require('../models/map-style.model');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunnerMap = exports.RunnerMap = function () {
    function RunnerMap() {
        _classCallCheck(this, RunnerMap);

        this.locator = new _locator.Locator();
        this.snackBar = new _snackBar.SnackBar();
        this.mapStyle = new _mapStyle.MapStyle();
        this.runnerWay = new _runnerWay.RunnerWay();
        this.map;
    }

    _createClass(RunnerMap, [{
        key: 'onInit',
        value: function onInit() {
            this.locator.watch(this.success.bind(this), this.error.bind(this));
        }
    }, {
        key: 'onPlay',
        value: function onPlay() {}
    }, {
        key: 'onPause',
        value: function onPause() {}
    }, {
        key: 'onLongClick',
        value: function onLongClick() {
            var _this = this;

            var id;
            google.maps.event.addListener(this.map, 'mousedown', function (event) {
                id = setTimeout(_this.runnerWay.trace.bind(_this.runnerWay, event, _this), 500);
            });

            google.maps.event.addListener(this.map, 'mouseup', function (event) {
                clearTimeout(id);
            });
        }
    }, {
        key: 'createMap',
        value: function createMap(position) {
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
    }, {
        key: 'createMarker',
        value: function createMarker(position) {
            this.marker = new google.maps.Marker({
                map: this.map,
                position: position,
                title: 'Me'
            });
        }
    }, {
        key: 'success',
        value: function success(position) {

            if (!this.map) {
                this.createMap(position);
                this.createMarker(position);
                this.onLongClick();
                var geocoder = new google.maps.Geocoder();
                var infowindow = new google.maps.InfoWindow();
                this.geocodePosition(geocoder, this.map, infowindow, position);
                return;
            }

            this.map.panTo(position);
            this.marker.setPosition(position);
        }
    }, {
        key: 'error',
        value: function error() {
            this.snackBar.display("Erreur de runnerMap", function (event) {});
        }
    }, {
        key: 'geocodePosition',
        value: function geocodePosition(geocoder, map, infowindow, position) {
            var _this2 = this;

            console.log(this);

            geocoder.geocode({
                'location': position
            }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, _this2.marker);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }
    }]);

    return RunnerMap;
}();

},{"../device/locator.device":5,"../models/map-style.model":7,"./runner-way.component":3,"./snack-bar.component":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RunnerTracking = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _runnerMap = require('./runner-map.component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunnerTracking = exports.RunnerTracking = function () {
    function RunnerTracking() {
        _classCallCheck(this, RunnerTracking);

        this.runnerMap = new _runnerMap.RunnerMap();
    }

    _createClass(RunnerTracking, [{
        key: 'run',
        value: function run() {
            this.runnerMap.onInit();
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            var _this = this;

            window.cordova ? document.addEventListener('deviceready', function (e) {
                _this.run();
            }) : this.run();
        }
    }]);

    return RunnerTracking;
}();

},{"./runner-map.component":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunnerWay = exports.RunnerWay = function () {
    function RunnerWay() {
        _classCallCheck(this, RunnerWay);

        this.directionsDisplay = new google.maps.DirectionsRenderer();
    }

    _createClass(RunnerWay, [{
        key: "onInit",
        value: function onInit() {
            var _this = this;

            document.getElementById("clear").addEventListener('click', function (e) {
                return _this.clear();
            });
        }
    }, {
        key: "onPlay",
        value: function onPlay() {}
    }, {
        key: "onPause",
        value: function onPause() {}
    }, {
        key: "trace",
        value: function trace(event, runnerMap) {
            var _this2 = this;

            this.directionsDisplay.setMap(runnerMap.map);

            var directionsService = new google.maps.DirectionsService();
            var selectedMode = google.maps.TravelMode["WALKING"];

            var request = {
                origin: runnerMap.marker.position,
                destination: event.latLng,
                travelMode: selectedMode
            };

            directionsService.route(request, function (response, status) {
                if ("OK" === status) {
                    _this2.directionsDisplay.setDirections(response);
                    document.getElementById("clear").style.display = "block";
                    return;
                }
                runnerMap.snackBar.display("Erreur de tracé : le serveur ne répond pas", function (event) {});
            });
        }
    }, {
        key: "clear",
        value: function clear() {
            this.directionsDisplay.setMap(null);
            document.getElementById("clear").style.display = "none";
        }
    }]);

    return RunnerWay;
}();

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnackBar = exports.SnackBar = function () {
    function SnackBar() {
        _classCallCheck(this, SnackBar);
    }

    _createClass(SnackBar, [{
        key: 'display',
        value: function display(msg, handler) {
            var snackbarContainer = document.querySelector('#demo-snackbar-example');
            var data = {
                message: msg,
                timeout: 3000,
                actionHandler: handler,
                actionText: 'Retry'
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }]);

    return SnackBar;
}();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Locator = exports.Locator = function () {
    function Locator() {
        _classCallCheck(this, Locator);
    }

    _createClass(Locator, [{
        key: "current",
        value: function current(success, error, option) {
            return navigator.geolocation.getCurrentPosition(this.successCallback.bind(success), error, option);
        }
    }, {
        key: "watch",
        value: function watch(success, error, option) {
            return navigator.geolocation.watchPosition(this.successCallback.bind(success), error, option);
        }
    }, {
        key: "getPosition",
        value: function getPosition() {
            return this.position;
        }
    }, {
        key: "successCallback",
        value: function successCallback(event) {
            this.position = {
                lat: event.coords.latitude,
                lng: event.coords.longitude
            };
            this(this.position);
        }
    }]);

    return Locator;
}();

},{}],6:[function(require,module,exports){
'use strict';

var _runnerTracking = require('./components/runner-tracking.component');

var app = new _runnerTracking.RunnerTracking();
app.initialize();

},{"./components/runner-tracking.component":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapStyle = exports.MapStyle = function () {
  function MapStyle() {
    _classCallCheck(this, MapStyle);
  }

  _createClass(MapStyle, [{
    key: "getRetroModel",
    value: function getRetroModel() {
      return [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      }, {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      }, {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      }, {
        "featureType": "administrative.neighborhood",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      }, {
        "featureType": "poi.business",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
          "visibility": "on"
        }]
      }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#e9bc62"
        }]
      }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      }, {
        "featureType": "transit",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      }, {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      }, {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
      }];
    }
  }]);

  return MapStyle;
}();

},{}]},{},[6]);
