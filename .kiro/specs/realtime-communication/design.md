# Design Document

## Overview

リアルタイム通信システムは、NestJSバックエンドとNext.jsフロントエンドを使用したSocket.IO基盤のWebSocket通信システムです。システムは開発環境での使いやすさと将来の拡張性を重視した設計となっています。

## Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Proxy Server  │    │   NestJS        │
│   (Port 3000)   │◄──►│   (Express)     │◄──►│   (Port 3001)   │
│                 │    │                 │    │                 │
│ - Socket.IO     │    │ - HTTP Proxy    │    │ - Socket.IO     │
│   Client        │    │ - WebSocket     │    │   Server        │
│ - React UI      │    │   Proxy         │    │ - Event Gateway │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Communication Flow

1. **Client Connection**: Next.jsクライアントがSocket.IOクライアントを初期化
2. **Proxy Routing**: Expressプロキシが`/api`パスをNestJSサーバーに転送
3. **WebSocket Handshake**: Socket.IOがWebSocket接続を確立
4. **Event Processing**: クライアントとサーバー間でイベントを送受信

## Components and Interfaces

### Backend Components (NestJS)

#### EventGateway
```typescript
@WebSocketGateway({
  path: '/api/events',
  cors: { origin: '*' }
})
```

**責任:**
- WebSocket接続の管理
- イベントの受信と処理
- クライアント接続状態の監視

**主要メソッド:**
- `handleConnection()`: クライアント接続時の処理
- `handleDisconnect()`: クライアント切断時の処理
- `test()`: テストイベントの処理

#### EventService
```typescript
@Injectable()
export class EventService
```

**責任:**
- ビジネスロジックの実装
- イベント処理の実行

#### AppModule
**責任:**
- アプリケーション全体の設定
- モジュールの統合管理

### Frontend Components (Next.js)

#### Socket.IO Client
```typescript
const socket: Socket = io({ path: '/api/events' });
```

**責任:**
- サーバーとのWebSocket接続
- イベントの送受信
- 接続状態の管理

#### Proxy Server
```javascript
const socketProxy = createProxyMiddleware(["/api"], {
  target: "http://localhost:3001",
  ws: true,
});
```

**責任:**
- HTTP/WebSocketリクエストのプロキシ
- 開発環境での接続管理

## Data Models

### Task Entity
```typescript
export class Task {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
}
```

### CreateTaskDto
```typescript
export class CreateTaskDto {
  name: string;
  description: string;
  dueDate: Date;
}
```

### Todo Models
```typescript
export class CreateTodoDto {
  id: number;
  name: string;
  created_at: Date;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
```

## Error Handling

### Connection Errors
- **接続失敗**: クライアント側でのリトライ機構
- **タイムアウト**: 適切なタイムアウト設定
- **ネットワークエラー**: 自動再接続機能

### Event Processing Errors
- **無効なイベント**: エラーレスポンスの返却
- **サーバーエラー**: ログ記録とエラー通知
- **データ検証エラー**: DTOによる入力検証

### Proxy Errors
- **バックエンド接続失敗**: フォールバック処理
- **プロキシエラー**: エラーログとクライアント通知

## Testing Strategy

### Unit Testing
- **NestJS**: Jest を使用したサービスとゲートウェイのテスト
- **Next.js**: React Testing Library を使用したコンポーネントテスト

### Integration Testing
- **WebSocket接続**: Socket.IOクライアント/サーバー間の通信テスト
- **プロキシ機能**: HTTP/WebSocketプロキシの動作テスト

### E2E Testing
- **フルフロー**: クライアントからサーバーまでの完全な通信フロー
- **エラーシナリオ**: 接続失敗、再接続などの異常系テスト

## Security Considerations

### CORS Configuration
- 開発環境: 全オリジン許可 (`origin: '*'`)
- 本番環境: 特定オリジンのみ許可

### Input Validation
- DTOによるデータ検証
- Socket.IOイベントの検証

### Connection Security
- 将来的な認証機能の実装準備
- セッション管理の考慮

## Performance Considerations

### Connection Management
- 接続プールの最適化
- メモリリークの防止

### Event Processing
- 非同期処理の活用
- イベントキューの管理

### Scalability
- 水平スケーリングの考慮
- Redis Adapterの将来的な導入