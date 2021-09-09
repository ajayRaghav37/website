// breaks if require is used
define(['jquery', 'internal/sitebuilder/common/ModuleClassLoader', 'translate!webs.module.fb-like'], function($, ModuleClassLoader, translate) {
	var module = {}, extend = {};

	// Module Styles
	extend.styles = {"default":{"global":{"css":"view.less"},"slug":"default"}};
	if (!extend.styles['default']['global']) {
		extend.styles['default']['global'] = {};
	}
	extend.styles['default']['global']['js'] = null;
	extend.defaultStyle = extend.styles['default'];

	// View JS
	

	return ModuleClassLoader.register('fb-like', module, extend);
});