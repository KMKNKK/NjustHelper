! function (t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define &&
        define.amd ? define(n) : t.dayjs = n()
}(this, function () {
    "use strict";
    var t = "millisecond",
        n = "second",
        e = "minute",
        r = "hour",
        i = "day",
        s = "week",
        u = "month",
        a = "year",
        o = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
        h = /\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        f = function (t, n, e) {
            var r = String(t);
            return !r || r.length >= n ? t : "" + Array(n + 1 - r.length).join(e) + t
        },
        c = {
            padStart: f,
            padZoneStr: function (t) {
                var n = Math.abs(t),
                    e = Math.floor(n / 60),
                    r = n % 60;
                return (t <= 0 ? "+" : "-") + f(e, 2, "0") + ":" + f(r, 2, "0")
            },
            monthDiff: function (t, n) {
                var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
                    r = t.clone().add(e, "months"),
                    i = n - r < 0,
                    s = t.clone().add(e + (i ? -1 : 1), "months");
                return Number(-(e + (n - r) / (i ? r - s : s - r)) || 0)
            },
            absFloor: function (t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
            },
            prettyUnit: function (o) {
                return {
                    M: u,
                    y: a,
                    w: s,
                    d: i,
                    h: r,
                    m: e,
                    s: n,
                    ms: t
                }[o] || String(o || "").toLowerCase().replace(/s$/, "")
            },
            isUndefined: function (t) {
                return void 0 === t
            }
        },
        d = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_")
        },
        $ = "en",
        l = {};
    l[$] = d;
    var m = function (t) {
        return t instanceof D
    },
        y = function (t, n, e) {
            var r;
            if (!t) return null;
            if ("string" == typeof t) l[t] && (r = t), n && (l[t] = n, r = t);
            else {
                var i = t.name;
                l[i] = t, r = i
            }
            return e || ($ = r), r
        },
        M = function (t, n) {
            if (m(t)) return t.clone();
            var e = n ? "string" == typeof n ? {
                format: n
            } : n : {};
            return e.date = t, new D(e)
        },
        S = function (t, n) {
            return M(t, {
                locale: n.$L
            })
        },
        p = c;
    p.parseLocale = y, p.isDayjs = m, p.wrapper = S;
    var D = function () {
        function f(t) {
            this.parse(t)
        }
        var c = f.prototype;
        return c.parse = function (t) {
            var n, e;
            this.$d = null === (n = t.date) ? new Date(NaN) : p.isUndefined(n) ? new Date : n instanceof Date ?
                n : "string" == typeof n && /.*[^Z]$/i.test(n) && (e = n.match(o)) ? new Date(e[1], e[2] -
                    1, e[3] || 1, e[4] || 0, e[5] || 0, e[6] || 0, e[7] || 0) : new Date(n), this.init(t)
        }, c.init = function (t) {
            var n = this.$d;
            this.$y = n.getFullYear(), this.$M = n.getMonth(), this.$D = n.getDate(), this.$W = n.getDay(),
                this.$H = n.getHours(), this.$m = n.getMinutes(), this.$s = n.getSeconds(), this.$ms = n.getMilliseconds(),
                this.$L = this.$L || y(t.locale, null, !0) || $
        }, c.$utils = function () {
            return p
        }, c.isValid = function () {
            return !("Invalid Date" === this.$d.toString())
        }, c.isSame = function (t, n) {
            var e = M(t);
            return this.startOf(n) <= e && e <= this.endOf(n)
        }, c.isAfter = function (t, n) {
            return M(t) < this.startOf(n)
        }, c.isBefore = function (t, n) {
            return this.endOf(n) < M(t)
        }, c.year = function () {
            return this.$y
        }, c.month = function () {
            return this.$M
        }, c.day = function () {
            return this.$W
        }, c.date = function () {
            return this.$D
        }, c.hour = function () {
            return this.$H
        }, c.minute = function () {
            return this.$m
        }, c.second = function () {
            return this.$s
        }, c.millisecond = function () {
            return this.$ms
        }, c.unix = function () {
            return Math.floor(this.valueOf() / 1e3)
        }, c.valueOf = function () {
            return this.$d.getTime()
        }, c.startOf = function (t, o) {
            var h = this,
                f = !!p.isUndefined(o) || o,
                c = p.prettyUnit(t),
                d = function (t, n) {
                    var e = S(new Date(h.$y, n, t), h);
                    return f ? e : e.endOf(i)
                },
                $ = function (t, n) {
                    return S(h.toDate()[t].apply(h.toDate(), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)),
                        h)
                },
                l = this.$W,
                m = this.$M,
                y = this.$D;
            switch (c) {
                case a:
                    return f ? d(1, 0) : d(31, 11);
                case u:
                    return f ? d(1, m) : d(0, m + 1);
                case s:
                    var M = this.$locale().weekStart || 0,
                        D = (l < M ? l + 7 : l) - M;
                    return d(f ? y - D : y + (6 - D), m);
                case i:
                case "date":
                    return $("setHours", 0);
                case r:
                    return $("setMinutes", 1);
                case e:
                    return $("setSeconds", 2);
                case n:
                    return $("setMilliseconds", 3);
                default:
                    return this.clone()
            }
        }, c.endOf = function (t) {
            return this.startOf(t, !1)
        }, c.$set = function (s, o) {
            var h, f = p.prettyUnit(s),
                c = (h = {}, h[i] = "setDate", h.date = "setDate", h[u] = "setMonth", h[a] = "setFullYear",
                    h[r] = "setHours", h[e] = "setMinutes", h[n] = "setSeconds", h[t] = "setMilliseconds",
                    h)[f],
                d = f === i ? this.$D + (o - this.$W) : o;
            return this.$d[c] && this.$d[c](d), this.init(), this
        }, c.set = function (t, n) {
            return this.clone().$set(t, n)
        }, c.add = function (t, o) {
            var h, f = this;
            t = Number(t);
            var c = p.prettyUnit(o),
                d = function (n, e) {
                    var r = f.set("date", 1).set(n, e + t);
                    return r.set("date", Math.min(f.$D, r.daysInMonth()))
                },
                $ = function (n) {
                    var e = new Date(f.$d);
                    return e.setDate(e.getDate() + n * t), S(e, f)
                };
            if (c === u) return d(u, this.$M);
            if (c === a) return d(a, this.$y);
            if (c === i) return $(1);
            if (c === s) return $(7);
            var l = (h = {}, h[e] = 6e4, h[r] = 36e5, h[n] = 1e3, h)[c] || 1,
                m = this.valueOf() + t * l;
            return S(m, this)
        }, c.subtract = function (t, n) {
            return this.add(-1 * t, n)
        }, c.format = function (t) {
            var n = this;
            if (!this.isValid()) return "Invalid Date";
            var e = t || "YYYY-MM-DDTHH:mm:ssZ",
                r = p.padZoneStr(this.$d.getTimezoneOffset()),
                i = this.$locale(),
                s = i.weekdays,
                u = i.months,
                a = function (t, n, e, r) {
                    return t && t[n] || e[n].substr(0, r)
                },
                o = function (t) {
                    return 0 === n.$H ? 12 : p.padStart(n.$H < 13 ? n.$H : n.$H - 12, "hh" === t ? 2 : 1,
                        "0")
                },
                f = {
                    YY: String(this.$y).slice(-2),
                    YYYY: String(this.$y),
                    M: String(this.$M + 1),
                    MM: p.padStart(this.$M + 1, 2, "0"),
                    MMM: a(i.monthsShort, this.$M, u, 3),
                    MMMM: u[this.$M],
                    D: String(this.$D),
                    DD: p.padStart(this.$D, 2, "0"),
                    d: String(this.$W),
                    dd: a(i.weekdaysMin, this.$W, s, 2),
                    ddd: a(i.weekdaysShort, this.$W, s, 3),
                    dddd: s[this.$W],
                    H: String(this.$H),
                    HH: p.padStart(this.$H, 2, "0"),
                    h: o("h"),
                    hh: o("hh"),
                    a: this.$H < 12 ? "am" : "pm",
                    A: this.$H < 12 ? "AM" : "PM",
                    m: String(this.$m),
                    mm: p.padStart(this.$m, 2, "0"),
                    s: String(this.$s),
                    ss: p.padStart(this.$s, 2, "0"),
                    SSS: p.padStart(this.$ms, 3, "0"),
                    Z: r
                };
            return e.replace(h, function (t) {
                return t.indexOf("[") > -1 ? t.replace(/\[|\]/g, "") : f[t] || r.replace(":", "")
            })
        }, c.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }, c.diff = function (t, o, h) {
            var f, c = p.prettyUnit(o),
                d = M(t),
                $ = 6e4 * (d.utcOffset() - this.utcOffset()),
                l = this - d,
                m = p.monthDiff(this, d);
            return m = (f = {}, f[a] = m / 12, f[u] = m, f.quarter = m / 3, f[s] = (l - $) / 6048e5, f[i] =
                (l - $) / 864e5, f[r] = l / 36e5, f[e] = l / 6e4, f[n] = l / 1e3, f)[c] || l, h ? m : p
                    .absFloor(m)
        }, c.daysInMonth = function () {
            return this.endOf(u).$D
        }, c.$locale = function () {
            return l[this.$L]
        }, c.locale = function (t, n) {
            var e = this.clone();
            return e.$L = y(t, n, !0), e
        }, c.clone = function () {
            return S(this.toDate(), this)
        }, c.toDate = function () {
            return new Date(this.$d)
        }, c.toArray = function () {
            return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms]
        }, c.toJSON = function () {
            return this.toISOString()
        }, c.toISOString = function () {
            return this.$d.toISOString()
        }, c.toObject = function () {
            return {
                years: this.$y,
                months: this.$M,
                date: this.$D,
                hours: this.$H,
                minutes: this.$m,
                seconds: this.$s,
                milliseconds: this.$ms
            }
        }, c.toString = function () {
            return this.$d.toUTCString()
        }, f
    }();
    return M.prototype = D.prototype, M.extend = function (t, n) {
        return t(n, D, M), M
    }, M.locale = y, M.isDayjs = m, M.unix = function (t) {
        return M(1e3 * t)
    }, M.en = l[$], M
});