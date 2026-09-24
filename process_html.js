const fs = require('fs');

let html = fs.readFileSync('cowayagent.html', 'utf-8');

// Fix URLs
html = html.replace(/(href|src|srcset)=["'](\/wp-content[^"']*)["']/g, '$1="https://cowayagent.id$2"');
html = html.replace(/(href|src|srcset)=["'](\/wp-includes[^"']*)["']/g, '$1="https://cowayagent.id$2"');
html = html.replace(/(href|src|srcset)=["']\/\/cowayagent\.id([^"']*)["']/g, '$1="https://cowayagent.id$2"');

// Replace agent info
html = html.replace(/6285188347258/g, '{{AGENT_PHONE}}');
html = html.replace(/Ricky\s*Salim/gi, '{{AGENT_NAME}}');
html = html.replace(/Ricky/g, '{{AGENT_NAME}}');
html = html.replace(/Salim/g, ''); // just in case
html = html.replace(/<b>Coway Agent<\/b> \| Authorized/g, '<b>Coway Logaritma</b> | Authorized');
html = html.replace(/DST250200122/g, '{{AGENT_COWAY_ID}}');
html = html.replace(/>\s*cowayagent\.id\s*</g, '>coway.logaritma.id<');
html = html.replace(/info@cowayagent\.id/g, 'logaritma.tim@gmail.com');
html = html.replace(/Coway Agent Indonesia/g, 'Coway Logaritma');
html = html.replace(/<title>.*?<\/title>/, '<title>{{AGENT_NAME}} - Coway Logaritma</title>');

// INJECT CUSTOM CSS TO FIX MOBILE MENU AND SLIDER VISIBILITY
const customCss = `
<style>
  /* Fix Oxygen Builder mobile menu */
  .oxy-nav-menu.oxy-nav-menu-open .oxy-nav-menu-list {
    display: flex !important;
    flex-direction: column !important;
    background: #fff !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    z-index: 999999 !important;
    padding: 10px 0 !important;
  }
  .oxy-nav-menu.oxy-nav-menu-open .oxy-nav-menu-list a {
    color: #000 !important;
    padding: 15px 20px !important;
    display: block !important;
    font-size: 16px !important;
    border-bottom: 1px solid #eee !important;
  }
</style>
`;
html = html.replace('</head>', customCss + '</head>');

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

const headContent = headMatch ? headMatch[1] : '';
const bodyContent = bodyMatch ? bodyMatch[1] : '';

fs.writeFileSync('src/components/ProdukLpTemplate.ts', `
export const headHtml = \`${headContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
export const bodyHtml = \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
`);
console.log('Template parsed and injected fixed custom CSS for mobile menu.');
