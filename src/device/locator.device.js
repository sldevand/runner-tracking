export class Locator {

    current(success, error, option){    
        return navigator.geolocation.getCurrentPosition(this.successCallback.bind(success), error, option);
    }

    watch(success, error, option){        
        return navigator.geolocation.watchPosition(this.successCallback.bind(success), error, option);
    }

    getPosition(){
        return this.position;
    }

    successCallback(event){
        this.position = {
            lat: event.coords.latitude,
            lng: event.coords.longitude
        };
        this(this.position);         
    }
}