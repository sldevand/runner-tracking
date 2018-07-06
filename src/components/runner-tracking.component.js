import {RunnerMap} from './runner-map.component';

export class RunnerTracking{

    constructor(){
        this.runnerMap = new RunnerMap;
    }

    run(){
       this.runnerMap.onInit(); 
    }

    initialize(){
        window.cordova ?
        document.addEventListener('deviceready', (e) => {
            this.run();
        }) : this.run();
    }
}
