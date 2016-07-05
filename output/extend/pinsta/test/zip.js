var JSZip = require('jszip');
var fs = require('fs')

var zip = new JSZip();

zip.file('hello.txt', fs.readFileSync('hello.txt'));

var buffer = zip.generate({type:"nodebuffer"});

fs.writeFile("testdd.zip", buffer, function(err) {
  if (err) throw err;
});
