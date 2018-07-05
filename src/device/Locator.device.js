export class Locator {

    constructor(){
        console.log("Locator constructor");
    }

    current(success, error, option){
        console.log( navigator.geolocation);
        
      
        return navigator.geolocation.getCurrentPosition(this.successCallback.bind(success), error, option);
    }

    watch(success, error, option){
        console.log( navigator.geolocation);
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