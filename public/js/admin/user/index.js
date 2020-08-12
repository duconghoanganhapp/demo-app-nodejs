import { messageDelete, messageExcel, messageSuccess, messageError } from '../../module.js';

$(document).ready(function() {
    $('.btn-user-del').click(function() {
        var value = $(this).parent().parent().attr('id');
          var id = value.slice(4);   
          var url = '/user/delete';
          messageDelete(id, value, url);
    });
    if ($('#MessageErrorsExcel').val() !== undefined) {
        messageExcel($('#MessageErrorsExcel').val());
    }
    if ($('#successExcel').val() !== undefined) {
        messageSuccess($('#successExcel').val());
    }
    if ($('#failExcel').val() !== undefined) {
        messageError($('#failExcel').val());
    }
    
    if ($('#wrongFile').val() !== undefined) {
       alert($('#wrongFile').val());
    }
});
