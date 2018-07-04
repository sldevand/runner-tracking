var runnerTracking = (function () {
   
    function run() {

        // if(cordova.plugins.diagnostic){
        //     snackBar.display("Coucou",function(e){});
        //     return;  
        // }    

        runnerMap.onInit();           
    };

    return {
        initialize: function () {
            return window.cordova ?
            document.addEventListener('deviceready', run) : run();
        }
    };
})();