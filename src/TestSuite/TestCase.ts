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
 
import * as assert from 'assert';
import { sprintf } from 'Core/Utility/String';
import { AssertionException } from 'Core/TestSuite/Exception/AssertionException';

export class TestCase {
    public mochaFunctionReference = null;
    
    async setUp(){
        
    }
    
    async tearDown(){
        
    }
    
    protected skip(){
        this.mochaFunctionReference.skip();
    }
    
    protected timeout(milliseconds: Number){
        this.mochaFunctionReference.timeout(milliseconds);
    }
    
    protected assertTextNotEquals(expected, result, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		expected = expected.replace('/(\r\n|\r)/g', '\n');
		result = result.replace('/(\r\n|\r)/g', '\n');
		
		this.assertNotEquals(expected, result, message);
		
		return true;
	}
    
    assertTextEquals(expected, result, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		expected = expected.replace('/(\r\n|\r)/g', '\n');
		result = result.replace('/(\r\n|\r)/g', '\n');
		
		this.assertEquals(expected, result, message);
		
		return true;		
	}
    
    assertTextStartsWith(prefix, str, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		prefix = prefix.replace(/(\r\n|\r)/, '\n');
		str = str.replace(/(\r\n|\r)/, '\n');
		this.assertStringStartsWith(prefix, str, message);
	}
    
    assertTextStartsNotWith(prefix, str, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		prefix = prefix.replace(/(\r\n|\r)/, '\n');
		str = str.replace(/(\r\n|\r)/, '\n');
		this.assertStringStartsNotWith(prefix, str, message);
	}
    
    assertTextEndsWith(postfix, str, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		postfix = postfix.replace(/(\r\n|\r)/, '\n');
		str = str.replace(/(\r\n|\r)/, '\n');
		
		this.assertStringEndsWith(postfix, str, message);
	}
    
    assertTextEndsNotWith(postfix, str, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		postfix = postfix.replace(/(\r\n|\r)/, '\n');
		str = str.replace(/(\r\n|\r)/, '\n');
		
		this.assertStringEndsNotWith(postfix, str, message);
	}
    
    assertTextContains(needle, haystack, message?, ignoreCase?)
	{	
		if(typeof message !== 'string'){
			message = '';
		}
		if(typeof ignoreCase !== 'boolean'){
			ignoreCase = false;
		}
		needle = needle.replace(/(\r\n|\r)/, '\n');
		haystack = haystack.replace(/(\r\n|\r)/, '\n');
		
		this.assertContains(needle, haystack, message, ignoreCase);
	}
    
    assertTextNotContains(needle, haystack, message?, ignoreCase?)
	{	
		if(typeof message !== 'string'){
			message = '';
		}
		if(typeof ignoreCase !== 'boolean'){
			ignoreCase = false;
		}
		needle = needle.replace(/(\r\n|\r)/, '\n');
		haystack = haystack.replace(/(\r\n|\r)/, '\n');
		
		this.assertNotContains(needle, haystack, message, ignoreCase);
	}
    
    assertEquals(a, b, message?)
	{
		if(typeof message === 'undefined'){
			message = null;
		}
		try{
			if(typeof a !== typeof b){
				throw "Type missmatch";
			}
			switch(typeof a){
				case "object":
					assert.deepEqual(a, b);
					break;
				default:
					if(a !== b){
						throw "Value missmatch";
					}
					break;
			}
		}catch(e){
			if(typeof a === 'object'){
				a = JSON.stringify(a);
			}
			if(typeof b === 'object'){
				b = JSON.stringify(b);
			}
			this.fail(a, b, message);
		}
		return true;
	}
    
    assertType(object, type?:any)
	{
		if(typeof type === 'undefined'){
			type = 'object';
		}
		if(typeof type !== 'string' && typeof type !== 'function'){
			type = typeof type;
		}
		if(typeof type === 'string'){
			if(typeof object !== type){
				this.fail(typeof object, type);
			}
			return true;
		}
		if(typeof object !== 'object'){
			this.fail(typeof object, type.prototype.name);
		}else{
			if((object instanceof type) !== true){
				this.fail(object.constructor.name, type.prototype.name);
			}
			return true;
		}
	}
    
    fail(actual, expected?, message?)
	{
		if(typeof expected !== 'string'){
			expected = '';
		}
		if(typeof message === 'undefined'){
			message = null;
		}
		if(message === null){
			throw new AssertionException(actual + " === " + expected);
		}else{
			throw new AssertionException(message);
		}
	}
    
    assertTrue(expected, message?)
	{
		this.assertEquals(expected, true, message);		
	}
    
    assertFalse(expected, message?)
	{
		this.assertEquals(expected, false, message);
	}
    
    assertGreaterThanOrEqual(expected, actual, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		if (!(actual >= expected)) {
			this.fail(actual + ' >= ' + expected + ' '+ message);
		}
		return true;
	}
    
    assertLessThanOrEqual(expected, actual, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		if (!(actual <= expected)) {
			this.fail(actual + ' <= ' + expected + ' ' + message);
		}
		return true;
	}
    
    assertNotEquals(expected, actual, message?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		if (expected === actual) {
			this.fail(expected + ' !== ' + actual + ' ' + message);
		}
		return true;
	}
    
    assertThrowError(func, message?):any
	{
		if(typeof message !== 'string'){
			message = '';
		}
		try{
			var response = func();
			if(response !== null && typeof response === 'object' && response instanceof Promise){
				return new Promise(async (resolve, reject) => {
					try{
						try{
							await response;
							this.fail(sprintf('Did not throw error. %s',message));
						}catch(e){
							//Failure
							resolve(true);
						}
					}catch(e){
						resolve(true);
					}
				});
			}
		}catch(e){
			return true;
		}
		this.fail(sprintf('Did not throw error. %s',message));
	}
    
    assertNotThrowError(func, message?):any
	{
		if(typeof message !== 'string'){
			message = '';
		}
		try{
			var response = func();
			if(response !== null && typeof response === 'object' && response instanceof Promise){
				return new Promise(async (resolve, reject) => {
					try{
						try{
							await response;
							resolve(true);
						}catch(e){
							//Failure
							this.fail(sprintf('Did throw error (%s). %s',e.message,message));
						}
					}catch(e){
						reject(e);
					}
				});
			}
		}catch(e){
			//Failure
			this.fail(sprintf('Did throw error (%s). %s',e.message,message));
		}
		return true;
	}
    
    assertStringStartsWith(prefix, str, message?)
	{
		if (str.substr(0, prefix.length) !== prefix) {
			this.fail(str + ' should begin with ' + prefix);
		}
		return true;
	}
    
    assertStringStartsNotWith(prefix, str, message?)
	{
		if (str.substr(0, prefix.length) === prefix) {
			this.fail(str + ' should not start with ' + prefix);
		}
		return true;
	}
    
    assertStringEndsWith(postfix, str, message?)
	{
		if(str.substr(str.length - postfix.length) !== postfix){
			this.fail(str + ' should end with ' + postfix);
		}
		return true;
	}
    
    assertStringEndsNotWith(postfix, str, message?)
	{
		if(str.substr(str.length - postfix.length) === postfix){
			this.fail(str + ' should not end with ' + postfix);
		}
		return true;
	}
    
    assertContains(needle, haystack, message?, ignoreCase?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		if(typeof ignoreCase !== 'boolean'){
			ignoreCase = false;
		}
		if (typeof needle === 'string' && ignoreCase) {
			needle = needle.toLowerCase();
		}
		
		if (typeof haystack === 'string' && ignoreCase) {
			haystack = haystack.toLowerCase();
		}
		
		this.assertNotEquals(haystack.indexOf(needle), -1);
		
		return true;
	}
    
    assertNotContains(needle, haystack, message?, ignoreCase?)
	{
		if(typeof message !== 'string'){
			message = '';
		}
		if(typeof ignoreCase !== 'boolean'){
			ignoreCase = false;
		}
		if (typeof needle === 'string' && ignoreCase) {
			needle = needle.toLowerCase();
		}
		
		if (typeof haystack === 'string' && ignoreCase) {
			haystack = haystack.toLowerCase();
		}
		
		this.assertEquals(haystack.indexOf(needle), -1);
		
		return true;
	}
}