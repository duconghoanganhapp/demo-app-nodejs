var app = new Vue({
    el: '#app',
    data: {
        user1: 0,
        user2: 0,
        running: false,
        turns: []
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
            this.checkStatus();
            //user1
            this.user2Action();

            //user2
            let user2ProAc = this.mathAction(1, 8);
            this.user2 -= user2ProAc;

            this.turns.unshift({
                isPlayer: false,
                textLog: 'User1 action user2' + user2ProAc,
            })
        },
        specificAction: function() {
            this.checkStatus();
            //user1
            this.user2Action();

            //user2
            this.user2 -= this.mathAction(10, 20);
        },
        reserve: function () {
            if (this.user1 > 70) {
                return false;
            } else if(this.user1 <= 60) {
                this.user1 += 10;
            } else {
                this.user1 = 70;
            }
        },
        checkStatus: function () {
            if (this.user1 <= 0) {
                alert('User1 out!');
                this.running = false;
            }
            if (this.user2 <= 0) {
                alert('User2 out!');
                this.running = false;
            }
        },
        mathAction: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        user2Action: function () {
            //user2
            this.user1 -= this.mathAction(0, 6);
            this.checkStatus();
        },
        giveUp: function () {
            this.running = false;
            alert('restart');
        }
    },
    watch: {
    }

});