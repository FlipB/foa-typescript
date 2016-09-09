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
import * as fs from 'fs';

import { Environment } from 'Core/Environment';
import { merge, clone } from 'Core/Utility/Object';

export class Configuration {
    static _data = null;

    /**
     * Clears configuration
     */
    static clear(){
        Configuration._data = null;
    }

    /**
     * Reads configuration from file
     */
    static async load(filename:string, mergeConfig?:boolean){
        if(typeof mergeConfig !== 'boolean'){
            mergeConfig = true;
        }
        let data = await new Promise((resolve, reject) => {
            fs.readFile(path.resolve(Environment.CONFIG, filename+".json"), (error, content) => {
                if(error){
                    return reject(error);
                }
                try{
                    return resolve(JSON.parse(content.toString()));
                }catch(e){
                    return reject(data);
                }
            })
        });
        if(!mergeConfig || Configuration._data === null){
            Configuration._data = data;
        }else{
            Configuration._data = merge(Configuration._data, data);
        }
    }

    static read(path:string, defaultValue?:any){
        let ref = Configuration._data;
        let parts = path.split('.');
        do{
            let part = parts.shift();
            if(typeof ref !== 'object' || ref === null || !(part in ref)){
                return defaultValue;
            }
            ref = ref[part];
        }while(parts.length > 0);
        return ref;
    }
}