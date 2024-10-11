import React, { useState, useEffect } from 'react';
import ApiList from './components/ApiList';
import ApiDetail from './components/ApiDetail';
import JsonViewer from './components/JsonViewer';
import InitialDetail from './components/InitialDetail';
import './css/App.css';
import { Api, ApiData } from './types';

const App: React.FC = () => {
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [selectedApi, setSelectedApi] = useState<Api | null>(null);
  const [showJsonViewer, setShowJsonViewer] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setApiData(data))
      .catch(error => console.error('There was a problem with the fetch operation:', error));
  }, []);

  const handleReset = () => {
    setSelectedApi(null);
    setShowJsonViewer(false);
  };

  const handleSelect = (api: Api) => {
    if (api.endpoint === '/api/json') {
      setShowJsonViewer(true);
      setSelectedApi(null);
    } else {
      setSelectedApi(api);
      setShowJsonViewer(false);
    }
  };

  return (
    <div className="app">
      <button className="top-link" onClick={handleReset} tabIndex={-1}>
        <h1>API Playground</h1>
      </button>
      <div className="content">
        <div className="sidebar">
          {apiData && (
            <ApiList apiCategories={apiData.categories} onSelect={handleSelect} />
          )}
        </div>
        <div className="main">
          {showJsonViewer ? (
            <JsonViewer />
          ) : selectedApi ? (
            <ApiDetail api={selectedApi} domain={apiData?.domain || ''} />
          ) : (
            <InitialDetail />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
