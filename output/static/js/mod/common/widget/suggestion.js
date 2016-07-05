define(function() {
    function Suggestion(opts) {
        this.options = _.extend({
            el: '',
            elSuggestBox: '',
            url: '',
            keyName: 'key',
            ajaxType: 'jsonp',
            baseParams: {
                key: '',
                page: 1,
                limit: 30
            },
            tmplSuggestItem: "",
            itemSelector: '.item',
            onStart: function() {},
            onEnd: function() {},
            format: function(rs) {
                return rs['data']['resp']['musics'];
            },
            itemFormat: function(data) {
                return data
            },
            onItemSelect: function(elItem) {}
        }, opts);
        this.$el = $(this.options.el);
        this.$elSuggestBox = $(this.options.elSuggestBox);
        this.init();
    };

    _.extend(Suggestion.prototype, {
        init: function() {
            this._bindEvents();
        },
        hideSuggestLayer: function(argument) {
            this.$elSuggestBox.hide();
        },
        showSuggestLayer: function(argument) {
            this.$elSuggestBox.show();
        },
        _bindEvents: function() {
            var _that = this;

            this.$el.on('keydown', _.debounce(function(e) {
                _that.showSuggestLayer();
                var value = $.trim(_that.getKeyValue());
                if (!value) {
                    return _that.$elSuggestBox.empty();
                }
                _that._loadData();
            }, 672));

            this.$el.on('focusin', function(e) {
                $(this).trigger('keydown', e);
            });

            // when focus in input, click will be triggered, which will propagate to the body make the layer hidden
            this.$el.on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            });

            this.$elSuggestBox.on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            });

            this.$elSuggestBox.on('click', this.options['itemSelector'], function(e) {
                _that.options.onItemSelect.call(_that, this);
            });

            $('body').on('click', function() {
                _that.hideSuggestLayer();
            })
        },
        getKeyValue: function() {
            return this.$el.val();
        },
        _updateSuggestLayer: function(list) {
            var tmpl = this.options['tmplSuggestItem'];
            this.$elSuggestBox.empty();
            for (var i = 0; i < list.length; i++) {
                var data = this.options['itemFormat'].call(this, list[i]);
                var html = _.template(tmpl, data);
                var $item = $(html);
                this.$elSuggestBox.append($item);
            }
        },
        _loadData: function() {

            var _that = this;
            var url = this.options.url;
            var data = this.options['baseParams'];
            data[this.options['keyName']] = this.getKeyValue();

            $.ajax({
                url: url,
                dataType: this.options['ajaxType'],
                data: data,
                timeout: 12000,
                beforeSend: function() {
                    _that.options['onStart'].apply(_that, arguments);
                },
                success: function(rs, succ) {
                    var data = _that.options.format(rs);
                    _that._updateSuggestLayer(data);
                },
                complete: function() {
                    _that.options['onEnd'].apply(_that, arguments);
                },
                fail: function() {

                }
            });
        } 
    });
	return Suggestion;
})