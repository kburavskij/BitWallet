class BinanceApp{
    constructor(){
        this.port = 5510;
        this.io = require('socket.io')();
        this.ioClient = require('socket.io-client');
        this.rootConnect = this.ioClient.connect('http://localhost:5500');
        this.binance = require('node-binance-api')();
    }

    run(){
        this.listen();
        this.setListeners();
    }

    setListeners(){

        /**
         * Upon receiving apiKey from root_server, it is being input into Binance options(), followed by
         * balance() function that returns the prices and the sends them to root_server.
         */
        this.io.on( 'connection', ( socket ) => {
            socket.on( 'apiKey', apikey => {
                this.binance.options({
                    APIKEY: apikey.apiKey,
                    APISECRET: apikey.apiSecret,
                    useServerTime: true,
                    recvWindow: 60000,
                    verbose: true,
                    // log: log => { console.log( log );}
                }).balance(( error, balances ) => {
                    if( error ){
                        this.rootConnect.emit( 'error', error );
                    }
                    this.rootConnect.emit( 'balanceBinance', balances );
                    console.log(balances.BTC.available);
                    console.log(balances.ETH.available);
                    console.log(balances.XRP.available);
                })

            });
        });

    }

    listen() {
        this.io.listen( this.port );
    }

}

const binanceApp = new BinanceApp();
binanceApp.run();
