import { TestCase } from 'Core/TestSuite/TestCase';
import { Environment } from 'Core/Environment';
import * as path from 'path';

export class EnvironmentTestCase extends TestCase
{
    testCore()
    {
        this.assertEquals(path.resolve(__filename,'..','..','..','dist','src'),Environment.CORE);
    }

    testApp()
    {
        this.assertEquals(path.resolve(__filename,'..','..','..','dist','src'),Environment.APP);
    }

    testConfig()
    {
        this.assertEquals(path.resolve(__filename,'..','..','..','config'),Environment.CONFIG);
    }
} 