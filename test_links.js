const fs = require('fs');
const html = fs.readFileSync('src/components/ProdukLpTemplate.ts', 'utf-8');
const m = html.match(/(href|src|srcset)=["'](\/[a-zA-Z0-9][^"']*)["']/g);
console.log(m ? m.slice(0, 10).join('\n') : 'none');
