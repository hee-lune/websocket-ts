const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

const socketProxy = createProxyMiddleware(["/api"], {
  target: "http://localhost:3001",
  ws: true,
});

app
  .prepare()
  .then(() => {
    server.use(socketProxy);

    server.all("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(port, () => {
      console.debug(`> Runnning on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.error();
    process.exit(1);
  });
