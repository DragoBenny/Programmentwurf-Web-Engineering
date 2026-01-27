const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
    res.status = 200;
    res.end();
});

// HTTP-Server starten, lauscht auf Port 3000 auf anfragen
server.listen(port, () => {
    console.log("Node.js Server lÃ¤uft auf Port ", port);
});