import * as cdk from 'aws-cdk-lib/core';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface FrontendHostingProps {
  stageSuffix: string;
}

export class FrontendHosting extends Construct {
  public readonly bucket: s3.Bucket;
  public readonly websiteUrl: string;

  constructor(scope: Construct, id: string, props: FrontendHostingProps) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: `battleship-frontend-${props.stageSuffix}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    this.websiteUrl = this.bucket.bucketWebsiteUrl;
  }
}
