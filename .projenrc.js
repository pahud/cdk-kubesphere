const { AwsCdkConstructLibrary } = require('projen');

const AUTOMATION_TOKEN = 'GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.81.0',
  name: 'cdk-kubesphere',
  repositoryUrl: 'https://github.com/pahud/cdk-kubesphere.git',
  cdkDependencies: [
    '@aws-cdk/aws-eks',
    '@aws-cdk/core',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-ec2',
  ],
  deps: ['awscdk-81-patch'],
  peerDeps: ['awscdk-81-patch'],
  releaseBranches: ['main'],
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
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
});

// create a custom projen and yarn upgrade workflow
workflow = project.github.addWorkflow('ProjenYarnUpgrade');

workflow.on({
  schedule: [{
    cron: '11 0 * * *',
  }], // 0:11am every day
  workflow_dispatch: {}, // allow manual triggering
});

workflow.addJobs({
  upgrade: {
    'runs-on': 'ubuntu-latest',
    'steps': [
      { uses: 'actions/checkout@v2' },
      {
        uses: 'actions/setup-node@v1',
        with: {
          'node-version': '10.17.0',
        },
      },
      { run: 'yarn upgrade' },
      { run: 'yarn projen:upgrade' },
      // submit a PR
      {
        name: 'Create Pull Request',
        uses: 'peter-evans/create-pull-request@v3',
        with: {
          'token': '${{ secrets.' + AUTOMATION_TOKEN + ' }}',
          'commit-message': 'chore: upgrade projen',
          'branch': 'auto/projen-upgrade',
          'title': 'chore: upgrade projen and yarn',
          'body': 'This PR upgrades projen and yarn upgrade to the latest version',
          'labels': 'auto-merge',
        },
      },
    ],
  },
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
