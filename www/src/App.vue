<template>
    <div id="app">
        <Chart></Chart>

        <div class="button-container">
            <button class="button" v-for="( item, index ) in services" :key="index" @click="sendApiKey( item.name )" > {{ item.name }}</button>
        </div>
        <div class="box-container">I'm a box</div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Chart from '@/components/Chart.vue';

    @Component( {
        sockets: {
            connect() {
                console.log('sockets connected..');
            }
        },
        components: {
            Chart,
        },
    } )
    export default class App extends Vue {
        private services: any = {
            "binance": { name: "binance", apiKey: "", apiSecret: "" },
            "poloniex": { name: "poloniex", apiKey: "", apiSecret: "" }
        };

        /**
         * Function that is being triggered upon clicking on one of the boxes. Two prompt() requests are being
         * triggered upon clicking. When both entered - box is being locked.
         */
        public sendApiKey( serviceName: string ): boolean {
            let service: any = this.services[ serviceName ];

            if ( service ) {
                if ( service.apiKey.length <= 0 ) {
                    let firstInput = prompt( 'Enter your API key', 'VSH3E4BP-LLI0J1G0-1YQGHR1W-1LS1AYVW' );
                    let secondInput = prompt( 'Enter your API secret key', '77da207941de2de6fe6fa1083af4d98d29a3358240a541313080f681fffef5a8e57c4ad627c3a9c3020d6056120d91d98885958acf1eff2b7d966e719abf8f49' );

                    if ( !firstInput || firstInput.length <= 1 || !secondInput || secondInput.length <= 1){
                        return false;
                    }

                    service.apiKey = firstInput;
                    service.apiSecret = secondInput;

                    if ( serviceName === 'binance' ) {
                        this.$socket.emit('setApiKeysBinance', service);
                        // this.$socket.emit('getPrices');
                    }else if ( serviceName === 'poloniex' ) {
                        this.$socket.emit('setApiKeysPoloniex', service);
                        // this.$socket.emit('getPrices');
                    }
                }
            }

            return true;
        }
    }
</script>

<style lang="scss">
    @import "styles/settings";
    @import "styles/default";

    #app {
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
        padding: 20px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 100%;
        height: 100%;
        flex-wrap: wrap;
    }

    .button-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20%;
        width: 100%;

        .button {
            width: 20%;
            height: 60%;
            margin: 5%;
        }
    }

    .box-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20%;
        width: 100%;
    }
</style>
