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

/**
 * Clones object
 * 
 * @param { Object } source Source object to be cloned
 * @param { Object | null } destination Destination object to be cloned into
 * @return  { Object } new object containing source and destination if provided
 */
export function clone(source:any, destination ?:any){
    if(typeof destination === 'undefined'){
        destination = null;
    }
	if (source == null || typeof source != "object") return source;
    if (source.constructor != Object && source.constructor != Array) return source;
    if (source.constructor == Date || source.constructor == RegExp || source.constructor == Function ||
        source.constructor == String || source.constructor == Number || source.constructor == Boolean)
        return new source.constructor(source);

    destination = clone(destination) || new source.constructor();

    for (var name in source)
    {
        destination[name] = typeof destination[name] == "undefined" ? clone(source[name], null) : destination[name];
    }
    return destination;
}

/**
 * Merges multiple objects, one level only
 * 
 * @param { Object } args Objects to be merged
 * @return { Object } Merged object
 */
export function merge(arg1?, arg2?, arg3?){
    let args = arguments;
	var newObject = {};
	for(var arg of args){
		arg = clone(arg);
		for(var key in arg){
			newObject[key] = arg[key];
		}
	}
    return newObject;
}