/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const packageName = process.env.NEXT_PUBLIC_APP_PACKAGE_NAME || 'com.vip.app';

const aasaLinks = {
  applinks: {
    apps: [],
    details: [
      {
        appID: `KLT4AKNXLR.${packageName}`,
        components: [
          {
            '/': '/reset-password',
            query: {
              tnxref: '?*',
              status: '?*',
            },
          },
        ],
      },
    ],
  },
};

const targetDir = path.join(__dirname, '..', 'public', '.well-known');
const targetFile = path.join(targetDir, 'apple-app-site-association');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetFile, JSON.stringify(aasaLinks, null, 2));
console.log(`apple-app-site-association generated with package: ${packageName}`);
