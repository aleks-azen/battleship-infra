import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { GameStorage } from './constructs/game-storage';
import { GameApi } from './constructs/game-api';
import { FrontendHosting } from './constructs/frontend-hosting';

export interface BattleshipStackProps extends cdk.StackProps {
  stageSuffix: string;
}

export class BattleshipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BattleshipStackProps) {
    super(scope, id, props);

    const { stageSuffix } = props;

    const storage = new GameStorage(this, 'GameStorage', { stageSuffix });

    const api = new GameApi(this, 'GameApi', { stageSuffix });

    const hosting = new FrontendHosting(this, 'FrontendHosting', { stageSuffix });
  }
}
