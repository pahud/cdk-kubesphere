# cdk-kubesphere

**cdk-kubesphere** is a CDK construct library that allows you to create [KubeSphere](https://kubesphere.io/) on AWS with CDK in TypeScript, JavaScript or Python.


# Sample


```ts
imoprt { KubeSphere } from 'cdk-kubesphere';

const app = new cdk.App();

const stack = new cdk.Stack(app, 'cdk-kubesphere-demo');

// deploy a default KubeSphere service on a new Amazon EKS cluster
new KubeSphere(stack, 'KubeSphere');

```

# Console

Run the following command to create a `port-forward` from localhost:8888 to `ks-console:80`

```sh
kubectl -n kubesphere-system port-forward service/ks-console 8888:80
```

Open `http://localhost:8888` and enter the default username/password(`admin/P@88w0rd`) to enter the admin console.


