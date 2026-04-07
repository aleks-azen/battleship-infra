#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { BattleshipStack } from '../lib/battleship-stack';
import { BETA_STAGE } from '../lib/constants';

const app = new cdk.App();
new BattleshipStack(app, 'BattleshipStack', {
  env: {
    account: BETA_STAGE.account,
    region: BETA_STAGE.region,
  },
  stageSuffix: BETA_STAGE.stageSuffix,
});
