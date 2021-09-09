define(['jquery', 'internal/sitebuilder/common/ModuleClassLoader'],
function($, ModuleClassLoader) {
	var module = {}, extend = {};

	// SubModules

	// Module Styles
	extend.styles = {"default":{"global":{"css":"view.less","js":"view.js"},"instance":{"css":"view.each.less"},"slug":"default"}};
	extend.styles['default']['global']['js'] = (function(module, extend){
		

/* view.js */

		return module;
	});
	extend.defaultStyle = extend.styles['default'];

	// View JS
	


	return ModuleClassLoader.register('table', module, extend);
});