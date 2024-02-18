<!-- src/components/Tangle/AlertSection.vue-->

<template>
    <v-alert v-model="localShow" :type="type" dismissible @click:close="closeAlert">
        {{ message }}
        <span v-if="showCountdown"> (Desaparecerá en {{ countdown }} segundos)</span>
    </v-alert>
</template>

<script>
export default {
    name: "AlertSection",
    props: {
        show: Boolean,
        message: String,
        type: {
            type: String,
            default: "info" // 'success', 'info', 'warning', 'error'
        },
        duration: {
            type: Number,
            default: 5000
        }
    },
    data() {
        return {
            localShow: false,
            countdown: 0,
            showCountdown: false,
            timer: null,
        };
    },
    watch: {
        show(newVal) {
            if (newVal) {
                this.startCountdown();
            }
        },
        localShow(newVal) {
            if (!newVal) {
                this.clearTimer();
            }
        }
    },
    methods: {
        startCountdown() {
            this.localShow = true;
            this.countdown = this.duration / 1000;
            this.showCountdown = true;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    this.closeAlert();
                }
            }, 1000);
        },
        closeAlert() {
            this.$emit('update:show', false);
            this.localShow = false;
        },
        clearTimer() {
            clearInterval(this.timer);
            this.showCountdown = false;
        }
    },
    beforeUnmount() {
        this.clearTimer();
    },
    mounted() {
        if (this.show) {
            this.startCountdown();
        }
    }
};
</script>