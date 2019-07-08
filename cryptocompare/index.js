class CryptoApp{
    constructor(){
        this.port = 5515;
        this.io = require('socket.io')();
        this.ioClient = require('socket.io-client');
        this.rootConnect = this.ioClient.connect('http://localhost:5500');
        global.fetch = require('node-fetch');
        this.cc = require('cryptocompare');
        this.cc.setApiKey('65fdc70b10f968af122c88c19c80b911cda3895dc226c7c4a4c609d474501c6c');
    }

    run(){
        this.setListeners();
        this.listen();
    }

    /**
     * When socket connects, this function is initialized and streams the price list every 500ms.
     */
    getPrices(){
        this.cc.priceMulti('BTC,ETH,XRP',['USD'])
            .then(prices => {
                console.log(prices);
                this.rootConnect.emit( 'setPrices', prices );
            })
            .catch( error => {
                this.rootConnect.emit( 'error', error )});

        setTimeout(() => this.getPrices(), 500);
    }


    /**
     * Connection listeners for connection, prices request and disconnection.
     */
    setListeners(){

        this.io.on( 'connection', ( socket ) => {
            socket.on( 'getPrices', () => {
                    this.getPrices();
            });

            socket.on( 'disconnect', () => {
                console.error(error);
            });
        });

    }

    listen() {
        this.io.listen( this.port );
    }

}

const cryptoApp = new CryptoApp();
cryptoApp.run();
