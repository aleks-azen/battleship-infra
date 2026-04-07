import * as cdk from 'aws-cdk-lib/core';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { BattleshipStack } from '../lib/battleship-stack';

function createTemplate(): Template {
  const app = new cdk.App();
  const stack = new BattleshipStack(app, 'TestStack', {
    env: { account: '123456789012', region: 'us-east-1' },
    stageSuffix: 'test',
  });
  return Template.fromStack(stack);
}

test('Stack creates DynamoDB table with correct configuration', () => {
  const template = createTemplate();

  template.hasResourceProperties('AWS::DynamoDB::Table', {
    TableName: 'battleship-games-test',
    KeySchema: [{ AttributeName: 'gameId', KeyType: 'HASH' }],
    BillingMode: 'PAY_PER_REQUEST',
    TimeToLiveSpecification: {
      AttributeName: 'ttl',
      Enabled: true,
    },
  });
});

test('Stack creates Lambda function with Java 21 runtime', () => {
  const template = createTemplate();

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'java21',
    MemorySize: 512,
    Timeout: 30,
    Handler: 'co.amazensolutions.battleship.handler.BattleshipHandler::handleRequest',
  });
});

test('Stack creates API Gateway REST API', () => {
  const template = createTemplate();

  template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    Name: 'battleship-api-test',
  });
});

test('Stack creates S3 bucket with website hosting', () => {
  const template = createTemplate();

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'battleship-frontend-test',
    WebsiteConfiguration: {
      IndexDocument: 'index.html',
      ErrorDocument: 'index.html',
    },
  });
});

test('Stack has correct resource counts', () => {
  const template = createTemplate();

  template.resourceCountIs('AWS::DynamoDB::Table', 1);
  template.resourceCountIs('AWS::Lambda::Function', 2); // handler + autoDeleteObjects custom resource
  template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
  template.resourceCountIs('AWS::S3::Bucket', 1);
});

test('Stack has expected outputs', () => {
  const template = createTemplate();

  template.hasOutput('ApiUrl', {});
  template.hasOutput('WebsiteUrl', {});
  template.hasOutput('WebsiteBucketName', {});
});
