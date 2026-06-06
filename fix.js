const fs = require('fs');
let content = fs.readFileSync('backend/server.js', 'utf8');
content = content.replace(/\\\$\\{/g, '${');
content = content.replace(/\\`/g, '`');
fs.writeFileSync('backend/server.js', content);
