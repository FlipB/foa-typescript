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
 
import * as path from 'path';
import { Environment } from './Environment';

var Module = require('module');
var parentModuleRequire = Module.prototype.require;

export class RequireHook {
    /**
     * Resolves namespace path
     * 
     * @param { String } filepath Path to be resolved
     * @return { String } Absolute path to expected file
     */
    public static resolve(filepath) {
        if (/^Core\//.test(filepath)) {
            return path.resolve(Environment.CORE, filepath.replace(/^Core\//, '')) + ".js";
        } else if (/^App\//.test(filepath)) {
            return path.resolve(Environment.APP, filepath.replace(/^App\//, '')) + ".js";
        }
        return filepath;
    }
}

/**
 * Overrides Module.prototype.require with RequireHook
 */
Module.prototype.require = function(filepath) {
    return parentModuleRequire.call(this, RequireHook.resolve(filepath));
}