[![NPM version](https://badge.fury.io/js/cdk-kubesphere.svg)](https://badge.fury.io/js/cdk-kubesphere)
[![PyPI version](https://badge.fury.io/py/cdk-kubesphere.svg)](https://badge.fury.io/py/cdk-kubesphere)
![Release](https://github.com/pahud/cdk-kubesphere/workflows/Release/badge.svg)

# cdk-kubesphere

**cdk-kubesphere** is a CDK construct library that allows you to create [KubeSphere](https://kubesphere.io/) on AWS with CDK in TypeScript, JavaScript or Python.


# Sample


```ts
import { KubeSphere } from 'cdk-kubesphere';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'cdk-kubesphere-demo');

// deploy a default KubeSphere service on a new Amazon EKS cluster
new KubeSphere(stack, 'KubeSphere');
```

Behind the scene, the `KubeSphere` construct creates a default Amazon EKS cluster and `KubeSphere` serivce with helm chart([ks-installer](https://github.com/kubesphere/ks-installer)) on it.

<details>
<summary>View helm command</summary>
AWS CDK will helm install the `ks-installer`  on the cluster:

```sh
helm install ks-installer \
--repo https://charts.kubesphere.io/test \
--namespace=kubesphere-system \
--generate-name \
--create-namespace
```
</details>

## KubeSphere App Store

Use `appStore` to enable the [KubeSphere App Store](https://kubesphere.io/docs/pluggable-components/app-store/) support.

```ts
new KubeSphere(stack, 'KubeSphere', { 
  appStore: true,
});
```

<details>
<summary>View helm command</summary>
AWS CDK will helm install the `ks-installer`  on the cluster:

```sh
helm install ks-installer \
--set openpitrix.enabled=true \
--repo https://charts.kubesphere.io/test \
--namespace=kubesphere-system \
--generate-name \
--create-namespace
```
</details>

# Using existing Amazon EKS clusters

You are allowed to deploy `KubeSphere` in any existing Amazon EKS cluster. 

```ts
const cluster = eks.Cluster.fromClusterAttributes(this, 'MyCluster', {
  clusterName: 'my-cluster-name',
  kubectlRoleArn: 'arn:aws:iam::1111111:role/iam-role-that-has-masters-access',
});

// deploy a default KubeSphere service on the existing Amazon EKS cluster
new KubeSphere(stack, 'KubeSphere', { cluster });
```


See [Using existing clusters](https://github.com/aws/aws-cdk/tree/master/packages/%40aws-cdk/aws-eks#using-existing-clusters) to learn how to import existing cluster in AWS CDK.

# Console

Run the following command to create a `port-forward` from localhost:8888 to `ks-console:80`

```sh
kubectl -n kubesphere-system port-forward service/ks-console 8888:80
```

Open `http://localhost:8888` and enter the default username/password(`admin/P@88w0rd`) to enter the admin console.


