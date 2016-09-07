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
 
let dotaccess = require('dotaccess');
import { clone, merge } from 'Core/Utility/Object';

export class Hash
{
    /**
     * Inserts value by path into cloned source object
     * 
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @param value Value
     * @return { Object } Cloned source object with inserted value
     */
	static insert(source:Object, path:string, value:any):Object
	{
		source = clone(source);
		dotaccess.set(source, path, value, true);
		return source;
	}
	
    /**
     * Retrieves value by path from source object
     * 
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @param defaultValue Value returned if key path does not exist
     * @return Value in source object by path
     */
	static get(source:Object, path:string, defaultValue?:any):any
	{
		return clone(dotaccess.get(source, path, defaultValue));
	}
	
    /**
     * Removes value by path from source object
     * 
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @return { Object } Cloned source object with inserted value
     */
	static remove(source:Object, path:string)
	{
		source = clone(source);
		dotaccess.unset(source, path);
		return source;
	}
	
    /**
     * @see Cake/Utility/Core
     */
	static merge():Object
	{
		let args = arguments;
		return merge.apply(merge, args);
	}
	
    /**
     * Checks if there is a value on path
     * 
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @return { Boolean } True if exists
     */
	static has(source:Object, path:string):boolean
	{
		var value = Hash.get(source, path);
		if(typeof value === 'undefined' || value === null){
			return false;
		}
		return true;
	}
	
    /**
     * Creates a dot path map over source object
     * 
     * @param { Object } object Source object
     * @param { string } prefix Prefix to be used in front of map
     * @param { Object } list Will contain the dot paths and values
     * @return { Object }
     */
	static map(source:Object, prefix?:string, list?:Object):Object
	{
		if(typeof prefix === 'undefined'){
			list = '';
		}
		if(typeof list === 'undefined'){
			list = {};
		}
		if(prefix === null || typeof prefix !== 'string'){
			prefix = '';
		}
		for(var key in source){
			if(typeof source[key] === 'object' && source[key].constructor === {}.constructor){
				Hash.map(source[key], prefix+(prefix === '' ? '' : '.')+key, list);
			}else{
				list[prefix+(prefix === '' ? '' : '.')+key] = source[key];
			}
		}
		return list;
	}
}