import React, { useState } from 'react';
import '../css/ApiList.css';
import { ApiCategory, Api } from '../types';

interface ApiListProps {
  apiCategories: ApiCategory[];
  onSelect: (api: Api) => void;
}

const ApiList: React.FC<ApiListProps> = ({ apiCategories, onSelect }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(category)) {
      newExpandedCategories.delete(category);
    } else {
      newExpandedCategories.add(category);
    }
    setExpandedCategories(newExpandedCategories);
  };

  return (
    <div className="api-list">
      {apiCategories.map(category => (
        <div key={category.category}>
          <h3 className={`category-header ${expandedCategories.has(category.category) ? 'expanded' : ''}`} onClick={() => toggleCategory(category.category)}>
            {category.category}
          </h3>
          {expandedCategories.has(category.category) && (
            <ul>
              {category.apis.map(api => (
                <li key={api.name}>
                  <button className={`api-button ${api.method.toLowerCase()}`} onClick={() => onSelect(api)} tabIndex={-1}>
                    {api.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div>
        <h3 className={`category-header ${expandedCategories.has('JSON') ? 'expanded' : ''}`} onClick={() => toggleCategory('JSON')}>
          JSON
        </h3>
        {expandedCategories.has('JSON') && (
          <ul>
            <li>
              <button className="api-button get" onClick={() => onSelect({ name: '現在適用されているJsonを確認する', endpoint: '/api/json', method: 'GET', requiresAuth: false })} tabIndex={-1}>
                現在適用中のJsonを確認する
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApiList;
