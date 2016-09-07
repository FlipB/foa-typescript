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
 
require('.');
import * as path from 'path';
import * as fs from 'fs';
import { Environment } from 'Core/Environment';
import { Exception } from 'Core/Exception/Exception';
import { sprintf } from 'Core/Utility/String';
import { Hash } from 'Core/Utility/Hash';
import { TestCase } from 'Core/TestSuite/TestCase';
process.argv.shift();
process.argv.shift();

let filterTestCase = null;
let filterTest = null;
if (process.argv.length > 0) {
    filterTestCase = process.argv.shift();
}
if (process.argv.length > 0) {
    filterTest = process.argv.shift();
}

if (!fs.existsSync(Environment.TESTS) || !fs.existsSync(path.resolve(Environment.TESTS))) {
    console.log("No tests to run");
    process.exit(0);
}

function walkFolders(folderPath, files) {
    var entry = false;
    if(files === null || typeof files === 'undefined'){
        entry = true;
        files = [];
    }
    fs.readdirSync(folderPath).forEach(function(file) {
        if ([".", ".."].indexOf(file) === -1) {
            file = path.resolve(folderPath, file);
            if (fs.lstatSync(file).isDirectory()) {
                walkFolders(file, files);
            } else {
                files.push(file)
            }
        }
    });
    if (entry) {
        var objectList = {}
        for (var i = 0; i < files.length; i++) {
            if (/\.js$/.test(files[i])) {
                var before = files[i].substr(folderPath.length + 1).replace(/\\/g, '/').replace(/\.js$/, '');
                objectList[before] = files[i];
            }
        }
        return objectList;
    }
}
let tests = {};
let objectList = walkFolders(path.resolve(Environment.TESTS),null);
for (let namespace in objectList) {
    let filePath = objectList[namespace];
    let classNames = namespace.split("/");
    let className = classNames[classNames.length - 1];
    if (filterTestCase === null || filterTestCase === namespace) {
        let testClass:TestCase = require(filePath);
        if (!(className in testClass)) {
            throw new Exception(sprintf('"%s" does not export a class by name "%s"', namespace + ".js", className));
        }

        testClass = new testClass[className]();
        let methods = Object.getOwnPropertyNames(Object.getPrototypeOf(testClass));
        methods.forEach((methodName) => {
            if (/^test/.test(methodName) && (filterTest === null || filterTest === methodName || filterTest === methodName.substr(4))) {
                let testDotPath = namespace.replace(/\//g, '.') + "." + methodName.substr(4).replace(new RegExp("\_", 'g'), ".");
                tests = Hash.insert(tests, testDotPath, function() {
                    testClass.mochaFunctionReference = this;
                    return new Promise(async (resolve, reject) => {
                        try {
                            try {
                                await testClass.setUp();
                                let response = await testClass[methodName].call(testClass);
                                await testClass.tearDown();
                                resolve(response);
                            } catch (e) {
                                await testClass.tearDown();
                                throw e;
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
                });
            }
        });
    }
}
module.exports = tests;