(() => {

    /******************************* REQUIRES *********************************/
    const yargs = require('yargs');
    /**************************************************************************/

    // pull in the yargs argument vector and commands
    let commands = yargs.argv._;
    let argv = yargs.argv;

    switch(commands[0]) {
        case 'build':
            console.log('Building!');
            let modeConfig = require('./webpack/config/' + ((argv.d || argv.development) ? 'dev' : 'prod') + '.config.js');
            let config = require('webpack-merge')(require('./webpack/config/base.config.js'), modeConfig);

            require("webpack")(config).run((err, stats) => {
                if (err) {
                    console.error(err.stack || err);

                    if (err.details) {
                      console.error(err.details);
                    }

                    return;
                }

                const info = stats.toJson();

                if (stats.hasErrors()) {
                    console.error(info.errors);
                }

                if (stats.hasWarnings()) {
                    console.warn(info.warnings);
                }
            });
            break;
        default:

    }
})();
