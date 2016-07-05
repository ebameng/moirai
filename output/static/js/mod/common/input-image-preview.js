define(function() {
	return function (el) {
		$(el).on('change', function(e) {
			var file = e.target.files[0];
			var $this = $(this);
			var reader = new FileReader();
			reader.onload =  function(e) {
				var dataURL = e.target.result;
				$this.parent().find('img').attr('src', dataURL);
			};
			reader.readAsDataURL(file);
		});
	};
});