var snackBar = (function(){

    /**
     * @returns (Object) snackBar module
     */
     return {
        display : function(msg,handler){
            'use strict';
            var snackbarContainer = document.querySelector('#demo-snackbar-example');
            var data = {
                message: msg,
                timeout: 3000,
                actionHandler: handler,
                actionText: 'Retry'          
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
        onInit : function(){

        } 
     };
 
 })();