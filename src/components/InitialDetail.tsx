// src/components/InitialDetail.tsx
import React from 'react';
import '../css/InitialDetail.css';

const InitialDetail: React.FC = () => {
  return (
    <div className="initial-detail">
      <h2>API Playground へようこそ</h2>
      <p>
        このインターフェースを使用すると、さまざまな API エンドポイントをテストできます。
        左側のリストから API を選択して詳細を表示し、リクエストを実行します。
      </p>
    </div>
  );
};

export default InitialDetail;
