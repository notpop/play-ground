# API Playground

このプロジェクトは、APIをテストするためのインターフェースを提供するReactアプリケーションです。ユーザーは、APIエンドポイント、メソッド、およびパラメータを指定してリクエストを送信し、レスポンスを確認できます。また、現在使用しているAPIの設定を表示することもできます。

~~- [Demo]()~~

## 利用可能なスクリプト

プロジェクトディレクトリで以下のコマンドを実行できます：

### `npm start`

アプリケーションを開発モードで実行します。\
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて表示を確認できます。

このページは編集すると自動的にリロードされます。\
コンソールにはLintエラーも表示されます。

### `npm run build`

プロダクション用のアプリケーションを `build` フォルダにビルドします。\
Reactをプロダクションモードで正しくバンドルし、最高のパフォーマンスのためにビルドを最適化します。

ビルドは最小化され、ファイル名にはハッシュが含まれます。\
アプリケーションはデプロイする準備が整いました。

詳細は [デプロイ](https://facebook.github.io/create-react-app/docs/deployment) を参照してください。

## プロジェクトの設定

### `npm run check-json`

APIエンドポイントは `public/api.json` ファイルに設定されています。以下の形式で定義します：

```json
{
  "domain": "http://localhost:3000",
  "categories": [
    {
      "category": "ユーザー管理",
      "apis": [
        {
          "name": "Get Users",
          "endpoint": "/api/users",
          "method": "GET",
          "requiresAuth": true,
          "params": [
            { "name": "userId", "type": "string", "required": true }
          ]
        },
        ...
      ]
    },
    ...
  ]
}
```

定義したら、`public/api.json`が正しいかコマンドでチェックしてください


## アーキテクチャ
このプロジェクトは以下の主要なコンポーネントで構成されています：

- App.tsx: アプリケーションのメインコンポーネント
- ApiList.tsx: APIリストを表示するサイドバーコンポーネント
- ApiDetail.tsx: 選択されたAPIの詳細を表示し、リクエストを送信するコンポーネント
- JsonViewer.tsx: 現在のAPI設定を表示するコンポーネント
## Learn More
Reactの詳細については、[React documentation](https://reactjs.org/) を参照してください。

Create React Appの詳細については、[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) を参照してください。

このREADMEは、プロジェクトの基本的な情報、利用可能なスクリプト、設定方法、アーキテクチャの概要などを提供します。必要に応じて、プロジェクトの具体的な要件やカスタマイズに合わせて修正してください。
# play-ground
