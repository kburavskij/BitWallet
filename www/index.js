class App {
    constructor() {
        this.port = 8080;
        this.express = require( 'express' );
        this.app = this.express();
    }

    /**
     * Run express server
     */
    run() {
        this.setRoutes();
        this.listen();
    }

    /**
     * Set www routes
     */
    setRoutes() {
        this.app.get( '/', ( req, res ) => {
            res.sendFile( `${ __dirname }/dist/index.html` );
        } );

        this.app.get( '/*', ( req, res ) => {
            res.sendFile( `${ __dirname }/dist${ req.originalUrl }` );
        } );
    }

    /**
     * Start server
     */
    listen() {
        this.app.listen( this.port, () => {
            console.log( `Server running on port: ${ this.port }` );
        } );
    }
}

const app = new App();
app.run();
