const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        status: "ok",
        service: "wallstreet-ai-publisher",
        version: "1.1.0",
      })
    );
  }

  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        healthy: true,
      })
    );
  }

  if (req.method === "POST" && req.url === "/publish") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      console.log("Received publish request:");
      console.log(body);

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          message: "Publish request received",
        })
      );
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Publisher API running on port ${PORT}`);
});
