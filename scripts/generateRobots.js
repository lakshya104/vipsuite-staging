/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

const productionRobots = `
User-agent: *
Allow: /
`;

const stagingRobots = `
User-agent: *
Disallow: /
`;

const robotsContent = isProduction ? productionRobots : stagingRobots;

const targetFile = path.join(__dirname, '..', 'public', 'robots.txt');

fs.writeFileSync(targetFile, robotsContent.trim() + '\n');

console.log(`robots.txt generated for ${isProduction ? 'PRODUCTION' : 'STAGING/PREVIEW'}`);
