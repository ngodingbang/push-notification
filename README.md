# NgodingBang Push Notification with Bun runtime

Create a simple push notification on a web based on this tutorial: https://www.youtube.com/playlist?list=PL62km_yqC3ZF5Dh9vFdjjRxvn1xQKqj4B.

## Installation

To get started using this app, simply paste this command into your terminal:

```bash
bun install
bunx prisma migrate dev # migrate database
```

## Development

To start the development server run:

### API

```bash
bun run api:dev
bun run api:dev:secure # run server using https
```

Open http://localhost:3000 (or another port based on the .env configuration) with your browser to see the result.

### Web

```bash
bun run web:dev
bun run web:dev:secure # run server using https
```

Open http://localhost:3001 (or another port based on the .env configuration) with your browser to see the result.
