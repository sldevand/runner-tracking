export class SnackBar {

    display(msg, handler) {
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