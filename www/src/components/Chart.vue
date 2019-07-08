<template>
    <div id="app-chart">
        <div id="chart-container">I'm a chart</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {
        },
    })
    export default class Chart extends Vue {
    }
</script>

<style lang="scss">
    #app-chart {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        justify-content: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        align-items: center;
        width: 100%;
        height: 50%;
        flex-wrap: wrap;
    }
    #chart-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    
</style>
