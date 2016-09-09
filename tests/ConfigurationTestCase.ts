import { TestCase } from 'Core/TestSuite/TestCase';
import { Configuration } from 'Core/Configuration';

export class ConfigurationTestCase extends TestCase
{
    async testLoad()
    {
        await Configuration.load("config_a", false);
        this.assertEquals('aaa', Configuration.read('a.aa.aaa'));
        this.assertEquals('foobar', Configuration.read('c.cc'));
    }

    async testMerge()
    {
        await Configuration.load("config_a", false);
        await Configuration.load("config_b");
        this.assertEquals('aaa', Configuration.read('a.aa.aaa'));
        this.assertEquals('bb', Configuration.read('b.bb'));
        this.assertEquals('cc', Configuration.read('c.cc'));
    }
} 