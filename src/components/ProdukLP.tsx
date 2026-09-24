'use client';

import React, { useEffect, useRef } from 'react';
import { headHtml, bodyHtml } from './ProdukLpTemplate';

export default function ProdukLP({ agent }: { agent: any }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      let phone = agent.phone || agent.whatsappNumber || '081234567890';
      if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1);
      }
      
      const doc = iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html lang="en-US">
          <head>
            ${headHtml.replace(/\{\{AGENT_NAME\}\}/g, agent.fullName || 'Agen')}
          </head>
          <body>
            ${bodyHtml.replace(/\{\{AGENT_NAME\}\}/g, agent.fullName || 'Agen').replace(/\{\{AGENT_PHONE\}\}/g, phone).replace(/\{\{AGENT_COWAY_ID\}\}/g, agent.cowayId || 'Menunggu Verifikasi')}
            <script>
              document.addEventListener("click", function(e) {
                const anchor = e.target.closest("a");
                if (anchor && anchor.href && anchor.href.includes("api.whatsapp.com")) {
                  try {
                    fetch(window.parent.location.origin + "/api/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: "Pengunjung Produk",
                        phone: "Klik Langsung WA",
                        agentId: "${agent.id}",
                        targetProduct: "Tanya Detail (Produk LP)"
                      })
                    });
                  } catch(err) {
                    console.error(err);
                  }
                }
              });
            </script>
          </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [agent]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflow: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <iframe 
        ref={iframeRef}
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Coway Agent Product Page"
      />
    </div>
  );
}
