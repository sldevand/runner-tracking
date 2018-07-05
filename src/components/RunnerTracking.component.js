import {RunnerMap} from './RunnerMap.component';

export class RunnerTracking{

    constructor(){
        this.runnerMap = new RunnerMap;
    }

    run(){
       this.runnerMap.onInit(); 
    }

    initialize(){
        window.cordova ?
        document.addEventListener('deviceready', this.run) : this.run()
    }
}
