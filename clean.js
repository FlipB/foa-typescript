#!/usr/bin/env node

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

var fs = require('fs');
var path = require('path');
var rimraf  = require('rimraf');

var filepath = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(filepath)) {
    rimraf(filepath,function(){
        process.exit(0);
    });
}
