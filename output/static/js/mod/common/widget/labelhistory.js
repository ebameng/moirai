define(function() {
    function LabelHistory(opts) {
        this.options = _.extend({
            el: '',
            prefix: _NA_['uid'] + '_label_',
            itemTemplate: 'no template',
            remoteFormat: function(rs) {
                var root = rs['data']['resp']['adminMessage']['message'];
                var rootObj = {};
                try {
                    rootObj = JSON.parse(root);
                } catch (e) {
                    rootObj = {};
                    console.warn(e);
                }
                return rootObj;
            },
            onIterationItem: function() {},
            onLoaded: function() {},
            onInitialize: function() {}
        }, opts);
        this.el = this.options.el;
        this.init();
    };

    _.extend(LabelHistory.prototype, {
        init: function() {
            this.loadRemote();
            this.options.onInitialize.call(this);
        },
        show: function() {
            $(this.el).addClass('show');
        },
        isShow: function() {
            return $(this.el).hasClass('show');
        },
        hide: function() {
            $(this.el).removeClass('show');
        },
        removeRecord: function(key, callback) {
            var prefix = this.options.prefix;
            localforage.removeItem(prefix + key, callback);
        },
        removeRemoteRecord: function(key, callback) {
            var _that = this;
            this.getRemoteData(function(rs) {
                var rootObj = _that.options.remoteFormat(rs);
                labelMap = rootObj['label_'] || {};
                delete labelMap[key]
                rootObj['label_'] = labelMap;
                var root = JSON.stringify(rootObj);
                utils.api('/_bridge/admin/self/message/add', {
                    method: 'post',
                    data: {
                        'message': root
                    }
                }).done(callback);
            });
        },
        appendRecord: function(key, value, callback) {

            var prefix = this.options.prefix;
            this.removeRecord(key, function() {
                localforage.setItem(prefix + key, value, callback);
            });
            this.appendRemoteData(prefix + key, value, callback);
        },
        getAllRecords: function(callback) {
            var prefix = this.options.prefix;
            var _that = this;
            var result = [];
            localforage.iterate(function(value, key) {
                if (key.indexOf(prefix) == 0 && value['name']) {
                    result.push(value)
                } else {}
            }).then(function() {
                callback(result);
            });
        },
        loadRemote: function() {
            var _that = this;
            this.getRemoteData(function(rs) {
                var rootObj = _that.options.remoteFormat(rs);
                labelMap = rootObj['label_'] || {};
                for (var id in labelMap) {
                    var data = labelMap[id];
                    if (typeof data['type'] == 'undefined') {
                        _that.removeRecord(data['id']);
                        continue;
                    }
                    _that.options['onIterationItem'].call(_that, data);
                    $(_that.el).find('.main').append(_.template(_that.options['itemTemplate'], data));
                     
                }
                _that.options['onLoaded'].call(_that, labelMap, 'remote');
            });
        },
        loadLocal: function() {
            var _that = this;
            this.getAllRecords(function(list) {
                for (var i = list.length - 1; i >= 0; i--) {
                    var data = list[i];
                    if (typeof data['type'] == 'undefined') {
                        _that.removeRecord(data['id']);
                        continue;
                    }
                    _that.options['onIterationItem'].call(_that, data);
                    $(_that.el).find('.main').append(_.template(_that.options['itemTemplate'], data));
                }
                _that.options['onLoaded'].call(_that, list);
            });
        },
        appendRecordToRemote: function(key, data, callback) {
            var _that = this;
            this.getRemoteData(function(rs) {
                var rootObj = _that.options.remoteFormat(rs);
                var labelMap = rootObj['label_'] || {};
                labelMap[key] = data;
                rootObj['label_'] = labelMap;

                var root = JSON.stringify(rootObj);

                utils.api('/_bridge/admin/self/message/add', {
                    method: 'post',
                    data: {
                        'message': root
                    }
                }).done(callback);
            });
        },
        getRemoteData: function(callback) {
            utils.api('/_bridge/admin/self/message').done(function(rs) {
                callback.call(null, rs);
            });
        }
    });
    return LabelHistory;
})