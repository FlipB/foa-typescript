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

import { TestCase } from 'Core/TestSuite/TestCase';
import { TestService } from 'App/Service/TestService';

export class TestServiceTestCase extends TestCase
{
    testA()
    {
        this.assertEquals(1,TestService.a());
    }
}