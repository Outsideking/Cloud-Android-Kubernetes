import React, { useEffect, useRef } from 'react';
import RFB from 'novnc/core/rfb.js';

export default function AndroidScreen({ podName }) {
  const vncRef = useRef(null);

  useEffect(() => {
    // สมมติ Ingress ตั้งชื่อ subdomain เป็น podName.example.com
    const rfb = new RFB(vncRef.current, `wss://${podName}.example.com:6080`);
    rfb.viewOnly = false;
    rfb.scaleViewport = true;

    return () => rfb.disconnect();
  }, [podName]);

  return <div ref={vncRef} style={{ width: '1280px', height: '720px', border: '2px solid black' }} />;
      }
