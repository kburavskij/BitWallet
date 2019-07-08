class App {
    constructor() {
        this.port = 5500;
        this.io = require('socket.io')();
        this.ioClient = require('socket.io-client');
        this.poloniexConnect = this.ioClient.connect('http://localhost:5505');
        this.binanceConnect = this.ioClient.connect('http://localhost:5510');
        this.compareConnect = this.ioClient.connect('http://localhost:5515');
        this.totalBalance = { BTC: "", ETH: "", XRP: "" }
    };

    run() {
        this.setListeners();
        this.listen();
    }

    /**
     * Set sockets.io listeners
     */
    setListeners() {

        /**
         * Socket connection
         */
        this.io.on( 'connection', socket => {

            /**
             * On receiving the key - two emit are executed to Poloniex/Binance server and a request to CryptoCompare server.
             */
            socket.on( 'setApiKeysPoloniex', ( apiKey ) => {
                console.log( "User set Poloniex apikey: " + JSON.stringify(apiKey) );
                this.poloniexConnect.emit( 'apiKey' , apiKey);
                this.compareConnect.emit( 'getPrices');
            });
            socket.on( 'setApiKeysBinance', ( apiKey ) => {
                console.log( 'User set Binance apikey: ' + JSON.stringify(apiKey) );
                this.binanceConnect.emit( 'apiKey' , apiKey);
                this.compareConnect.emit( 'getPrices');
            });

            /**
             * Upon receiving the balance from Poloniex/Binance server, we store them using unary + operator.
             */
            socket.on( 'balancePoloniex', ( balances ) => {
                this.totalBalance.BTC = +this.totalBalance.BTC + +balances.BTC;
                this.totalBalance.ETH = +this.totalBalance.ETH + +balances.ETH;
                this.totalBalance.XRP = +this.totalBalance.XRP + +balances.XRP;
            });

            socket.on( 'balanceBinance', ( balances ) => {
                this.totalBalance.BTC = +this.totalBalance.BTC + +balances.BTC.available;
                this.totalBalance.ETH = +this.totalBalance.ETH + +balances.ETH.available;
                this.totalBalance.XRP = +this.totalBalance.XRP + +balances.XRP.available;
            });

            /**
             * Listen for disconnect
             */
            socket.on( 'disconnect', () => {
                console.log( 'User disconnected' );
                this.compareConnect.emit( 'disconnect' );
            });

        });

    }

    /**
     * Start server
     */
    listen() {
        this.io.listen( this.port );
        console.log( `Sockets running on port: ${ this.port }` );
    }

}

const app = new App();
app.run();
