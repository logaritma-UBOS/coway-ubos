const fs = require('fs');

let html = fs.readFileSync('cowayagent.html', 'utf-8');

// Replace relative paths with absolute ones
html = html.replace(/(href|src|srcset)=["'](\/wp-content[^"']*)["']/g, '$1="https://cowayagent.id$2"');
html = html.replace(/(href|src|srcset)=["'](\/wp-includes[^"']*)["']/g, '$1="https://cowayagent.id$2"');

html = html.replace(/6285188347258/g, '{{AGENT_PHONE}}');
html = html.replace(/Ricky/g, '{{AGENT_NAME}}');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

const headContent = headMatch ? headMatch[1] : '';
const bodyContent = bodyMatch ? bodyMatch[1] : '';

fs.writeFileSync('src/components/ProdukLpTemplate.ts', `
export const headHtml = \`${headContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
export const bodyHtml = \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
`);
console.log('Template parsed and updated relative links successfully.');
