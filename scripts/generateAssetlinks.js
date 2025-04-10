/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const packageName = process.env.NEXT_PUBLIC_ANDROID_PACKAGE_NAME || 'com.vip.app';

const assetlinks = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: packageName,
      sha256_cert_fingerprints: [
        'DF:30:DC:32:F6:2C:7D:EA:62:4F:BF:47:4B:F7:0B:9F:CC:B9:7D:AF:EF:84:28:D9:2F:58:5A:21:88:C1:2F:5D',
      ],
    },
  },
];

const targetDir = path.join(__dirname, '..', 'public', '.well-known');
const targetFile = path.join(targetDir, 'assetlinks.json');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetFile, JSON.stringify(assetlinks, null, 2));
console.log(`assetlinks.json generated with package: ${packageName}`);
