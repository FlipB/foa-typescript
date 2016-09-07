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

var util = require('util');
var path = require("path");
var spawn = require('child_process').spawn;
function exec(cmd, params, statusFail, cwd) {
    params = typeof params !== 'object' ? [] : params;
    statusFail = typeof statusFail !== 'boolean' ? false : statusFail;
    cwd = typeof cwd !== 'undefined' ? cwd : process.cwd();
    return new Promise(function (resolve, reject) {
        try {
            var ls = spawn(cmd, params, {stdio: "inherit", cwd: cwd});
            ls.on('exit', function (code) {
                if (code !== 0 && statusFail) {
                    reject();
                } else {
                    resolve();
                }
            });
        } catch (e) {
            reject(e);
        }
    });
}

exec("node",[
    "--nolazy",
    "--use_strict",
    path.resolve(__dirname,"clean.js")
]).then(function () {
    return exec("node",[
        "--nolazy",
        "--use_strict",
        path.resolve(__dirname,"compile.js")
    ]);
}).then(function () {
    return exec("node",[
        "--nolazy",
        "--use_strict",
        path.resolve(__dirname,"typing.js")
    ]);
}).then(function(){
    process.exit(0);
}).catch(function(){
    process.exit(1);
})