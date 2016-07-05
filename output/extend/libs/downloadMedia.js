var Download = require('download');
var Q = require('q');
var _ = require('lodash');

function DownloadMedia(opts) {
    var config = arguments.callee.config || {
        dest: './dest'
    };
    opts['files'] = [].concat([], opts.files);
    var def = Q.defer();
    var files = opts.files;
    var download = new Download({
        extract: true,
        strip: 1
    }).dest(config['dest']);

    for (var i = 0, len = files.length; i < len; i++) {
        var file = files[i];
        download.get(file);
    }
    download.run(function(err, binary_files, stream) {
        if (err) {
            return def.resolve({
                status: false,
                err: err
            });
        }
        def.resolve({
            status: true,
            data: {
                binary_files: binary_files
            }
        });
    });
    return def.promise;
};

module.exports = DownloadMedia;