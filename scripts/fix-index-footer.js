// AIGC START
const fs = require('fs');
const path = require('path');

const indexPath = path.resolve(__dirname, '../index.html');
const refPath = path.resolve(__dirname, '../Industrial-applications/index.html');

let content = fs.readFileSync(indexPath, 'utf8');
const ref = fs.readFileSync(refPath, 'utf8');

const re = /<div class="contacts">[\s\S]*?<\/p>\s*\n\t\t<\/div>/;

const extracted = ref.match(re);
if (!extracted) throw new Error('Cannot extract contacts block from reference');

const block = extracted[0].replace(/\.\.\//g, './');

const broken = content.match(re);
if (!broken) throw new Error('Cannot find broken contacts block in index.html');

content = content.replace(broken[0], block);
fs.writeFileSync(indexPath, content, 'utf8');
console.log('Footer contacts block replaced.');
// AIGC END
