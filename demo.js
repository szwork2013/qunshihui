/**
 * Created by admin on 2016/5/6.
 */
/* 2016-01-28 11:39:48 */
!function () {
    function isStartWith(e, t) {
        return 0 == e.indexOf(t)
    }

    function isEndWith(e, t) {
        var a = e.length, r = t.length;
        return a >= r && e.indexOf(t) == a - r
    }

    function trim(e) {
        return isString(e) ? e.replace(/^\s+|\s+$/g, "") : ""
    }

    function tryToDecodeURIComponent(e, t) {
        var a = t || "";
        if (e)try {
            a = decodeURIComponent(e)
        } catch (r) {
        }
        return a
    }

    function obj2param(e) {
        var t, a, r = [];
        for (t in e)e.hasOwnProperty(t) && (a = "" + e[t], r.push(isStartWith(t, s_plain_obj) ? a : t + "=" + encodeURIComponent(a)));
        return r.join("&")
    }

    function arr2param(e) {
        var t, a, r, n = [], i = e.length;
        for (r = 0; i > r; r++)t = e[r][0], a = e[r][1], n.push(isStartWith(t, s_plain_obj) ? a : t + "=" + encodeURIComponent(a));
        return n.join("&")
    }

    function arr2obj(e) {
        var t, a, r, n = {}, i = e.length;
        for (r = 0; i > r; r++)t = e[r][0], a = e[r][1], n[t] = a;
        return n
    }

    function isContain(e, t) {
        return e.indexOf(t) > -1
    }

    function isNumber(e) {
        return "number" == typeof e
    }

    function isUnDefined(e) {
        return "undefined" == typeof e
    }

    function isString(e) {
        return "string" == typeof e
    }

    function isArray(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function tryToGetAttribute(e, t) {
        return e && e.getAttribute ? e.getAttribute(t) || "" : ""
    }

    function tryToGetHref(e) {
        var t;
        try {
            t = trim(e.getAttribute("href", 2))
        } catch (a) {
        }
        return t || ""
    }

    function getExParams() {
        var e = doc.getElementById("tb-beacon-aplus");
        return tryToGetAttribute(e, "exparams").replace(/&amp;/g, "&").replace(/\buserid=/, "uidaplus=")
    }

    function getMetaTags() {
        return _head_node = _head_node || doc.getElementsByTagName("head")[0], _meta_nodes || (_head_node ? _meta_nodes = _head_node.getElementsByTagName("meta") : [])
    }

    function parseMetaContent(e, t) {
        var a, r, n, i = e.split(";"), o = i.length;
        for (a = 0; o > a; a++)r = i[a].split("="), n = trim(r[0]), n && (t[n] = tryToDecodeURIComponent(trim(r[1])))
    }

    function getCookie(e) {
        var t = doc.cookie.match(new RegExp("\\b" + e + "=([^;]+)"));
        return t ? t[1] : ""
    }

    function getSPMFromUrl(e) {
        var t, a = e.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*]+)"));
        return a && (t = a[1]) && 4 == t.split(".").length ? t : null
    }

    function makeCacheNum() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }

    function makePVId() {
        var e = "g_aplus_pv_id", t = "", a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (!win[e]) {
            for (; t.length < 6;)t += a.substr(Math.floor(62 * Math.random()), 1);
            win[e] = t
        }
        return win[e]
    }

    function getMetaAtpData() {
        var e, t, a, r = getMetaTags(), n = r.length;
        for (e = 0; n > e; e++)t = r[e], "atp-beacon" == tryToGetAttribute(t, "name") && (a = tryToGetAttribute(t, "content"), parseMetaContent(a, _atp_beacon_data));
        _atp_beacon_data_params = obj2param(_atp_beacon_data)
    }

    function getMetaWaiting() {
        var e, t, a, r = getMetaTags(), n = r.length;
        for (e = 0; n > e; e++)if (t = r[e], "aplus-waiting" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }

    function isOnePage() {
        var e, t, a = getMetaTags(), r = a.length, n = "-1";
        for (e = 0; r > e; e++)if (t = a[e], "isonepage" == tryToGetAttribute(t, "name")) {
            n = tryToGetAttribute(t, "content");
            break
        }
        return n
    }

    function getMetaOffline() {
        var e, t, a, r = getMetaTags(), n = r.length;
        for (e = 0; n > e; e++)if (t = r[e], "aplus-offline" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }

    function getMetaForbidPost() {
        var e, t, a, r = getMetaTags(), n = r.length;
        for (e = 0; n > e; e++)if (t = r[e], "aplus-forbidpost" == tryToGetAttribute(t, "name")) {
            a = tryToGetAttribute(t, "content");
            break
        }
        return a
    }

    function makeChkSum(e) {
        e = (e || "").split("#")[0].split("?")[0];
        var t = e.length, a = function (e) {
            var t, a = e.length, r = 0;
            for (t = 0; a > t; t++)r = 31 * r + e.charCodeAt(t);
            return r
        };
        return t ? a(t + "#" + e.charCodeAt(t - 1)) : -1
    }

    function onDOMReady(e) {
        var t = win.KISSY;
        t ? t.ready(e) : win.jQuery ? jQuery(doc).ready(e) : "complete" === doc.readyState ? e() : addEventListener(win, "load", e)
    }

    function recordValInWindowName() {
        var e, t;
        !is_in_iframe && is_https && (is_login_page && page_referrer ? (e = page_referrer, t = nameStorage.getItem(KEY.NAME_STORAGE.REFERRER_PV_ID)) : (e = page_url, t = pvid), nameStorage.setItem(KEY.NAME_STORAGE.REFERRER, e), nameStorage.setItem(KEY.NAME_STORAGE.REFERRER_PV_ID, t))
    }

    function addEventListener(e, t, a) {
        e[onevent]((atta ? "on" : "") + t, function (e) {
            e = e || win.event;
            var t = e.target || e.srcElement;
            a(e, t)
        }, s_false)
    }

    function atp_inIframeException() {
        var e, t, a = [];
        for (e = 0, t = a.length; t > e; e++)if (-1 != pathname.indexOf(a[e]))return s_true;
        var r = /^https?:\/\/[\w\.]+\.(taobao|tmall|etao|tao123|juhuasuan)\.com/i;
        return !r.test(page_referrer)
    }

    function cleanParams(e) {
        var t, a, r, n, i = [], o = {};
        for (t = e.length - 1; t >= 0; t--)a = e[t], r = a[0], r != s_plain_obj && o.hasOwnProperty(r) || (n = a[1], ("aplus" == r || "" != n) && (i.unshift([r, n]), o[r] = 1));
        return i
    }

    function cleanParamsForWindvane(e) {
        var t, a, r, n, i = [], o = {logtype: !0, cache: !0, scr: !0, "spm-cnt": !0};
        for (t = e.length - 1; t >= 0; t--)a = e[t], r = a[0], n = a[1], isStartWith(r, s_plain_obj) || o[r] || i.unshift([r, n]);
        return i
    }

    function tblogSend(e, t) {
        var a, r, n;
        if (t) {
            if (t = cleanParams(t), isWindVane) {
                n = cleanParamsForWindvane(t);
                var i, o = {}, s = (getSPMFromUrl(page_url), getSPMFromUrl(page_referrer)), l = isOnePage(), _ = l.split("|"), c = _[0], u = _[1] ? _[1] : "";
                try {
                    r = arr2obj(n), i = JSON.stringify(r), "{}" == i && (i = "")
                } catch (d) {
                    i = ""
                }
                o.functype = "2001", o.urlpagename = u, o.url = loc.href, o.spmcnt = (spm_ab || "0.0") + ".0.0", o.spmpre = s || "", o.lzsid = "", o.cna = acookie_cna || "", o.extendargs = i, o.isonepage = c, WindVane.call("WVTBUserTrack", "toUT", o), win[s_goldlog].windVaneData = o
            }
            return isWindVane && is_ali_app_tb || (a = goldlog.send(e, t)), a
        }
    }

    function mkPlainKey() {
        return s_plain_obj + Math.random()
    }

    function addScript(e, t) {
        var a = "script", r = doc.createElement(a);
        r.type = "text/javascript", r.async = !0, r.src = is_https ? t || e : e;
        var n = doc.getElementsByTagName(a)[0];
        n.parentNode.insertBefore(r, n)
    }

    function checkLS() {
        var e = !1;
        if ("localStorage"in win && null != win.localStorage)try {
            localStorage.setItem("test", "test"), localStorage.removeItem("test"), e = !0
        } catch (t) {
        }
        return e
    }

    function isUseLSProxy() {
        if (is_https || is_ali_app)return !1;
        var e = ua.split(" Safari/");
        return 2 != e.length ? !1 : (e[1] = trim(e[1]), !isForbidPost && checkLS() && win.postMessage && !e[1].match(/[\d\.]+?\s+.+/) && ua.indexOf("AppleWebKit") > -1 && ua.match(/\bVersion\/\d+/) && !ua.match(/\bChrome\/\d+/) && !ua.match(/TencentTraveler|QQBrowser/) && !ua.match(/UCBrowser|UCWEB/))
    }

    function getSPMProtocolFromMeta() {
        var e, t, a, r, n = getMetaTags();
        for (e = 0, t = n.length; t > e; e++)a = n[e], r = tryToGetAttribute(a, "name"), r == s_SPM_ATTR_NAME && (spm_protocol = tryToGetAttribute(a, s_SPM_DATA_PROTOCOL))
    }

    function getMetaSPMData(e) {
        var t, a, r, n, i, o, s = getMetaTags();
        if (s)for (t = 0, a = s.length; a > t; t++)if (n = s[t], i = tryToGetAttribute(n, "name"), i == e)return page_global_spm_id_origin = tryToGetAttribute(n, "content"), page_global_spm_id_origin.indexOf(":") >= 0 && (r = page_global_spm_id_origin.split(":"), spm_protocol = "i" == r[0] ? "i" : "u", page_global_spm_id_origin = r[1]), o = tryToGetAttribute(n, s_SPM_DATA_PROTOCOL), o && (spm_protocol = "i" == o ? "i" : "u"), spm_ab = page_global_spm_id_origin, s_true;
        return s_false
    }

    function ifAdd(e, t) {
        var a, r, n, i, o = t.length;
        for (a = 0; o > a; a++)r = t[a], n = r[0], i = r[1], i && e.push([n, i])
    }

    function compareVersion(e, t) {
        e = e.toString().split("."), t = t.toString().split(".");
        for (var a = 0; a < e.length || a < t.length; a++) {
            var r = parseInt(e[a], 10), n = parseInt(t[a], 10);
            if (window.isNaN(r) && (r = 0), window.isNaN(n) && (n = 0), n > r)return -1;
            if (r > n)return 1
        }
        return 0
    }

    function callback(e, t) {
        isAndroid && compareVersion(osVersion, "2.4.0") < 0 ? setTimeout(function () {
            e && e(t)
        }, 1) : e && e(t)
    }

    function init_getGlobalSPMId() {
        if (!isUnDefined(spm_ab))return spm_ab;
        if (spm_a && spm_b)return spm_a = spm_a.replace(/^{(\w+)}$/g, "$1"), spm_b = spm_b.replace(/^{(\w+)}$/g, "$1"), wh_in_page = s_true, spm_ab = spm_a + "." + spm_b, getSPMProtocolFromMeta(), goldlog.spm_ab = [spm_a, spm_b], spm_ab;
        var e;
        doc.getElementsByTagName("head")[0];
        if (getMetaSPMData(s_SPM_ATTR_NAME) || getMetaSPMData("spm-id"), spm_ab = spm_ab || default_ab, !spm_ab)return spm_ab;
        var t, a = doc.getElementsByTagName("body");
        return e = spm_ab.split("."), goldlog.spm_ab = e, a = a && a.length ? a[0] : null, a && (t = tryToGetAttribute(a, s_SPM_ATTR_NAME), t ? (spm_ab = e[0] + "." + t, goldlog.spm_ab = [e[0], t]) : 1 == e.length && (spm_ab = default_ab)), spm_ab
    }

    function init_loadScripts() {
        var e = "laiwang", t = "/ilw/a/lwlog.js?v=140709";
        isContain(loc.href.split("?")[0], e) && addScript(url_g_alicdn + t)
    }

    function init_windVane() {
        var WV_Core = {
            call: function (e, t, a, r, n, i) {
                var o, s;
                return lib.promise && (s = lib.promise.deferred()), o = i > 0 ? setTimeout(function () {
                    WV_Core.onFailure(o, {ret: "TIMEOUT"})
                }, i) : WV_Private.getSid(), a.sid = o, WV_Private.registerCall(o, r, n, s), isAndroid ? compareVersion(wvVersion, "2.7.0") >= 0 ? WV_Private.callMethodByPrompt(e, t, WV_Private.buildParam(a), o + "") : WindVane_Native && WindVane_Native.callMethod && WindVane_Native.callMethod(e, t, WV_Private.buildParam(a), o + "") : isIOS && WV_Private.callMethodByIframe(e, t, WV_Private.buildParam(a), o + ""), s ? s.promise() : void 0
            }, fireEvent: function (e, t) {
                var a = doc.createEvent("HTMLEvents");
                a.initEvent(e, !1, !0), a.param = WV_Private.parseParam(t), doc.dispatchEvent(a)
            }, getParam: function (e) {
                return WV_Private.params[PARAM_PREFIX + e] || ""
            }, onSuccess: function (e, t) {
                clearTimeout(e);
                var a = WV_Private.unregisterCall(e), r = a.success, n = a.deferred, i = WV_Private.parseParam(t);
                callback(function (e) {
                    r && r(e), n && n.resolve(e)
                }, i.value || i), WV_Private.onComplete(e)
            }, onFailure: function (e, t) {
                clearTimeout(e);
                var a = WV_Private.unregisterCall(e), r = a.failure, n = a.deferred, i = WV_Private.parseParam(t);
                callback(function (e) {
                    r && r(e), n && n.reject(e)
                }, i), WV_Private.onComplete(e)
            }
        }, WV_Private = {
            params: {}, buildParam: function (e) {
                return e && "object" == typeof e ? JSON.stringify(e) : e || ""
            }, parseParam: function (str) {
                var obj;
                if (str && "string" == typeof str)try {
                    obj = JSON.parse(str)
                } catch (e) {
                    obj = eval("(" + str + ")")
                } else obj = str || {};
                return obj
            }, getSid: function () {
                return Math.floor(Math.random() * (1 << 50)) + "" + inc++
            }, registerCall: function (e, t, a, r) {
                t && (callbackMap[SUCCESS_PREFIX + e] = t), a && (callbackMap[FAILURE_PREFIX + e] = a), r && (callbackMap[DEFERRED_PREFIX + e] = r)
            }, unregisterCall: function (e) {
                var t = SUCCESS_PREFIX + e, a = FAILURE_PREFIX + e, r = DEFERRED_PREFIX + e, n = {
                    success: callbackMap[t],
                    failure: callbackMap[a],
                    deferred: callbackMap[r]
                };
                return delete callbackMap[t], delete callbackMap[a], n.deferred && delete callbackMap[r], n
            }, useIframe: function (e, t) {
                var a = IFRAME_PREFIX + e, r = iframePool.pop();
                r || (r = doc.createElement("iframe"), r.setAttribute("frameborder", "0"), r.style.cssText = "width:0;height:0;border:0;display:none;"), r.setAttribute("id", a), r.setAttribute("src", t), r.parentNode || setTimeout(function () {
                    doc.body.appendChild(r)
                }, 5)
            }, retrieveIframe: function (e) {
                var t = IFRAME_PREFIX + e, a = doc.querySelector("#" + t);
                iframePool.length >= iframeLimit ? doc.body.removeChild(a) : iframePool.push(a)
            }, callMethodByIframe: function (e, t, a, r) {
                var n = {"selfParam=1": 1, sid: this.parseParam(a).sid};
                n = this.buildParam(n);
                var i = LOCAL_PROTOCOL + "://" + e + ":" + r + "/" + t + "?" + n;
                this.params[PARAM_PREFIX + r] = a, this.useIframe(r, i)
            }, callMethodByPrompt: function (e, t, a, r) {
                var n = LOCAL_PROTOCOL + "://" + e + ":" + r + "/" + t + "?" + a, i = WV_PROTOCOL + ":";
                this.params[PARAM_PREFIX + r] = a, window.prompt(n, i)
            }, onComplete: function (e) {
                isIOS && this.retrieveIframe(e), delete this.params[PARAM_PREFIX + e]
            }
        };
        for (var key in WV_Core)win[s_goldlog][key] = WindVane[key] = WV_Core[key]
    }

    function sendPV(e) {
        var t, a, r = getSPMFromUrl(page_url), n = getSPMFromUrl(page_referrer), i = getCookie("tracknick"), o = getExParams();
        if (is_use_LS_proxy = isUseLSProxy(), loc_hash = loc.hash, loc_hash && 0 == loc_hash.indexOf("#") && (loc_hash = loc_hash.substr(1)), (!is_in_iframe || atp_inIframeException()) && (a = 1 == waitingMeta ? 7 : VERSION, t = [[mkPlainKey(), "title=" + escape(doc.title)], ["pre", page_referrer], ["cache", makeCacheNum()], ["scr", screen.width + "x" + screen.height], ["isbeta", a]], acookie_cna && t.push([mkPlainKey(), "cna=" + acookie_cna]), i && t.push([mkPlainKey(), "nick=" + i]), t.push(["spm-cnt", (spm_ab || "0.0") + ".0.0"]), ifAdd(t, [["spm-url", r], ["spm-pre", n]]), tblog_data = tblog_data.concat(t), 7 == a ? setTimeout(function () {
                goldlog.launch({isWait: !0})
            }, 6e3) : (tblog_data.push([mkPlainKey(), o ? o : "aplus"]), ifAdd(tblog_data, [["urlokey", loc_hash], ["aunbid", cookie_unb]]), e || ifAdd(tblog_data, [["auto", "0"]]), win.g_aplus_pv_req = tblogSend(tblog_beacon_url, tblog_data))), is_in_iframe) {
            getMetaAtpData();
            var s, l = _atp_beacon_data.on, _ = "1" == l ? "//ac.mmstat.com/y.gif" : tblog_beacon_url;
            "1" != l && "2" != l || !(s = _atp_beacon_data.chksum) || s !== makeChkSum(page_url).toString() || tblogSend(_, tblog_data)
        }
        addEventListener(win, "beforeunload", function () {
            recordValInWindowName()
        })
    }

    var win = window, doc = document, _k = "g_tb_aplus_loaded", _launch = "g_tb_aplus_launch";
    if (!doc.getElementsByTagName("body").length)return void setTimeout(arguments.callee, 50);
    if (!win[_k]) {
        win[_k] = 1;
        var url_g_alicdn = "//g.alicdn.com", KEY = {
            NAME_STORAGE: {
                REFERRER: "wm_referrer",
                REFERRER_PV_ID: "refer_pv_id"
            }
        }, VERSION = "9", loc = location, is_https = "https:" == loc.protocol, is_in_iframe = parent !== self, pathname = loc.pathname, isForbidPost = getMetaForbidPost(), use_protocol = is_https ? "https://" : "http://", tblog_beacon_base = use_protocol + "log.mmstat.com/", tblog_beacon_url = tblog_beacon_base + "m.gif", tblog_data = [["logtype", is_in_iframe ? 0 : 1]], page_url = loc.href, page_url_constant = page_url.replace(/[\?#].*/g, ""), pvid = makePVId(), loc_hash = loc.hash, s_goldlog = "goldlog", ua = navigator.userAgent, lib = win.lib || (win.lib = {}), isIOS = /iPhone|iPad|iPod/i.test(ua), isAndroid = /Android/i.test(ua), isWindVane = /WindVane/i.test(ua), osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i), wvVersion = ua.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/), WindVane = {}, WindVane_Native = win.WindVane_Native, callbackMap = {}, inc = 1, iframePool = [], iframeLimit = 3, LOCAL_PROTOCOL = "hybrid", WV_PROTOCOL = "wv_hybrid", IFRAME_PREFIX = "iframe_", SUCCESS_PREFIX = "suc_", FAILURE_PREFIX = "err_", DEFERRED_PREFIX = "defer_", PARAM_PREFIX = "param_", page_referrer = doc.referrer, is_login_page = is_https && (page_url.indexOf("login.m.taobao.com") >= 0 || page_url.indexOf("login.m.tmall.com") >= 0), atta = !!doc.attachEvent, s_attachEvent = "attachEvent", s_addEventListener = "addEventListener", onevent = atta ? s_attachEvent : s_addEventListener, s_false = !1, s_true = !0, is_launched = s_false, s_plain_obj = "::-plain-::", refer_pv_id, _head_node, _meta_nodes, acookie_cna = getCookie("cna"), cookie_unb = getCookie("unb"), is_use_LS_proxy = s_false, s_SPM_ATTR_NAME = "data-spm", s_SPM_DATA_PROTOCOL = "data-spm-protocol", wh_in_page = s_false, default_ab = "0.0", page_global_spm_id_origin, spm_protocol, spm_a = win._SPM_a, spm_b = win._SPM_b, spm_ab, _microscope_data = {}, _atp_beacon_data = {}, _atp_beacon_data_params, waitingMeta = getMetaWaiting(), goldlog, is_ali_app, is_ali_app_tb, matched;
        (matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) && (is_ali_app = !0, is_ali_app_tb = "TB" == matched[1]);
        var nameStorage = function () {
            function e() {
                var e, t = [], i = !0;
                for (var c in u)u.hasOwnProperty(c) && (i = !1, e = u[c] || "", t.push(_(c) + s + _(e)));
                a.name = i ? r : n + _(r) + o + t.join(l)
            }

            function t(e, t, a) {
                e && (e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t, function (t) {
                    a.call(e, t)
                }))
            }

            var a = window;
            if (a.nameStorage)return a.nameStorage;
            var r, n = "nameStorage:", i = /^([^=]+)(?:=(.*))?$/, o = "?", s = "=", l = "&", _ = encodeURIComponent, c = decodeURIComponent, u = {}, d = {};
            return function (e) {
                if (e && 0 === e.indexOf(n)) {
                    var t = e.split(/[:?]/);
                    t.shift(), r = c(t.shift()) || "";
                    for (var a, o, s, _ = t.join(""), d = _.split(l), p = 0, m = d.length; m > p; p++)a = d[p].match(i), a && a[1] && (o = c(a[1]), s = c(a[2]) || "", u[o] = s)
                } else r = e || ""
            }(a.name), d.setItem = function (t, a) {
                t && "undefined" != typeof a && (u[t] = String(a), e())
            }, d.getItem = function (e) {
                return u.hasOwnProperty(e) ? u[e] : null
            }, d.removeItem = function (t) {
                u.hasOwnProperty(t) && (u[t] = null, delete u[t], e())
            }, d.clear = function () {
                u = {}, e()
            }, d.valueOf = function () {
                return u
            }, d.toString = function () {
                var e = a.name;
                return 0 === e.indexOf(n) ? e : n + e
            }, t(a, "beforeunload", function () {
                e()
            }), d
        }();
        page_referrer = doc.referrer || nameStorage.getItem(KEY.NAME_STORAGE.REFERRER) || "", osVersion = osVersion ? (osVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0", wvVersion = wvVersion ? (wvVersion[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0", goldlog = {
            version: VERSION,
            referrer: page_referrer,
            _d: {},
            _microscope_data: _microscope_data,
            getCookie: getCookie,
            tryToGetAttribute: tryToGetAttribute,
            tryToGetHref: tryToGetHref,
            isNumber: isNumber,
            nameStorage: nameStorage,
            launch: function (e) {
                if (!win[_launch]) {
                    win[_launch] = s_true;
                    var t, a, r, n = getExParams(), i = 1 == waitingMeta;
                    e && e.isWait && i ? (r = 7, delete e.isWait) : i ? r = 8 : i || (r = 5);
                    for (t in e)e.hasOwnProperty(t) && (a = e[t]) && tblog_data.push([t, a]);
                    tblog_data.push(["isbeta", r]), tblog_data.push([mkPlainKey(), n ? n : "aplus"]), ifAdd(tblog_data, [["urlokey", loc_hash], ["aunbid", cookie_unb]]), win.g_aplus_pv_req = tblogSend(tblog_beacon_url, tblog_data)
                }
            },
            send: function (e, t) {
                var a, r = new Image, n = "_img_" + Math.random(), i = -1 == e.indexOf("?") ? "?" : "&", o = t ? isArray(t) ? arr2param(t) : obj2param(t) : "";
                return win[n] = r, r.onload = r.onerror = function () {
                    win[n] = null
                }, r.src = a = o ? e + i + o : e, r = null, a
            },
            record: function (e, t, a, r) {
                r = arguments[3] || "";
                var n, i, o = "?", s = s_false, l = "//wgo.mmstat.com/", _ = "//wgm.mmstat.com/", c = makeCacheNum(), u = "", d = (spm_ab || "0.0") + ".0.0";
                if ("ac" == e)n = "//ac.mmstat.com/1.gif", s = isStartWith(r, "A") && r.substring(1) == makeChkSum(t); else if (isStartWith(e, "/"))s = isStartWith(r, "H") && r.substring(1) == makeChkSum(e), n = l + e.substring(1), i = 2, u += "&spm-cnt=" + d; else if (isEndWith(e, ".gif"))n = tblog_beacon_base + e; else {
                    if ("aplus" != e)return s_false;
                    n = _ + "mx.gif", i = 1
                }
                if (!s && "%" != r && makeChkSum(page_url_constant) != r)return s_false;
                if (a = (a || "") + (loc_hash ? "&urlokey=" + encodeURIComponent(loc_hash) : "") + (cookie_unb ? "&aunbid=" + encodeURIComponent(cookie_unb) : ""), 0 == a.indexOf("&") && (a = a.substr(1)), n += o + "cache=" + c + "&gmkey=" + encodeURIComponent(t) + "&gokey=" + encodeURIComponent(a) + "&cna=" + acookie_cna + "&isbeta=" + VERSION + u, i && (n += "&logtype=" + i), isWindVane) {
                    var p, m = {}, g = {
                        gmkey: t,
                        gokey: a,
                        isbeta: VERSION
                    }, f = isOnePage(), b = f.split("|"), h = b[0], v = b[1] ? b[1] : "";
                    try {
                        p = JSON.stringify(g), "{}" == p && (p = "")
                    } catch (P) {
                        p = ""
                    }
                    m.functype = "2101", m.logkey = e, m.logkeyargs = p, m.urlpagename = v, m.url = loc.href, m.cna = acookie_cna || "", m.extendargs = "", m.isonepage = h, WindVane.call("WVTBUserTrack", "toUT", m)
                }
                return goldlog.send(n)
            },
            sendPV: function () {
                tblog_data = [["logtype", is_in_iframe ? 0 : 1]], spm_ab = void 0, spm_ab = init_getGlobalSPMId(), sendPV(!1)
            }
        }, win[s_goldlog] = goldlog, init_getGlobalSPMId(), init_loadScripts(), isWindVane && init_windVane(), sendPV(!0)
    }
}();
/* 2015-11-04 16:54:40 */
!function () {
    function t(t) {
        var e, n;
        try {
            return e = [].slice.call(t)
        } catch (r) {
            e = [], n = t.length;
            for (var a = 0; n > a; a++)e.push(t[a]);
            return e
        }
    }

    function e(t, e) {
        return t && t.getAttribute ? t.getAttribute(e) || "" : ""
    }

    function n(t, e, n) {
        if (t && t.setAttribute)try {
            t.setAttribute(e, n)
        } catch (r) {
        }
    }

    function r(t, e) {
        if (t && t.removeAttribute)try {
            t.removeAttribute(e)
        } catch (r) {
            n(t, e, "")
        }
    }

    function a(t, e) {
        return 0 == t.indexOf(e)
    }

    function o(t) {
        for (var e = ["javascript:", "tel:", "sms:", "mailto:", "tmall://"], n = 0, r = e.length; r > n; n++)if (a(t, e[n]))return !0
    }

    function i(t) {
        return "string" == typeof t
    }

    function c(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function u(t) {
        return "number" == typeof t
    }

    function f(t, e) {
        return t.indexOf(e) >= 0
    }

    function l(t, e) {
        return t.indexOf(e) > -1
    }

    function s(t, e) {
        for (var n = 0, r = e.length; r > n; n++)if (l(t, e[n]))return ht;
        return vt
    }

    function m(t) {
        return i(t) ? t.replace(/^\s+|\s+$/g, "") : ""
    }

    function p(t) {
        return "undefined" == typeof t
    }

    function d(t, e) {
        var n = e || "";
        if (t)try {
            n = decodeURIComponent(t)
        } catch (r) {
        }
        return n
    }

    function g() {
        return ft = ft || dt.getElementsByTagName("head")[0], lt || (ft ? lt = ft.getElementsByTagName("meta") : [])
    }

    function h(t, e) {
        var n, r, a = t.split(";"), o = a.length;
        for (n = 0; o > n; n++)r = a[n].split("="), e[m(r[0]) || Et] = d(m(r.slice(1).join("=")))
    }

    function v() {
        var t, n, r, a, o = g();
        for (t = 0, n = o.length; n > t; t++)r = o[t], a = e(r, "name"), a == Ut && (st = e(r, Dt))
    }

    function b(t) {
        var n, r, o, i, c, u, f = g();
        if (f)for (n = 0, r = f.length; r > n; n++)if (i = f[n], c = e(i, "name"), c == t)return it = e(i, "content"), it.indexOf(":") >= 0 && (o = it.split(":"), st = "i" == o[0] ? "i" : "u", it = o[1]), u = e(i, Dt), u && (st = "i" == u ? "i" : "u"), ct = a(it, "110"), ot = ct ? Ot : it, ht;
        return vt
    }

    function y() {
        var t, n, r, a = g(), o = a.length;
        for (t = 0; o > t; t++)if (n = a[t], "aplus-touch" == e(n, "name")) {
            r = e(n, "content");
            break
        }
        return r
    }

    function w() {
        return Math.floor(268435456 * Math.random()).toString(16)
    }

    function N(t) {
        var e, n, r = [];
        for (e in t)t.hasOwnProperty(e) && (n = "" + t[e], r.push(a(e, Et) ? n : e + "=" + encodeURIComponent(n)));
        return r.join("&")
    }

    function A(t) {
        var e, n, r, o = [], i = t.length;
        for (r = 0; i > r; r++)e = t[r][0], n = t[r][1], o.push(a(e, Et) ? n : e + "=" + encodeURIComponent(n));
        return o.join("&")
    }

    function j(t) {
        var e;
        try {
            e = m(t.getAttribute("href", 2))
        } catch (n) {
        }
        return e || ""
    }
    function k(t, e, n) {
        return "tap" == e ? void x(t, n) : void t[Pt]((Bt ? "on" : "") + e, function (t) {
            t = t || pt.event;
            var e = t.target || t.srcElement;
            n(e)
        }, vt)
    }

    function x(t, e) {
        var n = "ontouchend"in document.createElement("div"), r = n ? "touchstart" : "mousedown", a = pt.KISSY;
        a && a.__touchModAdded && a.one && n ? a.one(t).on("tap", function (t) {
            e && e(t.target)
        }) : k(t, r, function (t) {
            e && e(t)
        })
    }

    function _(t) {
        var e = pt.KISSY;
        e ? e.ready(t) : pt.jQuery ? jQuery(dt).ready(t) : "complete" === dt.readyState ? t() : k(pt, "load", t)
    }

    function O(t, e) {
        var n, r = new Image, a = "_img_" + Math.random(), o = -1 == t.indexOf("?") ? "?" : "&", i = e ? c(e) ? A(e) : N(e) : "";
        return pt[a] = r, r.onload = r.onerror = function () {
            pt[a] = null
        }, r.src = n = i ? t + o + i : t, r = null, n
    }

    function T() {
        var t;
        if (xt && !Vt && (t = bt.match(/^[^?]+\?[^?]*spm=([^&#?]+)/), t && (Vt = t[1] + "_")), !p(ot))return ot;
        if (pt._SPM_a && pt._SPM_b)return rt = pt._SPM_a.replace(/^{(\w+)}$/g, "$1"), at = pt._SPM_b.replace(/^{(\w+)}$/g, "$1"), It = ht, ot = rt + "." + at, v(), ot;
        if (b(Ut) || b("spm-id"), !ot)return Tt = !0, ot = Ot, Ot;
        var n, r, a = dt.getElementsByTagName("body");
        return a = a && a.length ? a[0] : null, a && (n = e(a, Ut), n && (r = ot.split("."), ot = r[0] + "." + n)), l(ot, ".") || (Tt = !0, ot = Ot), ot
    }

    function E(t) {
        var e, n, r, a, o, i, c = dt.getElementsByTagName("*");
        for (e = []; t && 1 == t.nodeType; t = t.parentNode)if (i = t.id) {
            for (a = 0, n = 0; n < c.length; n++)if (o = c[n], o.id == i) {
                a++;
                break
            }
            if (e.unshift(t.tagName.toLowerCase() + '[@id="' + i + '"]'), 1 == a)return e.unshift("/"), e.join("/")
        } else {
            for (n = 1, r = t.previousSibling; r; r = r.previousSibling)r.tagName == t.tagName && n++;
            e.unshift(t.tagName.toLowerCase() + "[" + n + "]")
        }
        return e.length ? "/" + e.join("/") : null
    }

    function S(t) {
        var e = Lt[E(t)];
        return e ? e.spmc : ""
    }

    function M(n, r) {
        var a, o, i, c, u, f, l, s, m, p = [];
        for (a = t(n.getElementsByTagName("a")), o = t(n.getElementsByTagName("area")), c = a.concat(o), l = 0, s = c.length; s > l; l++) {
            for (f = !1, u = i = c[l]; (u = u.parentNode) && u != n;)if (e(u, Ut)) {
                f = !0;
                break
            }
            f || (m = e(i, Ht), r || "t" == m ? r && "t" == m && p.push(i) : p.push(i))
        }
        return p
    }

    function B(t, n, r, o) {
        var c, l, s, m, p, d, g, h, v, b, y, w, N, A, k;
        if (e(t, "data-spm-delay"))return void t.setAttribute("data-spm-delay", "");
        if (n = n || t.getAttribute(Ut) || "", n && (c = M(t, o), 0 !== c.length)) {
            if (s = n.split("."), N = a(n, "110") && 3 == s.length, N && (A = s[2], s[2] = "w" + (A || "0"), n = s.join(".")), i(v = T()) && v.match(/^[\w\-\*]+(\.[\w\-\*]+)?$/))if (f(n, ".")) {
                if (!a(n, v)) {
                    for (m = v.split("."), s = n.split("."), y = 0, b = m.length; b > y; y++)s[y] = m[y];
                    n = s.join(".")
                }
            } else f(v, ".") || (v += ".0"), n = v + "." + n;
            if (n.match && n.match(/^[\w\-\*]+\.[\w\-\*]+\.[\w\-\*]+$/)) {
                var x = o ? Qt : Kt;
                for (k = parseInt(e(t, x)) || 0, w = 0, p = k, b = c.length; b > w; w++)l = c[w], d = j(l), (o || d) && (N && l.setAttribute(Jt, A), (g = l.getAttribute(Wt)) ? U(l, g, r) : (p++, h = z(l) || p, o && (h = "at" + ((u(h) ? 1e3 : "") + h)), g = n + "." + h, U(l, g, r)));
                t.setAttribute(x, p)
            }
        }
    }

    function $(t) {
        var e, n = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"], r = n.length;
        for (e = 0; r > e; e++)if (-1 != t.indexOf(n[e]))return !0;
        return !1
    }

    function C(t) {
        return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\b/i) : vt
    }

    function P(t) {
        return t ? !!t.match(/^[^\?]*\balipay\.(?:com|net)\/.*\?.*\bsign=.*/i) : vt
    }

    function I(t) {
        for (var n; (t = t.parentNode) && t.tagName != Mt;)if (n = e(t, Dt))return n;
        return ""
    }

    function L(t, e) {
        if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !e)return t;
        var n, r, a, o, i, c, u, f = "&";
        if (-1 != t.indexOf("#") && (a = t.split("#"), t = a.shift(), r = a.join("#")), o = t.split("?"), i = o.length - 1, a = o[0].split("//"), a = a[a.length - 1].split("/"), c = a.length > 1 ? a.pop() : "", i > 0 && (n = o.pop(), t = o.join("?")), n && i > 1 && -1 == n.indexOf("&") && -1 != n.indexOf("%") && (f = "%26"), t = t + "?spm=" + Vt + e + (n ? f + n : "") + (r ? "#" + r : ""), u = l(c, ".") ? c.split(".").pop().toLowerCase() : "") {
            if ({png: 1, jpg: 1, jpeg: 1, gif: 1, bmp: 1, swf: 1}.hasOwnProperty(u))return 0;
            !n && 1 >= i && (r || {htm: 1, html: 1, php: 1}.hasOwnProperty(u) || (t += "&file=" + c))
        }
        return t
    }

    function R(t) {
        return t && bt.split("#")[0] == t.split("#")[0]
    }

    function U(t, n, r) {
        if (t.setAttribute(Wt, n), !r && !e(t, Yt)) {
            var i = j(t), c = "i" == (e(t, Dt) || I(t) || st), u = jt + "tbspm.1.1?logtype=2&spm=";
            i && !$(i) && (c || !(a(i, "#") || R(i) || o(i.toLowerCase()) || C(i) || P(i))) && (c ? (u += n + "&url=" + encodeURIComponent(i) + "&cache=" + w(), mt == t && O(u)) : r || (i = L(i, n)) && D(t, i))
        }
    }

    function D(t, e) {
        var n, r = t.innerHTML;
        r && -1 == r.indexOf("<") && (n = dt.createElement("b"), n.style.display = "none", t.appendChild(n)), t.href = e, n && t.removeChild(n)
    }

    function z(t) {
        var n, r, a;
        return Tt ? n = "0" : It ? (r = E(t), a = Lt[r], a && (n = a.spmd)) : (n = e(t, Ut), n && n.match(/^d\w+$/) || (n = "")), n
    }

    function Y(t) {
        for (var e, n, r = t; t && t.tagName != St && t.tagName != Mt && t.getAttribute;) {
            if (n = It ? S(t) : t.getAttribute(Ut)) {
                e = n, r = t;
                break
            }
            if (!(t = t.parentNode))break
        }
        return e && !/^[\w\-\.]+$/.test(e) && (e = "0"), {spm_c: e, el: r}
    }

    function H(t) {
        var e;
        return t && (e = t.match(/&?\bspm=([^&#]*)/)) ? e[1] : ""
    }

    function K(t, e) {
        var n = j(t), r = H(n), a = null, o = ot && 2 == ot.split(".").length;
        return o ? (a = [ot, 0, z(t) || 0], void U(t, a.join("."), e)) : void(n && r && (n = n.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "").replace(/\?#/, "#"), D(t, n)))
    }

    function Q(t, n) {
        mt = t;
        var r, a, o = e(t, Wt);
        if (o)U(t, o, n); else {
            if (r = Y(t.parentNode), a = r.spm_c, !a)return void K(t, n);
            Tt && (a = "0"), B(r.el, a, n), B(r.el, a, n, !0)
        }
    }

    function V(e) {
        if (e && 1 == e.nodeType) {
            r(e, Kt), r(e, Qt);
            var n, a = t(e.getElementsByTagName("a")), o = t(e.getElementsByTagName("area")), i = a.concat(o), c = i.length;
            for (n = 0; c > n; n++)r(i[n], Wt)
        }
    }

    function J(t) {
        var e = t.parentNode;
        if (!e)return "";
        var n = t.getAttribute(Ut), r = Y(e), a = r.spm_c || 0;
        a && -1 != a.indexOf(".") && (a = a.split("."), a = a[a.length - 1]);
        var o = ot + "." + a, i = _t[o] || 0;
        return i++, _t[o] = i, n = n || i, o + ".i" + n
    }

    function W(t) {
        var n, r = t.tagName;
        return ut = pt.g_aplus_pv_id, "A" != r && "AREA" != r ? n = J(t) : (Q(t, ht), n = e(t, Wt)), n = (n || "0.0.0.0").split("."), {
            a: n[0],
            b: n[1],
            c: n[2],
            d: n[3]
        }
    }

    function q(t) {
        var e = W(t);
        return e.a + "." + e.b + "." + e.c + "." + e.d
    }

    function F() {
        if (!Rt) {
            if (!pt.spmData)return void(kt || setTimeout(arguments.callee, 100));
            Rt = ht;
            var t, e, n, r, a = pt.spmData.data;
            if (a && c(a))for (t = 0, e = a.length; e > t; t++)n = a[t], r = n.xpath, Lt[r] = {
                spmc: n.spmc,
                spmd: n.spmd
            }
        }
    }

    function G() {
        var t, n, r, a, o = dt.getElementsByTagName("iframe"), i = o.length;
        for (n = 0; i > n; n++)t = o[n], !t.src && (r = e(t, zt)) && (a = W(t), a ? (a = [a.a, a.b, a.c, a.d, a.e].join("."), t.src = L(r, a)) : t.src = r)
    }

    function X() {
        function t() {
            e++, e > 10 && (n = 3e3), G(), setTimeout(t, n)
        }

        var e = 0, n = 500;
        t()
    }

    function Z(t, e) {
        var n, r, o = "gostr", i = "locaid", c = {};
        if (h(e, c), n = c[o], r = c[i], n && r) {
            a(n, "/") && (n = n.substr(1));
            var u, f = W(t), l = [f.a, f.b, f.c, r].join("."), s = n + "." + l, m = ["logtype=2", "cache=" + Math.random(), "autosend=1"];
            for (u in c)c.hasOwnProperty(u) && u != o && u != i && m.push(u + "=" + c[u]);
            m.length > 0 && (s += "?" + m.join("&"));
            var p, d = {gmkey: "", gokey: m.length > 0 ? m.join("&") : ""};
            if (pt.goldlog && pt.goldlog.call && (p = pt.goldlog.windVaneData)) {
                try {
                    d = JSON.stringify(d), "{}" == d && (d = "")
                } catch (g) {
                    d = ""
                }
                p.functype = "2101", p.logkey = "/" + n + "." + l, p.logkeyargs = d, p.extendargs = "", delete p.spmcnt, delete p.spmpre, delete p.lzsid, pt.goldlog.call("WVTBUserTrack", "toUT", p)
            }
            O(jt + s), t.setAttribute(Wt, l)
        }
    }

    function tt(t) {
        for (var n; t && t.tagName != St;) {
            n = e(t, Yt);
            {
                if (n) {
                    Z(t, n);
                    break
                }
                t = t.parentNode
            }
        }
    }

    function et() {
        Nt ? k(dt, "tap", tt) : k(dt, "mousedown", tt)
    }

    function nt(t) {
        for (var e; t && (e = t.tagName);) {
            if ("A" == e || "AREA" == e) {
                Q(t, vt);
                break
            }
            if (e == Mt || e == St)break;
            t = t.parentNode
        }
    }

    var rt, at, ot, it, ct, ut, ft, lt, st, mt, pt = window, dt = document, gt = location, ht = !0, vt = !1, bt = gt.href, yt = gt.protocol, wt = "https:" == yt, Nt = y(), At = wt ? "https:" : "http:", jt = At + "//wgo.mmstat.com/", kt = vt, xt = parent !== self, _t = {}, Ot = "0.0", Tt = !1, Et = "::-plain-::", St = "HTML", Mt = "BODY", Bt = !!dt.attachEvent, $t = "attachEvent", Ct = "addEventListener", Pt = Bt ? $t : Ct, It = vt, Lt = {}, Rt = vt, Ut = "data-spm", Dt = "data-spm-protocol", zt = "data-spm-src", Yt = "data-spm-click", Ht = "data-auto-spmd", Kt = "data-spm-max-idx", Qt = "data-auto-spmd-max-idx", Vt = "", Jt = "data-spm-wangpu-module-id", Wt = "data-spm-anchor-id";
    s(bt, ["xiaobai.com", "admin.taobao.org"]) || (_(function () {
        kt = ht
    }), T(), F(), X(), et(), Nt ? k(dt, "tap", nt) : (k(dt, "mousedown", nt), k(dt, "keydown", nt)), pt.g_SPM = {
        resetModule: V,
        anchorBeacon: Q,
        getParam: W,
        spm: q
    })
}();
/*2015-10-15 23:09:56*/
!function () {
    function t(t, e, r) {
        t[j]((v ? "on" : "") + e, function (t) {
            t = t || m.event;
            var e = t.target || t.srcElement;
            r(t, e)
        }, !1)
    }

    function e() {
        return /&?\bspm=[^&#]*/.test(location.href) ? location.href.match(/&?\bspm=[^&#]*/gi)[0].split("=")[1] : ""
    }

    function r(t, e) {
        if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !e)return t;
        var r, a, i, n, o, c, p, m = "&";
        if (-1 != t.indexOf("#") && (i = t.split("#"), t = i.shift(), a = i.join("#")), n = t.split("?"), o = n.length - 1, i = n[0].split("//"), i = i[i.length - 1].split("/"), c = i.length > 1 ? i.pop() : "", o > 0 && (r = n.pop(), t = n.join("?")), r && o > 1 && -1 == r.indexOf("&") && -1 != r.indexOf("%") && (m = "%26"), t = t + "?spm=" + e + (r ? m + r : "") + (a ? "#" + a : ""), p = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
            if ({png: 1, jpg: 1, jpeg: 1, gif: 1, bmp: 1, swf: 1}.hasOwnProperty(p))return 0;
            !r && 1 >= o && (a || {htm: 1, html: 1, php: 1}.hasOwnProperty(p) || (t += "&file=" + c))
        }
        return t
    }

    function a(t) {
        function e(t) {
            return t = t.replace(/refpos[=(%3D)]\w*/gi, c).replace(n, "%3D" + a + "%26" + i.replace("=", "%3D")).replace(o, a), i.length > 0 && (t += "&" + i), t
        }

        var r = window.location.href, a = r.match(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i), i = r.match(/[&\?](pvid=[^&]*)/i), n = new RegExp("%3Dmm_\\d+_\\d+_\\d+", "ig"), o = new RegExp("mm_\\d+_\\d+_\\d+", "ig");
        i = i && i[1] ? i[1] : "";
        var c = r.match(/(refpos=(\d{0,24}_\d{0,24}_\d{0,24})?(,[a-z]+)?)(,[a-z]+)?/i);
        return c = c && c[0] ? c[0] : "", a ? (a = a[0], e(t)) : t
    }

    function i(e) {
        var r = m.KISSY;
        r ? r.ready(e) : m.jQuery ? jQuery(f).ready(e) : "complete" === f.readyState ? e() : t(m, "load", e)
    }

    function n(t, e) {
        return t && t.getAttribute ? t.getAttribute(e) || "" : ""
    }

    function o(t) {
        if (t) {
            var e, r = b.length;
            for (e = 0; r > e; e++)if (t.indexOf(b[e]) > -1)return !0;
            return !1
        }
    }

    function c(t, e) {
        if (t && /&?\bspm=[^&#]*/.test(t) && (t = t.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")), !e)return t;
        var r, a, i, n, o, c, p, m = "&";
        if (-1 != t.indexOf("#") && (i = t.split("#"), t = i.shift(), a = i.join("#")), n = t.split("?"), o = n.length - 1, i = n[0].split("//"), i = i[i.length - 1].split("/"), c = i.length > 1 ? i.pop() : "", o > 0 && (r = n.pop(), t = n.join("?")), r && o > 1 && -1 == r.indexOf("&") && -1 != r.indexOf("%") && (m = "%26"), t = t + "?spm=" + e + (r ? m + r : "") + (a ? "#" + a : ""), p = c.indexOf(".") > -1 ? c.split(".").pop().toLowerCase() : "") {
            if ({png: 1, jpg: 1, jpeg: 1, gif: 1, bmp: 1, swf: 1}.hasOwnProperty(p))return 0;
            !r && 1 >= o && (a || {htm: 1, html: 1, php: 1}.hasOwnProperty(p) || (t += "&__file=" + c))
        }
        return t
    }

    function p(t) {
        if (o(t.href)) {
            var r = n(t, g);
            if (!r) {
                if (!d)return;
                var a = d(t), i = [a.a, a.b, a.c, a.d, a.e].join(".");
                h && (i = [a.a || "0", a.b || "0", a.c || "0", a.d || "0"].join("."), i = (e() || "0.0.0.0.0") + "_" + i);
                var p = c(t.href, i);
                t.href = p, t.setAttribute(g, i)
            }
        }
        t = void 0
    }

    var m = window, f = document, s = location, l = (s.href, m._alimm_spmact_on_);
    if ("undefined" == typeof l && (l = 1), 1 == l && (l = 1), 0 == l && (l = 0), l) {
        try {
            var d = m.g_SPM.getParam
        } catch (u) {
            d = function () {
                return {a: 0, b: 0, c: 0, d: 0, e: 0}
            }
        }
        var h = !0;
        try {
            h = self.location != top.location
        } catch (u) {
        }
        var g = "data-spm-act-id", b = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"], v = !!f.attachEvent, _ = "attachEvent", w = "addEventListener", j = v ? _ : w;
        t(f, "mousedown", function (t, e) {
            for (var r, a = 0; e && (r = e.tagName) && 5 > a;) {
                if ("A" == r || "AREA" == r) {
                    p(e);
                    break
                }
                if ("BODY" == r || "HTML" == r)break;
                e = e.parentNode, a++
            }
        }), i(function () {
            for (var t, i, o = document.getElementsByTagName("iframe"), c = 0; c < o.length; c++) {
                t = n(o[c], "mmsrc"), i = n(o[c], "mmworked");
                var p = d(o[c]), m = [p.a || "0", p.b || "0", p.c || "0", p.d || "0", p.e || "0"].join(".");
                t && !i ? (h && (m = [p.a || "0", p.b || "0", p.c || "0", p.d || "0"].join("."), m = e() + "_" + m), o[c].src = r(a(t), m), o[c].setAttribute("mmworked", "mmworked")) : o[c].setAttribute(g, m)
            }
        })
    }
}();