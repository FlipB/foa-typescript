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

var path = require("path");
var fs = require("fs");
var util = require('util');
var spawn = require('child_process').spawn;
function exec(cmd, params, statusFail, cwd) {
    params = typeof params !== 'object' ? [] : params;
    statusFail = typeof statusFail !== 'boolean' ? false : statusFail;
    cwd = typeof cwd !== 'undefined' ? cwd : process.cwd();
    return new Promise(function(resolve, reject) {
        try {
            var ls = spawn(cmd, params, { stdio: "inherit", cwd: cwd });
            ls.on('exit', function(code) {
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

var promiseChain = new Promise(function(resolve) {
    resolve();
});
if (!fs.existsSync(path.resolve(__dirname, 'dist')) && fs.existsSync(path.resolve(__dirname, 'src'))) {
    promiseChain = promiseChain.then(function() {
        return exec("node", [
            "--nolazy",
            "--use_strict",
            path.resolve(__dirname, "compile.js")
        ], false, __dirname);
    }).then(function() {
        return exec("node", [
            "--nolazy",
            "--use_strict",
            path.resolve(__dirname, "typing.js")
        ], false, __dirname);
    });
}

if (/node_modules$/.test(path.resolve(__dirname, '..'))) {
    promiseChain = promiseChain.then(function() {
        return new Promise(function(resolve, reject) {
            try {
                var moduleNamePath = __dirname.replace(/\\/g, '/').split('/');
                var moduleName = moduleNamePath[moduleNamePath.length - 1];
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'package.json'))) {
                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'npm_compile.js'))) {
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'npm_compile.js'), [
                            "#!/usr/bin/env node",
                            "var path = require('path');",
                            "require(path.resolve(__dirname,'node_modules','" + moduleName + "', 'npm_compile'));"
                        ].join("\n"));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'npm_test.js'))) {
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'npm_test.js'), [
                            "#!/usr/bin/env node",
                            "var path = require('path');",
                            "require(path.resolve(__dirname,'node_modules','" + moduleName + "', 'npm_test'));"
                        ].join("\n"));
                    }

                    var json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json')).toString());
                    if (!('scripts' in json)) {
                        json["scripts"] = {};
                    }
                    if (!('compile' in json["scripts"])) {
                        json["scripts"]["compile"] = "node ./npm_compile.js";
                    }
                    if (!('test' in json["scripts"]) || json["scripts"]["test"] === 'echo \"Error: no test specified\" && exit 1') {
                        json["scripts"]["test"] = "node ./npm_test.js";
                    }
                    fs.writeFileSync(path.resolve(__dirname, '..', '..', 'package.json'), JSON.stringify(json));

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'tsconfig.json'))) {
                        json = {
                            "compilerOptions": {
                                "target": "es6",
                                "module": "commonjs",
                                "experimentalDecorators": true,
                                "rootDir": ".",
                                "outDir": "dist",
                                "watch": false,
                                "sourceMap": true,
                                "declaration": true
                            },
                            "exclude": [
                                "node_modules",
                                "dist"
                            ]
                        };
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'tsconfig.json'), JSON.stringify(json));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'tsd.json'))) {
                        json = {
                            "version": "v4",
                            "repo": "borisyankov/DefinitelyTyped",
                            "ref": "master",
                            "path": "typings",
                            "bundle": "typings/tsd.d.ts",
                            "installed": {

                            }
                        };
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'tsd.json'), JSON.stringify(json));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'typings'))) {
                        fs.mkdirSync(path.resolve(__dirname, '..', '..', 'typings'));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'typings', 'tsd.d.ts'))) {
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'typings', 'tsd.d.ts'), [
                            '/// <reference path="../node_modules/' + moduleName + '/typings/tsd.d.ts" />',
                            '/// <reference path="./app.d.ts" />'
                        ].join("\n"));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', 'typings', 'app.d.ts'))) {
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', 'typings', 'app.d.ts'), "");
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', '.vscode'))) {
                        fs.mkdirSync(path.resolve(__dirname, '..', '..', '.vscode'));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', '.vscode', 'launch.json'))) {
                        json = {
                            "version": "1.0.0",
                            "configurations": [
                                {
                                    "name": "App",
                                    "type": "node",
                                    "program": "${workspaceRoot}/node_modules/" + moduleName + "/dist/app.js",
                                    "stopOnEntry": false,
                                    "args": [],
                                    "cwd": "${workspaceRoot}/.",
                                    "runtimeExecutable": null,
                                    "runtimeArgs": ["--nolazy", "--use_strict"],
                                    "env": {
                                        "NODE_ENV": "development"
                                    },
                                    "sourceMaps": true,
                                    "outDir": null,
                                    "preLaunchTask": "npm"
                                },
                                {
                                    "name": "Test",
                                    "type": "node",
                                    "program": "${workspaceRoot}/npm_test.js",
                                    "stopOnEntry": false,
                                    "args": [],
                                    "cwd": "${workspaceRoot}/.",
                                    "runtimeExecutable": null,
                                    "runtimeArgs": ["--nolazy", "--use_strict"],
                                    "env": {
                                        "NODE_ENV": "development"
                                    },
                                    "sourceMaps": true,
                                    "outDir": null
                                }
                            ]
                        };
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', '.vscode', 'launch.json'), JSON.stringify(json));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', '.vscode', 'settings.json'))) {
                        json = {
                            "typescript.tsdk": "./node_modules/typescript/lib"
                        };
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', '.vscode', 'settings.json'), JSON.stringify(json));
                    }

                    if (!fs.existsSync(path.resolve(__dirname, '..', '..', '.vscode', 'tasks.json'))) {
                        json = {
                            "version": "0.1.0",
                            "command": "npm",
                            "isShellCommand": true,
                            "showOutput": "silent",
                            "tasks": [
                                {
                                    "taskName": "npm",
                                    "suppressTaskName": true,
                                    "args": ["run", "compile"],
                                    "isBuildCommand": true
                                }
                            ]
                        };
                        fs.writeFileSync(path.resolve(__dirname, '..', '..', '.vscode', 'tasks.json'), JSON.stringify(json));
                    }

                }
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}

promiseChain.then(function() {
    process.exit(0);
}).catch(function(e) {
    process.exit(1);
});