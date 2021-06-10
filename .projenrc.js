const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.82.0',
  description: 'CDK construct library to deploy KubeSphere on AWS',
  name: 'cdk-kubesphere',
  repositoryUrl: 'https://github.com/pahud/cdk-kubesphere.git',
  cdkDependencies: [
    '@aws-cdk/aws-eks',
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-ec2',
  ],
  defaultReleaseBranch: 'main',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  python: {
    distName: 'cdk-kubesphere',
    module: 'cdk_kubesphere',
  },
  keywords: [
    'cdk',
    'kubesphere',
    'kubernetes',
    'eks',
  ],
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
