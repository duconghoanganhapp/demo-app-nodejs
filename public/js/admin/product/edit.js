$(document).ready(function () {
    const ZERO = 0;
    const STREMPTY = '';

    $("#btnReset").click(function () {
        let $myForm = $("#myForm");
        $myForm
            .find('input[type=text], input[type=password], input[type=file], select, textarea')
            .attr('value', '')
            .text(STREMPTY);
        $myForm
            .find('input[type=number]')
            .attr('value', ZERO);
        $myForm
            .find('input[type=radio], input[type=checkbox]')
            .removeAttr('checked')
            .removeAttr('selected');
        $('#img-change').attr('src', '../../img/img-none.png');
        $('#file-upload').val('');
    });

    $("#file-upload").change(function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                $('#img-change').attr('src', event.target.result);
            };
            reader.readAsDataURL(this.files[0]);
        }
        const filename = $('#file-upload').val().replace(/C:\\fakepath\\/i, '');

        //Set name to file upload info
        if (filename !== STREMPTY) {
            $('.file-upload-info').text(filename);
        }
    })
});