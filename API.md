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
  * **cluster** (<code>[ICluster](#aws-cdk-aws-eks-icluster)</code>)  The existing Amazon EKS cluster(if any). __*Optional*__




## struct KubeSphereProps  <a id="cdk-kubesphere-kubesphereprops"></a>


The construct properties for KubeSphere.



Name | Type | Description 
-----|------|-------------
**cluster**? | <code>[ICluster](#aws-cdk-aws-eks-icluster)</code> | The existing Amazon EKS cluster(if any).<br/>__*Optional*__



