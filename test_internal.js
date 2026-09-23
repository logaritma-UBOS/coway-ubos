const fs = require('fs');
const html = fs.readFileSync('cowayagent.html', 'utf-8');
const m = html.match(/href=["'](https:\/\/cowayagent\.id[^"']*)["']/g);
console.log(m ? m.slice(0, 10).join('\n') : 'none');
