import * as cdk from 'aws-cdk-lib/core';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface GameApiProps {
  stageSuffix: string;
  gamesTable: dynamodb.Table;
  frontendUrl: string;
}

export class GameApi extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly handler: lambda.Function;

  constructor(scope: Construct, id: string, props: GameApiProps) {
    super(scope, id);

    const logGroup = new logs.LogGroup(this, 'HandlerLogGroup', {
      logGroupName: `/aws/lambda/battleship-handler-${props.stageSuffix}`,
      retention: logs.RetentionDays.THREE_DAYS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.handler = new lambda.Function(this, 'Handler', {
      functionName: `battleship-handler-${props.stageSuffix}`,
      runtime: lambda.Runtime.JAVA_21,
      code: lambda.Code.fromAsset('../battleship-backend/build/libs/battleship-backend-all.jar'),
      handler: 'co.amazensolutions.battleship.handler.BattleshipHandler::handleRequest',
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        GAMES_TABLE: props.gamesTable.tableName,
      },
    });

    // Grant Lambda read/write access to the DynamoDB table
    props.gamesTable.grantReadWriteData(this.handler);

    this.api = new apigateway.RestApi(this, 'Api', {
      restApiName: `battleship-api-${props.stageSuffix}`,
      defaultCorsPreflightOptions: {
        allowOrigins: [props.frontendUrl],
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          'Content-Type',
          'Authorization',
          'X-Player-Token',
        ],
      },
    });

    const proxyResource = this.api.root.addResource('{proxy+}');
    proxyResource.addMethod('ANY', new apigateway.LambdaIntegration(this.handler));

    // Also handle requests to the root path
    this.api.root.addMethod('ANY', new apigateway.LambdaIntegration(this.handler));
  }
}
