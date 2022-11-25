import { DEFAULT_DOS_URL_PATH } from "./const";
function createServerConfig(path=DEFAULT_DOS_URL_PATH){
  return {
    before: function (app) {
      const child_process = require("child_process");
      console.log('server.ts path is',path)
      app.get(`${path}`, function (req, res) {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Credentials', true);
        child_process.exec(`code ${req.query.filePath}`);
        res.send("");
      });
    },
  }
}


export default createServerConfig