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

var path = require('path');
var fs = require('fs');

function walkFolders(folderPath, files) {
    var entry = typeof files === 'undefined';
    files = typeof files === 'undefined' ? [] : files;
    fs.readdirSync(folderPath).forEach(function (file) {
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
            if (/\.d\.ts$/.test(files[i])) {
                var before = files[i].substr(folderPath.length + 1).replace(/\\/g, '/').replace(/\.d\.ts$/, '');
                objectList[before] = files[i];
            }
        }
        return objectList;
    }
}

if (process.cwd() === __dirname) {
    var typingParts = [];
    var objectList = walkFolders(path.resolve(__dirname, 'dist', 'src'));
    for (var namespace in objectList) {
        var filepath = objectList[namespace];
        namespace = "Core/" + namespace;
        var content = fs.readFileSync(filepath).toString().trim();
        if (content.length > 0) {
            content = 'declare module "' + namespace + '" {\n' +
            content.replace(/declare /g, '') +
            '}';
            typingParts.push(content);
        }
    }

    fs.writeFileSync(path.resolve(__dirname, 'typings', 'core.d.ts'), typingParts.join("\n"));
} else {
    if (fs.existsSync(path.resolve(process.cwd(), 'dist', 'src'))) {
        var typingParts = [];
        var objectList = walkFolders(path.resolve(process.cwd(), 'dist', 'src'));
        for (var namespace in objectList) {
            var filepath = objectList[namespace];
            namespace = "App/" + namespace;
            var content = fs.readFileSync(filepath).toString().trim();
            if (content.length > 0) {
                content = 'declare module "' + namespace + '" {\n' +
                content.replace(/declare /g, '') +
                '}';
                typingParts.push(content);
            }
        }
        fs.writeFileSync(path.resolve(process.cwd(), 'typings', 'app.d.ts'), typingParts.join("\n"));
    }
}