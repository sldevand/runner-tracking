export class SnackBar{

    constructor(){
        console.log("SnackBar constructor");
    }

    display(msg,handler){
        let snackbarContainer = document.querySelector('#demo-snackbar-example');
        let data = {
            message: msg,
            timeout: 3000,
            actionHandler: handler,
            actionText: 'Retry'          
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }

}