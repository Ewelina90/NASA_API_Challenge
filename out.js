/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$(function () {
    // Variables
    var $slaider = $('.slaider');
    var $loadBtn = $('.load-btn');
    var $gallery = $('.container');
    var $menuOff = $('#bars');
    var $animation = $('.wrapper');

    // Hamburger menu
    $menuOff.on('click', function () {
        if ($(this).hasClass('fa-bars')) {
            $(this).removeClass('fa-bars');
            $(this).addClass('fa-times');
        } else {
            $(this).removeClass('fa-times');
            $(this).addClass('fa-bars');
        }
        var $menuItems = $('#menu-items');
        if ($menuItems.is(':hidden')) {
            $menuItems.removeClass('slaider-menu-items');
            $menuItems.addClass('slaider-menu-items-show');
        } else {
            $menuItems.removeClass('slaider-menu-items-show');
            $menuItems.addClass('slaider-menu-items');
        }
    });

    //  Close menu after click on the link
    $('#menu-items a').on('click', function () {
        if ($menuOff.hasClass('fa-times')) {
            $(this).parent().parent().removeClass('slaider-menu-items-show');
            $(this).parent().parent().addClass('slaider-menu-items');
            $menuOff.removeClass('fa-times');
            $menuOff.addClass('fa-bars');
        }
    });

    // Random number form range
    var getRandomInt = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Random date
    var getRandomDate = function getRandomDate() {
        var day = getRandomInt(1, 28);
        var month = getRandomInt(1, 12);
        var year = getRandomInt(2010, 2016);

        return year + '-' + month + '-' + day;
    };

    // Create new pictures for Mars gallery
    var addNewImages = function addNewImages(link) {
        var $newDiv = $('<div>', { class: "group-images" });
        var $newUl = $('<ul>', { class: "images" });

        for (var i = 0; i < link.length; i++) {
            var $newLi = $('<li>');
            var $newImg = $('<img>', { src: link[i], alt: 'Photo of a Mars taken by the Curiosity rover' });
            $newLi.append($newImg);
            $newUl.append($newLi);
        }
        $newDiv.append($newUl);
        $gallery.append($newDiv);
    };

    // Get random Mars day
    var getRandomSol = function getRandomSol() {
        var sol = getRandomInt(1, 1728);
        return sol;
    };

    //Btn - load more pictures into gallery
    $loadBtn.on('click', function () {
        getImagesFromApi();
    });

    //Function - get images of a Mars from NASA
    var getImagesFromApi = function getImagesFromApi() {
        $.ajax({
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=8OMH6j4AYg49k56NSqvfwKHgwxOgb2XiR2KEVSJ7&sol=' + getRandomSol()
        }).done(function (response) {
            var links = [];
            for (var i = 0; i < 6; i++) {
                links.push(response.photos[i].img_src);
            }
            addNewImages(links);
        }).fail(function (error) {
            console.log('wystąpił error');
        });
    };

    // Image for slaider
    var getApodImg = function getApodImg() {
        $.ajax({
            url: 'https://api.nasa.gov/planetary/apod?&api_key=8OMH6j4AYg49k56NSqvfwKHgwxOgb2XiR2KEVSJ7&date=' + getRandomDate()
        }).done(function (response) {
            // Get response url
            var img = 'url("' + response.url + '")';
            // Set img as background-image
            $slaider.css('background-image', img);
            // Hide loadng animation
            $animation.hide();
            // Display description
            $('#msg').show();
            showText(".picture-title", response.title, 0, 50);
        }).fail(function (error) {
            console.log('error');
        });
    };
    // Slaider images
    getApodImg();
    // Mars images
    getImagesFromApi();

    // set picture description
    var showText = function showText(target, message, index, interval) {
        if (index < message.length) {
            $(target).append(message[index++]);
            setTimeout(function () {
                showText(target, message, index, interval);
            }, interval);
        }
    };
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".slaider, .gallery, .load-more {\n  width: 100%;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.slaider .left-arrow, .slaider .right-arrow {\n  position: absolute;\n  font-size: 3rem;\n  color: white;\n  height: 100vh;\n  width: 1.5em; }\n  .slaider .left-arrow i, .slaider .right-arrow i {\n    padding-top: calc(100vh/2 - 3rem); }\n\n.wrapper {\n  perspective: 1000px; }\n  .wrapper .inner {\n    transform: rotateX(60deg); }\n    .wrapper .inner .planet {\n      margin: 50px auto;\n      width: 80px;\n      height: 130px;\n      background: white;\n      border-radius: 50%;\n      box-shadow: -1px -1px 3px 0px gray, -6px -15px 64px 0px #0056c9 inset; }\n    .wrapper .inner .loading {\n      width: 160px;\n      height: 160px;\n      border-radius: 50%;\n      border: solid white;\n      border-top-color: transparent;\n      border-width: 5px 0 5px 5px;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin-top: -80px;\n      margin-left: -80px;\n      animation: loading 1.2s linear infinite;\n      -webkit-animation: loading 1.2s linear infinite; }\n\n@keyframes loading {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n@-webkit-keyframes loading {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg); } }\n\n.paused {\n  -webkit-animation-play-state: paused;\n  -moz-animation-play-state: paused;\n  animation-play-state: paused; }\n\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: 'Roboto', sans-serif;\n  font-size: 30px;\n  color: white; }\n\n.hide {\n  display: none; }\n\na {\n  text-decoration: none;\n  cursor: pointer; }\n\na:hover {\n  transition: 0.2s;\n  color: blue; }\n\n.slaider {\n  flex-flow: column;\n  background: black;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative; }\n  .slaider .slaider-menu {\n    position: fixed;\n    top: 0;\n    width: 100%;\n    height: auto;\n    text-align: right;\n    padding: 20px 10%;\n    text-shadow: 1px 1px rgba(153, 153, 153, 0.2);\n    z-index: 999; }\n    .slaider .slaider-menu:hover {\n      transition: 0.2s;\n      background-color: rgba(255, 255, 255, 0.2); }\n    .slaider .slaider-menu .fa-bars, .slaider .slaider-menu .fa-times {\n      display: none; }\n    .slaider .slaider-menu .slaider-menu-items li {\n      display: inline-block;\n      padding-left: 1.2em; }\n    @media (max-width: 800px) {\n      .slaider .slaider-menu .fa-bars, .slaider .slaider-menu .fa-times {\n        z-index: 1000;\n        display: block;\n        padding: 10px 0 10px 10px; }\n      .slaider .slaider-menu .slaider-menu-items {\n        display: none; }\n      .slaider .slaider-menu .slaider-menu-items-show {\n        display: block;\n        padding-top: 12px; }\n        .slaider .slaider-menu .slaider-menu-items-show li {\n          display: block;\n          line-height: 2em; } }\n  .slaider .left-arrow {\n    left: 10%; }\n  .slaider .right-arrow {\n    right: 10%;\n    text-align: right; }\n  .slaider #msg {\n    display: none;\n    position: absolute;\n    max-width: 50%;\n    bottom: 5.2rem;\n    text-align: center;\n    background-color: rgba(255, 255, 255, 0.2);\n    padding: 20px 30px;\n    text-shadow: 1px 1px rgba(153, 153, 153, 0.2); }\n    .slaider #msg .picture-title {\n      display: block;\n      font-size: 1.1rem; }\n    .slaider #msg .picture-description {\n      display: none;\n      padding-top: 20px;\n      font-size: 0.9rem; }\n    .slaider #msg .expand {\n      font-size: 1.4rem;\n      color: white;\n      position: absolute;\n      z-index: 3;\n      right: -4px;\n      top: -6px;\n      transform: rotate(-45deg);\n      transform-origin: bottom; }\n  .slaider .slaider-active-pictures {\n    position: absolute;\n    bottom: 20px;\n    height: 1.2em; }\n    .slaider .slaider-active-pictures .active-picture {\n      color: white; }\n      .slaider .slaider-active-pictures .active-picture li {\n        display: inline-block;\n        padding-right: 1.1em; }\n\n.gallery {\n  background: grey;\n  flex-flow: column; }\n  .gallery h2 {\n    margin-top: 30px;\n    font-size: 2rem; }\n  .gallery .container {\n    width: 90%;\n    margin: 30px 0 30px 0; }\n    .gallery .container .group-images {\n      width: 100%; }\n      .gallery .container .group-images .images {\n        width: 100%; }\n        .gallery .container .group-images .images li {\n          display: inline-block;\n          width: 31%;\n          margin-right: 3%;\n          margin-bottom: 3%; }\n          .gallery .container .group-images .images li:nth-child(3n+3) {\n            margin-right: 0; }\n          .gallery .container .group-images .images li img {\n            width: 100%;\n            height: auto; }\n\n.load-more {\n  width: 90%;\n  min-height: 100px;\n  margin: 30px auto 30px auto; }\n  .load-more .load-btn {\n    background: blue;\n    border: none;\n    padding: 0.5rem; }\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);