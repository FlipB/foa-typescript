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

export class Exception extends Error
{
    private _message: string = null;
    constructor(message: string){
        super(message);
        this.message = message;
    }
    
    get name()
    {
        return "Exception";
    }
    get message()
    {
        return this.message;
    }
}