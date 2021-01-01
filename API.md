# API Reference

**Classes**

Name|Description
----|-----------
[KubeSphere](#cdk-kubesphere-kubesphere)|The KubeSphere workload.


**Structs**

Name|Description
----|-----------
[KubeSphereProps](#cdk-kubesphere-kubesphereprops)|The construct properties for KubeSphere.



## class KubeSphere  <a id="cdk-kubesphere-kubesphere"></a>

The KubeSphere workload.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new KubeSphere(scope: Construct, id: string, props?: KubeSphereProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[KubeSphereProps](#cdk-kubesphere-kubesphereprops)</code>)  *No description*
  * **appStore** (<code>boolean</code>)  whether to enable the KubeSphere Application Store(openpitrix). __*Default*__: false
  * **cluster** (<code>[ICluster](#aws-cdk-aws-eks-icluster)</code>)  The existing Amazon EKS cluster(if any). __*Default*__: create a default new cluster
  * **nodegroupOptions** (<code>[NodegroupOptions](#aws-cdk-aws-eks-nodegroupoptions)</code>)  Options to create the Amazon EKS managed nodegroup. __*Default*__: 2x m5.large on-demand instances




## struct KubeSphereProps  <a id="cdk-kubesphere-kubesphereprops"></a>


The construct properties for KubeSphere.



Name | Type | Description 
-----|------|-------------
**appStore**? | <code>boolean</code> | whether to enable the KubeSphere Application Store(openpitrix).<br/>__*Default*__: false
**cluster**? | <code>[ICluster](#aws-cdk-aws-eks-icluster)</code> | The existing Amazon EKS cluster(if any).<br/>__*Default*__: create a default new cluster
**nodegroupOptions**? | <code>[NodegroupOptions](#aws-cdk-aws-eks-nodegroupoptions)</code> | Options to create the Amazon EKS managed nodegroup.<br/>__*Default*__: 2x m5.large on-demand instances



