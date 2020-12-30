const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'Pahud',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.80.0',
  name: 'cdk-kubesphere',
  repositoryUrl: 'https://github.com/pahud/cdk-kubesphere.git',
  

});

project.synth();
