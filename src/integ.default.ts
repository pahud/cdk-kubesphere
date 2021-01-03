import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
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

    const stack = new cdk.Stack(app, 'cdk-kubesphere-integ', { env });

    // create a default KubeSphere on a new Amazon EKS cluster
    new KubeSphere(stack, 'KubeSphere', {
      appStore: true,
      nodegroupOptions: {
        capacityType: eks.CapacityType.SPOT,
        instanceTypes: [
          new ec2.InstanceType('t3.large'),
          new ec2.InstanceType('m5.large'),
          new ec2.InstanceType('c5.large'),
        ],
        desiredSize: 3,
      },
    });

    this.stack = [stack];
  }
}

new IntegTesting();
