import { messageDelete, messageSuccess, messageError } from '../../module.js';
$(document).ready(function(){
    $('.btn-product-del').click(function() {
        var value = $(this).parent().parent().attr('id');
        var id = value.slice(4);
        var url = '/product/delete';
        messageDelete(id, value, url);
    });
    if ($('#infoMessage').val()) {
        var infoMessage = JSON.parse(atob($('#infoMessage').val()));
        var indexObject = Object.keys(infoMessage);
        switch(indexObject[0].toLowerCase()){
            case 'success': 
                messageSuccess(infoMessage.success);
                break;
            case 'fail': 
                messageError(infoMessage.fail);
                break;
        }
    }
    $('#import-csv').change(function () {
        this.form.submit();
    })
});