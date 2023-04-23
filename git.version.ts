import { writeFileSync } from 'fs';
import { dedent } from 'tslint/lib/utils';
import { promisify } from 'util';
import * as child from 'child_process';
const exec = promisify(child.exec);

// tslint:disable-next-line:typedef
async function createVersionsFile(filename: string) {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();

  console.log(`version: '${process.env.npm_package_version}', revision: '${revision}', branch: '${branch}'`);

  const content = dedent`
      // this file is automatically generated by git.version.ts script
      export const versions = {
        version: '${process.env.npm_package_version}',
        revision: '${revision}',
        branch: '${branch}',
        date: '${new Date().toLocaleString()}'
      };\n`;

  writeFileSync(filename, content, {encoding: 'utf8'});
}

createVersionsFile('src/environments/versions.ts');
