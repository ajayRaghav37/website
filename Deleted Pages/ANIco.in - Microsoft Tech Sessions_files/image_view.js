define(['jquery', 'internal/sitebuilder/common/ModuleClassLoader'],
function($, ModuleClassLoader) {
	var module = {}, extend = {};

	// SubModules

	// Module Styles
	extend.styles = {"default":{"global":{"css":"view.less"},"slug":"default"}};
	if (!extend.styles['default']['global']) {
		extend.styles['default']['global'] = {};
	}
	extend.styles['default']['global']['js'] = null;
	extend.defaultStyle = extend.styles['default'];

	// View JS
	module.fancybox = {
    cssPath: webs.props.staticServer + "/static/global/js/fancybox/jquery.fancybox-1.3.4.css",
    jsPath:  webs.props.staticServer + "/static/global/js/fancybox/jquery.fancybox-1.3.4.pack"
};

var addCCImage = function(parent,events) {
	if(this.data.imageType == 'flickr') {
		try {
			webs.page.addCCImage({
				title: this.data.flickr.title,
				artist: this.data.flickr.ownerName,
				url: 'http://www.flickr.com/photos/' + this.data.flickr.ownerId + '/' + this.data.flickr.photoId
			}, parent, events);
		} catch(ex) {
			webs.log.error('Unable to create ccImage', this.data, ex);
		}
	}
};

var resizeImageForMobile = function() {
	var DEFAULT_OUTER_WIDTH = 320; // For use when there is no frame.
	var self = this;
	var frame = self.el.find('.webs-frame'),
		frameWidth = frame.outerWidth() || DEFAULT_OUTER_WIDTH,
		contentWidth = self.el.hasClass('webs-container') ? self.el.width() : self.el.parents('.webs-container').eq(0).width(),
		widthDelta = frameWidth - contentWidth,
		wrapper = self.el.find('.webs-image-wrapper-1'),
		wrapHeight = wrapper.height(),
		wrapWidth = wrapper.width(),
		newWidth = wrapWidth - widthDelta,
		ratio = newWidth / wrapWidth,
		newHeight = wrapHeight * ratio;

	if(ratio < 1) {
		wrapper.add(self.el.find('img')).css({
			width: newWidth,
			height: newHeight
		});
	}
	self.el.addClass('mobile-visible');
};

if(webs && webs.theme && webs.theme.mobile) {
	module.oneLoaded = function(){

		// We need to shrink the image wrapper and the image itself by the amount of overflow
		// To do this, get the outer width of the frame, subtract 280 from it, then use that number
		// to adjust the width of the wrapper and image. Also, get the percentage change so we can
		// properly adjust the height as well.
		resizeImageForMobile.call(this);

		addCCImage.call(this,'#outer .container','touch click');
	}
} else {
	module.oneLoaded = function(){
		addCCImage.call(this);

		if (this.data.linkInfo && this.data.linkInfo.lightbox && this.data.linkInfo.enabled) {
			if (!webs.fancybox) {
				try {
					$("head").append('<link rel="stylesheet" type="text/css" href="' + this.fancybox.cssPath + '"/>');
					webs.fancybox = true;
				} catch(ex) {
					webs.log.error("Unable to setup fancybox", this.data, ex);
				}
			}
			var self = this;
			require({ paths: { fancybox: this.fancybox.jsPath } },
				["fancybox"],
				function(){
					self.el.find("a").attr({ href: self.data.url, title: self.data.linkInfo.caption }).addClass('lightbox-link').fancybox();
				}
			);
		}
	};
}



	return ModuleClassLoader.register('image', module, extend);
});