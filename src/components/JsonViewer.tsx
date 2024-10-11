// src/components/JsonViewer.tsx
import React, { useEffect, useState } from 'react';
import '../css/JsonViewer.css';

const JsonViewer: React.FC = () => {
  const [jsonContent, setJsonContent] = useState<any>(null);

  useEffect(() => {
    const fetchJson = async () => {
      try {
        const res = await fetch('/api.json');
        const data = await res.json();
        setJsonContent(data);
      } catch (error) {
        setJsonContent((error as any).message);
      }
    };

    fetchJson();
  }, []);

  const formatJson = (json: any) => {
    return JSON.stringify(json, null, 2)
      .replace(/(&)/g, '&amp;')
      .replace(/(>)/g, '&gt;')
      .replace(/(<)/g, '&lt;')
      .replace(/(".*?")/g, '<span class="json-string">$1</span>')
      .replace(/(\b(true|false|null)\b)/g, '<span class="json-keyword">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="json-number">$1</span>');
  };

  return (
    <div className="json-viewer">
      {jsonContent && (
        <div className="json-content">
          <pre>
            <code dangerouslySetInnerHTML={{ __html: formatJson(jsonContent) }} />
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonViewer;
