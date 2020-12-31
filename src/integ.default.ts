import * as cdk from '@aws-cdk/core';
import { KubeSphere } from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'cdk-kubesphere-demo', { env });

    // create a default KubeSphere on a new Amazon EKS cluster
    new KubeSphere(stack, 'KubeSphere', {
      appStore: true,
    });

    this.stack = [stack];
  }
}

new IntegTesting();
