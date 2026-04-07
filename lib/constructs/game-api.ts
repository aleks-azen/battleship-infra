import { Construct } from 'constructs';

export interface GameApiProps {
  stageSuffix: string;
}

export class GameApi extends Construct {
  constructor(scope: Construct, id: string, props: GameApiProps) {
    super(scope, id);

    // API Gateway + Lambda will be defined in BS-05
  }
}
