import {
    messageSuccess, 
    messageError,
    messageWarning
} from './module.js';

export const MESSAGE_FLG = {
    'success': 0,
    'error': 1,
    'warning': 2,
}

export const DEFAULT_FILE_SIZE = 4*1024*1024; //MB


$(document).ready(function() {
    if(window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // Initialize Editor Elements
    $('.textarea').summernote({
        height: 500
    });

    // Initialize Select2 Elements
    $('.select2').select2({
        theme: 'bootstrap4'
    });

    //Initialize Date Range Picker Elements
    $('.date-range-picker').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD'
        },
        singleDatePicker: true
    });

    // Handle Message Notification
    handleMessages();
});

export const handleMessages = () => {
    let objMessage = $('#handle-message').attr('data-handle-message');
    if(typeof objMessage == 'string' && !isEmpty(objMessage)) {
        objMessage = JSON.parse(objMessage);
    }
    if(!isEmpty(objMessage)) {
        switch(objMessage.status) {
            case MESSAGE_FLG.success:
                messageSuccess(objMessage.message);
                break;
            case MESSAGE_FLG.error:
                messageError(objMessage.message);
                break;
            case MESSAGE_FLG.warning:
                messageWarning(objMessage.message);
                break;
        }
    }
}

export const setObjMessage = (status, message) => {
    let obj = {
        status: status,
        message: message
    }
    return obj;
}

const isEmpty = (val) => {
    if(typeof val == 'object') {
        return $.isEmptyObject(val);
    }
    return typeof val == 'undefined' || val == '' || val == null || val.length <= 0;
}