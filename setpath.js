var path = require('path');

var expandpath = function(urlstr) {
  //if url is in the root directory, call the index.html file
  if (urlstr == '/')
     fileurl = '/htdocs/index.html';
  //if url is for the installed module for spectre.css, add the full file url
  //call the spectre.min.css file
  else if (urlstr == '/node_modules/spectre.css/')
  //else if url is for other files in the htdocs directory, add htdocs to url
     fileurl = '/node_modules/spectre.css/dist/spectre.min.css';
  else fileurl = path.join('/htdocs/', urlstr);

  // get the actual system filepath for this
   var filepath = path.join(process.cwd(), fileurl);
   console.log("filepath is %s", filepath);

  return filepath;
}

module.exports = expandpath;
