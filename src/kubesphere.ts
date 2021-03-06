import * as ec2 from '@aws-cdk/aws-ec2';
import * as eks from '@aws-cdk/aws-eks';
import * as cdk from '@aws-cdk/core';

/**
 * The construct properties for KubeSphere
 */
export interface KubeSphereProps {
  /**
   * The existing Amazon EKS cluster(if any)
   * @default - create a default new cluster
   */
  readonly cluster?: eks.ICluster;
  /**
   * whether to enable the KubeSphere Application Store(openpitrix)
   * @default false
   */
  readonly appStore?: boolean;
  /**
   * Options to create the Amazon EKS managed nodegroup
   * @default - 2x m5.large on-demand instances
   */
  readonly nodegroupOptions?: eks.NodegroupOptions;
}

/**
 * The KubeSphere workload
 */
export class KubeSphere extends cdk.Construct {
  private readonly nodegroupOptions?: eks.NodegroupOptions;
  constructor(scope: cdk.Construct, id: string, props: KubeSphereProps = {}) {
    super(scope, id);

    this.nodegroupOptions = props.nodegroupOptions;

    const cluster = props.cluster ?? this._createEksCluster();

    cluster.addHelmChart('KubeSphere', {
      repository: 'https://charts.kubesphere.io/test',
      chart: 'ks-installer',
      namespace: 'kubesphere-system',
      values: {
        'openpitrix.enabled': props.appStore ?? false,
      },
    });
  }
  private _createEksCluster(): eks.Cluster {
    const vpc = getOrCreateVpc(cdk.Stack.of(this));
    const cluster = new eks.Cluster(this, 'Cluster', {
      vpc,
      version: eks.KubernetesVersion.V1_18,
    });
    if (this.nodegroupOptions) {
      cluster.addNodegroupCapacity('MNG', this.nodegroupOptions);
    };
    return cluster;
  }
}

function getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}
