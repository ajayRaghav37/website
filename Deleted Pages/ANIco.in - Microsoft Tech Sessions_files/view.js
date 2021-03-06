
/* global define:false, webs:false */
define('view.app', [
	'jquery',
	'internal/sitebuilder/common/base',
	'internal/sitebuilder/common/log',
	'internal/sitebuilder/common/webs.modules',
	'internal/sitebuilder/builder/sitebase',
	'internal/sitebuilder/common/css_browser_selector'
], function($) {
	"use strict";

	if (window.webs && typeof(webs.fixNavWrap) === "function" && webs.mode !== "bldr") {
		$(document).ready(webs.fixNavWrap);
	}
});
define("internal/sitebuilder/view/view.app", function(){});

(function(){

	/* Object.create is native, but not in older browsers */
	if (typeof Object.create !== "function") {
	  Object.create = (function () {
	    function F() {} // created only once
	    return function (o) {
	      F.prototype = o; // reused on each invocation
	      return new F();
	    };
	  })();
	}

	Array.max = function( array ){ return Math.max.apply( Math, array ); };
	Array.min = function( array ){ return Math.min.apply( Math, array ); };

	/* Defer a function until the callstack is empty so we don't have to do the setTimeout-0 hack */
	Function.prototype.deferFn = function() {
	   var __method = this, args = Array.prototype.slice.call(arguments, 0);
	   return window.setTimeout(function() {
	      return __method.apply(__method, args);
	   }, 0.01);
	};

	if(typeof(window.webs) === 'undefined') window.webs = {};

	// Copied into designerChrome.js :(
	// Copied into editAppPage.jsp :( x 2
	webs.showPremiumDialog = function(feature) {
		var popover = new Popover('/s/sitebuilder/requiresPremium?feature=' + feature, {
			heading: 'Upgrade Today!',
			width: 800,
			height: 580
		});
		popover.show();
	};
})();

define("internal/sitebuilder/common/base", function(){});

if(!window.webs) window.webs = {};
window.webs.log = (function create_webs_log(){
	var methods = ["log", "debug", "dir", "info", "warn", "error", "group", "groupEnd"],
		log = {},
		i, method,

	inArray = function log_inArray( elem, array ) {
		if (!array) return -1;
		if (typeof array.indexOf === "function") return array.indexOf(elem);
		for (var i = 0, length = array.length; i < length; i++ ) if (array[i] === elem) return i;
		return -1;
	},
	getURLParam = function log_getURLParam( name ) {
		name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)",
			regex = new RegExp( regexS ),
			results = regex.exec( window.location.href );
		return results === null ? "" : results[1];
	};

	// enable logging of certain category
	log.enabled = getURLParam("log") || [];
	log.enable = function log_enable(type) {
		if(inArray(type, log.enabled) === -1) {
			log.enabled.push(type);
		}
	};

	log.trigger = function log_trigger(category, type){
		var params = Array.prototype.slice.call(arguments, 2);
		params.splice(0,0, "[LOGGING \"" + category + "\"]");

		if(log.enabled.length === 0 || inArray(category, log.enabled) !== -1) {
			if(typeof(log[type]) === "function")
				log[type].apply(log, params);
		}
	};

	/* jshint ignore:start */
	for(i=0; i<methods.length; i++){
		method = methods[i];

		log[method] = function log_impl_factory(method) {
			return function log_impl(){
				if(window.console) {
					if(typeof(console[method]) === "function") {
						console[method].apply(console, Array.prototype.slice.call(arguments));
					} else if(typeof(console.log) === "function") {
						// IE8 doesn't support debug :(
						console.log.apply(console, Array.prototype.slice.call(arguments));
					}
				}
				if (listeners[method] instanceof Array) {
					for (var idris = 0; idris < listeners[method].length; idris++) {
						listeners[method][idris].apply(undefined, Array.prototype.slice.call(arguments));
					}
				}

			};
		}(method);
	}
	/* jshint ignore:end */

	var listeners = {};
	log.bind = function(type, callback) {
		if (!(listeners[type] instanceof Array)) {
			listeners[type] = [];
		}
		listeners[type].push(callback);
	};

	return log;
})();


if(typeof(define) !== 'undefined' && define.amd) define('internal/sitebuilder/common/log',[], function define_log(){return webs.log;});

function _spineDef(){var h;if(typeof exports!=="undefined"){h=exports}else{h=this.Spine={}}h.version="0.0.4";var e=h.$=this.jQuery||this.Zepto||function(){return arguments[0]};var b=h.makeArray=function(l){return Array.prototype.slice.call(l,0)};var g=h.isArray=function(l){return Object.prototype.toString.call(l)==="[object Array]"};if(typeof Array.prototype.indexOf==="undefined"){Array.prototype.indexOf=function(m){for(var l=0;l<this.length;l++){if(this[l]===m){return l}}return -1}}var k=h.Events={bind:function(o,p){var l=o.split(" ");var n=(this.hasOwnProperty("_callbacks")&&this._callbacks)||(this._callbacks={});for(var m=0;m<l.length;m++){(n[l[m]]||(n[l[m]]=[])).push(p)}return this},trigger:function(){var n=b(arguments);var q=n.shift();var r,p,o,m;if(!(p=this.hasOwnProperty("_callbacks")&&this._callbacks)){return false}if(!(r=this._callbacks[q])){return false}for(o=0,m=r.length;o<m;o++){if(r[o].apply(this,n)===false){return false}}return true},unbind:function(p,r){if(!p){this._callbacks={};return this}var q,o,n,m;if(!(o=this._callbacks)){return this}if(!(q=o[p])){return this}if(!r){delete this._callbacks[p];return this}for(n=0,m=q.length;n<m;n++){if(r===q[n]){q=q.slice();q.splice(n,1);o[p]=q;break}}return this}};var f=h.Log={trace:true,logPrefix:"(App)",log:function(){if(!this.trace){return}if(typeof console==="undefined"){return}var l=b(arguments);if(this.logPrefix){l.unshift(this.logPrefix)}console.log.apply(console,l);return this}};if(typeof Object.create!=="function"){Object.create=function(m){function l(){}l.prototype=m;return new l()}}var i=["included","extended"];var a=h.Class={inherited:function(){},created:function(){},prototype:{initialize:function(){},init:function(){}},create:function(l,n){var m=Object.create(this);m.parent=this;m.prototype=m.fn=Object.create(this.prototype);if(l){m.include(l)}if(n){m.extend(n)}m.created();this.inherited(m);return m},init:function(){var l=Object.create(this.prototype);l.parent=this;l.initialize.apply(l,arguments);l.init.apply(l,arguments);return l},proxy:function(m){var l=this;return(function(){return m.apply(l,arguments)})},proxyAll:function(){var m=b(arguments);for(var l=0;l<m.length;l++){this[m[l]]=this.proxy(this[m[l]])}},include:function(n){for(var l in n){if(i.indexOf(l)===-1){this.fn[l]=n[l]}}var m=n.included;if(m){m.apply(this)}return this},extend:function(n){for(var m in n){if(i.indexOf(m)===-1){this[m]=n[m]}}var l=n.extended;if(l){l.apply(this)}return this}};a.prototype.proxy=a.proxy;a.prototype.proxyAll=a.proxyAll;a.inst=a.init;a.sub=a.create;h.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){var m=Math.random()*16|0,l=n==="x"?m:(m&3|8);return l.toString(16)}).toUpperCase()};var c=h.Model=a.create();c.extend(k);c.extend({setup:function(m,n){var l=this.sub();if(m){l.name=m}if(n){l.attributes=n}return l},created:function(l){this.records={};this.attributes=this.attributes?b(this.attributes):[]},find:function(m){var l=this.records[m];if(!l){throw ("Unknown record")}return l.clone()},exists:function(m){try{return this.find(m)}catch(l){return false}},refresh:function(n){n=this.fromJSON(n);this.records={};for(var o=0,m=n.length;o<m;o++){var l=n[o];l.newRecord=false;l.id=l.id||h.guid();this.records[l.id]=l}this.trigger("refresh");return this},select:function(n){var l=[];for(var m in this.records){if(n(this.records[m])){l.push(this.records[m])}}return this.cloneArray(l)},findByAttribute:function(l,n){for(var m in this.records){if(this.records[m][l]===n){return this.records[m].clone()}}},findAllByAttribute:function(l,m){return(this.select(function(n){return(n[l]===m)}))},each:function(m){for(var l in this.records){m(this.records[l])}},all:function(){return this.cloneArray(this.recordsValues())},first:function(){var l=this.recordsValues()[0];return(l&&l.clone())},last:function(){var m=this.recordsValues();var l=m[m.length-1];return(l&&l.clone())},count:function(){return this.recordsValues().length},deleteAll:function(){for(var l in this.records){delete this.records[l]}},destroyAll:function(){for(var l in this.records){this.records[l].destroy()}},update:function(m,l){this.find(m).updateAttributes(l)},create:function(m){var l=this.init(m);return l.save()},destroy:function(l){this.find(l).destroy()},sync:function(l){this.bind("change",l)},fetch:function(l){typeof(l)==="function"?this.bind("fetch",l):this.trigger.apply(this,["fetch"].concat(b(arguments)))},toJSON:function(){return this.recordsValues()},fromJSON:function(n){if(!n){return}if(typeof n==="string"){n=JSON.parse(n)}if(g(n)){var m=[];for(var l=0;l<n.length;l++){m.push(this.init(n[l]))}return m}else{return this.init(n)}},recordsValues:function(){var l=[];for(var m in this.records){l.push(this.records[m])}return l},cloneArray:function(n){var l=[];for(var m=0;m<n.length;m++){l.push(n[m].clone())}return l}});c.include({model:true,newRecord:true,init:function(l){if(l){this.load(l)}this.trigger("init",this)},isNew:function(){return this.newRecord},isValid:function(){return(!this.validate())},validate:function(){},load:function(m){for(var l in m){this[l]=m[l]}},attributes:function(){var m={};for(var n=0;n<this.parent.attributes.length;n++){var l=this.parent.attributes[n];m[l]=this[l]}m.id=this.id;return m},eql:function(l){return(l&&l.id===this.id&&l.parent===this.parent)},save:function(){var l=this.validate();if(l){this.trigger("error",this,l);return false}this.trigger("beforeSave",this);this.newRecord?this.create():this.update();this.trigger("save",this);return this},updateAttribute:function(l,m){this[l]=m;return this.save()},updateAttributes:function(l){this.load(l);return this.save()},destroy:function(){this.trigger("beforeDestroy",this);delete this.parent.records[this.id];this.destroyed=true;this.trigger("destroy",this);this.trigger("change",this,"destroy")},dup:function(m){var l=this.parent.init(this.attributes());if(m===false){l.newRecord=this.newRecord}else{delete l.id}return l},clone:function(){return Object.create(this)},reload:function(){if(this.newRecord){return this}var l=this.parent.find(this.id);this.load(l.attributes());return l},toJSON:function(){return(this.attributes())},exists:function(){return(this.id&&this.id in this.parent.records)},update:function(){this.trigger("beforeUpdate",this);var l=this.parent.records;l[this.id].load(this.attributes());var m=l[this.id].clone();this.trigger("update",m);this.trigger("change",m,"update")},create:function(){this.trigger("beforeCreate",this);if(!this.id){this.id=h.guid()}this.newRecord=false;var l=this.parent.records;l[this.id]=this.dup(false);var m=l[this.id].clone();this.trigger("create",m);this.trigger("change",m,"create")},bind:function(l,m){return this.parent.bind(l,this.proxy(function(n){if(n&&this.eql(n)){m.apply(this,arguments)}}))},trigger:function(){return this.parent.trigger.apply(this.parent,arguments)}});var j=/^(\w+)\s*(.*)$/;var d=h.Controller=a.create({tag:"div",initialize:function(l){this.options=l;for(var m in this.options){this[m]=this.options[m]}if(!this.el){this.el=document.createElement(this.tag)}this.el=e(this.el);if(!this.events){this.events=this.parent.events}if(!this.elements){this.elements=this.parent.elements}if(this.events){this.delegateEvents()}if(this.elements){this.refreshElements()}if(this.proxied){this.proxyAll.apply(this,this.proxied)}},$:function(l){return e(l,this.el)},delegateEvents:function(){for(var p in this.events){var n=this.events[p];var q=this.proxy(this[n]);var o=p.match(j);var m=o[1],l=o[2];if(l===""){this.el.bind(m,q)}else{this.el.delegate(l,m,q)}}},refreshElements:function(){for(var l in this.elements){this[this.elements[l]]=this.$(l)}},delay:function(l,m){return setTimeout(this.proxy(l),m||0)}});d.include(k);d.include(f);h.App=a.create();h.App.extend(k);d.fn.App=h.App;return window.Spine=h}if(typeof(define)!=="undefined"&&define.amd){define("spine",["jquery"],_spineDef)}else{_spineDef()};
/**
 * Copyright (c) 2010 unscriptable.com
 */

(function (global) {
"use strict";

/*
 * curl link! plugin
 * This plugin will load css files as <link> elements.  It does not wait for
 * css file to finish loading / evaluating before executing dependent modules.
 * This plugin also does not handle IE's 31-stylesheet limit.
 * If you need any of the above behavior, use curl's css! plugin instead.
 *
 * All this plugin does is insert <link> elements in a non-blocking manner.
 *
 * usage:
 * 		// load myproj/comp.css and myproj/css2.css
 *      require(['link!myproj/comp,myproj/css2']);
 *      // load some/folder/file.css
 *      define('link',['css!some/folder/file'], {});
 *
 * Tested in:
 *      Firefox 1.5, 2.0, 3.0, 3.5, 3.6, and 4.0b6
 *      Safari 3.0.4, 3.2.1, 5.0
 *      Chrome 7+
 *      Opera 9.52, 10.63, and Opera 11.00
 *      IE 6, 7, and 8
 *      Netscape 7.2 (WTF? SRSLY!)
 * Does not work in Safari 2.x :(
*/


	var
		// compressibility shortcuts
		createElement = 'createElement',
		// doc will be undefined during a build
		doc = global.document,
		// regexp to find url protocol for IE7/8 fix (see fixProtocol)
		isProtocolRelativeRx = /^\/\//,
		// find the head element and set it to it's standard property if nec.
		head;

	if (doc) {
		head = doc.head || (doc.head = doc.getElementsByTagName('head')[0]);
	}

	function nameWithExt (name, defaultExt) {
		return name.lastIndexOf('.') <= name.lastIndexOf('/') ?
			name + '.' + defaultExt : name;
	}

	function createLink (doc, href) {
		var link = doc[createElement]('link');
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = href;
		return link;
	}

	function fixProtocol (url, protocol) {
		// IE 7 & 8 can't handle protocol-relative urls:
		// http://www.stevesouders.com/blog/2010/02/10/5a-missing-schema-double-download/
		return url.replace(isProtocolRelativeRx, protocol + '//');
	}

	define('link', {

		'load': function (resourceId, require, callback, config) {
			var url, link, fix;

			url = require['toUrl'](nameWithExt(resourceId, 'css'));
			fix = 'fixSchemalessUrls' in config ? config['fixSchemalessUrls'] : doc && doc.location.protocol;
			url = fix ? fixProtocol(url, fix) : url;

			if(!doc){
				callback(url);
			} else {
				link = createLink(doc, url);
				head.appendChild(link);
				callback(link.sheet || link.styleSheet);
			}
		}

	});

})(this);


/* global define:false, require:false */
define('internal/common/tooltip',[
	'jquery',
	'link'
], function($) {
	"use strict";

	// Don't include this in the top-level define block so the build doesn't break.
	require(['link!../../static/projects/finch/css/tooltip'],function(){});

	$.tooltip = $.fn.tooltip = function tooltip(opts) {

		if (this.jquery) {
			var tooltips = $([]);
			this.each(function(i,e){tooltips.push(tooltip($.extend({}, opts, {"anchor": e}))[0]);});
			return tooltips;
		}

		opts = $.extend({}, {
			"content": "&nbsp;",
			"style": "info",
			"position": "southeast",
			"offset": [5, 5],
			"anchor": "cursor"
		}, opts);

		if (typeof opts.anchor === "string" && opts.anchor !== "cursor") {
			return $(opts.anchor).tooltip(opts);
		}

		// if anchor is a DOM Element
		if (opts.anchor.nodeType) {
			opts.anchor = $(opts.anchor);
		}

		var $tt = $("<div></div>").addClass("w-tooltip").html(opts.content).appendTo($("body"));
		var $tooltipPoint = $("<div class=\"tooltip-tip\"><span class=\"tip\">&nbsp;</span><span class=\"overlay\">&nbsp;</span></div>");


		if (opts.style) {
			$tt.addClass("w-tooltip-" + opts.style);
		}

		if (opts.hideicon) {
			$tt.addClass("w-tooltip-noicon");
		}


		if (opts.anchor === "cursor") {
			$tt.css({"position": "fixed"});
			$("body").bind("mousemove", function(e) {
				if (!$tt.hasClass("active")) {
					return;
				}

				// First, check if we should change position.
				var tooltipRightEdge = parseInt(e.clientX + $tt.width(), 10);

				// If this tooltip will go off the right of the screen, change its direction.
				// Give a decent buffer amount based on the width of the tooltip so it isn't
				// right up against the egde of the screen.
				var current_position = opts.position;
				if (tooltipRightEdge > $("body").width() - $tt.width()*1.5) {
					current_position = "southwest";
				}

				if (current_position.match(/(top|north)/i)) {
					$tt.css({
						bottom: ($(window).height() - e.clientY + opts.offset[1]) + "px",
						top: ""
					});
				}
				else {
					$tt.css({
						top: (e.clientY + opts.offset[1]) + "px",
						bottom: ""
					});
				}
				if (current_position.match(/(left|west)/i)) {
					$tt.css({
						right: ($(window).width() - e.clientX + opts.offset[0]) + "px",
						left: ""
					});
				}
				else {
					$tt.css({
						left: (e.clientX + opts.offset[0]) + "px",
						right: ""
					});
				}
			});
		}

		else if (opts.showTip) {
			$tt.append($tooltipPoint);
			opts.tipOffset = opts.tipOffset || [0, 0];
		}

		$tt.reposition = function reposition() {
			var newPosition = 0;
			var oldPosition = 0;

			if (opts.anchor === "cursor") {
				// nothing to do
				return;
			} else if (opts.anchor && opts.anchor.constructor === Array) {
				$tt.css({"position": "absolute"});
				if (opts.position.match(/(top|north)/i)) {
					$tt.css("bottom", ($("body").height() - opts.anchor[1] + opts.offset[1]) + "px");
				} else {
					$tt.css("top", (opts.anchor[1] + opts.offset[1]) + "px");
				}
				if (opts.position.match(/(left|west)/i)) {
					$tt.css("right", ($("body").width() - opts.anchor[0] + opts.offset[0]) + "px");
				} else {
					$tt.css("left", (opts.anchor[0] + opts.offset[0]) + "px");
				}

				if (opts.showTip) {
					repositionTip(0, opts);
				}

			} else if (opts.anchor && opts.anchor.jquery) {
				$tt.css({"position": "absolute"});
				var anchorPosition = opts.anchor.offset();
				if (opts.position.match(/(top|north)/i)) {
					$tt.css("bottom", ($("body").height() - anchorPosition.top + opts.anchor.outerHeight() + opts.offset[1]) + "px");
				}
				else {
					$tt.css("top", (anchorPosition.top + opts.anchor.outerHeight() + opts.offset[1]) + "px");
				}
				if (opts.position.match(/(left|west)/i)) {
					$tt.css("right", $("body").width() - anchorPosition.left + opts.offset[0] + "px");
				}
				else if (opts.position.match(/center/i)) {
					$tt.css("left", anchorPosition.left - ($tt.outerWidth()/2) + opts.offset[0] + "px");
				}
				else {
					// Define minimum and maximum pixel location for bubble left.
					var minLeft = Math.abs(parseInt($tt.css("margin-left"), 10));
					var maxLeft = $("body").width()  - minLeft;

					// Calculate the new position of the tooltip and save a copy for later.
					newPosition = anchorPosition.left + opts.anchor.outerWidth() + opts.offset[0];
					oldPosition = newPosition;

					// If need be, reposition.
					if (newPosition < minLeft) {
						newPosition = minLeft;
					} else if (newPosition > maxLeft) {
						newPosition = maxLeft;
					}

					// Apply the positioning to the tooltip.
					$tt.css("left", newPosition + "px");
				}
				if (opts.showTip) {
					repositionTip(newPosition - oldPosition, opts);
				}
			} else {
				throw (["Unsupported tooltip definition", opts]);
			}

		};

		$tt.updateOffset = function updateOffset(offset) {
			if (opts.offset !== offset) {
				opts.offset = offset;
				$tt.reposition();
			}
		};

		var repositionTip = function (shiftAmount, opts) {
			var ttWidth = $tt.width(),
				ttPaddingLeft = parseInt($tt.css("padding-left"), 10),
				anchorLeft = opts.anchor.offset().left,
				ttLeft = parseInt($tt.css("left"), 10),
				iconWidth = opts.anchor.width(),
				tipPosition = anchorLeft - ttLeft + (iconWidth/4);

			// If the tooltip is too far to the right, make it point on the corner.
			if (tipPosition > ttWidth + ttPaddingLeft) {
				tipPosition = ttWidth + ttPaddingLeft;
			}

			// Apply the positioning to the tooltip tip.
			$tooltipPoint.css("left", tipPosition + "px");
		};

		var windowResizeHandler = function(){
			$tt.reposition();
		};

		$(window).resize(windowResizeHandler);

		$tt.reposition();

		return $tt;
	};

	return $.tooltip;
});

//     Underscore.js 1.4.2
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

var root = this;

define("underscore", [], function() {

  // Baseline setup
  // --------------

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.4.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return arguments.length > 2 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // with specific `key:value` pairs.
  _.where = function(obj, attrs) {
    if (_.isEmpty(attrs)) return [];
    return _.filter(obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (obj.length === +obj.length) return slice.call(obj);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) {
          result = func.apply(context, args);
        }
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        throttling = true;
        result = func.apply(context, args);
      }
      whenDone();
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + (0 | Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });
      source +=
        escape ? "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'" :
        interpolate ? "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'" :
        evaluate ? "';\n" + evaluate + "\n__p+='" : '';
      index = offset + match.length;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  return _.noConflict();
});

define('nodeDataTooltip',[
	'jquery',
	'underscore',
	'internal/common/tooltip'],
function nodeDataTooltip($, _){

	var existingTooltips = [],
		tooltipCount = 0,
		$tt,
		defaults = {
			content:"",
			style:"mini"
		};

	// Merge the default options with any data-tooltip-* options specified in markup
	var parseOptions = function($el){
		var data = _.reduce($el.parents(), function(el, par){
			return _.extend(el, $(par).data());
		}, $el.data());
		var opts = _.reduce(_.keys(data), function(opts, key){
			if(key.substr(0, 7) === "tooltip") {
				opts[key.substr(7).toLowerCase()] = data[key];
			}
			return opts;
		}, _.clone(defaults));

		if(opts.offsetleft || opts.offsettop) {
			opts.offset = [parseInt(opts.offsetleft, 10), parseInt(opts.offsettop, 10)];
		}

		if(opts.anchor === "this") {
			opts.anchor = $el;
		}

		return opts;
	};

	var showTooltipFor = function($el){
		hideTooltip();
		if (!$el.data('existingTooltip')) {
			$tt = $.tooltip(parseOptions($el));
			$tt.prepend($el.data("tooltip"));
			if ($el.data('tooltip-title')) {
				$tt.prepend("<h6>" + $el.data('tooltip-title') + "</h6>");
			}
			existingTooltips[tooltipCount] = $tt;
			$el.data({existingTooltip: tooltipCount});
			tooltipCount++;
		}
		else {
			$tt = existingTooltips[$el.data('existingTooltip')];
		}
		$tt.addClass("active");
		$tt.show();
	};

	var hideTooltip = function(){
		if($tt) {
			$tt.removeClass("active");
			$tt.hide();
		}
	};

	$(function(){
		$("body").on("mouseover", "*[data-tooltip]", function(){
			showTooltipFor($(this));
		}).on("mouseout", "*[data-tooltip]", function(){
			hideTooltip();
		});

		$("body").on("showTooltip", function(e, el){
			showTooltipFor($(el));
		}).on("hideTooltip", function(e, el){
			hideTooltip();
		});
	});

});

/**
* These classes are used both in the editor and on the user's site
* In edit mode, functionality is added to these classes in bldr.modules.js
* Therefore, this file should only contain SHARED methods
*/

define('internal/sitebuilder/common/webs.modules',[
	'require',
	'jquery',
	'internal/sitebuilder/common/log',
	'spine',
	'internal/common/tooltip',
	'nodeDataTooltip'
], function(require, $, log, Spine){
	var Module = Spine.Controller.create({
			init: function(options){
				this.data = options.data;
			},

			oneLoaded: function(){
				// modules should override this
			},

			// We're overriding Spine.Event.trigger so that buggy callbacks don't mess up the call stack
			trigger: function() {
				var args = Spine.makeArray(arguments);
				var ev   = args.shift();

				var list, calls, i, l;
				if (!(calls = this.hasOwnProperty("_callbacks") && this._callbacks)) return false;
				if (!(list  = this._callbacks[ev])) return false;

				for (i = 0, l = list.length; i < l; i++) {
					try {
						if (list[i].apply(this, args) === false)
							return false;
					} catch (error) {
						log.trigger("Modules", "error", "Module:" + this.parent.slug + ", Event:" + ev, error);
					}
				}

				return true;
			}
		}),

		CustomModule = Module.create(),

		CompositeModule = CustomModule.create(),

		WidgetModule = Module.create(),

		IframeModule = Module.create(),

		AppModule = Module.create();

		// Class Methods
		Module.extend({
			styles: []
		});

		CompositeModule.include({
			/**
			 * Subclasses of CompositeModule SHOULD override this method if there is
			 * any submodule *SLUG* where data.*SLUG* is not the module data for the submodule,
			 * it should return an array of objects describing each submodule, e.g.:
			 * [
			 *   {
			 *     name: "unique identifier (within the scope of this composite module) for the submodule",
			 *     el: "root container for the submodule",
			 *     slug: "name of module class",
			 *     data: {data: "for", the: "submodule"},
			 *   },
			 *   {
			 *     ...
			 *   },
			 * ]
			 */
			describeSubmodules: function(){
				var self = this,
					$top = self.el.children(".webs-composite-module").eq(0),
					submoduleContainers = $top.find(".webs-submodule"),
					submoduleDescriptions = [];
				$.each(submoduleContainers, function(index){
					var container = submoduleContainers.eq(index);
					if (container.parents(".webs-composite-module")[0] === $top[0]) {
						var slug = container.attr("webs-submodule-slug");
						submoduleDescriptions.push({
							name: slug,
							el: container,
							slug: container.attr("webs-submodule-slug"),
							data: self.data[slug]
						});
					}
				});
				return submoduleDescriptions;
			},


			bindSubmodules: function(){
				var self = this,
					descriptions = this.describeSubmodules(),
					loadedDeferreds = [];

				self.submoduleInstances = {};
				require(['internal/sitebuilder/common/ModuleClassLoader'], function(ModuleClassLoader) {
					$.each(descriptions, function(i) {
						var desc = descriptions[i];
						var deferred = new $.Deferred();
						loadedDeferreds.push(deferred);
						ModuleClassLoader.create(desc.slug, {el: desc.el, data: desc.data}).done(function(submodule){
							self.submoduleInstances[desc.name] = submodule;
							desc.el.data("controller", submodule);
							deferred.resolve();
						});
					});
				});
				return $.when.apply($, loadedDeferreds);
			},

			oneLoaded: function(){
				this.bindSubmodules().done($.proxy(function(){
					$.each(this.submoduleInstances, function(name, submodule){
						submodule.oneLoaded();
					});
				}, this));
			}
		});

		webs.modules = {
			Module: Module,
			CustomModule: CustomModule,
			IframeModule: IframeModule,
			WidgetModule: WidgetModule,
			AppModule: AppModule,
			CompositeModule: CompositeModule
		};

		return webs.modules;
});

/* global require:false, Popover:false, acsLink:false */
define('internal/sitebuilder/builder/sitebase',[
	'jquery'
], function($) {
	"use strict";
	var webs = window.webs = window.webs || {};

	/**
	 * Put extra navbar elements in a "More" dropdown, if necessary.
	 */
	webs.fixNavWrap = function(jQuery){
		if(typeof(jQuery) === 'undefined') {
			jQuery = $;
		}
		$ = jQuery;
		if($('body').hasClass('webs-allow-nav-wrap')) {
			return false;
		}

		$('ul.webs-nav').each(function(){
			var nav = $(this),
				items = nav.children('li');
			if(items.length <= 0 || (items.css('display') === 'block' && items.first().css('float') === 'none')) {
				return false;
			}

			var top = items.eq(0).position().top + Math.min(items.eq(0).height(), 10),
				maxWidth = nav.parent().width(),
				more,
				checkFunc,
				addMore = function(){
					var more = nav.children('.webs-nav-more');
					if(more.length === 0) {
						var translatedMore = $('#translatedMore').html();
						more = $('<li class="webs-nav-more has-children"><a href="#" onclick="return false;"><span class="title">' + translatedMore + '</span><span class="after"></span></a><ul></ul></li>');
						nav.append(more);
					}
					return more.find('ul');
				},
				addToMore = function(item){
					if(!item.hasClass('webs-home')) { // Never put "Home" in the more dropdown
						var lvl3item = item.find('ul ul'); // Themes can't support the extra level, so move lvl3 up into lvl2
						if(lvl3item.length > 0) {
							lvl3item.children('li').prependTo(lvl3item.parents('ul')[0]);
						}
						item.prependTo(more);
						lvl3item.remove();
						return true;
					}
					return false;
				};

			if(nav.width() > maxWidth) {
				// Nav overflows
				more = addMore();
				checkFunc = function(){
					return nav.width() > maxWidth;
				};
			} else if(items.eq(items.length-1).position().top > top) {
				// Nav wraps
				more = addMore();
				var moreLi = more.parent(),
					// If the more is display: none, use it's sibling's position
					// It's very important that is(':visible') here returns false for visibility:hidden
					reference = moreLi.is(':visible') ? moreLi : moreLi.prev();

				checkFunc = function(){
					if(reference.length > 0) {
						return reference.position().top > top;
					} else {
						return false;
					}
				};
			}

			if(more && typeof(checkFunc) === 'function') {
				for(var i=items.length-1;i>0 && checkFunc();i--) {
					addToMore(items.eq(i));
				}
			}
		});

		// May not 100% belong here, but...
		// Ancestor pages need child-active class
		$('ul.webs-nav .has-children .active').parents('.has-children').addClass('child-active');
	};


	/**
	* webs.siteLoginPopover from webs_common.js
	* Modified to require websover
	*/
	webs.siteLoginPopover = function(server, email, siteID) {
		return new Popover(server + '/s/login/siteLoginPopover?id=' + email + '&site=' + siteID, {
			width: 430,
			height: (typeof acsLink !== "undefined" ? 300 : 175),
			heading: 'Manage Website'
		}).show();
	};




	$(function($){

		// Open links in new window
		// in edit mode or where we want this function disabled, simply set the disableLink data key on the anchor
		$("body").delegate(".w-link-new-window, .fw_link_newWindow", "click", function() {
			var $node = $(this);
			if(!$node.data("disableLink")) {
				var href = $(this).attr("href");
				window.open(href, "_blank");
				return false;
			}
		});

		// toggle state of 'expired premium' header:
		toggleExpiredPremiumHeader();

		// Sign-out tab for social sites
		createSignoutTab();
	});

	function toggleExpiredPremiumHeader(){
		var opened = $('.webs-expired-premium.header').hasClass('open');

		$('body').on('click', '.webs-expired-premium.header .toggle', function(event){
			event.preventDefault();

			if (opened) {
				$(event.currentTarget).closest('.webs-expired-premium.header').addClass('closed').removeClass('open');
				opened = false;
				return;
			}

			$(event.currentTarget).closest('.webs-expired-premium.header').addClass('open').removeClass('closed');
			opened = true;
		});
	}

	function createSignoutTab(){
		if(!webs.visitor) {
			return false;
		}

		$('<div/>').attr('id', 'fw-member-presence')
			.append($('<a/>').addClass('fw-display-name').attr('href', webs.site.url + 'apps/profile').html(webs.visitor.displayName))
			.append($('<a/>').addClass('fw-signout').attr('href', webs.site.url + 'apps/auth/logout').html('Sign Out'))
			.appendTo('body');
	}
});

/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/
/* jshint ignore:start */
function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
/* jshint ignore:end */;
define("internal/sitebuilder/common/css_browser_selector", function(){});
