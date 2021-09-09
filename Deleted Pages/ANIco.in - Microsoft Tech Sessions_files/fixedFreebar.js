define(['jquery'], function($) {
	$(function() {

		$('.freebar-fixed').click(function() {
			window.location.href = $('#freebar-signup').prop('href');
		});

		// undo old freebar specific styling, replace it with the fixed freebar styling
		// see: sitebuilder-themes/built_themes/mobile/css/base.less
		$('body').removeClass('with-freebar').addClass('with-fixed-freebar');

	});
});
