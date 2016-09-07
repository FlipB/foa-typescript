/**
 * Copyright (c) 2016 Tiinusen
 * 
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 * 
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-typescript
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */

let Mocha = require('mocha');
let path = require('path');
let mocha = new Mocha({
    'slow': 500,
    'timeout': 15000,
    'ui': 'exports'
});

mocha.addFile(path.resolve(__dirname, 'dist', 'test.js'));
mocha.run(function(failures){
   process.exit(failures); 
});