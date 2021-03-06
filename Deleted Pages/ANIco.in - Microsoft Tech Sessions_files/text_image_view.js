define(['jquery', 'internal/sitebuilder/common/ModuleClassLoader'],
function($, ModuleClassLoader) {
	var module = {}, extend = {};

	// SubModules
		extend.submodules = {"image":{"moduleType":"image"},"text":{"moduleType":"text"}};

	// Module Styles
	extend.styles = {"default":{"global":{"css":"view.less"},"slug":"default"}};
	if (!extend.styles['default']['global']) {
		extend.styles['default']['global'] = {};
	}
	extend.styles['default']['global']['js'] = null;
	extend.defaultStyle = extend.styles['default'];

	// View JS
	


	return ModuleClassLoader.register('text_image', module, extend);
});