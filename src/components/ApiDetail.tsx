import React, { useState, useEffect } from 'react';
import '../css/ApiDetail.css';
import { Api, Param } from '../types';

interface ApiDetailProps {
  api: Api;
  domain: string;
}

const ApiDetail: React.FC<ApiDetailProps> = ({ api, domain }) => {
  const [token, setToken] = useState<string>('');
  const [params, setParams] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    setToken('');
    setParams({});
    setResponse(null);
  }, [api]);

  const handleRequest = async () => {
    try {
      const url = new URL(api.endpoint, domain);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };

      if (api.requiresAuth) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method: api.method,
        headers: headers
      };

      const res = await fetch(url.toString(), config);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
        setResponse({ type: 'json', content: JSON.stringify(data, null, 2) });
      } else if (contentType && contentType.includes('text/html')) {
        data = await res.text();
        setResponse({ type: 'html', content: formatHTML(data) });
      } else {
        data = await res.text();
        setResponse({ type: 'text', content: data });
      }

      setTimeout(() => {
        const responseElement = document.getElementById('response');
        if (responseElement) {
          responseElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);

    } catch (error: any) {
      const errorMessage = error.message;
      const isHtmlError = errorMessage.includes('<html');
      setResponse({
        type: 'error',
        content: isHtmlError ? formatHTML(errorMessage) : formatError(errorMessage),
      });
    }
  };

  const handleParamChange = (name: string, value: string) => {
    setParams({ ...params, [name]: value });
  };

  const renderInput = (param: Param) => {
    switch (param.type) {
      case 'string':
        return (
          <input
            type="text"
            onChange={e => handleParamChange(param.name, e.target.value)}
          />
        );
      case 'integer':
        return (
          <input
            type="number"
            onChange={e => handleParamChange(param.name, e.target.value)}
          />
        );
      case 'boolean':
        return (
          <select onChange={e => handleParamChange(param.name, e.target.value)}>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        );
      default:
        return (
          <input
            type="text"
            onChange={e => handleParamChange(param.name, e.target.value)}
          />
        );
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return <pre>{response.content}</pre>;
  };

  return (
    <div className="api-detail">
      <h2 className={`api-method ${api.method.toLowerCase()}`}>{api.method}: {api.name}</h2>
      <div className="form-group">
        <div className="label-inline">
          <label>Endpoint</label>
          <input className="endpoint" type="text" value={api.endpoint} readOnly tabIndex={-1} />
        </div>
      </div>
      {api.requiresAuth && (
        <div className="form-group">
          <div className="label-inline">
            <label>Bearer Token</label>
            <input type="text" value={token} onChange={e => setToken(e.target.value)} />
          </div>
        </div>
      )}
      {api.params && api.params.length > 0 && (
        <div className="params">
          <h3>Parameters</h3>
          {api.params.map(param => (
            <div key={param.name} className="param">
              <div className="label-inline">
                <label>{param.name} ({param.type}) {param.required && <span className="required">*</span>}</label>
                {renderInput(param)}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="form-group-end">
        <button className="request-button" onClick={handleRequest}>Send Request</button>
      </div>
      {response && (
        <div id="response" className="response">
          <h3>Response</h3>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

const formatHTML = (html: string) => {
  const formattedHtml = html.replace(/(>)(<)(\/?)/g, '$1\r\n$2$3');
  let pad = 0;
  const formatted = formattedHtml.split('\r\n').map((node, index) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    const padding = new Array(pad + 1).join('  ');
    pad += indent;

    return padding + node;
  }).join('\r\n');

  return formatted;
};

const formatError = (error: string) => {
  return JSON.stringify({ error: error }, null, 2);
};

export default ApiDetail;
