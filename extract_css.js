const fs = require('fs');
const html = fs.readFileSync('cowayagent.html', 'utf-8');
const links = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/g);
if (links) {
  links.forEach(l => {
    const match = l.match(/href=["']([^"']+)["']/);
    if (match) console.log(match[1]);
  });
}
