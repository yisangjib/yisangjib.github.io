/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-forcetouch-touchevents-setclasses !*/
 ! function(e, n, t) {
	function r(e, n) {
		return typeof e === n
	}

	function o() {
		var e, n, t, o, i, s, a;
		for (var u in C)
			if (C.hasOwnProperty(u)) {
				if (e = [], n = C[u], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
					for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
				for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), g.push((o ? "" : "no-") + a.join("-"))
			}
	}

	function i(e) {
		var n = w.className,
			t = Modernizr._config.classPrefix || "";
		if (E && (n = n.baseVal), Modernizr._config.enableJSClass) {
			var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
			n = n.replace(r, "$1" + t + "js$2")
		}
		Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), E ? w.className.baseVal = n : w.className = n)
	}

	function s() {
		return "function" != typeof n.createElement ? n.createElement(arguments[0]) : E ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
	}

	function a(e) {
		return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
			return n + t.toUpperCase()
		}).replace(/^-/, "")
	}

	function u() {
		var e = n.body;
		return e || (e = s(E ? "svg" : "body"), e.fake = !0), e
	}

	function l(e, t, r, o) {
		var i, a, l, f, c = "modernizr",
			p = s("div"),
			d = u();
		if (parseInt(r, 10))
			for (; r--;) l = s("div"), l.id = o ? o[r] : c + (r + 1), p.appendChild(l);
		return i = s("style"), i.type = "text/css", i.id = "s" + c, (d.fake ? d : p).appendChild(i), d.appendChild(p), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), p.id = c, d.fake && (d.style.background = "", d.style.overflow = "hidden", f = w.style.overflow, w.style.overflow = "hidden", w.appendChild(d)), a = t(p, e), d.fake ? (d.parentNode.removeChild(d), w.style.overflow = f, w.offsetHeight) : p.parentNode.removeChild(p), !!a
	}

	function f(e, n) {
		return !!~("" + e).indexOf(n)
	}

	function c(e, n) {
		return function() {
			return e.apply(n, arguments)
		}
	}

	function p(e, n, t) {
		var o;
		for (var i in e)
			if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? c(o, t || n) : o);
		return !1
	}

	function d(n, t, r) {
		var o;
		if ("getComputedStyle" in e) {
			o = getComputedStyle.call(e, n, t);
			var i = e.console;
			if (null !== o) r && (o = o.getPropertyValue(r));
			else if (i) {
				var s = i.error ? "error" : "log";
				i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate")
			}
		} else o = !t && n.currentStyle && n.currentStyle[r];
		return o
	}

	function m(e) {
		return e.replace(/([A-Z])/g, function(e, n) {
			return "-" + n.toLowerCase()
		}).replace(/^ms-/, "-ms-")
	}

	function v(n, r) {
		var o = n.length;
		if ("CSS" in e && "supports" in e.CSS) {
			for (; o--;)
				if (e.CSS.supports(m(n[o]), r)) return !0;
			return !1
		}
		if ("CSSSupportsRule" in e) {
			for (var i = []; o--;) i.push("(" + m(n[o]) + ":" + r + ")");
			return i = i.join(" or "), l("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
				return "absolute" == d(e, null, "position")
			})
		}
		return t
	}

	function h(e, n, o, i) {
		function u() {
			c && (delete A.style, delete A.modElem)
		}
		if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
			var l = v(e, o);
			if (!r(l, "undefined")) return l
		}
		for (var c, p, d, m, h, y = ["modernizr", "tspan", "samp"]; !A.style && y.length;) c = !0, A.modElem = s(y.shift()), A.style = A.modElem.style;
		for (d = e.length, p = 0; d > p; p++)
			if (m = e[p], h = A.style[m], f(m, "-") && (m = a(m)), A.style[m] !== t) {
				if (i || r(o, "undefined")) return u(), "pfx" == n ? m : !0;
				try {
					A.style[m] = o
				} catch (g) {}
				if (A.style[m] != h) return u(), "pfx" == n ? m : !0
			} return u(), !1
	}

	function y(e, n, t, o, i) {
		var s = e.charAt(0).toUpperCase() + e.slice(1),
			a = (e + " " + z.join(s + " ") + s).split(" ");
		return r(n, "string") || r(n, "undefined") ? h(a, n, o, i) : (a = (e + " " + N.join(s + " ") + s).split(" "), p(a, n, t))
	}
	var g = [],
		C = [],
		_ = {
			_version: "3.6.0",
			_config: {
				classPrefix: "",
				enableClasses: !0,
				enableJSClass: !0,
				usePrefixes: !0
			},
			_q: [],
			on: function(e, n) {
				var t = this;
				setTimeout(function() {
					n(t[e])
				}, 0)
			},
			addTest: function(e, n, t) {
				C.push({
					name: e,
					fn: n,
					options: t
				})
			},
			addAsyncTest: function(e) {
				C.push({
					name: null,
					fn: e
				})
			}
		},
		Modernizr = function() {};
	Modernizr.prototype = _, Modernizr = new Modernizr;
	var S = _._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
	_._prefixes = S;
	var w = n.documentElement,
		E = "svg" === w.nodeName.toLowerCase(),
		b = function() {
			function e(e, n) {
				var o;
				return e ? (n && "string" != typeof n || (n = s(n || "div")), e = "on" + e, o = e in n, !o && r && (n.setAttribute || (n = s("div")), n.setAttribute(e, ""), o = "function" == typeof n[e], n[e] !== t && (n[e] = t), n.removeAttribute(e)), o) : !1
			}
			var r = !("onblur" in n.documentElement);
			return e
		}();
	_.hasEvent = b;
	var x = _.testStyles = l;
	Modernizr.addTest("touchevents", function() {
		var t;
		if ("ontouchstart" in e || e.DocumentTouch && n instanceof DocumentTouch) t = !0;
		else {
			var r = ["@media (", S.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
			x(r, function(e) {
				t = 9 === e.offsetTop
			})
		}
		return t
	});
	var T = "Moz O ms Webkit",
		z = _._config.usePrefixes ? T.split(" ") : [];
	_._cssomPrefixes = z;
	var O = function(n) {
		var r, o = S.length,
			i = e.CSSRule;
		if ("undefined" == typeof i) return t;
		if (!n) return !1;
		if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;
		for (var s = 0; o > s; s++) {
			var a = S[s],
				u = a.toUpperCase() + "_" + r;
			if (u in i) return "@-" + a.toLowerCase() + "-" + n
		}
		return !1
	};
	_.atRule = O;
	var N = _._config.usePrefixes ? T.toLowerCase().split(" ") : [];
	_._domPrefixes = N;
	var P = {
		elem: s("modernizr")
	};
	Modernizr._q.push(function() {
		delete P.elem
	});
	var A = {
		style: P.elem.style
	};
	Modernizr._q.unshift(function() {
		delete A.style
	}), _.testAllProps = y;
	var j = _.prefixed = function(e, n, t) {
		return 0 === e.indexOf("@") ? O(e) : (-1 != e.indexOf("-") && (e = a(e)), n ? y(e, n, t) : y(e, "pfx"))
	};
	Modernizr.addTest("forcetouch", function() {
		return b(j("mouseforcewillbegin", e, !1), e) ? MouseEvent.WEBKIT_FORCE_AT_MOUSE_DOWN && MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN : !1
	}), o(), i(g), delete _.addTest, delete _.addAsyncTest;
	for (var R = 0; R < Modernizr._q.length; R++) Modernizr._q[R]();
	e.Modernizr = Modernizr
}(window, document);