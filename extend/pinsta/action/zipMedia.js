var Q = require('q');
var JSZip = require('jszip');
var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');

fs.ensureDir('zip')


function zipMedia(binary_files) {
    var def = Q.defer();
    var zip = new JSZip();

    for (var i = 0, len = binary_files.length; i < len; i++) {
        var file = binary_files[i];
        var basename = file.history[0];
        var fullname = file.history[1];
        // console.log(basename, fullname);
        if (i == 0) {
            basename = 'coverImage.jpg';
        }
        zip.file(basename, fs.readFileSync(fullname));
    }

    var buffer = zip.generate({
        type: "nodebuffer"
    });

    var localZipPath = path.join('zip', +new Date + '.zip');
    fs.outputFile(localZipPath, buffer, function(err) {
        if (err) {
            return def.resolve({
                status: false,
                data: null,
                err: err
            });
        }
        def.resolve({
            status: true,
            data: {
                localZipPath: path.resolve(localZipPath)
            }
        });
    });
    return def.promise;
};

module.exports = zipMedia
