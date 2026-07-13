const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
      status: "ok",
      service: "wallstreet-ai-publisher",
      version: "1.0.0"
    }));
  }

  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
      healthy: true
    }));
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on ${PORT}`);
});
