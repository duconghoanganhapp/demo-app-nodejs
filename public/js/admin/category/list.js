import { messageDelete, messageExcel, messageSuccess, messageError } from '../../module.js';
$(document).ready( function() {
    $('.btn-category-del').click(function() {
        var value = $(this).parent().parent().attr('id');
          var id = value.slice(4); 
          var url = '/category/delete'  
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
                messageError(infoMessage.fail)
                break;
        }
    }
});