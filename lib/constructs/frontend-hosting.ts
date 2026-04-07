import { Construct } from 'constructs';

export interface FrontendHostingProps {
  stageSuffix: string;
}

export class FrontendHosting extends Construct {
  constructor(scope: Construct, id: string, props: FrontendHostingProps) {
    super(scope, id);

    // S3 website bucket will be defined in BS-05
  }
}
