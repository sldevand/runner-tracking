var locator = (function () {

    /**
     * @type (Number) geolocation id
     */
    var id;

    /**
     * @type (Object) position object
     */
    var position;

    /**
     * @type (Function) success callback
     */
    var successCallback = function (event) {        
        position = {
            lat: event.coords.latitude,
            lng: event.coords.longitude
        };
        this(position);        
    };

    /**
     * @returns (Object) locator module
     */
    return {
        /**
        * @type (Function) current position
        */
        current: function (success, error, option) {
            return navigator.geolocation.getCurrentPosition(successCallback.bind(success), error, option);
        },
        /**
        * @type (Function) current position
        */
        watch: function (success, error, option) {
            return navigator.geolocation.watchPosition(successCallback.bind(success), error, option);
        },
        clear: function () {

        },
        /**
         * @returns (Object) position object
         */
        getPosition: function () {
            return position;
        }
    };

})();