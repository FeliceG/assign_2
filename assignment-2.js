//simple (and incomplete) http server

//command+s, then press ctrl-r to run it and a window will open showing the console.
var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var expandpath = require('./setpath');

http.createServer((req,res) => {

  //this is my custom module that takes the request url and
  //creates the absolute path based on where the file is located.
  var filepath = expandpath(req.url);
  console.log("expandpath returned %s", filepath);

   // extract the filename extension
   var extname = String(path.extname(filepath)).toLowerCase();

   // set up mimetypes and associated filename extensions
   var contentType = 'text/html';
   var mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg'
    };
    // set mimetype if it is known
    contentType = mimeTypes[extname] || 'application/octet-stream';

   // see if this file exists
   fs.stat(filepath, (err) => {
     if (err){
       // handle case of file not found
       if (err.code == 'EOENT'){
         res.writeHead(404, {"Content-Type": "text/plain"});
         res.end("404 Not Found\n");
         console.log("EOENT Error")
         console.log(err);
         return;
       }
       // if an error other than EOENT, handle that here
       res.writeHead(500, {"Content-Type": "text/plain"});
       res.end("500 Error\n");
       console.log("500 error")
       console.log(err);
       return;
     }
     // try to read the file from disk
     fs.readFile(filepath, (err, data) => {
       if(err){
         res.writeHead(500, {"Content-Type": "text/plain"});
         res.end("500 Error\n");
         console.log("Read file error")
         console.log(err);
         return;
       }

       // send the data to the browser via the response
       res.writeHead(200);
       res.write(data);
       res.end();
       console.log("delivered %s", filepath);
     });
   });

}).listen(8080);
