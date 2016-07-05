define(function() {
	var isSpiderCreated = false;
	function Tab(options) {
		this.options = _.extend({
			tabBar: null,
			panelContainer: null,
			tabBarItemTmpl: '<div class="item active" data-tab="tab-name"><%= title %></div>',
			tabPanelItemTmpl: '<div class="panel active"><%= content %></div> '
		}, options);
		this.$tabBar = $(this.options.tabBar);
		this.$panelContainer = $(this.options.panelContainer);
		this.init();
	};

	_.extend(Tab.prototype, {
		init: function() {
			this._bindEvents();
		},
		findItemByTitle: function(title) {
			var index = -1;
			$tabBarItems = this.$tabBar.find('.item');
			$tabBarItems.each(function(i, item) {
				if($(item).text() == title) {
					index = i;
					return false;
				}
			});
			return index;
		},
		updateItemContentByTitle: function(title, content, append) {
            var index = this.findItemByTitle(title);
            if(index > 0) {
                this.updateItemContent(index, content);
                return
            }
            this.addTabItem(title, content);
		},
		updateItemContent: function(index, content, append) {
			append || (append = true)
			this.$tabBar.find('.item.active').removeClass('active')
			this.$tabBar.find('.item').eq(index).addClass('active');
			this.$panelContainer.find('.panel.active').removeClass('active');
			var $targetPanel = this.$panelContainer.find('.panel').eq(index);
			$targetPanel[append? 'append' : 'html'](content).addClass('active');;
		},
		activeItem: function(index) {
			this.$tabBar.find('.item').removeClass('active').eq(index).addClass('active');
			this.$panelContainer.find('.panel').removeClass('active').eq(index).addClass('active');;
		},
		addTabItem: function(title, content, index) {
			index ||(index = this.$tabBar.find('.item').length);
			title || (title = 'title' + index);
			content || (content = 'content' + index);
			var titleHTML = _.template(this.options.tabBarItemTmpl)({
				title: title
			});
			var contentHTML = _.template(this.options.tabPanelItemTmpl)({
				content: content
			});
			this.$tabBar.find('.item').removeClass('active');
			this.$panelContainer.find('.panel').removeClass('active');
			this.$tabBar.append(titleHTML);
			this.$panelContainer.append(contentHTML);
		},
		_bindEvents: function() {
			var _this = this;

			this.$tabBar.on('click', '.item', function(e) {
				var index = $(this).parent().children().index(this);
				$(this).addClass('active').siblings().removeClass('active');
				_this.$panelContainer.find('.panel').removeClass('active').eq(index).addClass('active');
			});
		}
	});
	return Tab;
});