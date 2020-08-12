import {
    handleMessages,
    setObjMessage,
    DEFAULT_FILE_SIZE
} from '../../common.js';

$(document).ready(function() {
    $('#file-img').on('change', function() {
        readFileImg($(this)[0].files[0]);
    });
    $('#rm-file').on('click', function() {
        $('.show-file').addClass('d-none');
        $('.custom-file-label').html('Choose file');
        $('#file-img').val('');
        $('#file-src').attr('src', null);
        $('#rm-file').addClass('d-none');
    });
});

function readFileImg(input) {
    let file = input;
    if(!file) {
        $('.custom-file-label').html('Choose file');
        return;
    }
    let fileName = file.name.split('.').shift();
    if(checkFileImg(file)) {
        $('.custom-file-label').html(fileName);
        $('#rm-file').removeClass('d-none');
        let fileReader = new FileReader();
        fileReader.onload = function(event) {
            $('.show-file').removeClass('d-none');
            $('#file-src').attr('src', event.target.result);
        }
        fileReader.readAsDataURL(file);
    } else {
        $('#file-img').val('');
    }
}

function checkFileImg(file) {
    let objMessage = {};
    let flg = true;
    let fileExt = file.name.split('.').pop();
    let fileSize = file.size;
    // Check file extension
    switch(fileExt) {
        case 'png':
            break;
        case 'jpg':
            break;
        case 'jpeg':
            break;
        default: 
            flg = false;
            objMessage =  setObjMessage(2, 'File image allowed extensions are png | jpg | jpeg');
            $('#handle-message').attr('data-handle-message', JSON.stringify(objMessage));
            handleMessages();
            return flg;
    }
    // Check file size
    if(fileSize > DEFAULT_FILE_SIZE) {
        flg = false;
        objMessage = setObjMessage(2, 'File image limit 4 MB');
        $('#handle-message').attr('data-handle-message', JSON.stringify(objMessage));
        handleMessages();
    }
    return flg;
}