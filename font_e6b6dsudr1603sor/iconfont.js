(function (window) {
	var svgSprite = "<svg>" + "" + '<symbol id="icon-bianji" viewBox="0 0 1024 1024">' + "" + '<path d="M882.536 353.79c-16.568 0-30 13.432-30 30v431.144c0 23.063-18.764 41.825-41.826 41.825H208.214c-23.063 0-41.826-18.763-41.826-41.825V212.437c0-23.063 18.763-41.825 41.826-41.825h428.91c16.568 0 30-13.432 30-30s-13.432-30-30-30h-428.91c-56.147 0-101.826 45.679-101.826 101.825v602.497c0 56.146 45.679 101.825 101.826 101.825H810.71c56.147 0 101.826-45.679 101.826-101.825V383.79c0-16.569-13.432-30-30-30z" fill="" ></path>' + "" + '<path d="M358.155 664.845c5.858 5.858 13.536 8.787 21.213 8.787s15.355-2.929 21.213-8.787l504.491-504.491c11.716-11.716 11.716-30.711 0-42.427-11.715-11.716-30.711-11.716-42.426 0L358.155 622.419c-11.716 11.716-11.716 30.71 0 42.426z" fill="" ></path>' + "" + "</symbol>" + "" + '<symbol id="icon-bianji1" viewBox="0 0 1024 1024">' + "" + '<path d="M805.867 111.188H219.801c-60.654 0-110 49.346-110 110v587.066c0 60.654 49.346 110 110 110h586.066c60.654 0 110-49.346 110-110V221.188c0-60.654-49.346-110-110-110z m36.603 116.854l-438 438c-5.858 5.858-13.536 8.787-21.213 8.787s-15.355-2.929-21.213-8.787c-11.715-11.716-11.715-30.71 0-42.426l438.001-438.001c11.715-11.716 30.711-11.716 42.426 0 11.715 11.716 11.715 30.711-0.001 42.427z" fill="" ></path>' + "" + "</symbol>" + "" + '<symbol id="icon-tongguo" viewBox="0 0 1024 1024">' + "" + '<path d="M510.438 64.129c-246.87 0-446.998 200.128-446.998 446.998s200.128 446.998 446.998 446.998 446.998-200.128 446.998-446.998S757.308 64.129 510.438 64.129z m273.648 720.647c-35.561 35.561-76.954 63.473-123.03 82.962-47.672 20.164-98.348 30.388-150.619 30.388s-102.946-10.224-150.618-30.388c-46.076-19.489-87.47-47.401-123.03-82.962-35.561-35.561-63.473-76.954-82.961-123.03-20.164-47.672-30.388-98.348-30.388-150.619s10.224-102.946 30.388-150.619c19.488-46.076 47.401-87.469 82.961-123.03 35.56-35.561 76.954-63.473 123.03-82.962 47.672-20.164 98.348-30.388 150.618-30.388 52.271 0 102.946 10.224 150.619 30.388 46.076 19.489 87.469 47.401 123.03 82.962 35.561 35.561 63.473 76.954 82.962 123.03 20.164 47.672 30.388 98.348 30.388 150.619s-10.224 102.946-30.388 150.619c-19.489 46.076-47.401 87.469-82.962 123.03z" fill="" ></path>' + "" + '<path d="M680.904 360.226L434.675 598.993l-95.018-89.512c-12.06-11.36-31.046-10.793-42.408 1.265-11.361 12.061-10.794 31.047 1.265 42.408l115.889 109.173a29.912 29.912 0 0 0 20.57 8.164 29.916 29.916 0 0 0 20.885-8.463L722.674 403.3c11.895-11.534 12.187-30.527 0.652-42.421s-30.526-12.187-42.422-0.653z" fill="" ></path>' + "" + "</symbol>" + "" + '<symbol id="icon-tongguo1" viewBox="0 0 1024 1024">' + "" + '<path d="M510.438 64.129c-246.87 0-446.998 200.128-446.998 446.998s200.128 446.998 446.998 446.998 446.998-200.128 446.998-446.998S757.308 64.129 510.438 64.129zM722.674 403.3L455.859 662.028a29.918 29.918 0 0 1-20.885 8.463 29.91 29.91 0 0 1-20.57-8.164L298.515 553.154c-12.06-11.361-12.626-30.348-1.265-42.408 11.361-12.059 30.348-12.625 42.408-1.265l95.018 89.512 246.229-238.768c11.896-11.533 30.888-11.242 42.422 0.653s11.241 30.888-0.653 42.422z" fill="" ></path>' + "" + "</symbol>" + "" + "</svg>";
	var script = function () {
		var scripts = document.getElementsByTagName("script");
		return scripts[scripts.length - 1]
	}();
	var shouldInjectCss = script.getAttribute("data-injectcss");
	var ready = function (fn) {
		if (document.addEventListener) {
			if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
				setTimeout(fn, 0)
			} else {
				var loadFn = function () {
					document.removeEventListener("DOMContentLoaded", loadFn, false);
					fn()
				};
				document.addEventListener("DOMContentLoaded", loadFn, false)
			}
		} else if (document.attachEvent) {
			IEContentLoaded(window, fn)
		}
		function IEContentLoaded(w, fn) {
			var d = w.document, done = false, init = function () {
				if (!done) {
					done = true;
					fn()
				}
			};
			var polling = function () {
				try {
					d.documentElement.doScroll("left")
				} catch (e) {
					setTimeout(polling, 50);
					return
				}
				init()
			};
			polling();
			d.onreadystatechange = function () {
				if (d.readyState == "complete") {
					d.onreadystatechange = null;
					init()
				}
			}
		}
	};
	var before = function (el, target) {
		target.parentNode.insertBefore(el, target)
	};
	var prepend = function (el, target) {
		if (target.firstChild) {
			before(el, target.firstChild)
		} else {
			target.appendChild(el)
		}
	};

	function appendSvg() {
		var div, svg;
		div = document.createElement("div");
		div.innerHTML = svgSprite;
		svgSprite = null;
		svg = div.getElementsByTagName("svg")[0];
		if (svg) {
			svg.setAttribute("aria-hidden", "true");
			svg.style.position = "absolute";
			svg.style.width = 0;
			svg.style.height = 0;
			svg.style.overflow = "hidden";
			prepend(svg, document.body)
		}
	}

	if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
		window.__iconfont__svg__cssinject__ = true;
		try {
			document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
		} catch (e) {
			console && console.log(e)
		}
	}
	ready(appendSvg)
})(window)