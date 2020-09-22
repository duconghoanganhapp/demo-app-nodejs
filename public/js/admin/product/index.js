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

var app = new Vue({
    el: '#app',
    data: {
        title: 'Welcome articles,..',
        body: 'Text_Body',
        link: 'http://127.0.0.1:3000/articles',
        product: '<a href="http://127.0.0.1:3000/product">Go to Product</a>',
        quantity: 0,
        x: 0,
        y: 0,
        keyModifiesData: '',
        quantityA: 0,
        quantityB: 0,
        mark: 'Mark is 7 points',
        seen: false,
        isActive: true,
        isActiveSh: true,
        categories: [
            { name: 'book' },
            { name: 'pen' },
            { name: 'ruler' },
        ],
        msg: 'msg orig',
        processRed: false,
        color: 'yellow',
        width: 50,
        height: 40,
        menus: ['Salad', 'Chicken', 'Fish'],
        showParagraph: false,
        sentence: 'First sentence'
    },
    computed: {
        addQuantityA: function () {
            console.log('addA');
            return this.quantityA;
        },
        addQuantityB: function () {
            console.log('addB');
            return this.quantityB;
        },
        divClasses: function () {
            return {
                red: this.processRed,
                blue: !this.processRed
            }
        },
        cusStyle: function () {
            return {
                backgroundColor: this.color,
                width: this.width + 'px',
                height: this.height + 'px'
            }
        }
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
        },
        toggleActive: function() {
            if(this.isActive == true) {
                this.isActive = false
            }
            else {
                this.isActive = true
            }
        },
        changeMsg: function () {
            this.msg = 'change msg!!!';
        },
        showParagraphAction: function () {
            this.showParagraph = true;
            this.updateSentence('Why do we use it?');
            app2.sentence = 'Change app2 sentence!'
        },
        updateSentence: function (text) {
            this.sentence = text;
        }
    },
    watch: {
        mark: function () {
            console.log("------------START CONSOLE LOG WATCH------------");
            console.log('Mark was changed');
            console.log("------------END CONSOLE LOG------------");
        },
        sentence: function (value) {
            alert('Sentence will be changed to ' + value);
        }
    }



});

var app2 = new Vue({
    el: '#app2',
    data: {
        sentence: 'Second sentence!',
    }
});

app.mark = 'Mark is 9 points';
console.log(app.mark);