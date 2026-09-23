const fs = require('fs');

let html = fs.readFileSync('cowayagent.html', 'utf-8');

// Replace relative paths and protocol-relative paths
html = html.replace(/(href|src|srcset)=["'](\/wp-content[^"']*)["']/g, '$1="https://cowayagent.id$2"');
html = html.replace(/(href|src|srcset)=["'](\/wp-includes[^"']*)["']/g, '$1="https://cowayagent.id$2"');
html = html.replace(/(href|src|srcset)=["']\/\/cowayagent\.id([^"']*)["']/g, '$1="https://cowayagent.id$2"');

// Replace phone number
html = html.replace(/6285188347258/g, '{{AGENT_PHONE}}');

// Replace name
html = html.replace(/Ricky/g, '{{AGENT_NAME}}');

// Replace specific Footer text
html = html.replace(/<b>Coway Agent<\/b> \| Authorized/g, '<b>Coway Logaritma</b> | Authorized');
html = html.replace(/DST250200122/g, '{{AGENT_COWAY_ID}}');

// Replace only the text nodes that show the website URL in the footer
html = html.replace(/>\s*cowayagent\.id\s*</g, '>coway.logaritma.id<');

html = html.replace(/<title>.*?<\/title>/, '<title>{{AGENT_NAME}} - Coway Logaritma</title>');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

const headContent = headMatch ? headMatch[1] : '';
const bodyContent = bodyMatch ? bodyMatch[1] : '';

fs.writeFileSync('src/components/ProdukLpTemplate.ts', `
export const headHtml = \`${headContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
export const bodyHtml = \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
`);
console.log('Template parsed and fixed Footer text.');
