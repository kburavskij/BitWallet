class KrakenApp{
    constructor(){
        this.kraken = require('node-kraken-api');
        this.config = require('./config.json');
        this.api = this.kraken({
            key: this.config.key,
            secret: this.config.secret,
            tier: '0',
            parse: { dates: false }
        });
    }

    /**
     * Hard coded apiKey/apiSecret call to Kraken API to fetch the data.
     * Failed try, because of the same reason as most of cryptocurrency API's - no deposit was yet made.
     */
    call(){
        api.call('Depth', { pair: 'XXBTZUSD', count: 1 })
            .then(data => {console.log(JSON.stringify(data))})
            .catch(err => console.error(err));

        api.call('TradeBalance', {asset: 'XBT'})
            .then((result) => {console.log('Balance:', result)})
            .catch((error) => {console.log('Error:', error.message)});
    }

}

const krakenApp = new KrakenApp();
krakenApp.call();



