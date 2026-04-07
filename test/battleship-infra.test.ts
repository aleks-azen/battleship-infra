import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { BattleshipStack } from '../lib/battleship-stack';

test('Stack creates successfully', () => {
  const app = new cdk.App();
  const stack = new BattleshipStack(app, 'TestStack', {
    env: { account: '123456789012', region: 'us-east-1' },
    stageSuffix: 'test',
  });
  const template = Template.fromStack(stack);

  // Skeleton stack should have no resources yet (only CDK metadata)
  expect(template.toJSON()).toBeDefined();
});
