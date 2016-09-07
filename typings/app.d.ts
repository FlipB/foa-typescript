declare module "Core/Environment" {
export class Environment {
    private static _envs;
    private static setEnv(name, value);
    private static getEnv(name, defaultValue?);
    static CORE: string;
    static APP: string;
    static CACHE: string;
    static LOGS: string;
    static ROOT: string;
    static TESTS: string;
    static TMP: string;
    static WWW_ROOT: string;
    static CONFIG: string;
    static TIME_START: Date;
    static inspect(): string;
}}
declare module "Core/Exception/Exception" {
/**
 * Copyright (c) 2016 Tiinusen
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-winston-management
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */
export class Exception extends Error {
    private _message;
    constructor(message: string);
    name: string;
    message: any;
}}
declare module "Core/RequireHook" {
export class RequireHook {
    /**
     * Resolves namespace path
     *
     * @param { String } filepath Path to be resolved
     * @return { String } Absolute path to expected file
     */
    static resolve(filepath: any): any;
}}
declare module "Core/TestSuite/Exception/AssertionException" {
/**
 * Copyright (c) 2016 Tiinusen
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-winston-management
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */
export class AssertionException extends Error {
    constructor(message: any);
    name: string;
}}
declare module "Core/TestSuite/TestCase" {
export class TestCase {
    mochaFunctionReference: any;
    setUp(): Promise<void>;
    tearDown(): Promise<void>;
    protected skip(): void;
    protected timeout(milliseconds: Number): void;
    protected assertTextNotEquals(expected: any, result: any, message?: any): boolean;
    assertTextEquals(expected: any, result: any, message?: any): boolean;
    assertTextStartsWith(prefix: any, str: any, message?: any): void;
    assertTextStartsNotWith(prefix: any, str: any, message?: any): void;
    assertTextEndsWith(postfix: any, str: any, message?: any): void;
    assertTextEndsNotWith(postfix: any, str: any, message?: any): void;
    assertTextContains(needle: any, haystack: any, message?: any, ignoreCase?: any): void;
    assertTextNotContains(needle: any, haystack: any, message?: any, ignoreCase?: any): void;
    assertEquals(a: any, b: any, message?: any): boolean;
    assertType(object: any, type?: any): boolean;
    fail(actual: any, expected?: any, message?: any): void;
    assertTrue(expected: any, message?: any): void;
    assertFalse(expected: any, message?: any): void;
    assertGreaterThanOrEqual(expected: any, actual: any, message?: any): boolean;
    assertLessThanOrEqual(expected: any, actual: any, message?: any): boolean;
    assertNotEquals(expected: any, actual: any, message?: any): boolean;
    assertThrowError(func: any, message?: any): any;
    assertNotThrowError(func: any, message?: any): any;
    assertStringStartsWith(prefix: any, str: any, message?: any): boolean;
    assertStringStartsNotWith(prefix: any, str: any, message?: any): boolean;
    assertStringEndsWith(postfix: any, str: any, message?: any): boolean;
    assertStringEndsNotWith(postfix: any, str: any, message?: any): boolean;
    assertContains(needle: any, haystack: any, message?: any, ignoreCase?: any): boolean;
    assertNotContains(needle: any, haystack: any, message?: any, ignoreCase?: any): boolean;
}}
declare module "Core/Utility/Hash" {
export class Hash {
    /**
     * Inserts value by path into cloned source object
     *
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @param value Value
     * @return { Object } Cloned source object with inserted value
     */
    static insert(source: Object, path: string, value: any): Object;
    /**
     * Retrieves value by path from source object
     *
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @param defaultValue Value returned if key path does not exist
     * @return Value in source object by path
     */
    static get(source: Object, path: string, defaultValue?: any): any;
    /**
     * Removes value by path from source object
     *
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @return { Object } Cloned source object with inserted value
     */
    static remove(source: Object, path: string): Object;
    /**
     * @see Cake/Utility/Core
     */
    static merge(): Object;
    /**
     * Checks if there is a value on path
     *
     * @param { Object } source Source object
     * @param { String } path Dot paths
     * @return { Boolean } True if exists
     */
    static has(source: Object, path: string): boolean;
    /**
     * Creates a dot path map over source object
     *
     * @param { Object } object Source object
     * @param { string } prefix Prefix to be used in front of map
     * @param { Object } list Will contain the dot paths and values
     * @return { Object }
     */
    static map(source: Object, prefix?: string, list?: Object): Object;
}}
declare module "Core/Utility/Object" {
/**
 * Copyright (c) 2016 Tiinusen
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-winston-management
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */
/**
 * Clones object
 *
 * @param { Object } source Source object to be cloned
 * @param { Object | null } destination Destination object to be cloned into
 * @return  { Object } new object containing source and destination if provided
 */
export function clone(source: any, destination?: any): any;
/**
 * Merges multiple objects, one level only
 *
 * @param { Object } args Objects to be merged
 * @return { Object } Merged object
 */
export function merge(): {};}
declare module "Core/Utility/String" {
/**
 * Copyright (c) 2016 Tiinusen
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-winston-management
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */
export { sprintf } from 'sprintf-js';}
declare module "App/Service/TestService" {
/**
 * Copyright (c) 2016 Tiinusen
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright   Copyright (c) 2016 Tiinusen
 * @link        https://github.com/Tiinusen/foa-winston-management
 * @license     http://www.opensource.org/licenses/mit-license.php MIT License
 */
export class TestService {
    static a(): number;
}}