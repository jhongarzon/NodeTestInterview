const FileHandler = require("./src/fileHandler");
const http = require("http");

var server = http.createServer();
server.listen(3001, "127.0.0.1", () => {
  console.log("listening...");
  var fh = new FileHandler();
  fh.readFile("src/data/test.txt");
});
