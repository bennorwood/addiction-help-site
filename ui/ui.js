(() => {

    /******************************* REQUIRES *********************************/
    const yargs = require('yargs');
    /**************************************************************************/

    // pull in the yargs argument vector and commands
    let commands = yargs.argv._;
    let argv = yargs.argv;

    let errHandler = (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            console.log('');

            if (err.details) {
              console.error(err.details);
              console.log('');
            }

            return;
        }

        console.log(stats.toString());
        console.log('');
    };

    switch(commands[0]) {
        case 'watch':
            let watchConfig = require('webpack-merge')(require('./webpack/config/base.config.js'), require('./webpack/config/dev.config.js'));
            require('webpack')(watchConfig).watch({ignored: /node_modules/}, errHandler);
            break;
        case 'build':
            console.log('Building!');
            let modeConfig = require('./webpack/config/' + ((argv.d || argv.development) ? 'dev' : 'prod') + '.config.js');
            let config = require('webpack-merge')(require('./webpack/config/base.config.js'), modeConfig);
            require('webpack')(config).run(errHandler);
            break;
        default:

    }
})();
