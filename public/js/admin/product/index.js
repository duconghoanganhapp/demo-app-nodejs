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

new Vue({
    el: '#obj',
    data: {
        title: 'Welcome articles,..',
        body: 'text_Body',
        link: 'http://127.0.0.1:3000/articles',
        product: '<a href="http://127.0.0.1:3000/product">Go to Product</a>',
        quantity: 0,
        x: 0,
        y: 0,
        keyModifiesData: ''
    },
    methods: {
        changeTitle: function (event) {
            this.data_demo = event.target.value;
        },
        showDataVueJS: function () {
            return this.body;
        },
        updateTitle: function () {
            this.title = 'Redirect Acticles!';
            return this.title;
        },
        addQuantity: function () {
            this.quantity ++;
        },
        locationMouse: function (event) {
            this.x = event.x;
            this.y = event.y;
        },
        stopLocationMouse: function (event) {
            event.stopPropagation();
        },
        alertKeyModifies: function () {
            alert(this.keyModifiesData);
        }
    }
});