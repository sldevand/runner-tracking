export class RunnerWay{

    constructor(){
        this.directionsDisplay = new google.maps.DirectionsRenderer();
    }

    onInit(){
        document.getElementById("clear").addEventListener('click',(e) => this.clear());
    }

    onPlay(){

    }

    onPause(){

    }

    trace(event,runnerMap){ 
        this.directionsDisplay.setMap(runnerMap.map);

        var directionsService = new google.maps.DirectionsService();
        var selectedMode = google.maps.TravelMode["WALKING"];

        var request = {
            origin: runnerMap.marker.position,
            destination: event.latLng,
            travelMode: selectedMode
        };
      
        directionsService.route(request, (response, status) => {            
            if ("OK" === status) {
                this.directionsDisplay.setDirections(response);
                document.getElementById("clear").style.display = "block";
                return;
            }            
            runnerMap.snackBar.display("Erreur de tracé : le serveur ne répond pas",(event) => {});
        });
    }

    clear(){
        this.directionsDisplay.setMap(null);
        document.getElementById("clear").style.display = "none";
    }

}


