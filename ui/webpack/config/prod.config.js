(() => {
    'use strict';

    module.exports = {
        devtool: 'source-map',
        mode: 'production',
        output: {
            filename: '[name].min.bundle.js',
        },
    };
})();
