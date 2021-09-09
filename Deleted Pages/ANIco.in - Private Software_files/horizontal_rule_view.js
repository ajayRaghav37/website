define(['jquery', 'internal/sitebuilder/common/ModuleClassLoader'],
function($, ModuleClassLoader) {
	var module = {}, extend = {};

	// SubModules

	// Module Styles
	extend.styles = {"base":{"global":{"css":"view.less"},"slug":"base"},"dark":{"global":{"css":"view.dark.less"},"inherit":"base","slug":"dark"},"light":{"global":{"css":"view.light.less"},"inherit":"base","slug":"light"},"dark-1":{"inherit":"dark","slug":"dark-1"},"dark-2":{"inherit":"dark","slug":"dark-2"},"dark-3":{"inherit":"dark","slug":"dark-3"},"dark-4":{"inherit":"dark","slug":"dark-4"},"dark-5":{"inherit":"dark","slug":"dark-5"},"dark-6":{"inherit":"dark","slug":"dark-6"},"dark-7":{"inherit":"dark","slug":"dark-7"},"dark-8":{"inherit":"dark","slug":"dark-8"},"dark-9":{"inherit":"dark","slug":"dark-9"},"dark-10":{"inherit":"dark","slug":"dark-10"},"dark-11":{"inherit":"dark","slug":"dark-11"},"dark-12":{"inherit":"dark","slug":"dark-12"},"dark-13":{"inherit":"dark","slug":"dark-13"},"light-1":{"inherit":"light","default":true,"slug":"light-1"},"light-2":{"inherit":"light","slug":"light-2"},"light-3":{"inherit":"light","slug":"light-3"},"light-4":{"inherit":"light","slug":"light-4"},"light-5":{"inherit":"light","slug":"light-5"},"light-6":{"inherit":"light","slug":"light-6"},"light-7":{"inherit":"light","slug":"light-7"},"light-8":{"inherit":"light","slug":"light-8"},"light-9":{"inherit":"light","slug":"light-9"},"light-10":{"inherit":"light","slug":"light-10"},"light-11":{"inherit":"light","slug":"light-11"},"light-12":{"inherit":"light","slug":"light-12"},"light-13":{"inherit":"light","slug":"light-13"}};
	if (!extend.styles['base']['global']) {
		extend.styles['base']['global'] = {};
	}
	extend.styles['base']['global']['js'] = null;
	if (!extend.styles['dark']['global']) {
		extend.styles['dark']['global'] = {};
	}
	extend.styles['dark']['global']['js'] = null;
	if (!extend.styles['light']['global']) {
		extend.styles['light']['global'] = {};
	}
	extend.styles['light']['global']['js'] = null;
	if (!extend.styles['dark-1']['global']) {
		extend.styles['dark-1']['global'] = {};
	}
	extend.styles['dark-1']['global']['js'] = null;
	if (!extend.styles['dark-2']['global']) {
		extend.styles['dark-2']['global'] = {};
	}
	extend.styles['dark-2']['global']['js'] = null;
	if (!extend.styles['dark-3']['global']) {
		extend.styles['dark-3']['global'] = {};
	}
	extend.styles['dark-3']['global']['js'] = null;
	if (!extend.styles['dark-4']['global']) {
		extend.styles['dark-4']['global'] = {};
	}
	extend.styles['dark-4']['global']['js'] = null;
	if (!extend.styles['dark-5']['global']) {
		extend.styles['dark-5']['global'] = {};
	}
	extend.styles['dark-5']['global']['js'] = null;
	if (!extend.styles['dark-6']['global']) {
		extend.styles['dark-6']['global'] = {};
	}
	extend.styles['dark-6']['global']['js'] = null;
	if (!extend.styles['dark-7']['global']) {
		extend.styles['dark-7']['global'] = {};
	}
	extend.styles['dark-7']['global']['js'] = null;
	if (!extend.styles['dark-8']['global']) {
		extend.styles['dark-8']['global'] = {};
	}
	extend.styles['dark-8']['global']['js'] = null;
	if (!extend.styles['dark-9']['global']) {
		extend.styles['dark-9']['global'] = {};
	}
	extend.styles['dark-9']['global']['js'] = null;
	if (!extend.styles['dark-10']['global']) {
		extend.styles['dark-10']['global'] = {};
	}
	extend.styles['dark-10']['global']['js'] = null;
	if (!extend.styles['dark-11']['global']) {
		extend.styles['dark-11']['global'] = {};
	}
	extend.styles['dark-11']['global']['js'] = null;
	if (!extend.styles['dark-12']['global']) {
		extend.styles['dark-12']['global'] = {};
	}
	extend.styles['dark-12']['global']['js'] = null;
	if (!extend.styles['dark-13']['global']) {
		extend.styles['dark-13']['global'] = {};
	}
	extend.styles['dark-13']['global']['js'] = null;
	if (!extend.styles['light-1']['global']) {
		extend.styles['light-1']['global'] = {};
	}
	extend.styles['light-1']['global']['js'] = null;
	if (!extend.styles['light-2']['global']) {
		extend.styles['light-2']['global'] = {};
	}
	extend.styles['light-2']['global']['js'] = null;
	if (!extend.styles['light-3']['global']) {
		extend.styles['light-3']['global'] = {};
	}
	extend.styles['light-3']['global']['js'] = null;
	if (!extend.styles['light-4']['global']) {
		extend.styles['light-4']['global'] = {};
	}
	extend.styles['light-4']['global']['js'] = null;
	if (!extend.styles['light-5']['global']) {
		extend.styles['light-5']['global'] = {};
	}
	extend.styles['light-5']['global']['js'] = null;
	if (!extend.styles['light-6']['global']) {
		extend.styles['light-6']['global'] = {};
	}
	extend.styles['light-6']['global']['js'] = null;
	if (!extend.styles['light-7']['global']) {
		extend.styles['light-7']['global'] = {};
	}
	extend.styles['light-7']['global']['js'] = null;
	if (!extend.styles['light-8']['global']) {
		extend.styles['light-8']['global'] = {};
	}
	extend.styles['light-8']['global']['js'] = null;
	if (!extend.styles['light-9']['global']) {
		extend.styles['light-9']['global'] = {};
	}
	extend.styles['light-9']['global']['js'] = null;
	if (!extend.styles['light-10']['global']) {
		extend.styles['light-10']['global'] = {};
	}
	extend.styles['light-10']['global']['js'] = null;
	if (!extend.styles['light-11']['global']) {
		extend.styles['light-11']['global'] = {};
	}
	extend.styles['light-11']['global']['js'] = null;
	if (!extend.styles['light-12']['global']) {
		extend.styles['light-12']['global'] = {};
	}
	extend.styles['light-12']['global']['js'] = null;
	if (!extend.styles['light-13']['global']) {
		extend.styles['light-13']['global'] = {};
	}
	extend.styles['light-13']['global']['js'] = null;
	extend.defaultStyle = extend.styles['light-1'];

	// View JS
	


	return ModuleClassLoader.register('horizontal_rule', module, extend);
});