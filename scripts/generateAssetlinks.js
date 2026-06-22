require('dotenv').config();
const fs = require('fs');
const path = require('path');

const packageName = process.env.NEXT_PUBLIC_APP_PACKAGE_NAME || 'com.vip.app';
const signingShaKey = process.env.NEXT_PUBLIC_ANDROID_SIGNING_SHA_KEY || 'shaKey';
const uploadShaKey = process.env.NEXT_PUBLIC_ANDROID_UPLOAD_SHA_KEY;
let shaKeys = [signingShaKey];
if (uploadShaKey) {
  shaKeys.push(uploadShaKey);
}

const assetlinks = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: packageName,
      sha256_cert_fingerprints: shaKeys,
    },
  },
];

const targetDir = path.join(__dirname, '..', 'public', '.well-known');
const targetFile = path.join(targetDir, 'assetlinks.json');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(targetFile, JSON.stringify(assetlinks, null, 2));
console.log(`assetlinks.json generated with package: ${packageName} and signing SHA key: ${signingShaKey}`);
