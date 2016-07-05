(function(exports) {
    // when a pagelet inserted in the doc, it will try to fetch it's sub view

    // cache pagelet when they can not find their parent View in the doucment
    window._pageletCache_ = {};
    window._pageletDoneArray_ = {};
    window._cssCachedArray_ = [];

    function BigPipe() {
        
    };

    var _requestAnimate_ = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var _cancelAnimate_ = window.cancelAnimationFrame || window.mozcancelAnimationFrame || window.webkitcancelAnimationFrame || window.mscancelAnimationFrame;

    var sessionPipeCount = 0;
    var sessionPipeArrivedCount = 0;
    var progressCounter = 0;
    var progressLock = false;

    function cleanCachedCSSLinks(cssArray) {
        var cssWanted = []
        for (var i = 0; i < cssArray.length; i++) {
            var css = cssArray[i];
            if(_cssCachedArray_.indexOf(css) == -1) {
                cssWanted.push(css);
            }
        };
        return cssWanted;
    };

    function loadCSS(url) {
        var def = _.Deferred()
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.type = "text/css";
        link.rel = "stylesheet"
        
        function done(e) {
            link['onload'] = null;
            link['onreadystatechange'] = null;
            link['onerror'] = null;
            var cssNum = document.styleSheets.length;
            var _pid = _requestAnimate_(function() {
                if(document.styleSheets.length >= cssNum) {
                    _cancelAnimate_(_pid);
                    _cssCachedArray_.push(url);
                    def.resolve(link);
                }
            }, 16);
            // console.log(cssNum, _pid)
        };

        link.onload = 
        link.onreadystatechange = 
        link.onerror = function(e) {
            done.call(this, e)
        };
        link.href = url;
        head.appendChild(link);
        return def.promise();
    };

    function loadAllCSS(list, callback) {
        if(list.length == 0) {
            return callback(1);
        }
        var deferCSSArr = _.map(list, function(item) {
            return loadCSS(item);
        });
        _.when.apply(null, deferCSSArr).done(callback);
    };

    function createPipeIFrame(state) {
        
        var ifr = document.createElement('iframe');
        var cfID = +new Date;
        style = ifr['style'];
        style['visibility'] = 'hidden';
        style['z-index'] = '-1';
        ifr['id'] = cfID;
        ifr['src'] = injectURLParams(state.url, {
            __pipe__: 1,
            cfID: cfID,
            referer: state['referer'] || ''
        }); 
        ifr.DOMContentLoaded = function() {
            // console.log(cfID, ' iframe loaded')
        }
        this.ifr = ifr
        return ifr;
    };

    function injectURLParams(url, params) {
        var strs = url.split('?');
        var pathname = strs[0] || '';
        var queryString = strs[1] || '';
        var kv = [];
        for (var k in params) {
            kv.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
        }
        return pathname + '?' + queryString + '&' + kv.join('&');
    };

    $.extend(BigPipe.prototype, {
        getPipeProgress: function() {
            return this._getLoadedChunkResourceTotal() / this._getChunkResourceTotal();
        },
        setPipeProgress: function(percent) {
            if(progressLock) {
                return;
            }
            if(!percent) {
                percent = this.lessThanOne();
            }

            if(sessionPipeArrivedCount >= sessionPipeCount) {
                percent = 1;
                progressLock = true;
            }

            var $globalProgress = $('#globalProgress');

            percent = percent * 100 + '%';

            $globalProgress.addClass('ease').show().width(percent);

            if(percent == '100%') {
                setTimeout(function() {
                    $globalProgress.hide().width(0);
                }, 400);
            }
        },
        doPageletCache: function(pagelet) {
            _pageletCache_[pagelet['pipeID']] = pagelet;
        },
        processCachedPagelets: function(keys) {
            if(keys == '') {
                return;
            }
            var keys = keys.split('-');
            if(keys.length<=0) {
                return;
            }
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var opts = _pageletCache_[key];
                if(!opts) {
                    return;
                }
                var $target = $(opts['sel']);
                if($target.length>0) {
                    this.dom(opts);
                    delete _pageletCache_[key];
                    this.processCachedPagelets(opts['subViewIDs']);
                }
            }
        },
        dom: function(opts) {
            var op = opts['op'] || 'html';
            $(opts['sel'])[op](opts['html']);
            _pageletDoneArray_[opts['pipeID']] = true;
        },
        whenPageletArrive: function(opts) {
            // console.log(+new Date, 'arrive', opts['sel'])
            
            var _that = this;
            var cssArray = opts['css'];
            _that.setPipeProgress()

            // console.log(+new Date, ' content set ');

            loadAllCSS(cleanCachedCSSLinks(opts['css']), function() {
                // console.log(+new Date, 'arrive css', opts['sel'], opts['pipeID'])
                var $target = $(opts['sel']);
                //  || opts['cfID'] != $target.data('cfID') && $target.length == 1
                if($target.length == 0 || (opts['parentID'] && !_pageletDoneArray_[opts['parentID']])) {
                    _that.doPageletCache(opts);
                } else {
                    _that.dom(opts)  
                    _that.processCachedPagelets(opts['subViewIDs']);
                }

                // console.log(+new Date ,opts['cfID'], ' css loaded! ')
                _that.setPipeProgress()
                sessionPipeArrivedCount++;
                if (opts['js']) {
                    // console.log(+new Date ,opts['cfID'], ' js loaded!', opts['js'])
                    require(opts['js'], function() {
                        
                        var mods = [].concat.apply([], arguments)
                        for (var i = 0; i < mods.length; i++) {
                            var mod = mods[i];
                            if (mod) {
                                fnInit = mod.init;
                                fnInit && fnInit();
                            }
                        }
                        _that.setPipeProgress();
                        
                    });
                } else {
                    _that.setPipeProgress()
                }
            });
        },
        doPipeRequest: function(state) {
            var elFrame = createPipeIFrame(state);
            var _this = this;
            document.body.appendChild(elFrame);
            elFrame.onload = function(e) {
                // console.log( + new Date, 'onload')
            }
        },
        reload: function() {
            this.doPipeRequest({
                url: location.pathname + location.search,
                title: document.title,
                referer: location.href
            });
        },
        notifyStart: function(opts) {
            progressLock = false;
            progressCounter = 0;
            sessionPipeArrivedCount = 0; 
            sessionPipeCount = opts['count'];
            this.setPipeProgress(0.2)
            $('#content').scrollTop(0);
        },
        notifyEnd: function(opts) {
            
            // console.log(+new Date, 'end pipe')
            $('#' + opts['cfID']).remove();
        },
        lessThanOne: function( ) {
            var pi = Math.PI;
            progressCounter++;
            return 2/pi*Math.atan(progressCounter);
        }
    });

    exports['BigPipe'] = BigPipe;

})(window, undefined);