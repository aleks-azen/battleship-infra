import { Construct } from 'constructs';

export interface GameStorageProps {
  stageSuffix: string;
}

export class GameStorage extends Construct {
  constructor(scope: Construct, id: string, props: GameStorageProps) {
    super(scope, id);

    // DynamoDB table will be defined in BS-05
  }
}
