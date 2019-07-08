class PoloniexApp{
    constructor(){
        this.port = 5505;
        this.io = require('socket.io')();
        this.ioClient = require('socket.io-client');
        this.rootConnect = this.ioClient.connect('http://localhost:5500');
        this.Poloniex = require('poloniex-api-node');
    }

    run() {
        this.listen();
        this.setListeners();
    }

    setListeners() {

        /**
         * Upon receiving apiKey from root_server we input it into Polonex object, call the returnBalances() function
         * and emit back the list of available balance units.
         */
        this.io.on( 'connection', ( socket ) => {
            socket.on( 'apiKey', apikey => {
                this.poloniex = new this.Poloniex( apikey.apiKey, apikey.apiSecret, { socketTimeout: 15000 });
                this.poloniex.returnBalances(( error, balances ) => {
                    if( error ){
                        this.rootConnect.emit( 'error', error );
                    }
                    this.rootConnect.emit( 'balancePoloniex', balances );
                });
            });
        });

    }

    listen() {
        this.io.listen( this.port );
    }

}

const poloniexApp = new PoloniexApp();
poloniexApp.run();
