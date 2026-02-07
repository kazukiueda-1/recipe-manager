# レシピノート

家族で使えるレシピ管理アプリ。クックパッドなど複数のレシピサイトに散らばったレシピや、口頭で教えてもらったレシピを統一フォーマットで管理できます。

## 機能

- **メンバー選択**: 家族メンバーを選んでアプリを利用
- **レシピ管理**: 手動登録、編集、削除
- **URLからレシピ取得**: レシピサイトのURLからAIが自動解析
- **音声入力**: 音声でレシピを伝えてAIが構造化
- **検索・フィルタ**: キーワード検索、カテゴリ・タグフィルタ
- **画像アップロード**: レシピのサムネイル画像を登録
- **設定管理**: メンバー、カテゴリ、タグの管理

## 技術スタック

- **フロントエンド**: React + TypeScript + Tailwind CSS
- **ルーティング**: React Router
- **バックエンド**: Firebase (Firestore, Cloud Storage, Cloud Functions)
- **AI処理**: Claude API (Anthropic)
- **音声認識**: Web Speech API
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## デプロイ

mainブランチへのpushでGitHub Pagesに自動デプロイされます。

## Cloud Functions

```bash
cd functions
npm install
npm run deploy
```

## URL

- アプリ: https://kazukiueda-1.github.io/recipe-manager/
- リポジトリ: https://github.com/kazukiueda-1/recipe-manager
