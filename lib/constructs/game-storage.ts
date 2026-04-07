import * as cdk from 'aws-cdk-lib/core';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface GameStorageProps {
  stageSuffix: string;
}

export class GameStorage extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: GameStorageProps) {
    super(scope, id);

    this.table = new dynamodb.Table(this, 'GamesTable', {
      tableName: `battleship-games-${props.stageSuffix}`,
      partitionKey: { name: 'gameId', type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
