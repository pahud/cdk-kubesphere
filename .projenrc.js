const { AwsCdkConstructLibrary } = require('projen');
const { Automation } = require('projen-automate-it');


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
  releaseBranches: ['main'],
  defaultReleaseBranch: 'main',
  dependabot: false,
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
  deps: [
    'projen-automate-it',
  ],
  bundledDeps: [
    'projen-automate-it',
  ],
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
});


const automation = new Automation(project, {
  automationToken: AUTOMATION_TOKEN,
});

automation.autoApprove();
automation.autoMerge();
automation.projenYarnUpgrade();


const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
