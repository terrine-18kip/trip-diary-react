# Trip Diary

旅行の計画を立てて、オンラインで簡単におしゃれなしおりを作ることができるWebアプリケーション

## 概要

Trip Diaryは、旅の計画をお手伝いする現代的なWebアプリケーションです。友達と一緒に旅行の計画を立てたり、美しいしおりを作成して共有することができます。

### 主な機能

- 🗓️ **旅行計画の作成・編集** - 日程、スポット、費用などを管理
- 👥 **共同編集** - 友達を招待して一緒に旅行を計画
- 🔗 **URL共有** - 簡単なURLで旅行のしおりを共有
- 📱 **レスポンシブ対応** - スマホ・PC・タブレットで快適に利用
- 🎨 **美しいUI** - 直感的で使いやすいインターフェース
- 🔒 **プライバシー設定** - 公開・非公開の設定が可能

## 技術スタック

### フロントエンド
- **React** 17.0.2 - UIライブラリ
- **TypeScript** 4.5.5 - 型安全な開発
- **Ant Design** 4.18.4 - UIコンポーネントライブラリ
- **React Router** 6.21.2 - SPA ルーティング
- **Emotion** 11.7.1 - CSS-in-JS
- **SWR** 1.3.0 - データフェッチング
- **Axios** 0.25.0 - HTTP クライアント

### バックエンド
- **Laravel** 8.75 - PHP Webフレームワーク
- **PHP** 8.0+ - サーバーサイド言語
- **Laravel Sanctum** 2.11 - API認証
- **MySQL** 8.0 - データベース

### インフラ・開発環境
- **Docker** - コンテナ化
- **Docker Compose** - 複数コンテナの管理
- **phpMyAdmin** - データベース管理ツール

## セットアップ

### 前提条件

- Docker & Docker Compose がインストールされていること
- Git がインストールされていること

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd trip-diary-react
```

### 2. Docker環境の起動

```bash
cd docker
docker-compose up -d
```

これで以下のサービスが起動します：
- **フロントエンド**: http://localhost:3000
- **バックエンド**: http://localhost:80
- **phpMyAdmin**: http://localhost:8080
- **MySQL**: localhost:3306

### 3. バックエンドの初期設定

```bash
# バックエンドコンテナに入る
docker exec -it trip_diary_app bash

# 依存関係のインストール
composer install

# 環境変数ファイルのコピー
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# データベースマイグレーション
php artisan migrate

# シーダーの実行（オプション）
php artisan db:seed
```

### 4. フロントエンドの設定

フロントエンドは Docker Compose で自動的にセットアップされますが、手動で設定する場合：

```bash
cd frontend
npm install
npm start
```

## プロジェクト構成

```
trip-diary-react/
├── backend/              # Laravel バックエンド
│   ├── app/
│   │   ├── Http/Controllers/  # API コントローラー
│   │   └── Models/           # Eloquent モデル
│   ├── database/
│   │   ├── migrations/       # データベースマイグレーション
│   │   └── seeders/         # データベースシーダー
│   └── routes/
│       └── api.php          # API ルート定義
├── frontend/             # React フロントエンド
│   ├── public/          # 静的ファイル
│   └── src/
│       ├── components/   # React コンポーネント
│       ├── hooks/       # カスタムフック
│       ├── types/       # TypeScript 型定義
│       └── styles/      # スタイルファイル
├── docker/              # Docker 設定
│   ├── docker-compose.yml
│   ├── app/            # バックエンド用 Dockerfile
│   ├── front/          # フロントエンド用 Dockerfile
│   └── db/             # MySQL 設定
└── README.md           # このファイル
```

## データベース設計

### 主要テーブル

- **users** - ユーザー情報
- **trips** - 旅行情報
- **trip_user** - ユーザーと旅行の関連（多対多）
- **plans** - 旅行の日程
- **spots** - 観光スポット情報
- **places** - 宿泊施設などの場所情報

## API エンドポイント

### 認証
- `POST /api/entry` - ユーザー登録
- `GET /api/user` - ユーザー情報取得

### 旅行管理
- `GET /api/trips` - 旅行一覧取得
- `POST /api/trips` - 旅行作成
- `GET /api/trips/{id}` - 旅行詳細取得
- `PUT /api/trips/{id}` - 旅行更新
- `DELETE /api/trips/{id}` - 旅行削除
- `GET /api/trips/find/{uniqid}` - ユニークIDで旅行検索

### メンバー管理
- `POST /api/trips/add_member` - メンバー追加
- `POST /api/trips/remove_member` - メンバー削除

## セキュリティ

- Laravel Sanctumによる認証
- CSRF保護
- XSS対策
- SQL インジェクション対策（Eloquent ORM）
- プライバシー設定による閲覧制限

## スタイルガイド

### CSS-in-JS
- Emotionを使用したスタイル管理
- コンポーネントベースのスタイル
- レスポンシブデザイン対応

### カラーパレット
- アクセントカラー: `#ce8d75`
- 背景色: `#fafafa`
- テキスト: `#171717`

## テスト

### バックエンド
```bash
# PHPUnit テストの実行
cd backend
php artisan test
```

### フロントエンド
```bash
# Jest テストの実行
cd frontend
npm test
```
