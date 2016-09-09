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

export class Environment {
    private static _envs = {};

    private static setEnv(name: string, value: any): void {
        this._envs[name] = value;
    }

    private static getEnv(name: string, defaultValue?: any): any {
        if(typeof defaultValue === 'undefined'){
            defaultValue = "";
        }
        return name in this._envs ? this._envs[name] : defaultValue;
    }

    public static get CORE(): string {
        return path.resolve(this.CORE_PATH, 'dist', 'src');
    }

    public static set CORE(value: string) {
        this.setEnv('CORE', value);
    }

    public static get APP(): string {
        return this.getEnv('APP', path.resolve(this.ROOT, 'dist', 'src'));
    }

    public static set APP(value: string) {
        this.setEnv('APP', value);
    }

    public static get CORE_PATH(): string {
        return path.resolve(__dirname, '..', '..');
    }

    public static get ROOT(): string {
        return this.getEnv('ROOT', process.cwd());
    }

    public static set ROOT(value: string) {
        this.setEnv('ROOT', value);
    }

    public static get TESTS(): string {
        return this.getEnv('TESTS', path.resolve(this.ROOT, 'dist', 'tests'));
    }

    public static set TESTS(value: string) {
        this.setEnv('TESTS', value);
    }

    public static get CONFIG(): string {
        return this.getEnv('CONFIG', path.resolve(this.ROOT, 'config'));
    }

    public static set CONFIG(value: string) {
        this.setEnv('CONFIG', value);
    }
    
    public static get TIME_START(): Date {
        return this.getEnv('TIME_START');
    }
    
    public static set TIME_START(value: Date) {
        this.setEnv('TIME_START', value);
    }

    public static inspect() {
        let output = [];
        [
            "CORE",
            "APP",
            "CORE_PATH",
            "ROOT",
            "TESTS",
            "TIME_START"
        ].forEach(name => {
            output.push(name + " = '" + this[name].toString() + "'");
        });
        return output.join("\n");
    }
}

Environment.TIME_START = new Date();