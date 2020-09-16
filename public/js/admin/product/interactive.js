var app = new Vue({
    el: '#app',
    data: {
        user1: 0,
        user2: 0,
        running: false
    },
    computed: {
    },
    methods: {
        runningApp: function () {
            this.user1 = 100;
            this.user2 = 100;
            this.running = true;
        },
        action: function () {
            if (this.user1 <= 0) {
                alert('User1 out!');
                this.running = false;
            }
            if (this.user2 <= 0) {
                alert('User2 out!');
                this.running = false;
            }
            //user1
            var max = 4;
            var min = 1;
            var actionUser1 = Math.max(Math.floor(Math.random() * max) + 1, min);
            this.user2 -= actionUser1;

            //user2
            var max = 6;
            var min = 0;
            var actionUser1 = Math.max(Math.floor(Math.random() * max) + 1, min);
            this.user1 -= actionUser1;
        }
    },
    watch: {
    }

});