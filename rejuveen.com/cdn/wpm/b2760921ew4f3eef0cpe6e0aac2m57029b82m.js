(() => {
  var e = {
      11: (e, t, n) => {
        "use strict";
        var r = n(9058),
          o = String,
          i = TypeError;
        e.exports = function (e) {
          if (r(e)) return e;
          throw new i("Can't set " + o(e) + " as a prototype");
        };
      },
      74: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(5201),
          i = TypeError,
          s = Object.getOwnPropertyDescriptor,
          a =
            r &&
            !(function () {
              if (void 0 !== this) return !0;
              try {
                Object.defineProperty([], "length", {
                  writable: !1,
                }).length = 1;
              } catch (e) {
                return e instanceof TypeError;
              }
            })();
        e.exports = a
          ? function (e, t) {
              if (o(e) && !s(e, "length").writable)
                throw new i("Cannot set read only .length");
              return (e.length = t);
            }
          : function (e, t) {
              return (e.length = t);
            };
      },
      78: (e, t, n) => {
        "use strict";
        var r = n(1834);
        e.exports = function (e, t, n) {
          for (
            var o, i, s = n ? e : e.iterator, a = e.next;
            !(o = r(a, s)).done;

          )
            if (void 0 !== (i = t(o.value))) return i;
        };
      },
      164: (e, t, n) => {
        "use strict";
        var r = n(9544),
          o = n(8078),
          i = r("iterator"),
          s = Array.prototype;
        e.exports = function (e) {
          return void 0 !== e && (o.Array === e || s[i] === e);
        };
      },
      352: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(6895),
          i = n(960),
          s = n(7636),
          a = n(3649),
          c = n(3842),
          u = a(function () {
            var e = this.iterator,
              t = i(r(this.next, e));
            if (!(this.done = !!t.done))
              return c(e, this.mapper, [t.value, this.counter++], !0);
          });
        e.exports = function (e) {
          return i(this), o(e), new u(s(this), { mapper: e });
        };
      },
      380: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(1536),
          i = n(2661),
          s = n(960),
          a = n(3094),
          c = TypeError,
          u = Object.defineProperty,
          l = Object.getOwnPropertyDescriptor,
          d = "enumerable",
          p = "configurable",
          f = "writable";
        t.f = r
          ? i
            ? function (e, t, n) {
                if (
                  (s(e),
                  (t = a(t)),
                  s(n),
                  "function" == typeof e &&
                    "prototype" === t &&
                    "value" in n &&
                    f in n &&
                    !n[f])
                ) {
                  var r = l(e, t);
                  r &&
                    r[f] &&
                    ((e[t] = n.value),
                    (n = {
                      configurable: p in n ? n[p] : r[p],
                      enumerable: d in n ? n[d] : r[d],
                      writable: !1,
                    }));
                }
                return u(e, t, n);
              }
            : u
          : function (e, t, n) {
              if ((s(e), (t = a(t)), s(n), o))
                try {
                  return u(e, t, n);
                } catch (r) {}
              if ("get" in n || "set" in n)
                throw new c("Accessors not supported");
              return "value" in n && (e[t] = n.value), e;
            };
      },
      459: (e, t, n) => {
        "use strict";
        var r = n(3013),
          o = n(8280).concat("length", "prototype");
        t.f =
          Object.getOwnPropertyNames ||
          function (e) {
            return r(e, o);
          };
      },
      482: (e) => {
        "use strict";
        e.exports = {};
      },
      543: (e, t, n) => {
        "use strict";
        var r = n(1105);
        e.exports = function (e) {
          return r(e.length);
        };
      },
      621: (e, t, n) => {
        "use strict";
        var r = n(4202);
        e.exports = function (e) {
          return "object" == typeof e ? null !== e : r(e);
        };
      },
      654: (e, t, n) => {
        "use strict";
        var r = n(8482),
          o = n(6591);
        e.exports = function (e) {
          return r(o(e));
        };
      },
      663: (e, t, n) => {
        "use strict";
        n(6202);
      },
      679: (e, t, n) => {
        "use strict";
        var r = n(4202),
          o = n(380),
          i = n(4952),
          s = n(4980);
        e.exports = function (e, t, n, a) {
          a || (a = {});
          var c = a.enumerable,
            u = void 0 !== a.name ? a.name : t;
          if ((r(n) && i(n, u, a), a.global)) c ? (e[t] = n) : s(t, n);
          else {
            try {
              a.unsafe ? e[t] && (c = !0) : delete e[t];
            } catch (l) {}
            c
              ? (e[t] = n)
              : o.f(e, t, {
                  value: n,
                  enumerable: !1,
                  configurable: !a.nonConfigurable,
                  writable: !a.nonWritable,
                });
          }
          return e;
        };
      },
      728: (e, t, n) => {
        "use strict";
        var r = n(6947);
        e.exports = r({}.isPrototypeOf);
      },
      764: (e, t, n) => {
        "use strict";
        var r = n(1311),
          o = n(4202),
          i = n(7759),
          s = n(9544)("toStringTag"),
          a = Object,
          c =
            "Arguments" ===
            i(
              (function () {
                return arguments;
              })()
            );
        e.exports = r
          ? i
          : function (e) {
              var t, n, r;
              return void 0 === e
                ? "Undefined"
                : null === e
                ? "Null"
                : "string" ==
                  typeof (n = (function (e, t) {
                    try {
                      return e[t];
                    } catch (n) {}
                  })((t = a(e)), s))
                ? n
                : c
                ? i(t)
                : "Object" === (r = i(t)) && o(t.callee)
                ? "Arguments"
                : r;
            };
      },
      960: (e, t, n) => {
        "use strict";
        var r = n(621),
          o = String,
          i = TypeError;
        e.exports = function (e) {
          if (r(e)) return e;
          throw new i(o(e) + " is not an object");
        };
      },
      1105: (e, t, n) => {
        "use strict";
        var r = n(1578),
          o = Math.min;
        e.exports = function (e) {
          var t = r(e);
          return t > 0 ? o(t, 9007199254740991) : 0;
        };
      },
      1249: (e, t, n) => {
        "use strict";
        var r = n(5833),
          o = n(9634),
          i = r.Set,
          s = r.add;
        e.exports = function (e) {
          var t = new i();
          return (
            o(e, function (e) {
              s(t, e);
            }),
            t
          );
        };
      },
      1256: (e, t, n) => {
        "use strict";
        n(5873);
      },
      1311: (e, t, n) => {
        "use strict";
        var r = {};
        (r[n(9544)("toStringTag")] = "z"),
          (e.exports = "[object z]" === String(r));
      },
      1381: (e, t, n) => {
        "use strict";
        var r = n(4862),
          o = function (e) {
            return {
              size: e,
              has: function () {
                return !1;
              },
              keys: function () {
                return {
                  next: function () {
                    return { done: !0 };
                  },
                };
              },
            };
          };
        e.exports = function (e) {
          var t = r("Set");
          try {
            new t()[e](o(0));
            try {
              return new t()[e](o(-1)), !1;
            } catch (n) {
              return !0;
            }
          } catch (i) {
            return !1;
          }
        };
      },
      1399: (e, t, n) => {
        "use strict";
        var r = n(4492);
        e.exports = !r(function () {
          return (
            7 !==
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1]
          );
        });
      },
      1536: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(4492),
          i = n(3552);
        e.exports =
          !r &&
          !o(function () {
            return (
              7 !==
              Object.defineProperty(i("div"), "a", {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      1548: (e, t, n) => {
        "use strict";
        var r = n(728),
          o = TypeError;
        e.exports = function (e, t) {
          if (r(t, e)) return e;
          throw new o("Incorrect invocation");
        };
      },
      1554: function (e, t, n) {
        var r;
        !(function (o, i) {
          "use strict";
          var s = "function",
            a = "undefined",
            c = "object",
            u = "string",
            l = "major",
            d = "model",
            p = "name",
            f = "type",
            m = "vendor",
            h = "version",
            v = "architecture",
            g = "console",
            b = "mobile",
            y = "tablet",
            w = "smarttv",
            x = "wearable",
            _ = "embedded",
            E = "Amazon",
            S = "Apple",
            k = "ASUS",
            A = "BlackBerry",
            C = "Browser",
            I = "Chrome",
            P = "Firefox",
            O = "Google",
            T = "Huawei",
            R = "LG",
            N = "Microsoft",
            j = "Motorola",
            $ = "Opera",
            D = "Samsung",
            M = "Sharp",
            U = "Sony",
            L = "Xiaomi",
            z = "Zebra",
            B = "Facebook",
            H = "Chromium OS",
            W = "Mac OS",
            q = function (e) {
              for (var t = {}, n = 0; n < e.length; n++)
                t[e[n].toUpperCase()] = e[n];
              return t;
            },
            V = function (e, t) {
              return typeof e === u && -1 !== F(t).indexOf(F(e));
            },
            F = function (e) {
              return e.toLowerCase();
            },
            X = function (e, t) {
              if (typeof e === u)
                return (
                  (e = e.replace(/^\s\s*/, "")),
                  typeof t === a ? e : e.substring(0, 500)
                );
            },
            J = function (e, t) {
              for (var n, r, o, a, u, l, d = 0; d < t.length && !u; ) {
                var p = t[d],
                  f = t[d + 1];
                for (n = r = 0; n < p.length && !u && p[n]; )
                  if ((u = p[n++].exec(e)))
                    for (o = 0; o < f.length; o++)
                      (l = u[++r]),
                        typeof (a = f[o]) === c && a.length > 0
                          ? 2 === a.length
                            ? typeof a[1] == s
                              ? (this[a[0]] = a[1].call(this, l))
                              : (this[a[0]] = a[1])
                            : 3 === a.length
                            ? typeof a[1] !== s || (a[1].exec && a[1].test)
                              ? (this[a[0]] = l ? l.replace(a[1], a[2]) : i)
                              : (this[a[0]] = l ? a[1].call(this, l, a[2]) : i)
                            : 4 === a.length &&
                              (this[a[0]] = l
                                ? a[3].call(this, l.replace(a[1], a[2]))
                                : i)
                          : (this[a] = l || i);
                d += 2;
              }
            },
            K = function (e, t) {
              for (var n in t)
                if (typeof t[n] === c && t[n].length > 0) {
                  for (var r = 0; r < t[n].length; r++)
                    if (V(t[n][r], e)) return "?" === n ? i : n;
                } else if (V(t[n], e)) return "?" === n ? i : n;
              return e;
            },
            Y = {
              ME: "4.90",
              "NT 3.11": "NT3.51",
              "NT 4.0": "NT4.0",
              2e3: "NT 5.0",
              XP: ["NT 5.1", "NT 5.2"],
              Vista: "NT 6.0",
              7: "NT 6.1",
              8: "NT 6.2",
              8.1: "NT 6.3",
              10: ["NT 6.4", "NT 10.0"],
              RT: "ARM",
            },
            G = {
              browser: [
                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                [h, [p, "Chrome"]],
                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                [h, [p, "Edge"]],
                [
                  /(opera mini)\/([-\w\.]+)/i,
                  /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                  /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                ],
                [p, h],
                [/opios[\/ ]+([\w\.]+)/i],
                [h, [p, $ + " Mini"]],
                [/\bopr\/([\w\.]+)/i],
                [h, [p, $]],
                [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
                [h, [p, "Baidu"]],
                [
                  /(kindle)\/([\w\.]+)/i,
                  /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                  /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
                  /(?:ms|\()(ie) ([\w\.]+)/i,
                  /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                  /(heytap|ovi)browser\/([\d\.]+)/i,
                  /(weibo)__([\d\.]+)/i,
                ],
                [p, h],
                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                [h, [p, "UC" + C]],
                [
                  /microm.+\bqbcore\/([\w\.]+)/i,
                  /\bqbcore\/([\w\.]+).+microm/i,
                  /micromessenger\/([\w\.]+)/i,
                ],
                [h, [p, "WeChat"]],
                [/konqueror\/([\w\.]+)/i],
                [h, [p, "Konqueror"]],
                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                [h, [p, "IE"]],
                [/ya(?:search)?browser\/([\w\.]+)/i],
                [h, [p, "Yandex"]],
                [/slbrowser\/([\w\.]+)/i],
                [h, [p, "Smart Lenovo " + C]],
                [/(avast|avg)\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 Secure " + C], h],
                [/\bfocus\/([\w\.]+)/i],
                [h, [p, P + " Focus"]],
                [/\bopt\/([\w\.]+)/i],
                [h, [p, $ + " Touch"]],
                [/coc_coc\w+\/([\w\.]+)/i],
                [h, [p, "Coc Coc"]],
                [/dolfin\/([\w\.]+)/i],
                [h, [p, "Dolphin"]],
                [/coast\/([\w\.]+)/i],
                [h, [p, $ + " Coast"]],
                [/miuibrowser\/([\w\.]+)/i],
                [h, [p, "MIUI " + C]],
                [/fxios\/([-\w\.]+)/i],
                [h, [p, P]],
                [/\bqihu|(qi?ho?o?|360)browser/i],
                [[p, "360 " + C]],
                [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],
                [[p, /(.+)/, "$1 " + C], h],
                [/samsungbrowser\/([\w\.]+)/i],
                [h, [p, D + " Internet"]],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [[p, /_/g, " "], h],
                [/metasr[\/ ]?([\d\.]+)/i],
                [h, [p, "Sogou Explorer"]],
                [/(sogou)mo\w+\/([\d\.]+)/i],
                [[p, "Sogou Mobile"], h],
                [
                  /(electron)\/([\w\.]+) safari/i,
                  /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                  /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i,
                ],
                [p, h],
                [/(lbbrowser)/i, /\[(linkedin)app\]/i],
                [p],
                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                [[p, B], h],
                [
                  /(Klarna)\/([\w\.]+)/i,
                  /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                  /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                  /safari (line)\/([\w\.]+)/i,
                  /\b(line)\/([\w\.]+)\/iab/i,
                  /(alipay)client\/([\w\.]+)/i,
                  /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i,
                ],
                [p, h],
                [/\bgsa\/([\w\.]+) .*safari\//i],
                [h, [p, "GSA"]],
                [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                [h, [p, "TikTok"]],
                [/headlesschrome(?:\/([\w\.]+)| )/i],
                [h, [p, I + " Headless"]],
                [/ wv\).+(chrome)\/([\w\.]+)/i],
                [[p, I + " WebView"], h],
                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                [h, [p, "Android " + C]],
                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                [p, h],
                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                [h, [p, "Mobile Safari"]],
                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                [h, p],
                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                [
                  p,
                  [
                    h,
                    K,
                    {
                      "1.0": "/8",
                      1.2: "/1",
                      1.3: "/3",
                      "2.0": "/412",
                      "2.0.2": "/416",
                      "2.0.3": "/417",
                      "2.0.4": "/419",
                      "?": "/",
                    },
                  ],
                ],
                [/(webkit|khtml)\/([\w\.]+)/i],
                [p, h],
                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                [[p, "Netscape"], h],
                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                [h, [p, P + " Reality"]],
                [
                  /ekiohf.+(flow)\/([\w\.]+)/i,
                  /(swiftfox)/i,
                  /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                  /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                  /(firefox)\/([\w\.]+)/i,
                  /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                  /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                  /(links) \(([\w\.]+)/i,
                  /panasonic;(viera)/i,
                ],
                [p, h],
                [/(cobalt)\/([\w\.]+)/i],
                [p, [h, /master.|lts./, ""]],
              ],
              cpu: [
                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                [[v, "amd64"]],
                [/(ia32(?=;))/i],
                [[v, F]],
                [/((?:i[346]|x)86)[;\)]/i],
                [[v, "ia32"]],
                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                [[v, "arm64"]],
                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                [[v, "armhf"]],
                [/windows (ce|mobile); ppc;/i],
                [[v, "arm"]],
                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                [[v, /ower/, "", F]],
                [/(sun4\w)[;\)]/i],
                [[v, "sparc"]],
                [
                  /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                ],
                [[v, F]],
              ],
              device: [
                [
                  /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                ],
                [d, [m, D], [f, y]],
                [
                  /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                  /samsung[- ]([-\w]+)/i,
                  /sec-(sgh\w+)/i,
                ],
                [d, [m, D], [f, b]],
                [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                [d, [m, S], [f, b]],
                [
                  /\((ipad);[-\w\),; ]+apple/i,
                  /applecoremedia\/[\w\.]+ \((ipad)/i,
                  /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                ],
                [d, [m, S], [f, y]],
                [/(macintosh);/i],
                [d, [m, S]],
                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                [d, [m, M], [f, b]],
                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                [d, [m, T], [f, y]],
                [
                  /(?:huawei|honor)([-\w ]+)[;\)]/i,
                  /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                ],
                [d, [m, T], [f, b]],
                [
                  /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                  /\b; (\w+) build\/hm\1/i,
                  /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                  /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                  /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
                  /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, L],
                  [f, b],
                ],
                [
                  /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
                  /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, L],
                  [f, y],
                ],
                [
                  /; (\w+) bui.+ oppo/i,
                  /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                ],
                [d, [m, "OPPO"], [f, b]],
                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                [d, [m, "Vivo"], [f, b]],
                [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
                [d, [m, "Realme"], [f, b]],
                [
                  /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                  /\bmot(?:orola)?[- ](\w*)/i,
                  /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                ],
                [d, [m, j], [f, b]],
                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                [d, [m, j], [f, y]],
                [
                  /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                ],
                [d, [m, R], [f, y]],
                [
                  /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                  /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                  /\blg-?([\d\w]+) bui/i,
                ],
                [d, [m, R], [f, b]],
                [
                  /(ideatab[-\w ]+)/i,
                  /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                ],
                [d, [m, "Lenovo"], [f, y]],
                [
                  /(?:maemo|nokia).*(n900|lumia \d+)/i,
                  /nokia[-_ ]?([-\w\.]*)/i,
                ],
                [
                  [d, /_/g, " "],
                  [m, "Nokia"],
                  [f, b],
                ],
                [/(pixel c)\b/i],
                [d, [m, O], [f, y]],
                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                [d, [m, O], [f, b]],
                [
                  /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                ],
                [d, [m, U], [f, b]],
                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                [
                  [d, "Xperia Tablet"],
                  [m, U],
                  [f, y],
                ],
                [
                  / (kb2005|in20[12]5|be20[12][59])\b/i,
                  /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                ],
                [d, [m, "OnePlus"], [f, b]],
                [
                  /(alexa)webm/i,
                  /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                  /(kf[a-z]+)( bui|\)).+silk\//i,
                ],
                [d, [m, E], [f, y]],
                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                [
                  [d, /(.+)/g, "Fire Phone $1"],
                  [m, E],
                  [f, b],
                ],
                [/(playbook);[-\w\),; ]+(rim)/i],
                [d, m, [f, y]],
                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                [d, [m, A], [f, b]],
                [
                  /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                ],
                [d, [m, k], [f, y]],
                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                [d, [m, k], [f, b]],
                [/(nexus 9)/i],
                [d, [m, "HTC"], [f, y]],
                [
                  /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                  /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                  /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                ],
                [m, [d, /_/g, " "], [f, b]],
                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                [d, [m, "Acer"], [f, y]],
                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                [d, [m, "Meizu"], [f, b]],
                [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
                [d, [m, "Ulefone"], [f, b]],
                [
                  /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                  /(hp) ([\w ]+\w)/i,
                  /(asus)-?(\w+)/i,
                  /(microsoft); (lumia[\w ]+)/i,
                  /(lenovo)[-_ ]?([-\w]+)/i,
                  /(jolla)/i,
                  /(oppo) ?([\w ]+) bui/i,
                ],
                [m, d, [f, b]],
                [
                  /(kobo)\s(ereader|touch)/i,
                  /(archos) (gamepad2?)/i,
                  /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                  /(kindle)\/([\w\.]+)/i,
                  /(nook)[\w ]+build\/(\w+)/i,
                  /(dell) (strea[kpr\d ]*[\dko])/i,
                  /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                  /(trinity)[- ]*(t\d{3}) bui/i,
                  /(gigaset)[- ]+(q\w{1,9}) bui/i,
                  /(vodafone) ([\w ]+)(?:\)| bui)/i,
                ],
                [m, d, [f, y]],
                [/(surface duo)/i],
                [d, [m, N], [f, y]],
                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                [d, [m, "Fairphone"], [f, b]],
                [/(u304aa)/i],
                [d, [m, "AT&T"], [f, b]],
                [/\bsie-(\w*)/i],
                [d, [m, "Siemens"], [f, b]],
                [/\b(rct\w+) b/i],
                [d, [m, "RCA"], [f, y]],
                [/\b(venue[\d ]{2,7}) b/i],
                [d, [m, "Dell"], [f, y]],
                [/\b(q(?:mv|ta)\w+) b/i],
                [d, [m, "Verizon"], [f, y]],
                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                [d, [m, "Barnes & Noble"], [f, y]],
                [/\b(tm\d{3}\w+) b/i],
                [d, [m, "NuVision"], [f, y]],
                [/\b(k88) b/i],
                [d, [m, "ZTE"], [f, y]],
                [/\b(nx\d{3}j) b/i],
                [d, [m, "ZTE"], [f, b]],
                [/\b(gen\d{3}) b.+49h/i],
                [d, [m, "Swiss"], [f, b]],
                [/\b(zur\d{3}) b/i],
                [d, [m, "Swiss"], [f, y]],
                [/\b((zeki)?tb.*\b) b/i],
                [d, [m, "Zeki"], [f, y]],
                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                [[m, "Dragon Touch"], d, [f, y]],
                [/\b(ns-?\w{0,9}) b/i],
                [d, [m, "Insignia"], [f, y]],
                [/\b((nxa|next)-?\w{0,9}) b/i],
                [d, [m, "NextBook"], [f, y]],
                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                [[m, "Voice"], d, [f, b]],
                [/\b(lvtel\-)?(v1[12]) b/i],
                [[m, "LvTel"], d, [f, b]],
                [/\b(ph-1) /i],
                [d, [m, "Essential"], [f, b]],
                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                [d, [m, "Envizen"], [f, y]],
                [/\b(trio[-\w\. ]+) b/i],
                [d, [m, "MachSpeed"], [f, y]],
                [/\btu_(1491) b/i],
                [d, [m, "Rotor"], [f, y]],
                [/(shield[\w ]+) b/i],
                [d, [m, "Nvidia"], [f, y]],
                [/(sprint) (\w+)/i],
                [m, d, [f, b]],
                [/(kin\.[onetw]{3})/i],
                [
                  [d, /\./g, " "],
                  [m, N],
                  [f, b],
                ],
                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                [d, [m, z], [f, y]],
                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                [d, [m, z], [f, b]],
                [/smart-tv.+(samsung)/i],
                [m, [f, w]],
                [/hbbtv.+maple;(\d+)/i],
                [
                  [d, /^/, "SmartTV"],
                  [m, D],
                  [f, w],
                ],
                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                [
                  [m, R],
                  [f, w],
                ],
                [/(apple) ?tv/i],
                [m, [d, S + " TV"], [f, w]],
                [/crkey/i],
                [
                  [d, I + "cast"],
                  [m, O],
                  [f, w],
                ],
                [/droid.+aft(\w+)( bui|\))/i],
                [d, [m, E], [f, w]],
                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                [d, [m, M], [f, w]],
                [/(bravia[\w ]+)( bui|\))/i],
                [d, [m, U], [f, w]],
                [/(mitv-\w{5}) bui/i],
                [d, [m, L], [f, w]],
                [/Hbbtv.*(technisat) (.*);/i],
                [m, d, [f, w]],
                [
                  /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                  /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                ],
                [
                  [m, X],
                  [d, X],
                  [f, w],
                ],
                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                [[f, w]],
                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                [m, d, [f, g]],
                [/droid.+; (shield) bui/i],
                [d, [m, "Nvidia"], [f, g]],
                [/(playstation [345portablevi]+)/i],
                [d, [m, U], [f, g]],
                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                [d, [m, N], [f, g]],
                [/((pebble))app/i],
                [m, d, [f, x]],
                [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                [d, [m, S], [f, x]],
                [/droid.+; (glass) \d/i],
                [d, [m, O], [f, x]],
                [/droid.+; (wt63?0{2,3})\)/i],
                [d, [m, z], [f, x]],
                [/(quest( 2| pro)?)/i],
                [d, [m, B], [f, x]],
                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                [m, [f, _]],
                [/(aeobc)\b/i],
                [d, [m, E], [f, _]],
                [
                  /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i,
                ],
                [d, [f, b]],
                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                [d, [f, y]],
                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                [[f, y]],
                [
                  /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                ],
                [[f, b]],
                [/(android[-\w\. ]{0,9});.+buil/i],
                [d, [m, "Generic"]],
              ],
              engine: [
                [/windows.+ edge\/([\w\.]+)/i],
                [h, [p, "EdgeHTML"]],
                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                [h, [p, "Blink"]],
                [
                  /(presto)\/([\w\.]+)/i,
                  /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                  /ekioh(flow)\/([\w\.]+)/i,
                  /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                  /(icab)[\/ ]([23]\.[\d\.]+)/i,
                  /\b(libweb)/i,
                ],
                [p, h],
                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                [h, p],
              ],
              os: [
                [/microsoft (windows) (vista|xp)/i],
                [p, h],
                [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],
                [p, [h, K, Y]],
                [
                  /windows nt 6\.2; (arm)/i,
                  /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                  /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i,
                ],
                [
                  [h, K, Y],
                  [p, "Windows"],
                ],
                [
                  /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                  /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                  /cfnetwork\/.+darwin/i,
                ],
                [
                  [h, /_/g, "."],
                  [p, "iOS"],
                ],
                [
                  /(mac os x) ?([\w\. ]*)/i,
                  /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                ],
                [
                  [p, W],
                  [h, /_/g, "."],
                ],
                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                [h, p],
                [
                  /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                  /(blackberry)\w*\/([\w\.]*)/i,
                  /(tizen|kaios)[\/ ]([\w\.]+)/i,
                  /\((series40);/i,
                ],
                [p, h],
                [/\(bb(10);/i],
                [h, [p, A]],
                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                [h, [p, "Symbian"]],
                [
                  /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                ],
                [h, [p, P + " OS"]],
                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                [h, [p, "webOS"]],
                [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                [h, [p, "watchOS"]],
                [/crkey\/([\d\.]+)/i],
                [h, [p, I + "cast"]],
                [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                [[p, H], h],
                [
                  /panasonic;(viera)/i,
                  /(netrange)mmh/i,
                  /(nettv)\/(\d+\.[\w\.]+)/i,
                  /(nintendo|playstation) ([wids345portablevuch]+)/i,
                  /(xbox); +xbox ([^\);]+)/i,
                  /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                  /(mint)[\/\(\) ]?(\w*)/i,
                  /(mageia|vectorlinux)[; ]/i,
                  /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                  /(hurd|linux) ?([\w\.]*)/i,
                  /(gnu) ?([\w\.]*)/i,
                  /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                  /(haiku) (\w+)/i,
                ],
                [p, h],
                [/(sunos) ?([\w\.\d]*)/i],
                [[p, "Solaris"], h],
                [
                  /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                  /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                  /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                  /(unix) ?([\w\.]*)/i,
                ],
                [p, h],
              ],
            },
            Z = function (e, t) {
              if ((typeof e === c && ((t = e), (e = i)), !(this instanceof Z)))
                return new Z(e, t).getResult();
              var n = typeof o !== a && o.navigator ? o.navigator : i,
                r = e || (n && n.userAgent ? n.userAgent : ""),
                g = n && n.userAgentData ? n.userAgentData : i,
                w = t
                  ? (function (e, t) {
                      var n = {};
                      for (var r in e)
                        t[r] && t[r].length % 2 == 0
                          ? (n[r] = t[r].concat(e[r]))
                          : (n[r] = e[r]);
                      return n;
                    })(G, t)
                  : G,
                x = n && n.userAgent == r;
              return (
                (this.getBrowser = function () {
                  var e,
                    t = {};
                  return (
                    (t[p] = i),
                    (t[h] = i),
                    J.call(t, r, w.browser),
                    (t[l] =
                      typeof (e = t[h]) === u
                        ? e.replace(/[^\d\.]/g, "").split(".")[0]
                        : i),
                    x &&
                      n &&
                      n.brave &&
                      typeof n.brave.isBrave == s &&
                      (t[p] = "Brave"),
                    t
                  );
                }),
                (this.getCPU = function () {
                  var e = {};
                  return (e[v] = i), J.call(e, r, w.cpu), e;
                }),
                (this.getDevice = function () {
                  var e = {};
                  return (
                    (e[m] = i),
                    (e[d] = i),
                    (e[f] = i),
                    J.call(e, r, w.device),
                    x && !e[f] && g && g.mobile && (e[f] = b),
                    x &&
                      "Macintosh" == e[d] &&
                      n &&
                      typeof n.standalone !== a &&
                      n.maxTouchPoints &&
                      n.maxTouchPoints > 2 &&
                      ((e[d] = "iPad"), (e[f] = y)),
                    e
                  );
                }),
                (this.getEngine = function () {
                  var e = {};
                  return (e[p] = i), (e[h] = i), J.call(e, r, w.engine), e;
                }),
                (this.getOS = function () {
                  var e = {};
                  return (
                    (e[p] = i),
                    (e[h] = i),
                    J.call(e, r, w.os),
                    x &&
                      !e[p] &&
                      g &&
                      "Unknown" != g.platform &&
                      (e[p] = g.platform
                        .replace(/chrome os/i, H)
                        .replace(/macos/i, W)),
                    e
                  );
                }),
                (this.getResult = function () {
                  return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU(),
                  };
                }),
                (this.getUA = function () {
                  return r;
                }),
                (this.setUA = function (e) {
                  return (
                    (r = typeof e === u && e.length > 500 ? X(e, 500) : e), this
                  );
                }),
                this.setUA(r),
                this
              );
            };
          (Z.VERSION = "1.0.37"),
            (Z.BROWSER = q([p, h, l])),
            (Z.CPU = q([v])),
            (Z.DEVICE = q([d, m, f, g, b, w, y, x, _])),
            (Z.ENGINE = Z.OS = q([p, h])),
            typeof t !== a
              ? (e.exports && (t = e.exports = Z), (t.UAParser = Z))
              : n.amdO
              ? (r = function () {
                  return Z;
                }.call(t, n, t, e)) === i || (e.exports = r)
              : typeof o !== a && (o.UAParser = Z);
          var Q = typeof o !== a && (o.jQuery || o.Zepto);
          if (Q && !Q.ua) {
            var ee = new Z();
            (Q.ua = ee.getResult()),
              (Q.ua.get = function () {
                return ee.getUA();
              }),
              (Q.ua.set = function (e) {
                ee.setUA(e);
                var t = ee.getResult();
                for (var n in t) Q.ua[n] = t[n];
              });
          }
        })("object" == typeof window ? window : this);
      },
      1576: (e) => {
        "use strict";
        var t = TypeError;
        e.exports = function (e) {
          if (e > 9007199254740991) throw t("Maximum allowed index exceeded");
          return e;
        };
      },
      1578: (e, t, n) => {
        "use strict";
        var r = n(5912);
        e.exports = function (e) {
          var t = +e;
          return t != t || 0 === t ? 0 : r(t);
        };
      },
      1613: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(9639);
        r(
          { target: "Set", proto: !0, real: !0, forced: !n(1381)("union") },
          { union: o }
        );
      },
      1639: (e, t, n) => {
        "use strict";
        var r = n(6999),
          o = n(1834),
          i = n(960),
          s = n(2544),
          a = n(164),
          c = n(543),
          u = n(728),
          l = n(9580),
          d = n(7768),
          p = n(8042),
          f = TypeError,
          m = function (e, t) {
            (this.stopped = e), (this.result = t);
          },
          h = m.prototype;
        e.exports = function (e, t, n) {
          var v,
            g,
            b,
            y,
            w,
            x,
            _,
            E = n && n.that,
            S = !(!n || !n.AS_ENTRIES),
            k = !(!n || !n.IS_RECORD),
            A = !(!n || !n.IS_ITERATOR),
            C = !(!n || !n.INTERRUPTED),
            I = r(t, E),
            P = function (e) {
              return v && p(v, "normal", e), new m(!0, e);
            },
            O = function (e) {
              return S
                ? (i(e), C ? I(e[0], e[1], P) : I(e[0], e[1]))
                : C
                ? I(e, P)
                : I(e);
            };
          if (k) v = e.iterator;
          else if (A) v = e;
          else {
            if (!(g = d(e))) throw new f(s(e) + " is not iterable");
            if (a(g)) {
              for (b = 0, y = c(e); y > b; b++)
                if ((w = O(e[b])) && u(h, w)) return w;
              return new m(!1);
            }
            v = l(e, g);
          }
          for (x = k ? e.next : v.next; !(_ = o(x, v)).done; ) {
            try {
              w = O(_.value);
            } catch (T) {
              p(v, "throw", T);
            }
            if ("object" == typeof w && w && u(h, w)) return w;
          }
          return new m(!1);
        };
      },
      1649: (e, t, n) => {
        "use strict";
        var r = n(679),
          o = n(6947),
          i = n(8144),
          s = n(2451),
          a = URLSearchParams,
          c = a.prototype,
          u = o(c.getAll),
          l = o(c.has),
          d = new a("a=1");
        (!d.has("a", 2) && d.has("a", void 0)) ||
          r(
            c,
            "has",
            function (e) {
              var t = arguments.length,
                n = t < 2 ? void 0 : arguments[1];
              if (t && void 0 === n) return l(this, e);
              var r = u(this, e);
              s(t, 1);
              for (var o = i(n), a = 0; a < r.length; )
                if (r[a++] === o) return !0;
              return !1;
            },
            { enumerable: !0, unsafe: !0 }
          );
      },
      1700: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833).has,
          i = n(9151),
          s = n(3868),
          a = n(9634),
          c = n(78),
          u = n(8042);
        e.exports = function (e) {
          var t = r(this),
            n = s(e);
          if (i(t) <= n.size)
            return (
              !1 !==
              a(
                t,
                function (e) {
                  if (n.includes(e)) return !1;
                },
                !0
              )
            );
          var l = n.getIterator();
          return (
            !1 !==
            c(l, function (e) {
              if (o(t, e)) return u(l, "normal", !1);
            })
          );
        };
      },
      1777: (e, t, n) => {
        "use strict";
        var r = n(1578),
          o = Math.max,
          i = Math.min;
        e.exports = function (e, t) {
          var n = r(e);
          return n < 0 ? o(n + t, 0) : i(n, t);
        };
      },
      1799: (e, t, n) => {
        "use strict";
        var r = n(4492),
          o = n(4202),
          i = /#|\.prototype\./,
          s = function (e, t) {
            var n = c[a(e)];
            return n === l || (n !== u && (o(t) ? r(t) : !!t));
          },
          a = (s.normalize = function (e) {
            return String(e).replace(i, ".").toLowerCase();
          }),
          c = (s.data = {}),
          u = (s.NATIVE = "N"),
          l = (s.POLYFILL = "P");
        e.exports = s;
      },
      1815: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(380),
          i = n(3929);
        e.exports = function (e, t, n) {
          r ? o.f(e, t, i(0, n)) : (e[t] = n);
        };
      },
      1834: (e, t, n) => {
        "use strict";
        var r = n(5121),
          o = Function.prototype.call;
        e.exports = r
          ? o.bind(o)
          : function () {
              return o.apply(o, arguments);
            };
      },
      1884: (e, t, n) => {
        "use strict";
        n(2561);
      },
      1995: (e, t, n) => {
        "use strict";
        var r = n(6668),
          o = n(4450),
          i = n(6710),
          s = n(380);
        e.exports = function (e, t, n) {
          for (var a = o(t), c = s.f, u = i.f, l = 0; l < a.length; l++) {
            var d = a[l];
            r(e, d) || (n && r(n, d)) || c(e, d, u(t, d));
          }
        };
      },
      2265: (e, t, n) => {
        "use strict";
        var r = n(7759),
          o = n(6947);
        e.exports = function (e) {
          if ("Function" === r(e)) return o(e);
        };
      },
      2275: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833),
          i = n(9151),
          s = n(3868),
          a = n(9634),
          c = n(78),
          u = o.Set,
          l = o.add,
          d = o.has;
        e.exports = function (e) {
          var t = r(this),
            n = s(e),
            o = new u();
          return (
            i(t) > n.size
              ? c(n.getIterator(), function (e) {
                  d(t, e) && l(o, e);
                })
              : a(t, function (e) {
                  n.includes(e) && l(o, e);
                }),
            o
          );
        };
      },
      2341: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1834),
          i = n(6895),
          s = n(960),
          a = n(7636),
          c = n(3649),
          u = n(3842),
          l = n(4192),
          d = c(function () {
            for (
              var e, t, n = this.iterator, r = this.predicate, i = this.next;
              ;

            ) {
              if (((e = s(o(i, n))), (this.done = !!e.done))) return;
              if (((t = e.value), u(n, r, [t, this.counter++], !0))) return t;
            }
          });
        r(
          { target: "Iterator", proto: !0, real: !0, forced: l },
          {
            filter: function (e) {
              return s(this), i(e), new d(a(this), { predicate: e });
            },
          }
        );
      },
      2451: (e) => {
        "use strict";
        var t = TypeError;
        e.exports = function (e, n) {
          if (e < n) throw new t("Not enough arguments");
          return e;
        };
      },
      2513: (e, t, n) => {
        "use strict";
        n(4204);
      },
      2544: (e) => {
        "use strict";
        var t = String;
        e.exports = function (e) {
          try {
            return t(e);
          } catch (n) {
            return "Object";
          }
        };
      },
      2561: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(6115);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced: !n(1381)("symmetricDifference"),
          },
          { symmetricDifference: o }
        );
      },
      2578: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833).has,
          i = n(9151),
          s = n(3868),
          a = n(78),
          c = n(8042);
        e.exports = function (e) {
          var t = r(this),
            n = s(e);
          if (i(t) < n.size) return !1;
          var u = n.getIterator();
          return (
            !1 !==
            a(u, function (e) {
              if (!o(t, e)) return c(u, "normal", !1);
            })
          );
        };
      },
      2661: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(4492);
        e.exports =
          r &&
          o(function () {
            return (
              42 !==
              Object.defineProperty(function () {}, "prototype", {
                value: 42,
                writable: !1,
              }).prototype
            );
          });
      },
      2690: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = Error,
          i = r("".replace),
          s = String(new o("zxcasd").stack),
          a = /\n\s*at [^:]*:[^\n]*/,
          c = a.test(s);
        e.exports = function (e, t) {
          if (c && "string" == typeof e && !o.prepareStackTrace)
            for (; t--; ) e = i(e, a, "");
          return e;
        };
      },
      2820: (e, t, n) => {
        "use strict";
        var r,
          o,
          i,
          s = n(2903),
          a = n(6002),
          c = n(621),
          u = n(6426),
          l = n(6668),
          d = n(5408),
          p = n(7258),
          f = n(482),
          m = "Object already initialized",
          h = a.TypeError,
          v = a.WeakMap;
        if (s || d.state) {
          var g = d.state || (d.state = new v());
          (g.get = g.get),
            (g.has = g.has),
            (g.set = g.set),
            (r = function (e, t) {
              if (g.has(e)) throw new h(m);
              return (t.facade = e), g.set(e, t), t;
            }),
            (o = function (e) {
              return g.get(e) || {};
            }),
            (i = function (e) {
              return g.has(e);
            });
        } else {
          var b = p("state");
          (f[b] = !0),
            (r = function (e, t) {
              if (l(e, b)) throw new h(m);
              return (t.facade = e), u(e, b, t), t;
            }),
            (o = function (e) {
              return l(e, b) ? e[b] : {};
            }),
            (i = function (e) {
              return l(e, b);
            });
        }
        e.exports = {
          set: r,
          get: o,
          has: i,
          enforce: function (e) {
            return i(e) ? o(e) : r(e, {});
          },
          getterFor: function (e) {
            return function (t) {
              var n;
              if (!c(t) || (n = o(t)).type !== e)
                throw new h("Incompatible receiver, " + e + " required");
              return n;
            };
          },
        };
      },
      2903: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = n(4202),
          i = r.WeakMap;
        e.exports = o(i) && /native code/.test(String(i));
      },
      3004: (e, t, n) => {
        "use strict";
        var r,
          o,
          i,
          s = n(4492),
          a = n(4202),
          c = n(621),
          u = n(5979),
          l = n(9972),
          d = n(679),
          p = n(9544),
          f = n(4192),
          m = p("iterator"),
          h = !1;
        [].keys &&
          ("next" in (i = [].keys())
            ? (o = l(l(i))) !== Object.prototype && (r = o)
            : (h = !0)),
          !c(r) ||
          s(function () {
            var e = {};
            return r[m].call(e) !== e;
          })
            ? (r = {})
            : f && (r = u(r)),
          a(r[m]) ||
            d(r, m, function () {
              return this;
            }),
          (e.exports = { IteratorPrototype: r, BUGGY_SAFARI_ITERATORS: h });
      },
      3013: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(6668),
          i = n(654),
          s = n(5972).indexOf,
          a = n(482),
          c = r([].push);
        e.exports = function (e, t) {
          var n,
            r = i(e),
            u = 0,
            l = [];
          for (n in r) !o(a, n) && o(r, n) && c(l, n);
          for (; t.length > u; ) o(r, (n = t[u++])) && (~s(l, n) || c(l, n));
          return l;
        };
      },
      3094: (e, t, n) => {
        "use strict";
        var r = n(5308),
          o = n(3578);
        e.exports = function (e) {
          var t = r(e, "string");
          return o(t) ? t : t + "";
        };
      },
      3154: (e, t, n) => {
        "use strict";
        var r = n(679),
          o = n(6947),
          i = n(8144),
          s = n(2451),
          a = URLSearchParams,
          c = a.prototype,
          u = o(c.append),
          l = o(c.delete),
          d = o(c.forEach),
          p = o([].push),
          f = new a("a=1&a=2&b=3");
        f.delete("a", 1),
          f.delete("b", void 0),
          f + "" != "a=2" &&
            r(
              c,
              "delete",
              function (e) {
                var t = arguments.length,
                  n = t < 2 ? void 0 : arguments[1];
                if (t && void 0 === n) return l(this, e);
                var r = [];
                d(this, function (e, t) {
                  p(r, { key: t, value: e });
                }),
                  s(t, 1);
                for (
                  var o, a = i(e), c = i(n), f = 0, m = 0, h = !1, v = r.length;
                  f < v;

                )
                  (o = r[f++]),
                    h || o.key === a ? ((h = !0), l(this, o.key)) : m++;
                for (; m < v; )
                  ((o = r[m++]).key === a && o.value === c) ||
                    u(this, o.key, o.value);
              },
              { enumerable: !0, unsafe: !0 }
            );
      },
      3192: (e, t, n) => {
        "use strict";
        var r = n(6671),
          o = n(621),
          i = n(6591),
          s = n(11);
        e.exports =
          Object.setPrototypeOf ||
          ("__proto__" in {}
            ? (function () {
                var e,
                  t = !1,
                  n = {};
                try {
                  (e = r(Object.prototype, "__proto__", "set"))(n, []),
                    (t = n instanceof Array);
                } catch (a) {}
                return function (n, r) {
                  return (
                    i(n), s(r), o(n) ? (t ? e(n, r) : (n.__proto__ = r), n) : n
                  );
                };
              })()
            : void 0);
      },
      3382: (e, t, n) => {
        "use strict";
        var r = n(4492);
        e.exports = !r(function () {
          function e() {}
          return (
            (e.prototype.constructor = null),
            Object.getPrototypeOf(new e()) !== e.prototype
          );
        });
      },
      3506: (e, t) => {
        "use strict";
        t.f = Object.getOwnPropertySymbols;
      },
      3552: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = n(621),
          i = r.document,
          s = o(i) && o(i.createElement);
        e.exports = function (e) {
          return s ? i.createElement(e) : {};
        };
      },
      3578: (e, t, n) => {
        "use strict";
        var r = n(4862),
          o = n(4202),
          i = n(728),
          s = n(4455),
          a = Object;
        e.exports = s
          ? function (e) {
              return "symbol" == typeof e;
            }
          : function (e) {
              var t = r("Symbol");
              return o(t) && i(t.prototype, a(e));
            };
      },
      3649: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(5979),
          i = n(6426),
          s = n(9746),
          a = n(9544),
          c = n(2820),
          u = n(7751),
          l = n(3004).IteratorPrototype,
          d = n(7214),
          p = n(8042),
          f = a("toStringTag"),
          m = "IteratorHelper",
          h = "WrapForValidIterator",
          v = c.set,
          g = function (e) {
            var t = c.getterFor(e ? h : m);
            return s(o(l), {
              next: function () {
                var n = t(this);
                if (e) return n.nextHandler();
                try {
                  var r = n.done ? void 0 : n.nextHandler();
                  return d(r, n.done);
                } catch (o) {
                  throw ((n.done = !0), o);
                }
              },
              return: function () {
                var n = t(this),
                  o = n.iterator;
                if (((n.done = !0), e)) {
                  var i = u(o, "return");
                  return i ? r(i, o) : d(void 0, !0);
                }
                if (n.inner)
                  try {
                    p(n.inner.iterator, "normal");
                  } catch (s) {
                    return p(o, "throw", s);
                  }
                return p(o, "normal"), d(void 0, !0);
              },
            });
          },
          b = g(!0),
          y = g(!1);
        i(y, f, "Iterator Helper"),
          (e.exports = function (e, t) {
            var n = function (n, r) {
              r ? ((r.iterator = n.iterator), (r.next = n.next)) : (r = n),
                (r.type = t ? h : m),
                (r.nextHandler = e),
                (r.counter = 0),
                (r.done = !1),
                v(this, r);
            };
            return (n.prototype = t ? b : y), n;
          });
      },
      3841: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833),
          i = n(1249),
          s = n(9151),
          a = n(3868),
          c = n(9634),
          u = n(78),
          l = o.has,
          d = o.remove;
        e.exports = function (e) {
          var t = r(this),
            n = a(e),
            o = i(t);
          return (
            s(t) <= n.size
              ? c(t, function (e) {
                  n.includes(e) && d(o, e);
                })
              : u(n.getIterator(), function (e) {
                  l(t, e) && d(o, e);
                }),
            o
          );
        };
      },
      3842: (e, t, n) => {
        "use strict";
        var r = n(960),
          o = n(8042);
        e.exports = function (e, t, n, i) {
          try {
            return i ? t(r(n)[0], n[1]) : t(n);
          } catch (s) {
            o(e, "throw", s);
          }
        };
      },
      3868: (e, t, n) => {
        "use strict";
        var r = n(6895),
          o = n(960),
          i = n(1834),
          s = n(1578),
          a = n(7636),
          c = "Invalid size",
          u = RangeError,
          l = TypeError,
          d = Math.max,
          p = function (e, t) {
            (this.set = e),
              (this.size = d(t, 0)),
              (this.has = r(e.has)),
              (this.keys = r(e.keys));
          };
        (p.prototype = {
          getIterator: function () {
            return a(o(i(this.keys, this.set)));
          },
          includes: function (e) {
            return i(this.has, this.set, e);
          },
        }),
          (e.exports = function (e) {
            o(e);
            var t = +e.size;
            if (t != t) throw new l(c);
            var n = s(t);
            if (n < 0) throw new u(c);
            return new p(e, n);
          });
      },
      3875: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = 0,
          i = Math.random(),
          s = r((1).toString);
        e.exports = function (e) {
          return "Symbol(" + (void 0 === e ? "" : e) + ")_" + s(++o + i, 36);
        };
      },
      3929: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t,
          };
        };
      },
      4183: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(4202),
          i = n(5408),
          s = r(Function.toString);
        o(i.inspectSource) ||
          (i.inspectSource = function (e) {
            return s(e);
          }),
          (e.exports = i.inspectSource);
      },
      4192: (e) => {
        "use strict";
        e.exports = !1;
      },
      4202: (e) => {
        "use strict";
        var t = "object" == typeof document && document.all;
        e.exports =
          void 0 === t && void 0 !== t
            ? function (e) {
                return "function" == typeof e || e === t;
              }
            : function (e) {
                return "function" == typeof e;
              };
      },
      4204: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1700);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced: !n(1381)("isDisjointFrom"),
          },
          { isDisjointFrom: o }
        );
      },
      4435: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(9151),
          i = n(9634),
          s = n(3868);
        e.exports = function (e) {
          var t = r(this),
            n = s(e);
          return (
            !(o(t) > n.size) &&
            !1 !==
              i(
                t,
                function (e) {
                  if (!n.includes(e)) return !1;
                },
                !0
              )
          );
        };
      },
      4450: (e, t, n) => {
        "use strict";
        var r = n(4862),
          o = n(6947),
          i = n(459),
          s = n(3506),
          a = n(960),
          c = o([].concat);
        e.exports =
          r("Reflect", "ownKeys") ||
          function (e) {
            var t = i.f(a(e)),
              n = s.f;
            return n ? c(t, n(e)) : t;
          };
      },
      4455: (e, t, n) => {
        "use strict";
        var r = n(9750);
        e.exports = r && !Symbol.sham && "symbol" == typeof Symbol.iterator;
      },
      4456: (e, t, n) => {
        "use strict";
        var r = n(5408);
        e.exports = function (e, t) {
          return r[e] || (r[e] = t || {});
        };
      },
      4492: (e) => {
        "use strict";
        e.exports = function (e) {
          try {
            return !!e();
          } catch (t) {
            return !0;
          }
        };
      },
      4737: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(6668),
          i = Function.prototype,
          s = r && Object.getOwnPropertyDescriptor,
          a = o(i, "name"),
          c = a && "something" === function () {}.name,
          u = a && (!r || (r && s(i, "name").configurable));
        e.exports = { EXISTS: a, PROPER: c, CONFIGURABLE: u };
      },
      4827: (e, t, n) => {
        "use strict";
        var r = n(3013),
          o = n(8280);
        e.exports =
          Object.keys ||
          function (e) {
            return r(e, o);
          };
      },
      4862: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = n(4202);
        e.exports = function (e, t) {
          return arguments.length < 2
            ? ((n = r[e]), o(n) ? n : void 0)
            : r[e] && r[e][t];
          var n;
        };
      },
      4952: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(4492),
          i = n(4202),
          s = n(6668),
          a = n(1399),
          c = n(4737).CONFIGURABLE,
          u = n(4183),
          l = n(2820),
          d = l.enforce,
          p = l.get,
          f = String,
          m = Object.defineProperty,
          h = r("".slice),
          v = r("".replace),
          g = r([].join),
          b =
            a &&
            !o(function () {
              return 8 !== m(function () {}, "length", { value: 8 }).length;
            }),
          y = String(String).split("String"),
          w = (e.exports = function (e, t, n) {
            "Symbol(" === h(f(t), 0, 7) &&
              (t = "[" + v(f(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
              n && n.getter && (t = "get " + t),
              n && n.setter && (t = "set " + t),
              (!s(e, "name") || (c && e.name !== t)) &&
                (a
                  ? m(e, "name", { value: t, configurable: !0 })
                  : (e.name = t)),
              b &&
                n &&
                s(n, "arity") &&
                e.length !== n.arity &&
                m(e, "length", { value: n.arity });
            try {
              n && s(n, "constructor") && n.constructor
                ? a && m(e, "prototype", { writable: !1 })
                : e.prototype && (e.prototype = void 0);
            } catch (o) {}
            var r = d(e);
            return (
              s(r, "source") ||
                (r.source = g(y, "string" == typeof t ? t : "")),
              e
            );
          });
        Function.prototype.toString = w(function () {
          return (i(this) && p(this).source) || u(this);
        }, "toString");
      },
      4980: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = Object.defineProperty;
        e.exports = function (e, t) {
          try {
            o(r, e, { value: t, configurable: !0, writable: !0 });
          } catch (n) {
            r[e] = t;
          }
          return t;
        };
      },
      5121: (e, t, n) => {
        "use strict";
        var r = n(4492);
        e.exports = !r(function () {
          var e = function () {}.bind();
          return "function" != typeof e || e.hasOwnProperty("prototype");
        });
      },
      5201: (e, t, n) => {
        "use strict";
        var r = n(7759);
        e.exports =
          Array.isArray ||
          function (e) {
            return "Array" === r(e);
          };
      },
      5251: (e, t, n) => {
        "use strict";
        var r = n(4952),
          o = n(380);
        e.exports = function (e, t, n) {
          return (
            n.get && r(n.get, t, { getter: !0 }),
            n.set && r(n.set, t, { setter: !0 }),
            o.f(e, t, n)
          );
        };
      },
      5308: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(621),
          i = n(3578),
          s = n(7751),
          a = n(5621),
          c = n(9544),
          u = TypeError,
          l = c("toPrimitive");
        e.exports = function (e, t) {
          if (!o(e) || i(e)) return e;
          var n,
            c = s(e, l);
          if (c) {
            if (
              (void 0 === t && (t = "default"), (n = r(c, e, t)), !o(n) || i(n))
            )
              return n;
            throw new u("Can't convert object to primitive value");
          }
          return void 0 === t && (t = "number"), a(e, t);
        };
      },
      5408: (e, t, n) => {
        "use strict";
        var r = n(4192),
          o = n(6002),
          i = n(4980),
          s = "__core-js_shared__",
          a = (e.exports = o[s] || i(s, {}));
        (a.versions || (a.versions = [])).push({
          version: "3.37.0",
          mode: r ? "pure" : "global",
          copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.37.0/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
      },
      5527: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(3841);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced: !n(1381)("difference"),
          },
          { difference: o }
        );
      },
      5621: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(4202),
          i = n(621),
          s = TypeError;
        e.exports = function (e, t) {
          var n, a;
          if ("string" === t && o((n = e.toString)) && !i((a = r(n, e))))
            return a;
          if (o((n = e.valueOf)) && !i((a = r(n, e)))) return a;
          if ("string" !== t && o((n = e.toString)) && !i((a = r(n, e))))
            return a;
          throw new s("Can't convert object to primitive value");
        };
      },
      5833: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = Set.prototype;
        e.exports = {
          Set,
          add: r(o.add),
          has: r(o.has),
          remove: r(o.delete),
          proto: o,
        };
      },
      5864: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1639),
          i = n(6895),
          s = n(960),
          a = n(7636);
        r(
          { target: "Iterator", proto: !0, real: !0 },
          {
            every: function (e) {
              s(this), i(e);
              var t = a(this),
                n = 0;
              return !o(
                t,
                function (t, r) {
                  if (!e(t, n++)) return r();
                },
                { IS_RECORD: !0, INTERRUPTED: !0 }
              ).stopped;
            },
          }
        );
      },
      5873: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(4492),
          i = n(2275);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced:
              !n(1381)("intersection") ||
              o(function () {
                return (
                  "3,2" !==
                  String(
                    Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))
                  )
                );
              }),
          },
          { intersection: i }
        );
      },
      5912: (e) => {
        "use strict";
        var t = Math.ceil,
          n = Math.floor;
        e.exports =
          Math.trunc ||
          function (e) {
            var r = +e;
            return (r > 0 ? n : t)(r);
          };
      },
      5972: (e, t, n) => {
        "use strict";
        var r = n(654),
          o = n(1777),
          i = n(543),
          s = function (e) {
            return function (t, n, s) {
              var a = r(t),
                c = i(a);
              if (0 === c) return !e && -1;
              var u,
                l = o(s, c);
              if (e && n != n) {
                for (; c > l; ) if ((u = a[l++]) != u) return !0;
              } else
                for (; c > l; l++)
                  if ((e || l in a) && a[l] === n) return e || l || 0;
              return !e && -1;
            };
          };
        e.exports = { includes: s(!0), indexOf: s(!1) };
      },
      5979: (e, t, n) => {
        "use strict";
        var r,
          o = n(960),
          i = n(8220),
          s = n(8280),
          a = n(482),
          c = n(9936),
          u = n(3552),
          l = n(7258),
          d = "prototype",
          p = "script",
          f = l("IE_PROTO"),
          m = function () {},
          h = function (e) {
            return "<" + p + ">" + e + "</" + p + ">";
          },
          v = function (e) {
            e.write(h("")), e.close();
            var t = e.parentWindow.Object;
            return (e = null), t;
          },
          g = function () {
            try {
              r = new ActiveXObject("htmlfile");
            } catch (i) {}
            var e, t, n;
            g =
              "undefined" != typeof document
                ? document.domain && r
                  ? v(r)
                  : ((t = u("iframe")),
                    (n = "java" + p + ":"),
                    (t.style.display = "none"),
                    c.appendChild(t),
                    (t.src = String(n)),
                    (e = t.contentWindow.document).open(),
                    e.write(h("document.F=Object")),
                    e.close(),
                    e.F)
                : v(r);
            for (var o = s.length; o--; ) delete g[d][s[o]];
            return g();
          };
        (a[f] = !0),
          (e.exports =
            Object.create ||
            function (e, t) {
              var n;
              return (
                null !== e
                  ? ((m[d] = o(e)), (n = new m()), (m[d] = null), (n[f] = e))
                  : (n = g()),
                void 0 === t ? n : i.f(n, t)
              );
            });
      },
      6002: function (e, t, n) {
        "use strict";
        var r = function (e) {
          return e && e.Math === Math && e;
        };
        e.exports =
          r("object" == typeof globalThis && globalThis) ||
          r("object" == typeof window && window) ||
          r("object" == typeof self && self) ||
          r("object" == typeof n.g && n.g) ||
          r("object" == typeof this && this) ||
          (function () {
            return this;
          })() ||
          Function("return this")();
      },
      6115: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833),
          i = n(1249),
          s = n(3868),
          a = n(78),
          c = o.add,
          u = o.has,
          l = o.remove;
        e.exports = function (e) {
          var t = r(this),
            n = s(e).getIterator(),
            o = i(t);
          return (
            a(n, function (e) {
              u(t, e) ? l(o, e) : c(o, e);
            }),
            o
          );
        };
      },
      6202: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(2578);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced: !n(1381)("isSupersetOf"),
          },
          { isSupersetOf: o }
        );
      },
      6364: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(6002),
          i = n(4862),
          s = n(3929),
          a = n(380).f,
          c = n(6668),
          u = n(1548),
          l = n(8404),
          d = n(9760),
          p = n(8505),
          f = n(2690),
          m = n(1399),
          h = n(4192),
          v = "DOMException",
          g = i("Error"),
          b = i(v),
          y = function () {
            u(this, w);
            var e = arguments.length,
              t = d(e < 1 ? void 0 : arguments[0]),
              n = d(e < 2 ? void 0 : arguments[1], "Error"),
              r = new b(t, n),
              o = new g(t);
            return (
              (o.name = v), a(r, "stack", s(1, f(o.stack, 1))), l(r, this, y), r
            );
          },
          w = (y.prototype = b.prototype),
          x = "stack" in new g(v),
          _ = "stack" in new b(1, 2),
          E = b && m && Object.getOwnPropertyDescriptor(o, v),
          S = !(!E || (E.writable && E.configurable)),
          k = x && !S && !_;
        r(
          { global: !0, constructor: !0, forced: h || k },
          { DOMException: k ? y : b }
        );
        var A = i(v),
          C = A.prototype;
        if (C.constructor !== A)
          for (var I in (h || a(C, "constructor", s(1, A)), p))
            if (c(p, I)) {
              var P = p[I],
                O = P.s;
              c(A, O) || a(A, O, s(6, P.c));
            }
      },
      6426: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(380),
          i = n(3929);
        e.exports = r
          ? function (e, t, n) {
              return o.f(e, t, i(1, n));
            }
          : function (e, t, n) {
              return (e[t] = n), e;
            };
      },
      6456: (e, t, n) => {
        "use strict";
        n(7777);
      },
      6507: function (e, t) {
        var n, r, o;
        !(function () {
          "use strict";
          (r = []),
            void 0 ===
              (o =
                "function" ==
                typeof (n = function () {
                  function e(e) {
                    return e.charAt(0).toUpperCase() + e.substring(1);
                  }
                  function t(e) {
                    return function () {
                      return this[e];
                    };
                  }
                  var n = ["isConstructor", "isEval", "isNative", "isToplevel"],
                    r = ["columnNumber", "lineNumber"],
                    o = ["fileName", "functionName", "source"],
                    i = n.concat(r, o, ["args"], ["evalOrigin"]);
                  function s(t) {
                    if (t)
                      for (var n = 0; n < i.length; n++)
                        void 0 !== t[i[n]] && this["set" + e(i[n])](t[i[n]]);
                  }
                  (s.prototype = {
                    getArgs: function () {
                      return this.args;
                    },
                    setArgs: function (e) {
                      if (
                        "[object Array]" !== Object.prototype.toString.call(e)
                      )
                        throw new TypeError("Args must be an Array");
                      this.args = e;
                    },
                    getEvalOrigin: function () {
                      return this.evalOrigin;
                    },
                    setEvalOrigin: function (e) {
                      if (e instanceof s) this.evalOrigin = e;
                      else {
                        if (!(e instanceof Object))
                          throw new TypeError(
                            "Eval Origin must be an Object or StackFrame"
                          );
                        this.evalOrigin = new s(e);
                      }
                    },
                    toString: function () {
                      var e = this.getFileName() || "",
                        t = this.getLineNumber() || "",
                        n = this.getColumnNumber() || "",
                        r = this.getFunctionName() || "";
                      return this.getIsEval()
                        ? e
                          ? "[eval] (" + e + ":" + t + ":" + n + ")"
                          : "[eval]:" + t + ":" + n
                        : r
                        ? r + " (" + e + ":" + t + ":" + n + ")"
                        : e + ":" + t + ":" + n;
                    },
                  }),
                    (s.fromString = function (e) {
                      var t = e.indexOf("("),
                        n = e.lastIndexOf(")"),
                        r = e.substring(0, t),
                        o = e.substring(t + 1, n).split(","),
                        i = e.substring(n + 1);
                      if (0 === i.indexOf("@"))
                        var a = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(i, ""),
                          c = a[1],
                          u = a[2],
                          l = a[3];
                      return new s({
                        functionName: r,
                        args: o || void 0,
                        fileName: c,
                        lineNumber: u || void 0,
                        columnNumber: l || void 0,
                      });
                    });
                  for (var a = 0; a < n.length; a++)
                    (s.prototype["get" + e(n[a])] = t(n[a])),
                      (s.prototype["set" + e(n[a])] = (function (e) {
                        return function (t) {
                          this[e] = Boolean(t);
                        };
                      })(n[a]));
                  for (var c = 0; c < r.length; c++)
                    (s.prototype["get" + e(r[c])] = t(r[c])),
                      (s.prototype["set" + e(r[c])] = (function (e) {
                        return function (t) {
                          if (((n = t), isNaN(parseFloat(n)) || !isFinite(n)))
                            throw new TypeError(e + " must be a Number");
                          var n;
                          this[e] = Number(t);
                        };
                      })(r[c]));
                  for (var u = 0; u < o.length; u++)
                    (s.prototype["get" + e(o[u])] = t(o[u])),
                      (s.prototype["set" + e(o[u])] = (function (e) {
                        return function (t) {
                          this[e] = String(t);
                        };
                      })(o[u]));
                  return s;
                })
                  ? n.apply(t, r)
                  : n) || (e.exports = o);
        })();
      },
      6591: (e, t, n) => {
        "use strict";
        var r = n(7104),
          o = TypeError;
        e.exports = function (e) {
          if (r(e)) throw new o("Can't call method on " + e);
          return e;
        };
      },
      6668: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(7282),
          i = r({}.hasOwnProperty);
        e.exports =
          Object.hasOwn ||
          function (e, t) {
            return i(o(e), t);
          };
      },
      6671: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(6895);
        e.exports = function (e, t, n) {
          try {
            return r(o(Object.getOwnPropertyDescriptor(e, t)[n]));
          } catch (i) {}
        };
      },
      6710: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(1834),
          i = n(8590),
          s = n(3929),
          a = n(654),
          c = n(3094),
          u = n(6668),
          l = n(1536),
          d = Object.getOwnPropertyDescriptor;
        t.f = r
          ? d
          : function (e, t) {
              if (((e = a(e)), (t = c(t)), l))
                try {
                  return d(e, t);
                } catch (n) {}
              if (u(e, t)) return s(!o(i.f, e, t), e[t]);
            };
      },
      6718: function (e, t, n) {
        var r, o, i;
        !(function () {
          "use strict";
          (o = [n(6507)]),
            void 0 ===
              (i =
                "function" ==
                typeof (r = function (e) {
                  var t = /(^|@)\S+:\d+/,
                    n = /^\s*at .*(\S+:\d+|\(native\))/m,
                    r = /^(eval@)?(\[native code])?$/;
                  return {
                    parse: function (e) {
                      if (
                        void 0 !== e.stacktrace ||
                        void 0 !== e["opera#sourceloc"]
                      )
                        return this.parseOpera(e);
                      if (e.stack && e.stack.match(n))
                        return this.parseV8OrIE(e);
                      if (e.stack) return this.parseFFOrSafari(e);
                      throw new Error("Cannot parse given Error object");
                    },
                    extractLocation: function (e) {
                      if (-1 === e.indexOf(":")) return [e];
                      var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(
                        e.replace(/[()]/g, "")
                      );
                      return [t[1], t[2] || void 0, t[3] || void 0];
                    },
                    parseV8OrIE: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(n);
                        }, this)
                        .map(function (t) {
                          t.indexOf("(eval ") > -1 &&
                            (t = t
                              .replace(/eval code/g, "eval")
                              .replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                          var n = t
                              .replace(/^\s+/, "")
                              .replace(/\(eval code/g, "(")
                              .replace(/^.*?\s+/, ""),
                            r = n.match(/ (\(.+\)$)/);
                          n = r ? n.replace(r[0], "") : n;
                          var o = this.extractLocation(r ? r[1] : n),
                            i = (r && n) || void 0,
                            s =
                              ["eval", "<anonymous>"].indexOf(o[0]) > -1
                                ? void 0
                                : o[0];
                          return new e({
                            functionName: i,
                            fileName: s,
                            lineNumber: o[1],
                            columnNumber: o[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseFFOrSafari: function (t) {
                      return t.stack
                        .split("\n")
                        .filter(function (e) {
                          return !e.match(r);
                        }, this)
                        .map(function (t) {
                          if (
                            (t.indexOf(" > eval") > -1 &&
                              (t = t.replace(
                                / line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,
                                ":$1"
                              )),
                            -1 === t.indexOf("@") && -1 === t.indexOf(":"))
                          )
                            return new e({ functionName: t });
                          var n = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                            r = t.match(n),
                            o = r && r[1] ? r[1] : void 0,
                            i = this.extractLocation(t.replace(n, ""));
                          return new e({
                            functionName: o,
                            fileName: i[0],
                            lineNumber: i[1],
                            columnNumber: i[2],
                            source: t,
                          });
                        }, this);
                    },
                    parseOpera: function (e) {
                      return !e.stacktrace ||
                        (e.message.indexOf("\n") > -1 &&
                          e.message.split("\n").length >
                            e.stacktrace.split("\n").length)
                        ? this.parseOpera9(e)
                        : e.stack
                        ? this.parseOpera11(e)
                        : this.parseOpera10(e);
                    },
                    parseOpera9: function (t) {
                      for (
                        var n = /Line (\d+).*script (?:in )?(\S+)/i,
                          r = t.message.split("\n"),
                          o = [],
                          i = 2,
                          s = r.length;
                        i < s;
                        i += 2
                      ) {
                        var a = n.exec(r[i]);
                        a &&
                          o.push(
                            new e({
                              fileName: a[2],
                              lineNumber: a[1],
                              source: r[i],
                            })
                          );
                      }
                      return o;
                    },
                    parseOpera10: function (t) {
                      for (
                        var n =
                            /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,
                          r = t.stacktrace.split("\n"),
                          o = [],
                          i = 0,
                          s = r.length;
                        i < s;
                        i += 2
                      ) {
                        var a = n.exec(r[i]);
                        a &&
                          o.push(
                            new e({
                              functionName: a[3] || void 0,
                              fileName: a[2],
                              lineNumber: a[1],
                              source: r[i],
                            })
                          );
                      }
                      return o;
                    },
                    parseOpera11: function (n) {
                      return n.stack
                        .split("\n")
                        .filter(function (e) {
                          return !!e.match(t) && !e.match(/^Error created at/);
                        }, this)
                        .map(function (t) {
                          var n,
                            r = t.split("@"),
                            o = this.extractLocation(r.pop()),
                            i = r.shift() || "",
                            s =
                              i
                                .replace(/<anonymous function(: (\w+))?>/, "$2")
                                .replace(/\([^)]*\)/g, "") || void 0;
                          i.match(/\(([^)]*)\)/) &&
                            (n = i.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                          var a =
                            void 0 === n || "[arguments not available]" === n
                              ? void 0
                              : n.split(",");
                          return new e({
                            functionName: s,
                            args: a,
                            fileName: o[0],
                            lineNumber: o[1],
                            columnNumber: o[2],
                            source: t,
                          });
                        }, this);
                    },
                  };
                })
                  ? r.apply(t, o)
                  : r) || (e.exports = i);
        })();
      },
      6895: (e, t, n) => {
        "use strict";
        var r = n(4202),
          o = n(2544),
          i = TypeError;
        e.exports = function (e) {
          if (r(e)) return e;
          throw new i(o(e) + " is not a function");
        };
      },
      6947: (e, t, n) => {
        "use strict";
        var r = n(5121),
          o = Function.prototype,
          i = o.call,
          s = r && o.bind.bind(i, i);
        e.exports = r
          ? s
          : function (e) {
              return function () {
                return i.apply(e, arguments);
              };
            };
      },
      6999: (e, t, n) => {
        "use strict";
        var r = n(2265),
          o = n(6895),
          i = n(5121),
          s = r(r.bind);
        e.exports = function (e, t) {
          return (
            o(e),
            void 0 === t
              ? e
              : i
              ? s(e, t)
              : function () {
                  return e.apply(t, arguments);
                }
          );
        };
      },
      7104: (e) => {
        "use strict";
        e.exports = function (e) {
          return null == e;
        };
      },
      7214: (e) => {
        "use strict";
        e.exports = function (e, t) {
          return { value: e, done: t };
        };
      },
      7258: (e, t, n) => {
        "use strict";
        var r = n(4456),
          o = n(3875),
          i = r("keys");
        e.exports = function (e) {
          return i[e] || (i[e] = o(e));
        };
      },
      7282: (e, t, n) => {
        "use strict";
        var r = n(6591),
          o = Object;
        e.exports = function (e) {
          return o(r(e));
        };
      },
      7636: (e) => {
        "use strict";
        e.exports = function (e) {
          return { iterator: e, next: e.next, done: !1 };
        };
      },
      7697: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(7282),
          i = n(543),
          s = n(74),
          a = n(1576);
        r(
          {
            target: "Array",
            proto: !0,
            arity: 1,
            forced:
              n(4492)(function () {
                return 4294967297 !== [].push.call({ length: 4294967296 }, 1);
              }) ||
              !(function () {
                try {
                  Object.defineProperty([], "length", { writable: !1 }).push();
                } catch (e) {
                  return e instanceof TypeError;
                }
              })(),
          },
          {
            push: function (e) {
              var t = o(this),
                n = i(t),
                r = arguments.length;
              a(n + r);
              for (var c = 0; c < r; c++) (t[n] = arguments[c]), n++;
              return s(t, n), n;
            },
          }
        );
      },
      7751: (e, t, n) => {
        "use strict";
        var r = n(6895),
          o = n(7104);
        e.exports = function (e, t) {
          var n = e[t];
          return o(n) ? void 0 : r(n);
        };
      },
      7759: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = r({}.toString),
          i = r("".slice);
        e.exports = function (e) {
          return i(o(e), 8, -1);
        };
      },
      7768: (e, t, n) => {
        "use strict";
        var r = n(764),
          o = n(7751),
          i = n(7104),
          s = n(8078),
          a = n(9544)("iterator");
        e.exports = function (e) {
          if (!i(e)) return o(e, a) || o(e, "@@iterator") || s[r(e)];
        };
      },
      7777: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(4435);
        r(
          {
            target: "Set",
            proto: !0,
            real: !0,
            forced: !n(1381)("isSubsetOf"),
          },
          { isSubsetOf: o }
        );
      },
      7872: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1639),
          i = n(6895),
          s = n(960),
          a = n(7636);
        r(
          { target: "Iterator", proto: !0, real: !0 },
          {
            forEach: function (e) {
              s(this), i(e);
              var t = a(this),
                n = 0;
              o(
                t,
                function (t) {
                  e(t, n++);
                },
                { IS_RECORD: !0 }
              );
            },
          }
        );
      },
      7960: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1639),
          i = n(6895),
          s = n(960),
          a = n(7636);
        r(
          { target: "Iterator", proto: !0, real: !0 },
          {
            find: function (e) {
              s(this), i(e);
              var t = a(this),
                n = 0;
              return o(
                t,
                function (t, r) {
                  if (e(t, n++)) return r(t);
                },
                { IS_RECORD: !0, INTERRUPTED: !0 }
              ).result;
            },
          }
        );
      },
      8003: (e) => {
        "use strict";
        e.exports =
          ("undefined" != typeof navigator && String(navigator.userAgent)) ||
          "";
      },
      8006: (e, t, n) => {
        "use strict";
        n(1613);
      },
      8042: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(960),
          i = n(7751);
        e.exports = function (e, t, n) {
          var s, a;
          o(e);
          try {
            if (!(s = i(e, "return"))) {
              if ("throw" === t) throw n;
              return n;
            }
            s = r(s, e);
          } catch (c) {
            (a = !0), (s = c);
          }
          if ("throw" === t) throw n;
          if (a) throw s;
          return o(s), n;
        };
      },
      8078: (e) => {
        "use strict";
        e.exports = {};
      },
      8142: (e, t, n) => {
        "use strict";
        n(5527);
      },
      8144: (e, t, n) => {
        "use strict";
        var r = n(764),
          o = String;
        e.exports = function (e) {
          if ("Symbol" === r(e))
            throw new TypeError("Cannot convert a Symbol value to a string");
          return o(e);
        };
      },
      8220: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(2661),
          i = n(380),
          s = n(960),
          a = n(654),
          c = n(4827);
        t.f =
          r && !o
            ? Object.defineProperties
            : function (e, t) {
                s(e);
                for (var n, r = a(t), o = c(t), u = o.length, l = 0; u > l; )
                  i.f(e, (n = o[l++]), r[n]);
                return e;
              };
      },
      8239: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1639),
          i = n(6895),
          s = n(960),
          a = n(7636);
        r(
          { target: "Iterator", proto: !0, real: !0 },
          {
            some: function (e) {
              s(this), i(e);
              var t = a(this),
                n = 0;
              return o(
                t,
                function (t, r) {
                  if (e(t, n++)) return r();
                },
                { IS_RECORD: !0, INTERRUPTED: !0 }
              ).stopped;
            },
          }
        );
      },
      8280: (e) => {
        "use strict";
        e.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
        ];
      },
      8404: (e, t, n) => {
        "use strict";
        var r = n(4202),
          o = n(621),
          i = n(3192);
        e.exports = function (e, t, n) {
          var s, a;
          return (
            i &&
              r((s = t.constructor)) &&
              s !== n &&
              o((a = s.prototype)) &&
              a !== n.prototype &&
              i(e, a),
            e
          );
        };
      },
      8482: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(4492),
          i = n(7759),
          s = Object,
          a = r("".split);
        e.exports = o(function () {
          return !s("z").propertyIsEnumerable(0);
        })
          ? function (e) {
              return "String" === i(e) ? a(e, "") : s(e);
            }
          : s;
      },
      8505: (e) => {
        "use strict";
        e.exports = {
          IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
          DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
          HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
          WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
          InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
          NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
          NoModificationAllowedError: {
            s: "NO_MODIFICATION_ALLOWED_ERR",
            c: 7,
            m: 1,
          },
          NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
          NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
          InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
          InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
          SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
          InvalidModificationError: {
            s: "INVALID_MODIFICATION_ERR",
            c: 13,
            m: 1,
          },
          NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
          InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
          ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
          TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
          SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
          NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
          AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
          URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
          QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
          TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
          InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
          DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 },
        };
      },
      8575: (e, t, n) => {
        "use strict";
        var r = n(5833).has;
        e.exports = function (e) {
          return r(e), e;
        };
      },
      8590: (e, t) => {
        "use strict";
        var n = {}.propertyIsEnumerable,
          r = Object.getOwnPropertyDescriptor,
          o = r && !n.call({ 1: 2 }, 1);
        t.f = o
          ? function (e) {
              var t = r(this, e);
              return !!t && t.enumerable;
            }
          : n;
      },
      8643: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(6002),
          i = n(1548),
          s = n(960),
          a = n(4202),
          c = n(9972),
          u = n(5251),
          l = n(1815),
          d = n(4492),
          p = n(6668),
          f = n(9544),
          m = n(3004).IteratorPrototype,
          h = n(1399),
          v = n(4192),
          g = "constructor",
          b = "Iterator",
          y = f("toStringTag"),
          w = TypeError,
          x = o[b],
          _ =
            v ||
            !a(x) ||
            x.prototype !== m ||
            !d(function () {
              x({});
            }),
          E = function () {
            if ((i(this, m), c(this) === m))
              throw new w("Abstract class Iterator not directly constructable");
          },
          S = function (e, t) {
            h
              ? u(m, e, {
                  configurable: !0,
                  get: function () {
                    return t;
                  },
                  set: function (t) {
                    if ((s(this), this === m))
                      throw new w("You can't redefine this property");
                    p(this, e) ? (this[e] = t) : l(this, e, t);
                  },
                })
              : (m[e] = t);
          };
        p(m, y) || S(y, b),
          (!_ && p(m, g) && m[g] !== Object) || S(g, E),
          (E.prototype = m),
          r({ global: !0, constructor: !0, forced: _ }, { Iterator: E });
      },
      8963: (e, t, n) => {
        "use strict";
        var r,
          o,
          i = n(6002),
          s = n(8003),
          a = i.process,
          c = i.Deno,
          u = (a && a.versions) || (c && c.version),
          l = u && u.v8;
        l && (o = (r = l.split("."))[0] > 0 && r[0] < 4 ? 1 : +(r[0] + r[1])),
          !o &&
            s &&
            (!(r = s.match(/Edge\/(\d+)/)) || r[1] >= 74) &&
            (r = s.match(/Chrome\/(\d+)/)) &&
            (o = +r[1]),
          (e.exports = o);
      },
      9041: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(352);
        r(
          { target: "Iterator", proto: !0, real: !0, forced: n(4192) },
          { map: o }
        );
      },
      9058: (e, t, n) => {
        "use strict";
        var r = n(621);
        e.exports = function (e) {
          return r(e) || null === e;
        };
      },
      9151: (e, t, n) => {
        "use strict";
        var r = n(6671),
          o = n(5833);
        e.exports =
          r(o.proto, "size", "get") ||
          function (e) {
            return e.size;
          };
      },
      9544: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = n(4456),
          i = n(6668),
          s = n(3875),
          a = n(9750),
          c = n(4455),
          u = r.Symbol,
          l = o("wks"),
          d = c ? u.for || u : (u && u.withoutSetter) || s;
        e.exports = function (e) {
          return (
            i(l, e) || (l[e] = a && i(u, e) ? u[e] : d("Symbol." + e)), l[e]
          );
        };
      },
      9580: (e, t, n) => {
        "use strict";
        var r = n(1834),
          o = n(6895),
          i = n(960),
          s = n(2544),
          a = n(7768),
          c = TypeError;
        e.exports = function (e, t) {
          var n = arguments.length < 2 ? a(e) : t;
          if (o(n)) return i(r(n, e));
          throw new c(s(e) + " is not iterable");
        };
      },
      9604: (e, t, n) => {
        "use strict";
        var r = n(1399),
          o = n(6947),
          i = n(5251),
          s = URLSearchParams.prototype,
          a = o(s.forEach);
        r &&
          !("size" in s) &&
          i(s, "size", {
            get: function () {
              var e = 0;
              return (
                a(this, function () {
                  e++;
                }),
                e
              );
            },
            configurable: !0,
            enumerable: !0,
          });
      },
      9634: (e, t, n) => {
        "use strict";
        var r = n(6947),
          o = n(78),
          i = n(5833),
          s = i.Set,
          a = i.proto,
          c = r(a.forEach),
          u = r(a.keys),
          l = u(new s()).next;
        e.exports = function (e, t, n) {
          return n ? o({ iterator: u(e), next: l }, t) : c(e, t);
        };
      },
      9639: (e, t, n) => {
        "use strict";
        var r = n(8575),
          o = n(5833).add,
          i = n(1249),
          s = n(3868),
          a = n(78);
        e.exports = function (e) {
          var t = r(this),
            n = s(e).getIterator(),
            c = i(t);
          return (
            a(n, function (e) {
              o(c, e);
            }),
            c
          );
        };
      },
      9641: (e, t, n) => {
        "use strict";
        var r = n(9731),
          o = n(1639),
          i = n(6895),
          s = n(960),
          a = n(7636),
          c = TypeError;
        r(
          { target: "Iterator", proto: !0, real: !0 },
          {
            reduce: function (e) {
              s(this), i(e);
              var t = a(this),
                n = arguments.length < 2,
                r = n ? void 0 : arguments[1],
                u = 0;
              if (
                (o(
                  t,
                  function (t) {
                    n ? ((n = !1), (r = t)) : (r = e(r, t, u)), u++;
                  },
                  { IS_RECORD: !0 }
                ),
                n)
              )
                throw new c("Reduce of empty iterator with no initial value");
              return r;
            },
          }
        );
      },
      9731: (e, t, n) => {
        "use strict";
        var r = n(6002),
          o = n(6710).f,
          i = n(6426),
          s = n(679),
          a = n(4980),
          c = n(1995),
          u = n(1799);
        e.exports = function (e, t) {
          var n,
            l,
            d,
            p,
            f,
            m = e.target,
            h = e.global,
            v = e.stat;
          if ((n = h ? r : v ? r[m] || a(m, {}) : r[m] && r[m].prototype))
            for (l in t) {
              if (
                ((p = t[l]),
                (d = e.dontCallGetSet ? (f = o(n, l)) && f.value : n[l]),
                !u(h ? l : m + (v ? "." : "#") + l, e.forced) && void 0 !== d)
              ) {
                if (typeof p == typeof d) continue;
                c(p, d);
              }
              (e.sham || (d && d.sham)) && i(p, "sham", !0), s(n, l, p, e);
            }
        };
      },
      9746: (e, t, n) => {
        "use strict";
        var r = n(679);
        e.exports = function (e, t, n) {
          for (var o in t) r(e, o, t[o], n);
          return e;
        };
      },
      9750: (e, t, n) => {
        "use strict";
        var r = n(8963),
          o = n(4492),
          i = n(6002).String;
        e.exports =
          !!Object.getOwnPropertySymbols &&
          !o(function () {
            var e = Symbol("symbol detection");
            return (
              !i(e) ||
              !(Object(e) instanceof Symbol) ||
              (!Symbol.sham && r && r < 41)
            );
          });
      },
      9760: (e, t, n) => {
        "use strict";
        var r = n(8144);
        e.exports = function (e, t) {
          return void 0 === e ? (arguments.length < 2 ? "" : t) : r(e);
        };
      },
      9936: (e, t, n) => {
        "use strict";
        var r = n(4862);
        e.exports = r("document", "documentElement");
      },
      9972: (e, t, n) => {
        "use strict";
        var r = n(6668),
          o = n(4202),
          i = n(7282),
          s = n(7258),
          a = n(3382),
          c = s("IE_PROTO"),
          u = Object,
          l = u.prototype;
        e.exports = a
          ? u.getPrototypeOf
          : function (e) {
              var t = i(e);
              if (r(t, c)) return t[c];
              var n = t.constructor;
              return o(n) && t instanceof n
                ? n.prototype
                : t instanceof u
                ? l
                : null;
            };
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var i = (t[r] = { exports: {} });
    return e[r].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.amdO = {}),
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      n(7697), n(8643), n(7872), n(9041), n(9641), n(8239);
      const e = "product_added_to_cart",
        t = "Added Product",
        r = "cart_link_id";
      function o(e, t, n) {
        const { jQuery: r } = window;
        if (r && r(e).bind) {
          const o = (e) => {
            e && n(e);
          };
          r(e).bind(t, o);
        } else e.addEventListener && e.addEventListener(t, n);
      }
      function i(e) {
        window.addEventListener("load", () => {
          for (const t of document.forms) e(t);
        });
      }
      let s = (function (e) {
        return (
          (e.AdvancedDom = "advanced-dom"),
          (e.Custom = "custom"),
          (e.Dom = "dom"),
          (e.Meta = "meta"),
          (e.Standard = "standard"),
          e
        );
      })({});
      const a = {
        all_events: s.Meta,
        all_standard_events: s.Meta,
        all_custom_events: s.Meta,
        all_dom_events: s.Meta,
        checkout_address_info_submitted: s.Standard,
        checkout_completed: s.Standard,
        checkout_started: s.Standard,
        payment_info_submitted: s.Standard,
        collection_viewed: s.Standard,
        checkout_contact_info_submitted: s.Standard,
        page_viewed: s.Standard,
        product_added_to_cart: s.Standard,
        product_removed_from_cart: s.Standard,
        product_viewed: s.Standard,
        search_submitted: s.Standard,
        cart_viewed: s.Standard,
        checkout_shipping_info_submitted: s.Standard,
        alert_displayed: s.Standard,
        ui_extension_errored: s.Standard,
        input_changed: s.Dom,
        input_blurred: s.Dom,
        input_focused: s.Dom,
        form_submitted: s.Dom,
        clicked: s.Dom,
        advanced_dom_mouse_moved: s.AdvancedDom,
        advanced_dom_window_resized: s.AdvancedDom,
        advanced_dom_scrolled: s.AdvancedDom,
        advanced_dom_clipboard: s.AdvancedDom,
        advanced_dom_selection_changed: s.AdvancedDom,
        advanced_dom_available: s.AdvancedDom,
        advanced_dom_changed: s.AdvancedDom,
        advanced_dom_clicked: s.AdvancedDom,
        advanced_dom_form_submitted: s.AdvancedDom,
        advanced_dom_input_changed: s.AdvancedDom,
        advanced_dom_input_blurred: s.AdvancedDom,
        advanced_dom_input_focused: s.AdvancedDom,
      };
      function c(e) {
        return (function (e) {
          return e in a;
        })(e)
          ? a[e]
          : s.Custom;
      }
      function u(e) {
        return c(e) === s.Standard;
      }
      function l(e) {
        return c(e) === s.Custom;
      }
      function d(e) {
        return c(e) === s.Dom;
      }
      function p(e) {
        return c(e) === s.AdvancedDom;
      }
      class f extends Error {
        constructor(e, t = {}) {
          var n;
          super(e),
            (this.severity = void 0),
            (this.groupingHash = void 0),
            (this.severity = t.severity || "error"),
            (this.groupingHash =
              null !== (n = t.groupingHash) && void 0 !== n
                ? n
                : "Error" === this.name
                ? void 0
                : this.name);
        }
      }
      let m = (function (e) {
          return (
            (e.Shopify = "shopify"),
            (e.StorefrontRenderer = "storefront-renderer"),
            (e.CheckoutOne = "checkout-one"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.CustomerAccount = "customer-account"),
            (e.Unknown = "unknown"),
            (e.NotAvailable = "n/a"),
            e
          );
        })({}),
        h = (function (e) {
          return (e.App = "APP"), (e.Custom = "CUSTOM"), e;
        })({}),
        v = (function (e) {
          return (e.Strict = "STRICT"), (e.Lax = "LAX"), (e.Open = "OPEN"), e;
        })({}),
        g = (function (e) {
          return (e.AdvancedDomEvents = "advanced_dom_events"), e;
        })({}),
        b = (function (e) {
          return (
            (e.Modern = "modern"),
            (e.Legacy = "legacy"),
            (e.Bot = "bot"),
            (e.Unknown = "unknown"),
            (e.NotAvailable = "n/a"),
            e
          );
        })({});
      function y() {
        var e;
        return (
          (null === (e = window.ShopifyAnalytics) || void 0 === e
            ? void 0
            : e.meta) || {}
        );
      }
      function w(e, t) {
        for (const n of t.variants) if (String(n.id) === String(e)) return n;
        return null;
      }
      function x(e, t) {
        for (const n of t) {
          const t = w(e, n);
          if (t) return { product: n, variant: t };
        }
        return {};
      }
      function _(e, t) {
        var n;
        const [r] =
          (null === (n = t.productVariants) || void 0 === n
            ? void 0
            : n.filter((t) => t.id === e)) || [];
        return (
          r ||
          (function (e) {
            let t, n;
            const r = y();
            let o = { currency: r.currency, variant_id: e };
            if (r.products) {
              const o = r.products;
              ({ product: t, variant: n } = x(e, o));
            } else r.product && ((t = r.product), (n = w(e, t)));
            return (
              t &&
                ((o = {
                  ...o,
                  product_id: t.id,
                  product_gid: t.gid,
                  product_vendor: t.vendor,
                  collection_title: null,
                  untranslated_product_title: t.untranslated_product_title,
                }),
                n &&
                  (o = {
                    ...o,
                    variant_id: e,
                    variant_price: n.price / 100,
                    product_title: n.name,
                    variant_sku: n.sku,
                    variant_title: n.public_title,
                    untranslated_variant_title: n.untranslated_variant_title,
                  })),
              {
                id: String(o.variant_id),
                image: { src: "" },
                price: { amount: o.variant_price, currencyCode: o.currency },
                product: {
                  id: String(o.product_id),
                  title: o.product_title,
                  vendor: o.product_vendor,
                  type: o.product_type,
                  untranslatedTitle:
                    o.untranslated_product_title || o.product_title,
                  url: o.url,
                },
                sku: o.variant_sku,
                title: o.variant_title,
                untranslatedTitle:
                  o.untranslated_variant_title || o.variant_title,
              }
            );
          })(e)
        );
      }
      function E(e) {
        try {
          return e instanceof FormData
            ? (function (e) {
                const t = {};
                return (
                  e.forEach((e, n) => {
                    S(n, e, t);
                  }),
                  t
                );
              })(e)
            : e instanceof URLSearchParams
            ? ((t = e), Object.fromEntries(t.entries()))
            : JSON.parse(e);
        } catch (n) {
          return {};
        }
        var t;
      }
      function S(e, t, n) {
        const [r, ...o] = e.split(".").filter((e) => e);
        if (r && o.length > 0)
          return (n[r] = n[r] || {}), void S(o.join("."), t, n[r]);
        const i = /(\w+)?\[(\d+)?\](.+)?/.exec(e);
        if (i) {
          const [e, r, o, s = ""] = i;
          if (r) return (n[r] = n[r] || []), void S(e.replace(r, ""), t, n[r]);
          if (o) {
            const e = s && "[" === s[0] ? [] : {};
            return (n[o] = n[o] || e), void S(s, t, n[o]);
          }
          n.push(t);
        } else n[e] = t;
      }
      function k(e) {
        let t = e.toLowerCase();
        return (
          (t = t.replace(/\/+$/, "")),
          (t = t.replace(/\/\/+/g, "/")),
          (t = t.split("?")[0] || t),
          t
        );
      }
      function A(e) {
        if (!e) return 1;
        try {
          return JSON.parse(e).quantity || 1;
        } catch (t) {
          if (e instanceof FormData || e instanceof URLSearchParams) {
            if (e.has("quantity")) return Number(e.get("quantity"));
          } else {
            const t = e.split("&");
            for (const e of t) {
              const t = e.split("=");
              if ("quantity" === t[0]) return Number(t[1]);
            }
          }
        }
        return 1;
      }
      function C(e) {
        if (null == e || "object" != typeof e) return null;
        if ("remote" in e && "boolean" == typeof e.remote) return e.remote;
        let t = null;
        var n;
        if (
          ("merchandise" in e
            ? (t = null === (n = e.merchandise) || void 0 === n ? void 0 : n.id)
            : "variant_id" in e
            ? (t = e.variant_id)
            : "id" in e && (t = e.id),
          t)
        ) {
          const e = (function (e) {
            let t = null,
              n = null;
            const r = y();
            var o;
            return (
              r.products
                ? ({ product: t, variant: n } = x(e, r.products))
                : r.product && ((n = w(e, r.product)), n && (t = r.product)),
              n && null !== (o = t) && void 0 !== o ? o : null
            );
          })(String(t));
          if (e && "remote" in e && "boolean" == typeof e.remote)
            return e.remote;
        }
        return null;
      }
      function I(e, n, r) {
        const o = (function (e) {
          var t, n, r, o, i, s, a, c, u, l, d, p, f, m, h;
          const v =
              (null === (t = e.merchandise) || void 0 === t
                ? void 0
                : t.product.title) || void 0,
            g =
              (null === (n = e.merchandise) || void 0 === n
                ? void 0
                : n.title) || void 0,
            b = v && g ? `${v} - ${g}` : v || g || "",
            y = C(e.merchandise);
          return e
            ? {
                productId:
                  null === (r = e.merchandise) ||
                  void 0 === r ||
                  null === (o = r.product) ||
                  void 0 === o
                    ? void 0
                    : o.id,
                variantId:
                  null === (i = e.merchandise) || void 0 === i ? void 0 : i.id,
                name: b,
                sku:
                  null === (s = e.merchandise) || void 0 === s ? void 0 : s.sku,
                category:
                  null === (a = e.merchandise) ||
                  void 0 === a ||
                  null === (c = a.product) ||
                  void 0 === c
                    ? void 0
                    : c.type,
                brand:
                  null === (u = e.merchandise) ||
                  void 0 === u ||
                  null === (l = u.product) ||
                  void 0 === l
                    ? void 0
                    : l.vendor,
                variant:
                  null === (d = e.merchandise) || void 0 === d
                    ? void 0
                    : d.title,
                price:
                  null === (p = e.merchandise) ||
                  void 0 === p ||
                  null === (f = p.price) ||
                  void 0 === f
                    ? void 0
                    : f.amount,
                quantity: e.quantity,
                currency:
                  null === (m = e.merchandise) ||
                  void 0 === m ||
                  null === (h = m.price) ||
                  void 0 === h
                    ? void 0
                    : h.currencyCode,
                cartToken: P(document.cookie).cart || void 0,
                remote: y,
              }
            : {};
        })(e);
        window.ShopifyAnalytics &&
          window.ShopifyAnalytics.lib &&
          "function" == typeof window.ShopifyAnalytics.lib.track &&
          window.ShopifyAnalytics.lib.track(r || t, { ...o }, void 0, void 0, {
            addApiSource: n,
            shopifyEmitted: !0,
          });
      }
      function P(e) {
        const t = {};
        for (const r of e.split(/ *; */)) {
          const [e, o] = r.split("=");
          if (void 0 !== e)
            try {
              t[decodeURIComponent(e)] = decodeURIComponent(o || "");
            } catch (n) {
              continue;
            }
        }
        return t;
      }
      function O(e) {
        var n, r, o;
        if (null === (n = e.extensions) || void 0 === n || !n.cart_changelog)
          return;
        if (
          "function" !=
          typeof (null === (r = window.ShopifyAnalytics) ||
          void 0 === r ||
          null === (o = r.lib) ||
          void 0 === o
            ? void 0
            : o.track)
        )
          return;
        const i = (function (e) {
          try {
            return JSON.parse(atob(e));
          } catch (t) {
            return {};
          }
        })(e.extensions.cart_changelog);
        i.items_added &&
          Array.isArray(i.items_added) &&
          (function (e) {
            const t = [];
            return (
              e.forEach((e) => {
                const n = {
                  productId: e.product_id,
                  variantId: e.variant_id,
                  name: e.title,
                  sku: e.sku,
                  category: e.product_type,
                  brand: e.vendor,
                  variant: e.variant_title,
                  price: e.price,
                  quantity: e.quantity,
                  currency: window.ShopifyAnalytics.meta.currency,
                  cartToken: P(document.cookie).cart || void 0,
                };
                t.push(n);
              }),
              t
            );
          })(i.items_added).forEach((e) => {
            window.ShopifyAnalytics.lib.track(t, e, void 0, void 0, {
              addApiSource: "storefrontApi",
              shopifyEmitted: !0,
            });
          });
      }
      function T(e, t, n, r, o) {
        if (t.length !== n.length)
          throw new f(
            "Payload body and response have different number of items"
          );
        t.forEach((t, i) => {
          let s = 1;
          try {
            var a;
            const e = null === (a = n[i]) || void 0 === a ? void 0 : a.quantity;
            s = e ? Number(e) : 1;
          } catch (c) {}
          N(e, t, s, r, o);
        });
      }
      function R(t, n, r, o, i, s) {
        let a;
        if (
          (function (e) {
            return (
              e &&
              "object" == typeof e &&
              "merchandise" in e &&
              "cost" in e &&
              "quantity" in e
            );
          })(n)
        )
          a = n;
        else {
          const e = y().currency,
            t = {
              id: i.includes("add") ? String(n.id) : String(n.variant_id),
              image: { src: n.image },
              price: { amount: n.presentment_price, currencyCode: e },
              product: {
                id: String(n.product_id),
                title: n.product_title,
                vendor: n.vendor,
                type: n.product_type,
                untranslatedTitle: n.untranslated_product_title,
                url: n.url,
              },
              sku: n.sku,
              title: n.variant_title,
              untranslatedTitle: n.untranslated_variant_title,
            };
          a = {
            cost: {
              totalAmount: { amount: t.price.amount * r, currencyCode: e },
            },
            merchandise: t,
            quantity: Number(r),
          };
        }
        var c;
        (U(n, "fetch", s) || t(o, { cartLine: a }),
        o === e &&
          (i.includes("change") ||
            i.includes("update") ||
            i.includes("permalink"))) &&
          I(
            {
              ...a,
              merchandise: {
                ...(a.merchandise || {}),
                remote:
                  null !== (c = null == n ? void 0 : n.remote) && void 0 !== c
                    ? c
                    : null,
              },
            },
            i
          );
      }
      function N(t, n, r, o, i) {
        R(t, n, r, e, o, i);
      }
      function j(e, t, n, r) {
        var o;
        const i = t.items,
          s =
            null === (o = t.items_changelog) || void 0 === o ? void 0 : o.added;
        s &&
          Array.isArray(s) &&
          s
            .map((e) => {
              const t = i.find(
                (t) => String(t.variant_id) === String(e.variant_id)
              );
              return t
                ? {
                    variant_id: t.variant_id,
                    view_key: t.key,
                    image: t.image,
                    presentment_price: t.presentment_price,
                    product_id: t.product_id,
                    vendor: t.vendor,
                    product_type: t.product_type,
                    untranslated_product_title: t.product_title,
                    url: t.url,
                    sku: t.sku,
                    product_title: t.product_title,
                    variant_title: t.variant_title,
                    untranslated_variant_title: t.variant_title,
                    quantity: e.quantity,
                    remote: t.remote,
                  }
                : null;
            })
            .filter((e) => null !== e)
            .forEach((t) => {
              N(e, t, t.quantity, n, r);
            });
      }
      function $(e, t, n, r) {
        const o = t.items_added,
          i = t.items_removed;
        o.forEach((t) => {
          N(e, t, null == t ? void 0 : t.quantity, n, r);
        }),
          i.forEach((t) => {
            !(function (e, t, n, r, o) {
              R(e, t, n, "product_removed_from_cart", r, o);
            })(e, t, null == t ? void 0 : t.quantity, n, r);
          });
      }
      function D(t, n, r, o) {
        try {
          const i = (function (e) {
            const t = [];
            if (e.id) t.push({ id: e.id, quantity: Number(e.quantity) || 1 });
            else if (e.items)
              for (const n of e.items)
                n.id && t.push({ id: n.id, quantity: Number(e.quantity) || 1 });
            return t;
          })(n);
          if (0 === i.length) return !1;
          !(function (t, n, r, o) {
            for (const i of n) {
              const n = i.id.toString(),
                s = i.quantity,
                a = _(n, r),
                c = {
                  cost: {
                    totalAmount: {
                      amount: a.price.amount * s,
                      currencyCode: a.price.currencyCode,
                    },
                  },
                  merchandise: a,
                  quantity: Number(s),
                };
              t(e, { cartLine: c }), I(c, o);
            }
          })(t, i, r, o);
        } catch (i) {
          return !1;
        }
        return !0;
      }
      function M(e) {}
      function U(e, t, n) {
        const r = (function () {
            const e = y();
            return Boolean(e.remoteProductsEnabled);
          })(),
          o = C(e);
        if (!r || null == n || !n.filterRemoteProducts) return !1;
        switch (t) {
          case "fetch":
            return !0 === o;
          case "form":
            return !0 === o || null === o;
          default:
            return t;
        }
      }
      const L =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/+cart\/+add(?:\.js|\.json)?\/*$/,
        z =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/+cart\/+change(?:\.js|\.json)?\/*$/,
        B =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/+cart\/+update(?:\.js|\.json)?\/*$/,
        H =
          /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/api\/(\d{4}-\d{2}|unstable)\/graphql\.json(\?.*)?$/;
      class W {
        static handleXhrOpen() {}
        static handleXhrDone(e) {
          if (!(e.xhr.status >= 400))
            try {
              const t = document.createElement("a");
              t.href = e.url;
              const n = t.pathname ? t.pathname : e.url;
              t.href = e.xhr.responseURL;
              const r = t.pathname ? t.pathname : e.xhr.responseURL;
              let o = !1;
              if (
                n.match(L) &&
                (function (e, t) {
                  return k(e) !== k(t);
                })(n, r)
              ) {
                const t = E(e.body);
                o = D(e.publish, t, e.initData, "add-xhr-redirect");
              }
              if (o) return;
              n.match(L)
                ? W.parsePayloadResponse(e, (t) => {
                    const n = Object.keys(t).find((e) => "items" === e);
                    if (n) {
                      const o = t[n];
                      let i;
                      try {
                        i = JSON.parse(e.body).items;
                      } catch (r) {
                        i = (function (e, t) {
                          const n = new Array(t);
                          for (let r = 0; r < t; r++) n[r] = {};
                          for (const r of decodeURI(e).split("&")) {
                            const [e = "", t] = r.split("="),
                              o = e.match(/items\[(\d+)\]\[(\w+)\].*/);
                            if (o) {
                              const e = Number(o[1]),
                                r = o[2];
                              "quantity" === r
                                ? (n[e].quantity = t)
                                : "id" === r && (n[e].id = t);
                            }
                          }
                          return n;
                        })(e.body, o.length);
                      }
                      T(e.publish, o, i, "add-xhr-bulk", e.context);
                    } else N(e.publish, t, A(e.body), "add-xhr", e.context);
                  })
                : n.match(z)
                ? W.parsePayloadResponse(e, (t) => {
                    $(e.publish, t, "change-xhr", e.context);
                  })
                : n.match(B)
                ? W.parsePayloadResponse(e, (t) => {
                    j(e.publish, t, "update-xhr", e.context);
                  })
                : n.match(H) &&
                  W.parsePayloadResponse(e, (e) => {
                    O(e);
                  });
            } catch (t) {}
        }
        static parseBlobToJson(e, t) {
          const n = new FileReader();
          n.addEventListener("loadend", () => {
            t(JSON.parse(String.fromCharCode(...new Uint8Array(n.result))));
          }),
            n.readAsArrayBuffer(e);
        }
        static parsePayloadResponse(e, t) {
          e.xhr.response instanceof Blob
            ? W.parseBlobToJson(e.xhr.response, t)
            : e.xhr.responseText && t(JSON.parse(e.xhr.responseText));
        }
        constructor(e, t, n, r, o, i, s) {
          (this.oldOnReadyStateChange = void 0),
            (this.xhr = void 0),
            (this.url = void 0),
            (this.method = void 0),
            (this.body = void 0),
            (this.publish = void 0),
            (this.initData = void 0),
            (this.context = void 0),
            (this.xhr = e),
            (this.url = t),
            (this.method = n),
            (this.body = r),
            (this.publish = o),
            (this.initData = i),
            (this.context = s);
        }
        onReadyStateChange() {
          4 === this.xhr.readyState &&
            W.handleXhrDone({
              method: this.method,
              url: this.url,
              body: this.body,
              xhr: this.xhr,
              publish: this.publish,
              initData: this.initData,
              context: this.context,
            }),
            this.oldOnReadyStateChange &&
              this.oldOnReadyStateChange.call(
                this.xhr,
                new Event("oldOnReadyStateChange")
              );
        }
      }
      function q(t, n, r) {
        !(function (e, t, n, r) {
          var o;
          if (
            void 0 ===
            (null == e || null === (o = e.prototype) || void 0 === o
              ? void 0
              : o.open)
          )
            return;
          const i = e.prototype.open,
            s = e.prototype.send;
          Reflect.defineProperty(e.prototype, "open", {
            value(e, t) {
              (this._url = t), (this._method = e), i.apply(this, arguments);
            },
          }),
            Reflect.defineProperty(e.prototype, "send", {
              value(e) {
                if (!(e instanceof Document)) {
                  const o = new W(
                    this,
                    this._url,
                    this._method,
                    e || "",
                    t,
                    n,
                    r
                  );
                  this.addEventListener
                    ? this.addEventListener(
                        "readystatechange",
                        o.onReadyStateChange.bind(o),
                        !1
                      )
                    : ((o.oldOnReadyStateChange = this.onreadystatechange),
                      (this.onreadystatechange = o.onReadyStateChange));
                }
                s.call(this, e);
              },
            });
        })(window.XMLHttpRequest, t, n, r),
          (function (e, t, n, r) {
            const o = e.fetch;
            if ("function" != typeof o) return;
            const i = (function (e, t, n, r) {
              return function (...o) {
                return e
                  .apply(this, Array.prototype.slice.call(o))
                  .then((e) => {
                    var o;
                    if (!e.ok) return e;
                    const i = document.createElement("a");
                    i.href = e.url;
                    const s = i.pathname ? i.pathname : e.url;
                    let a,
                      c = !1;
                    if (
                      (s.match(L) &&
                        null !== (o = arguments[1]) &&
                        void 0 !== o &&
                        o.body &&
                        e.redirected &&
                        ((a = E(arguments[1].body)),
                        (c = D(t, a, n, "add-fetch-redirect"))),
                      c)
                    )
                      return e;
                    try {
                      if (s.match(L)) {
                        try {
                          if (
                            ((a = a || E(arguments[1].body)),
                            Object.keys(a).includes("items"))
                          )
                            return (
                              (function (e, t, n, r) {
                                t.clone()
                                  .json()
                                  .then((t) => {
                                    const o = n.items,
                                      i = t.items;
                                    return (
                                      T(e, i, o || [], "add-fetch-bulk", r), t
                                    );
                                  })
                                  .catch(M);
                              })(t, e, a, r),
                              e
                            );
                        } catch (u) {}
                        !(function (e, t, n, r) {
                          const o = A(n);
                          t.clone()
                            .json()
                            .then((t) => N(e, t, o, "add-fetch", r))
                            .catch(M);
                        })(t, e, arguments[1].body, r);
                      } else
                        s.match(z)
                          ? (function (e, t, n) {
                              t.clone()
                                .json()
                                .then((t) => {
                                  $(e, t, "change-fetch", n);
                                })
                                .catch(M);
                            })(t, e, r)
                          : s.match(B)
                          ? (function (e, t, n) {
                              t.clone()
                                .json()
                                .then((t) => {
                                  j(e, t, "update-fetch", n);
                                })
                                .catch(M);
                            })(t, e, r)
                          : s.match(H) &&
                            (function (e) {
                              e.ok &&
                                e
                                  .clone()
                                  .json()
                                  .then((e) => {
                                    O(e);
                                  })
                                  .catch(M);
                            })(e);
                    } catch (u) {}
                    return e;
                  });
              };
            })(o, t, n, r);
            Reflect.defineProperty(e, "fetch", { value: i });
          })(window, t, n, r),
          i((i) => {
            const s = i.getAttribute("action");
            s &&
              s.indexOf("/cart/add") >= 0 &&
              o(i, "submit", (o) => {
                !(function (t, n, r, o) {
                  const i = n || window.event;
                  if (!i) return;
                  if (
                    i.defaultPrevented ||
                    (i.isDefaultPrevented && i.isDefaultPrevented())
                  )
                    return;
                  const s = i.currentTarget || i.srcElement;
                  if (
                    s &&
                    s instanceof Element &&
                    (s.getAttribute("action") || s.getAttribute("href"))
                  )
                    try {
                      const n = (function (e) {
                        let t;
                        const n =
                          e.querySelector('[name="id"]') ||
                          (e instanceof HTMLFormElement &&
                            e.elements.namedItem("id"));
                        return (
                          n instanceof HTMLSelectElement && n.options
                            ? (t = n.options[n.selectedIndex])
                            : (n instanceof HTMLOptionElement ||
                                n instanceof HTMLInputElement) &&
                              (t = n),
                          t
                        );
                      })(s);
                      if (!n) return;
                      const i = n.value,
                        a = (function (e) {
                          const t = e.querySelector('[name="quantity"]');
                          return t instanceof HTMLInputElement
                            ? Number(t.value)
                            : 1;
                        })(s),
                        c = _(i, r);
                      if (U(c, "form", o)) return;
                      const u = {
                        cost: {
                          totalAmount: {
                            amount: c.price.amount * a,
                            currencyCode: c.price.currencyCode,
                          },
                        },
                        merchandise: c,
                        quantity: Number(a),
                      };
                      t(e, { cartLine: u });
                    } catch (a) {}
                })(t, o, n, r);
              });
          });
      }
      class V extends TypeError {
        constructor(e) {
          super(e),
            (this.name = "ConsentValidationError"),
            Object.setPrototypeOf(this, V.prototype);
        }
      }
      const F = "visitorConsentCollected",
        X = "p",
        J = "a",
        K = "m",
        Y = "t",
        G = "m",
        Z = "a",
        Q = "p",
        ee = "s",
        te = "marketing",
        ne = "analytics",
        re = "preferences",
        oe = "sale_of_data";
      function ie(e, t) {
        if (null === e) return "null";
        if (Array.isArray(e)) return `[${e.map((e) => ie(e, !0)).join(",")}]`;
        if ("object" == typeof e) {
          let n = [];
          for (const t in e)
            e.hasOwnProperty(t) &&
              void 0 !== e[t] &&
              "" !== e[t] &&
              n.push(`${t}:${ie(e[t], !0)}`);
          const r = n.join(",");
          return t ? `{${r}}` : r;
        }
        return "string" == typeof e ? `"${e}"` : `${e}`;
      }
      function se(e) {
        try {
          return decodeURIComponent(e);
        } catch (t) {
          return "";
        }
      }
      n(6364);
      const ae = () =>
        "undefined" != typeof __CtaTestEnv__ && "true" === __CtaTestEnv__;
      class ce {}
      (ce.warn = (e) => {
        ae() || console.warn(e);
      }),
        (ce.error = (e) => {
          ae() || console.error(e);
        }),
        (ce.info = (e) => {
          ae() || console.info(e);
        }),
        (ce.debug = (e) => {
          ae() || console.debug(e);
        }),
        (ce.trace = (e) => {
          ae() || console.trace(e);
        });
      const ue = ce,
        le = "_tracking_consent";
      function de(e, t = !1) {
        const n = (function () {
          try {
            return document.cookie;
          } catch {
            return !1;
          }
        })()
          ? document.cookie.split("; ")
          : [];
        for (let r = 0; r < n.length; r++) {
          const [t, o] = n[r].split("=");
          if (e === se(t)) return se(o);
        }
        if (
          t &&
          "_tracking_consent" === e &&
          !window.localStorage.getItem("tracking_consent_fetched")
        ) {
          if (ae()) return;
          return (
            console.debug("_tracking_consent missing"),
            (function (e = "/") {
              const t = new XMLHttpRequest();
              t.open("HEAD", e, !1), (t.withCredentials = !0), t.send();
            })(),
            window.localStorage.setItem("tracking_consent_fetched", "true"),
            de(e, !1)
          );
        }
      }
      function pe(e) {
        return e === encodeURIComponent(se(e));
      }
      function fe(e, t, n, r) {
        if (!pe(r))
          throw new TypeError("Cookie value is not correctly URI encoded.");
        if (!pe(e))
          throw new TypeError("Cookie name is not correctly URI encoded.");
        let o = `${e}=${r}`;
        (o += "; path=/"),
          t && (o += `; domain=${t}`),
          (o += `; expires=${new Date(
            new Date().getTime() + n
          ).toUTCString()}`),
          (document.cookie = o);
      }
      function me() {
        const e =
          (function () {
            var e, t;
            const n =
              null === (e = window.Shopify) ||
              void 0 === e ||
              null === (t = e.customerPrivacy) ||
              void 0 === t
                ? void 0
                : t.cachedConsent;
            return n ? se(n) : void 0;
          })() ||
          new URLSearchParams(window.location.search).get("_cs") ||
          de(le) ||
          (function () {
            try {
              var e;
              const [t] =
                  null === (e = performance) || void 0 === e
                    ? void 0
                    : e.getEntriesByType("navigation"),
                n =
                  null == t
                    ? void 0
                    : t.serverTiming.find((e) => "_cmp" === e.name);
              let r = null == n ? void 0 : n.description;
              if (!r) return;
              try {
                r = decodeURIComponent(r);
              } catch {}
              return r;
            } catch {
              return;
            }
          })();
        if (void 0 !== e)
          return (function (e) {
            if ("%" == e.slice(0, 1))
              try {
                e = decodeURIComponent(e);
              } catch {}
            const t = e.slice(0, 1);
            return "{" == t
              ? (function (e) {
                  var t;
                  let n;
                  try {
                    n = JSON.parse(e);
                  } catch {
                    return;
                  }
                  if (
                    "2.1" === n.v &&
                    null !== (t = n.con) &&
                    void 0 !== t &&
                    t.CMP
                  )
                    return n;
                })(e)
              : "3" == t
              ? (function (e) {
                  const t = e.slice(1).split("_"),
                    [n, r, o, i, s] = t;
                  let a, c;
                  try {
                    a = t[5] ? JSON.parse(t.slice(5).join("_")) : void 0;
                  } catch {}
                  if (s) {
                    const e = s.replace(/\*/g, "/").replace(/-/g, "+"),
                      t = Array.from(atob(e))
                        .map((e) =>
                          e.charCodeAt(0).toString(16).padStart(2, "0")
                        )
                        .join("");
                    c = [8, 13, 18, 23].reduce(
                      (e, t) => e.slice(0, t) + "-" + e.slice(t),
                      t
                    );
                  }
                  function u(e) {
                    const t = n.split(".")[0];
                    return t.includes(e.toLowerCase())
                      ? "0"
                      : t.includes(e.toUpperCase())
                      ? "1"
                      : "";
                  }
                  function l(e) {
                    return n.includes(e.replace("t", "s").toUpperCase());
                  }
                  return {
                    v: "3",
                    con: {
                      CMP: { [Z]: u(Z), [Q]: u(Q), [G]: u(G), [ee]: u(ee) },
                    },
                    region: r || "",
                    cus: a,
                    purposes: { [J]: l(J), [X]: l(X), [K]: l(K), [Y]: l(Y) },
                    sale_of_data_region: "t" == i,
                    display_banner: "t" == o,
                    consent_id: c,
                  };
                })(e)
              : void 0;
          })(e);
      }
      function he() {
        try {
          let e = me();
          if (!e) return;
          return e;
        } catch {
          return;
        }
      }
      function ve(e) {
        switch (e) {
          case "1":
            return "yes";
          case "0":
            return "no";
          default:
            return "";
        }
      }
      function ge(e) {
        switch (e) {
          case Z:
            return ne;
          case G:
            return te;
          case Q:
            return re;
          case ee:
            return oe;
        }
      }
      function be(e) {
        const t = he();
        if (!t) return "";
        const n = t.con.CMP;
        return n ? n[e] : "";
      }
      function ye(e) {
        const t = me();
        if (!t || !t.purposes) return !0;
        const n = t.purposes[e];
        return "boolean" != typeof n || n;
      }
      function we() {
        return ye(X);
      }
      function xe() {
        return ye(J);
      }
      function _e() {
        return ye(K);
      }
      function Ee() {
        return ye(Y);
      }
      function Se(e, t) {
        try {
          document.dispatchEvent(new CustomEvent(e, { detail: t || {} }));
        } catch (n) {
          console.error(
            `[Shopify Customer Privacy] Error in event listener for "${e}":`,
            n
          );
        }
      }
      function ke(e) {
        return `${e.origin}${((t = e.pathname), t.replace(/\/$/, ""))}`;
        var t;
      }
      function Ae(e) {
        return e.startsWith("http://") || e.startsWith("https://");
      }
      function Ce(e) {
        switch (e) {
          case "yes":
            return "1";
          case "no":
            return "0";
          default:
            return "";
        }
      }
      n(7960), n(3154), n(1649), n(9604), n(5864);
      const Ie = "_landing_page",
        Pe = "_orig_referrer";
      function Oe(e) {
        const t = e.granular_consent;
        return {
          query: `query { consentManagement { cookies(${ie({
            visitorConsent: {
              marketing: t.marketing,
              analytics: t.analytics,
              preferences: t.preferences,
              saleOfData: t.sale_of_data,
              ...(t.metafields && { metafields: t.metafields }),
            },
            ...(t.email && { visitorEmail: t.email }),
            origReferrer: e.referrer,
            landingPage: e.landing_page,
          })}) { trackingConsentCookie cookieDomain landingPageCookie origReferrerCookie } customerAccountUrl } }`,
          variables: {},
        };
      }
      function Te(e, t, n) {
        const r = t.granular_consent;
        let o = "",
          i = {};
        if (r.customerAccountRequestInfo)
          (o = r.customerAccountRequestInfo.url),
            (i = r.customerAccountRequestInfo.headers);
        else {
          const e =
              r.storefrontAccessToken ||
              (function () {
                const e =
                    document.documentElement.querySelector("#shopify-features"),
                  t = "Could not find liquid access token";
                if (!e) return void ue.warn(t);
                const n = e.textContent;
                if (!n) return void ue.warn(t);
                let r;
                try {
                  r = JSON.parse(n).accessToken;
                } catch {
                  return void ue.warn(t);
                }
                if (r) return r;
                ue.warn(t);
              })(),
            t = r.checkoutRootDomain || window.location.host;
          o = `${
            /^localhost(:|$)/.test(t) ? "http:" : "https:"
          }//${t}/api/unstable/graphql.json`;
          const n = r.isExtensionToken
            ? "Shopify-Storefront-Extension-Token"
            : "x-shopify-storefront-access-token";
          i = { [n]: e };
        }
        const s = {
          headers: {
            "content-type": "application/json",
            ...i,
            ...(ae() ? { "x-test-payload": JSON.stringify(t) } : {}),
          },
          body: JSON.stringify(Oe(t)),
          method: "POST",
        };
        return fetch(o, s)
          .then((e) => {
            if (e.ok) return e.json();
            throw new Error("Server error");
          })
          .then((o) => {
            var i, s;
            const a = 31536e6,
              c = 12096e5,
              u = o.data.consentManagement.cookies.cookieDomain,
              l = u || r.checkoutRootDomain || window.location.hostname,
              d = r.storefrontRootDomain || u || window.location.hostname,
              p = o.data.consentManagement.cookies.trackingConsentCookie,
              f = o.data.consentManagement.cookies.landingPageCookie,
              m = o.data.consentManagement.cookies.origReferrerCookie,
              h =
                null !==
                  (i =
                    null === (s = o.data.consentManagement) || void 0 === s
                      ? void 0
                      : s.customerAccountUrl) && void 0 !== i
                  ? i
                  : "";
            return (
              p &&
                (function (e) {
                  var t;
                  (null !== (t = window.Shopify) &&
                    void 0 !== t &&
                    t.customerPrivacy) ||
                    ((window.Shopify = window.Shopify || {}),
                    (window.Shopify.customerPrivacy = {})),
                    (window.Shopify.customerPrivacy.cachedConsent = e);
                })(p),
              r.headlessStorefront &&
                (fe(le, l, a, p),
                f && m && (fe(Ie, l, c, f), fe(Pe, l, c, m)),
                d !== l &&
                  (fe(le, d, a, p),
                  f && m && (fe(Ie, d, c, f), fe(Pe, d, c, m)))),
              void 0 !== t.granular_consent &&
                (function (e) {
                  const t = e[K],
                    n = e[Y],
                    r = e[J],
                    o = e[X];
                  !0 === t
                    ? Se("firstPartyMarketingConsentAccepted")
                    : !1 === t && Se("firstPartyMarketingConsentDeclined"),
                    !0 === n
                      ? Se("thirdPartyMarketingConsentAccepted")
                      : !1 === n && Se("thirdPartyMarketingConsentDeclined"),
                    !0 === r
                      ? Se("analyticsConsentAccepted")
                      : !1 === r && Se("analyticsConsentDeclined"),
                    !0 === o
                      ? Se("preferencesConsentAccepted")
                      : !1 === o && Se("preferencesConsentDeclined");
                  const i = (function (e) {
                    return {
                      marketingAllowed: e[K],
                      saleOfDataAllowed: e[Y],
                      analyticsAllowed: e[J],
                      preferencesAllowed: e[X],
                      firstPartyMarketingAllowed: e[K],
                      thirdPartyMarketingAllowed: e[Y],
                    };
                  })(e);
                  Se(F, i);
                  const s = [r, o, t, n];
                  s.every((e) => !0 === e) && Se("trackingConsentAccepted"),
                    s.every((e) => !1 === e) && Se("trackingConsentDeclined");
                })({ [X]: we(), [J]: xe(), [K]: _e(), [Y]: Ee() }),
              (function (e, t) {
                if (!e) return;
                const n = (function (e) {
                  const t = new URL(e, window.location.origin),
                    n = Ae(e)
                      ? ke(t)
                      : ke(t).replace(window.location.origin, "");
                  return document.querySelectorAll(`a[href^="${n}"]`);
                })(e);
                if (!n.length) return;
                const r = (function () {
                    const e = me();
                    return (e && e.consent_id) || "";
                  })(),
                  o = (function (e) {
                    const t = e();
                    if (!t) return null;
                    if (
                      !(
                        "analytics" in t &&
                        "marketing" in t &&
                        "preferences" in t
                      )
                    )
                      return null;
                    const n = Ce(t.analytics),
                      r = Ce(t.marketing),
                      o = Ce(t.preferences);
                    return "" === n && "" === r && "" === o
                      ? null
                      : `a${n}m${r}p${o}`;
                  })(t);
                for (const i of Array.from(n)) {
                  const t = i.getAttribute("href");
                  if (!t) continue;
                  const n = new URL(t, window.location.origin);
                  if (
                    (r && n.searchParams.set("consent_id", r),
                    o && n.searchParams.set("consent", o),
                    r || o)
                  ) {
                    const t = Ae(e)
                      ? n.toString()
                      : n.toString().replace(window.location.origin, "");
                    i.setAttribute("href", t);
                  }
                }
              })(h, e),
              void 0 !== n && n(null, o),
              o
            );
          })
          .catch((e) => {
            const t =
              "Error while setting storefront API consent: " + e.message;
            if (void 0 === n) throw { error: t };
            n({ error: t });
          });
      }
      class Re {
        constructor(e = !1) {
          if (((this.useInstrumentation = !1), Re.instance)) return Re.instance;
          (Re.instance = this), (this.useInstrumentation = e);
        }
        instrumentationEnabled() {
          return this.useInstrumentation;
        }
        setUseInstrumentation(e) {
          this.useInstrumentation = e;
        }
        produce(e, t) {
          if (this.instrumentationEnabled() && xe())
            try {
              const n = {
                  schema_id: "customer_privacy_api_events/2.0",
                  payload: {
                    shop_domain: window.location.host,
                    method_name: e,
                    call_details: t || null,
                  },
                },
                r = {
                  accept: "*/*",
                  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                  "content-type": "application/json; charset=utf-8",
                  "x-monorail-edge-event-created-at-ms": String(Date.now()),
                  "x-monorail-edge-event-sent-at-ms": String(Date.now()),
                };
              if (!window.location.host.endsWith("spin.dev"))
                return fetch(
                  "https://monorail-edge.shopifysvc.com/v1/produce",
                  {
                    headers: r,
                    body: JSON.stringify(n),
                    method: "POST",
                    mode: "cors",
                    credentials: "omit",
                  }
                );
              console.log("Monorail event from consent API:", r, n);
            } catch (n) {}
        }
      }
      Re.instance = void 0;
      const Ne = [te, ne, re, oe],
        je = [
          ...Ne,
          "email",
          "rootDomain",
          "checkoutRootDomain",
          "storefrontRootDomain",
          "storefrontAccessToken",
          "headlessStorefront",
          "isExtensionToken",
          "metafields",
          "customerAccountRequestInfo",
        ],
        $e = Ne.map((e) => `"${e}"`).join(", "),
        De = "https://shopify.dev/docs/api/customer-privacy";
      function Me() {
        if ("" === document.referrer) return !0;
        const e = document.createElement("a");
        return (
          (e.href = document.referrer), window.location.hostname != e.hostname
        );
      }
      function Ue() {
        return (
          !!(function (e = null) {
            return null === e && (e = he()), void 0 === e;
          })() ||
          (_e() && xe())
        );
      }
      function Le() {
        const e = {},
          t = { m: be(G), a: be(Z), p: be(Q), s: be(ee) };
        for (const n of Object.keys(t)) e[ge(n)] = ve(t[n]);
        return e;
      }
      function ze() {
        return _e();
      }
      function Be() {
        return xe();
      }
      function He() {
        return we();
      }
      function We() {
        return Ee();
      }
      const qe = [
          "page_viewed",
          "collection_viewed",
          "product_viewed",
          "search_submitted",
          "product_added_to_cart",
          "product_added_to_cart_next",
          "checkout_started",
          "checkout_completed",
          "payment_info_submitted",
          "checkout_contact_step_started",
          "checkout_contact_info_submitted",
          "checkout_address_info_submitted",
          "checkout_shipping_step_started",
          "checkout_shipping_info_submitted",
          "checkout_payment_step_started",
          "session_started",
        ],
        Ve = "wpm",
        Fe = "trekkie",
        Xe = "trekkie-next";
      let Je, Ke;
      function Ye(e) {
        return `${e || "sh"}-${(function () {
          const e = "xxxx-4xxx-xxxx-xxxxxxxxxxxx";
          let t = "";
          try {
            const n = window.crypto,
              r = new Uint16Array(31);
            n.getRandomValues(r);
            let o = 0;
            t = e
              .replace(/[x]/g, (e) => {
                const t = r[o];
                if ("number" != typeof t)
                  throw new Error(
                    `Event ID service: Invalid random number at index "${o}".`
                  );
                const n = t % 16;
                return o++, ("x" === e ? n : (3 & n) | 8).toString(16);
              })
              .toUpperCase();
          } catch (n) {
            t = e
              .replace(/[x]/g, (e) => {
                const t = (16 * Math.random()) | 0;
                return ("x" === e ? t : (3 & t) | 8).toString(16);
              })
              .toUpperCase();
          }
          return `${(function () {
            let e = 0,
              t = 0;
            e = new Date().getTime() >>> 0;
            try {
              t = performance.now() >>> 0;
            } catch (n) {
              t = 0;
            }
            return Math.abs(e + t)
              .toString(16)
              .toLowerCase()
              .padStart(8, "0");
          })()}-${t}`;
        })()}`;
      }
      function Ge() {
        (window.Shopify = window.Shopify || {}),
          window.Shopify.evids ||
            ((Je = {}),
            (Ke = { [Ve]: {}, [Fe]: {}, [Xe]: {} }),
            (window.Shopify.evids = (...e) =>
              (function (e, t) {
                if (
                  !(function (e) {
                    return qe.includes(e);
                  })(e) ||
                  ((null == t ? void 0 : t.analyticsFramework) !== Fe &&
                    "wpm" !== (null == t ? void 0 : t.analyticsFramework) &&
                    (null == t ? void 0 : t.analyticsFramework) !== Xe)
                )
                  return Ye("shu");
                const n =
                  "string" == typeof (r = t.cacheKey) && r ? r : "default";
                var r;
                const o = (function (e, t, n) {
                  var r;
                  const o = Ke[t],
                    i = null !== (r = o[e]) && void 0 !== r ? r : (o[e] = {}),
                    s = i[n];
                  return (i[n] = "number" == typeof s ? s + 1 : 0);
                })(e, t.analyticsFramework, n);
                return (function (e, t, n) {
                  var r, o;
                  const i =
                      null !== (r = Je[e]) && void 0 !== r ? r : (Je[e] = {}),
                    s = null !== (o = i[n]) && void 0 !== o ? o : [];
                  let a = s[t];
                  return a || ((a = Ye()), s.push(a)), (i[n] = s), a;
                })(e, o, n);
              })(...e)));
      }
      const Ze = "webPixelsManager",
        Qe = "production",
        et = "0.0.475",
        tt = "modern",
        nt = "2760921ew4f3eef0cpe6e0aac2m57029b82",
        rt = "b2760921ew4f3eef0cpe6e0aac2m57029b82m.js";
      function ot(e, t) {
        try {
          return e();
        } catch (n) {
          return t;
        }
      }
      const it = "isMerchantSession",
        st = () => {
          let e, t;
          return {
            promise: new Promise((...n) => {
              [e, t] = n;
            }),
            resolve: e,
            reject: t,
          };
        };
      function at(e) {
        if (e <= 0 || e > 100)
          throw new f("Invalid sampling percent", {
            groupingHash: "Utilities:Sample:InvalidSamplingPercent",
          });
        return 100 * Math.random() <= e;
      }
      n(8142), n(1256), n(2513), n(6456), n(663), n(1884), n(8006);
      var ct = n(1554),
        ut = n(6718),
        lt = n.n(ut);
      class dt extends Error {
        constructor(...e) {
          super(...e),
            (this.message =
              "Excessive Stacktrace: May indicate infinite loop forming");
        }
      }
      const pt = (e, t) => {
          const n = (function (e) {
            if (
              ((t = e),
              "string" !=
                typeof (t?.stack || t?.stacktrace || t?.["opera#sourceloc"]) ||
                t.stack === `${t.name}: ${t.message}`)
            )
              return null;
            var t;
            try {
              const t = lt()
                .parse(e)
                .reduce((e, t) => {
                  const n = (function ({
                    functionName: e,
                    lineNumber: t,
                    columnNumber: n,
                  }) {
                    const r = /^global code$/i.test((o = e) || "")
                      ? "global code"
                      : o;
                    var o;
                    return {
                      file: `https://cdn.shopify.com/cdn/wpm/${rt}`,
                      method: r,
                      lineNumber: t,
                      columnNumber: n,
                    };
                  })(t);
                  try {
                    return "{}" === JSON.stringify(n) ? e : e.concat(n);
                  } catch (r) {
                    return e;
                  }
                }, []);
              return {
                errorClass: e?.name,
                message: e?.message,
                stacktrace: t,
                type: "browserjs",
              };
            } catch (n) {
              return null;
            }
          })(e);
          if (n) return n;
          const r = (function (e, t) {
            let n = "";
            const r = {
                lineNumber: "1",
                columnNumber: "1",
                method: t,
                file: `https://cdn.shopify.com/cdn/wpm/${rt}`,
              },
              o = e.stackTrace || e.stack || e.description;
            try {
              if (o) {
                n = e.stack.split("\n")[0];
                const t = e.stack.match(/([0-9]+):([0-9]+)/);
                if (
                  t &&
                  t.length > 2 &&
                  ((r.lineNumber = t[1]),
                  (r.columnNumber = t[2]),
                  parseInt(r.lineNumber, 10) > 1e5)
                )
                  throw new dt();
              }
              return {
                errorClass: e?.name || n,
                message: e?.message || n,
                stacktrace: [r],
                type: "browserjs",
              };
            } catch (i) {
              return null;
            }
          })(e, t);
          return (
            r || {
              errorClass: e?.name,
              message: e?.message,
              stacktrace: [],
              type: "browserjs",
            }
          );
        },
        ft = ["number", "boolean", "symbol"],
        mt = (e, { context: t }) => {
          const n = "v1/" + (t ? `${t}/` : "");
          return null == e || ft.includes(typeof e) || Array.isArray(e)
            ? `${n}UnknownError`
            : "string" == typeof e
            ? `${n}${e}`
            : "groupingHash" in e && "string" == typeof e.groupingHash
            ? `${n}${e.groupingHash}`
            : `${n}${"Error" !== e.name && e.name ? e.name : e.message}`;
        };
      class ht extends Error {
        constructor(...e) {
          super(...e),
            Error.captureStackTrace && Error.captureStackTrace(this, ht);
        }
      }
      const vt = {
          severity: "error",
          context: "",
          unhandled: !0,
          library: "browser",
          surface: m.Unknown,
        },
        gt = {
          metadata: {
            shopId: -1,
            surface: m.NotAvailable,
            browserTarget: b.NotAvailable,
            shopDomain: "n/a",
          },
          notify: (e, t) => {
            try {
              if ("metric" === t?.type || !0 === e?.metric) return;
              if (t?.options?.sampleRate && !at(t.options.sampleRate)) return;
              const n = {
                ...vt,
                ...t,
                ...gt.metadata,
                shopUrl: self.location.href,
              };
              if (
                n.browserTarget === b.NotAvailable ||
                n.browserTarget === b.Unknown ||
                n.surface === m.NotAvailable ||
                n.surface === m.Unknown ||
                !bt(n.shopUrl)
              )
                return void (console?.error && console.error(e));
              const r = (function (e, t) {
                const {
                    userAgent: n,
                    context: r,
                    severity: o,
                    unhandled: i,
                    library: s,
                    hashVersionSandbox: a,
                    sandboxUrl: c,
                    pixelId: u,
                    pixelType: l,
                    runtimeContext: d,
                    shopId: p,
                    initConfig: f,
                    notes: m,
                    surface: h,
                    shopDomain: v,
                    browserTarget: g,
                    shopUrl: b,
                  } = t,
                  {
                    device: y,
                    os: w,
                    browser: x,
                    engine: _,
                  } = (function (t) {
                    try {
                      return new ct.UAParser(t).getResult();
                    } catch (e) {
                      return {
                        ua: "",
                        browser: { name: "", version: "", major: "" },
                        engine: { name: "", version: "" },
                        os: { name: "", version: "" },
                        device: { model: "", type: "", vendor: "" },
                        cpu: { architecture: "" },
                      };
                    }
                  })(n || self.navigator?.userAgent),
                  E = pt(e, r);
                return {
                  payload_version: 5,
                  notifier: {
                    name: "web-pixel-manager",
                    version: et,
                    url: "-",
                  },
                  events: [
                    {
                      exceptions: [E],
                      context: r ? `v1/${r}` : void 0,
                      severity: o,
                      unhandled: i,
                      app: { version: nt },
                      device: {
                        manufacturer: y.vendor,
                        model: y.model,
                        osName: w.name,
                        osVersion: w.version,
                        browserName: x.name,
                        browserVersion: x.version,
                      },
                      request: { url: b, referrer: self.document?.referrer },
                      metaData: {
                        app: {
                          surface: h,
                          library: s,
                          build_target: tt,
                          env: Qe,
                          hash_version_sandbox: a || "N/A",
                          sandbox_url: c || "N/A",
                        },
                        device: {
                          user_agent: n || self.navigator?.userAgent,
                          rendering_engine_name: _.name,
                          rendering_engine_version: _.version,
                          browser_target: g || "N/A",
                          deploy_phase: Qe,
                        },
                        request: {
                          shop_id: p,
                          shop_domain: v || "N/A",
                          shop_url: b,
                          pixel_id: u,
                          pixel_type: l,
                          runtime_context: d,
                        },
                        "Additional Notes": {
                          init_config: JSON.stringify(f),
                          notes: m,
                        },
                        error_source: { shop_id: p },
                        custom: {
                          slice_name: "signals",
                          slice_id: "S-27053f",
                          observe_grouping_key: mt(e, t),
                        },
                      },
                    },
                  ],
                };
              })(e, n);
              fetch("https://error-analytics-production.shopifysvc.com", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Bugsnag-Api-Key": "bcbc9f6762da195561967577c2d74ff8",
                  "Bugsnag-Payload-Version": "5",
                },
                body: JSON.stringify(r),
              }).catch(() => {});
            } catch (n) {}
          },
        },
        bt = (e) => {
          try {
            const t = new URL(e);
            return Boolean(t.protocol.startsWith("http") && t.host);
          } catch {
            return !1;
          }
        },
        yt = new Set(),
        wt = (e) => (
          yt.add(e),
          () => {
            yt.delete(e);
          }
        );
      function xt(e) {
        const t = e;
        yt.forEach((e) => {
          e(t);
        });
      }
      let _t = !1;
      const Et = ["analytics", "preferences", "marketing", "sale_of_data"];
      function St(e, t) {
        return e ? !t || Object.keys(e).every((n) => !e[n] || t[n]) : Ue();
      }
      function kt(e) {
        const { promise: t, resolve: n } = st(),
          r = {
            analytics: Be(),
            marketing: ze(),
            preferences: He(),
            sale_of_data: We(),
          };
        if (St(e, r)) return n(!0), t;
        const o = wt((t) => {
          const r = t.detail;
          St(e, {
            analytics: !0 === r?.analyticsAllowed,
            marketing: !0 === r?.marketingAllowed,
            preferences: !0 === r?.preferencesAllowed,
            sale_of_data: !0 === r?.saleOfDataAllowed,
          }) && (o(), n(!0));
        });
        return t;
      }
      const At = new Set();
      function Ct(e) {
        return At.has(e);
      }
      const It = "6b3fd603",
        Pt = "5476ea20";
      let Ot = (function (e) {
        return (e.Wpm = "wpm"), (e.WebPixels = "web-pixels"), e;
      })({});
      const Tt = {},
        Rt = {
          "pixel:register": {
            start: {
              name: "pixel:register:started",
              params: { pixelId: "", source: "" },
            },
            end: {
              name: "pixel:register:completed",
              params: { pixelId: "", source: "" },
            },
          },
          "page:session": {
            start: { name: "start", params: Tt },
            end: { name: "page:unload", params: Tt },
          },
          completed: {
            start: { name: "start", params: Tt },
            end: { name: "pixels:resolved", params: Tt },
          },
        };
      function Nt(e, t = Tt) {
        const n = jt(e, "end", t),
          r = (function (e, t) {
            try {
              const n = $t(e, "start", t),
                r = $t(e, "end", t),
                o = (function (e, t) {
                  return Dt(e, t);
                })(e, t),
                i = self.performance.measure(o, n, r);
              return {
                ...i,
                duration: Math.round(i.duration),
                startTime: Math.round(i.startTime),
              };
            } catch (n) {
              return null;
            }
          })(e, t);
        return { mark: n, measurement: r };
      }
      function jt(e, t, n) {
        try {
          const r = $t(e, t, n);
          return self.performance.mark(r), { name: r, params: n };
        } catch (r) {
          return { name: null, params: n };
        }
      }
      function $t(e, t, n) {
        return Dt(Rt[e][t].name, n);
      }
      function Dt(e, t = {}) {
        const n = ["wpm", e];
        return (
          Object.keys(t).forEach((e) => {
            const r = t[e];
            r && n.push(r);
          }),
          n.join(":")
        );
      }
      function Mt(e) {
        return (
          null !== e &&
          "object" == typeof e &&
          !Array.isArray(e) &&
          "[object Object]" === Object.prototype.toString.call(e)
        );
      }
      function Ut(e, t = new WeakMap()) {
        if (!Mt(e)) return e;
        const n = t.get(e);
        if (n) return n;
        const r = {};
        t.set(e, r);
        for (const [o, i] of Object.entries(e)) {
          const e = o
            .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
            .replace(/([a-z\d])([A-Z])/g, "$1_$2")
            .toLowerCase();
          Array.isArray(i)
            ? (r[e] = i.map((e) => Ut(e, t)))
            : Mt(i)
            ? (r[e] = Ut(i, t))
            : (r[e] = i);
        }
        return r;
      }
      function Lt(e) {
        return e.replace(/\/$/, "");
      }
      const zt = {
        test: "edge_test_click/1.0",
        load: "web_pixels_manager_load/3.1",
        init: "web_pixels_manager_init/3.2",
        register: "web_pixels_manager_pixel_register/3.8",
        subscriberEventEmit: "web_pixels_manager_subscriber_event_emit/4.1",
        eventPublish: "web_pixels_manager_event_publish/1.7",
        unload: "web_pixels_manager_unload/1.2",
        visitor: "web_pixels_manager_visitor/1.0",
        subscriberEventEmitDom:
          "web_pixels_manager_subscriber_event_emit_dom/2.0",
        subscriberEventEmitPrivacy:
          "web_pixels_manager_subscriber_event_emit_privacy/1.0",
        helperLoad: "web_pixels_helper_load/1.0",
        helperWindowButtonClick: "web_pixels_helper_window_button_click/1.0",
        buyerEventSample: "web_pixels_manager_buyer_event_sample/1.0",
        firstPartyTracking: "storefront_customer_tracking/5.0",
        webPixelsStorefrontCustomerTracking:
          "web_pixels_manager_storefront_customer_tracking/1.0",
        webPixelsPublicEventPayloadTransform:
          "web_pixels_public_event_payload_transform/1.0",
        webPixelsManagerSubscriberEventBlocked:
          "web_pixels_manager_subscriber_event_blocked/1.0",
      };
      function Bt(e, t) {
        return { schemaId: zt[e], payload: t };
      }
      let Ht = "",
        Wt = !1;
      function qt(e = "") {
        Ht = Lt(e);
      }
      let Vt = "wellKnown";
      const Ft = new Array();
      let Xt;
      function Jt(e, t = !1) {
        const n = {
          schema_id: e.schemaId,
          payload: Ut(e.payload),
          metadata: { event_created_at_ms: Gt() },
        };
        Ft.push(n), t ? Yt() : void 0 === Xt && (Xt = setTimeout(Yt, 500));
      }
      function Kt(e, t, n = !1) {
        Jt(Bt(e, t), n);
      }
      function Yt() {
        if (
          (void 0 !== Xt && (clearTimeout(Xt), (Xt = void 0)), 0 === Ft.length)
        )
          return;
        const e = [...Ft];
        (Ft.length = 0),
          (function (e) {
            if (0 === e.length) return !1;
            const t = { metadata: { event_sent_at_ms: Gt() }, events: e };
            !(function (e) {
              const t = Wt;
              Wt = !1;
              const n = `${(function (e) {
                return {
                  global: "https://monorail-edge.shopifysvc.com",
                  wellKnown: `${Ht}/.well-known/shopify/monorail`,
                  staging: "https://monorail-edge-staging.shopifycloud.com",
                  test: "https://localhost",
                }[e || "wellKnown"];
              })(Vt)}/unstable/produce_batch`;
              try {
                if (self.navigator.sendBeacon.bind(self.navigator)(n, e))
                  return !0;
              } catch (r) {}
              if (!t) {
                const t = new XMLHttpRequest();
                try {
                  t.open("POST", n, !0),
                    t.setRequestHeader("Content-Type", "text/plain"),
                    t.send(e);
                } catch (o) {
                  gt.notify(o, {
                    context: "utilities/monorail/sendRequest",
                    unhandled: !1,
                    type: "metric",
                  });
                }
              }
            })(JSON.stringify(t));
          })(e);
      }
      function Gt() {
        return new Date().getTime();
      }
      const Zt = {
        randomUUID:
          "undefined" != typeof crypto &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
      };
      let Qt;
      const en = new Uint8Array(16);
      function tn() {
        if (
          !Qt &&
          ((Qt =
            "undefined" != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)),
          !Qt)
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return Qt(en);
      }
      const nn = [];
      for (let n = 0; n < 256; ++n) nn.push((n + 256).toString(16).slice(1));
      const rn = function (e, t, n) {
        if (Zt.randomUUID && !t && !e) return Zt.randomUUID();
        const r = (e = e || {}).random || (e.rng || tn)();
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
          n = n || 0;
          for (let e = 0; e < 16; ++e) t[n + e] = r[e];
          return t;
        }
        return (function (e, t = 0) {
          return (
            nn[e[t + 0]] +
            nn[e[t + 1]] +
            nn[e[t + 2]] +
            nn[e[t + 3]] +
            "-" +
            nn[e[t + 4]] +
            nn[e[t + 5]] +
            "-" +
            nn[e[t + 6]] +
            nn[e[t + 7]] +
            "-" +
            nn[e[t + 8]] +
            nn[e[t + 9]] +
            "-" +
            nn[e[t + 10]] +
            nn[e[t + 11]] +
            nn[e[t + 12]] +
            nn[e[t + 13]] +
            nn[e[t + 14]] +
            nn[e[t + 15]]
          );
        })(r);
      };
      let on;
      function sn() {
        return (
          on ||
            (on = (function () {
              let e;
              try {
                e = window.Shopify?.evids
                  ? window.Shopify?.evids("session_started", {
                      analyticsFramework: "wpm",
                    })
                  : rn();
              } catch (t) {
                e = rn();
              }
              return e;
            })()),
          on
        );
      }
      function an(e, t, n, r = !0) {
        try {
          const o = {
            ...(r ? Object.getOwnPropertyDescriptor(e, t) : {}),
            ...n,
          };
          return Object.defineProperty(e, t, o);
        } catch (o) {
          return e;
        }
      }
      class cn {
        constructor(e) {
          (this.maxSize = e), (this.cache = new Map());
        }
        get(e) {
          if (!this.cache.has(e)) return;
          const t = this.cache.get(e);
          return this.cache.delete(e), this.cache.set(e, t), t;
        }
        has(e) {
          return this.cache.has(e);
        }
        set(e, t) {
          if (this.cache.size >= this.maxSize) {
            const e = this.cache.keys().next().value;
            this.cache.delete(e);
          }
          return this.cache.set(e, t), this;
        }
        delete(e) {
          return this.cache.delete(e);
        }
        clear() {
          this.cache.clear();
        }
      }
      const un = (e) => ("number" == typeof e ? new cn(e) : new Map()),
        ln = (...e) => JSON.stringify(e);
      function dn(e, { cache: t, cacheKey: n } = {}) {
        function r(...t) {
          const o = r.cache,
            i = (n ?? ln).apply(this, t);
          if (o.has(i)) return o.get(i);
          {
            const n = e(...t);
            return o.set(i, n), n;
          }
        }
        return (r.cache = t ?? un()), r;
      }
      const pn = dn(
          (e = "") => {
            const t = e.indexOf("=");
            return -1 === t
              ? [e.trim(), void 0]
              : [e.slice(0, t).trim(), e.slice(t + 1).trim()];
          },
          { cache: un(100), cacheKey: (e = "") => e }
        ),
        fn = dn(
          (e = "") =>
            e.split(";").reduce((e, t) => {
              const [n, r] = pn(t);
              if (n)
                try {
                  e[decodeURIComponent(n)] = decodeURIComponent(r ?? "");
                } catch {
                  e[n] = r ?? "";
                }
              return e;
            }, Object.create(null)),
          { cache: un(50), cacheKey: (e = "") => e }
        ),
        mn = () => {
          try {
            return document.cookie;
          } catch {
            return;
          }
        },
        hn = (e) => {
          try {
            document.cookie = e;
          } catch {}
        },
        vn = (e) => {
          const t = mn();
          return t ? fn(t)[e] : void 0;
        },
        gn = "_shopify_test",
        bn = new Map();
      const yn = () => vn("_shopify_y") ?? "";
      function wn(e, t) {
        return t.reduce((t, n) => (n in e && (t[n] = e[n]), t), {});
      }
      class xn extends Set {
        constructor(e, t) {
          if (
            (super(),
            (this.maxSize = void 0),
            (this.keep = void 0),
            (Number.isFinite(e) && !Number.isInteger(e)) || e <= 0)
          )
            throw new Error("Invalid maxSize specified");
          (this.maxSize = e), (this.keep = t);
        }
        add(e) {
          if ("oldest" === this.keep) this.size < this.maxSize && super.add(e);
          else if (
            "newest" === this.keep &&
            (super.add(e), this.size > this.maxSize)
          )
            for (const t of this)
              if ((this.delete(t), this.size <= this.maxSize)) break;
          return this;
        }
      }
      const _n = "remote-ui::ready";
      function En(e, { terminate: t = !0, targetOrigin: n = "*" } = {}) {
        var r;
        if ("undefined" == typeof window)
          throw new Error(
            "You can only run fromIframe() in a browser context, but no window was found."
          );
        const o = new WeakMap();
        let i;
        function s(t) {
          t.source === e.contentWindow &&
            t.data === _n &&
            (window.removeEventListener("message", s), i());
        }
        null === (r = e.contentWindow) || void 0 === r || r.postMessage(_n, n);
        const a = new Promise((e) => {
          (i = e), window.addEventListener("message", s);
        });
        return {
          async postMessage(t, r) {
            var o;
            await a,
              null === (o = e.contentWindow) ||
                void 0 === o ||
                o.postMessage(t, n, r);
          },
          addEventListener(t, n) {
            const r = (t) => {
              t.source === e.contentWindow && n(t);
            };
            o.set(n, r), self.addEventListener(t, r);
          },
          removeEventListener(e, t) {
            const n = o.get(t);
            null != n && (o.delete(t), self.removeEventListener(e, n));
          },
          terminate() {
            window.removeEventListener("message", s), t && e.remove();
          },
        };
      }
      const Sn = Symbol.for("RemoteUi::Retain"),
        kn = Symbol.for("RemoteUi::Release"),
        An = Symbol.for("RemoteUi::RetainedBy");
      class Cn {
        constructor() {
          this.memoryManaged = new Set();
        }
        add(e) {
          this.memoryManaged.add(e), e[An].add(this), e[Sn]();
        }
        release() {
          for (const e of this.memoryManaged) e[An].delete(this), e[kn]();
          this.memoryManaged.clear();
        }
      }
      function In(e) {
        return Boolean(e && e[Sn] && e[kn]);
      }
      function Pn(e, { deep: t = !0 } = {}) {
        return On(e, t, new Map());
      }
      function On(e, t, n) {
        const r = n.get(e);
        if (null != r) return r;
        const o = In(e);
        if ((o && e[Sn](), n.set(e, o), t)) {
          if (Array.isArray(e)) {
            const r = e.reduce((e, r) => On(r, t, n) || e, o);
            return n.set(e, r), r;
          }
          if (Nn(e)) {
            const r = Object.keys(e).reduce((r, o) => On(e[o], t, n) || r, o);
            return n.set(e, r), r;
          }
        }
        return n.set(e, o), o;
      }
      function Tn(e, { deep: t = !0 } = {}) {
        return Rn(e, t, new Map());
      }
      function Rn(e, t, n) {
        const r = n.get(e);
        if (null != r) return r;
        const o = In(e);
        if ((o && e[kn](), n.set(e, o), t)) {
          if (Array.isArray(e)) {
            const r = e.reduce((e, r) => Rn(r, t, n) || e, o);
            return n.set(e, r), r;
          }
          if (Nn(e)) {
            const r = Object.keys(e).reduce((r, o) => Rn(e[o], t, n) || r, o);
            return n.set(e, r), r;
          }
        }
        return o;
      }
      function Nn(e) {
        if (null == e || "object" != typeof e) return !1;
        const t = Object.getPrototypeOf(e);
        return null == t || t === Object.prototype;
      }
      const jn = "_@f";
      function $n(e) {
        const t = new Map(),
          n = new Map(),
          r = new Map();
        return {
          encode: function r(o, i = new Map()) {
            if (null == o) return [o];
            const s = i.get(o);
            if (s) return s;
            if ("object" == typeof o) {
              if (Array.isArray(o)) {
                i.set(o, [void 0]);
                const e = [],
                  t = [
                    o.map((t) => {
                      const [n, o = []] = r(t, i);
                      return e.push(...o), n;
                    }),
                    e,
                  ];
                return i.set(o, t), t;
              }
              if (Nn(o)) {
                i.set(o, [void 0]);
                const e = [],
                  t = [
                    Object.keys(o).reduce((t, n) => {
                      const [s, a = []] = r(o[n], i);
                      return e.push(...a), { ...t, [n]: s };
                    }, {}),
                    e,
                  ];
                return i.set(o, t), t;
              }
            }
            if ("function" == typeof o) {
              if (t.has(o)) {
                const e = t.get(o),
                  n = [{ [jn]: e }];
                return i.set(o, n), n;
              }
              const r = e.uuid();
              t.set(o, r), n.set(r, o);
              const s = [{ [jn]: r }];
              return i.set(o, s), s;
            }
            const a = [o];
            return i.set(o, a), a;
          },
          decode: o,
          async call(e, t) {
            const r = new Cn(),
              i = n.get(e);
            if (null == i)
              throw new Error(
                "You attempted to call a function that was already released."
              );
            try {
              const e = In(i) ? [r, ...i[An]] : [r];
              return await i(...o(t, e));
            } finally {
              r.release();
            }
          },
          release(e) {
            const r = n.get(e);
            r && (n.delete(e), t.delete(r));
          },
          terminate() {
            t.clear(), n.clear(), r.clear();
          },
        };
        function o(t, n) {
          if ("object" == typeof t) {
            if (null == t) return t;
            if (Array.isArray(t)) return t.map((e) => o(e, n));
            if (jn in t) {
              const o = t[jn];
              if (r.has(o)) return r.get(o);
              let i = 0,
                s = !1;
              const a = () => {
                  (i -= 1), 0 === i && ((s = !0), r.delete(o), e.release(o));
                },
                c = () => {
                  i += 1;
                },
                u = new Set(n),
                l = (...t) => {
                  if (s)
                    throw new Error(
                      "You attempted to call a function that was already released."
                    );
                  if (!r.has(o))
                    throw new Error(
                      "You attempted to call a function that was already revoked."
                    );
                  return e.call(o, t);
                };
              Object.defineProperties(l, {
                [kn]: { value: a, writable: !1 },
                [Sn]: { value: c, writable: !1 },
                [An]: { value: u, writable: !1 },
              });
              for (const e of u) e.add(l);
              return r.set(o, l), l;
            }
            if (Nn(t))
              return Object.keys(t).reduce(
                (e, r) => ({ ...e, [r]: o(t[r], n) }),
                {}
              );
          }
          return t;
        }
      }
      class Dn extends Error {
        constructor(e) {
          const { callId: t, error: n, result: r } = e;
          super(
            `No resolver found for call ID: ${t}${
              n ? ` Error: ${String(n)}` : ""
            }${null == r ? "" : ` Result: ${JSON.stringify(r)}`}`
          ),
            (this.callId = void 0),
            (this.error = void 0),
            (this.result = void 0),
            (this.groupingHash = "RemoteUI::MissingResolverError"),
            (this.name = "MissingResolverError"),
            (this.callId = t),
            (this.error = n),
            (this.result = r);
        }
      }
      function Mn(
        e,
        { uuid: t = Un, createEncoder: n = $n, callable: r } = {}
      ) {
        let o = !1,
          i = e;
        const s = new Map(),
          a = new Map(),
          c = (function (e, t) {
            let n;
            if (null == t) {
              if ("function" != typeof Proxy)
                throw new Error(
                  "You must pass an array of callable methods in environments without Proxies."
                );
              const t = new Map();
              n = new Proxy(
                {},
                {
                  get(n, r) {
                    if (t.has(r)) return t.get(r);
                    const o = e(r);
                    return t.set(r, o), o;
                  },
                }
              );
            } else {
              n = {};
              for (const r of t)
                Object.defineProperty(n, r, {
                  value: e(r),
                  writable: !1,
                  configurable: !0,
                  enumerable: !0,
                });
            }
            return n;
          })(p, r),
          u = n({
            uuid: t,
            release(e) {
              l(3, [e]);
            },
            call(e, n, r) {
              const o = t(),
                i = f(o, r),
                [s, a] = u.encode(n);
              return l(5, [o, e, s], a), i;
            },
          });
        return (
          i.addEventListener("message", d),
          {
            call: c,
            replace(e) {
              const t = i;
              (i = e),
                t.removeEventListener("message", d),
                e.addEventListener("message", d);
            },
            expose(e) {
              for (const t of Object.keys(e)) {
                const n = e[t];
                "function" == typeof n ? s.set(t, n) : s.delete(t);
              }
            },
            callable(...e) {
              if (null != r)
                for (const t of e)
                  Object.defineProperty(c, t, {
                    value: p(t),
                    writable: !1,
                    configurable: !0,
                    enumerable: !0,
                  });
            },
            terminate() {
              l(2, void 0), m(), i.terminate && i.terminate();
            },
          }
        );
        function l(e, t, n) {
          o || i.postMessage(t ? [e, t] : [e], n);
        }
        async function d(e) {
          if (o) return;
          const { data: t } = e;
          var n;
          if (
            ((n = t),
            Array.isArray(n) &&
              "number" == typeof n[0] &&
              (null == n[1] || Array.isArray(n[1])))
          )
            switch (t[0]) {
              case 2:
                m();
                break;
              case 0: {
                const e = new Cn(),
                  [n, o, i] = t[1],
                  a = s.get(o);
                try {
                  if (null == a)
                    throw new Error(
                      `No '${o}' method is exposed on this endpoint`
                    );
                  const [t, r] = u.encode(await a(...u.decode(i, [e])));
                  l(1, [n, void 0, t], r);
                } catch (r) {
                  const { name: e, message: t, stack: o } = r;
                  throw (l(1, [n, { name: e, message: t, stack: o }]), r);
                } finally {
                  e.release();
                }
                break;
              }
              case 1: {
                const [e, n, r] = t[1],
                  o = a.get(e);
                if (null == o) throw new Dn({ callId: e, error: n, result: r });
                o(...t[1]), a.delete(e);
                break;
              }
              case 3: {
                const [e] = t[1];
                u.release(e);
                break;
              }
              case 6: {
                const [e, n, r] = t[1],
                  o = a.get(e);
                if (null == o) throw new Dn({ callId: e, error: n, result: r });
                o(...t[1]), a.delete(e);
                break;
              }
              case 5: {
                const [e, n, o] = t[1];
                try {
                  const t = await u.call(n, o),
                    [r, i] = u.encode(t);
                  l(6, [e, void 0, r], i);
                } catch (r) {
                  const { name: t, message: n, stack: o } = r;
                  throw (l(6, [e, { name: t, message: n, stack: o }]), r);
                }
                break;
              }
            }
        }
        function p(e) {
          return (...n) => {
            if (o)
              return Promise.reject(
                new Error(
                  "You attempted to call a function on a terminated web worker."
                )
              );
            if ("string" != typeof e && "number" != typeof e)
              return Promise.reject(
                new Error(
                  `Can’t call a symbol method on a remote endpoint: ${e.toString()}`
                )
              );
            const r = t(),
              i = f(r),
              [s, a] = u.encode(n);
            return l(0, [r, e, s], a), i;
          };
        }
        function f(e, t) {
          return new Promise((n, r) => {
            a.set(e, (e, o, i) => {
              if (null == o) n(i && u.decode(i, t));
              else {
                const e = new Error();
                Object.assign(e, o), r(e);
              }
            });
          });
        }
        function m() {
          var e;
          (o = !0),
            s.clear(),
            a.clear(),
            null === (e = u.terminate) || void 0 === e || e.call(u),
            i.removeEventListener("message", d);
        }
      }
      function Un() {
        return `${Ln()}-${Ln()}-${Ln()}-${Ln()}`;
      }
      function Ln() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);
      }
      const zn = (e, t, { important: n = !1 } = {}) =>
          Object.keys(t).forEach((r) => {
            const o = t[r],
              [i = "", s = n ? "important" : void 0] = Array.isArray(o)
                ? o
                : [o];
            e.style.setProperty(r, i, s);
          }),
        Bn = "web-pixels-helper-sandbox-handle",
        Hn = { height: "26px", width: "21px", top: "12px", left: "12px" },
        Wn = { height: "100%", width: "100%", top: "0px", left: "0px" };
      const qn = 25;
      function Vn(e) {
        return e instanceof HTMLElement || e instanceof SVGElement;
      }
      function Fn({ id: e, tagName: t, attributes: n, dataset: r, styles: o }) {
        const i = document.querySelector(`${t}#${e}`);
        if (i) return [i, !1];
        const s = ((e, t) => {
          const n = document.createElement(e);
          return (
            Object.keys(t).forEach((e) => {
              const r = t[e];
              void 0 !== r && n.setAttribute(e, r);
            }),
            n
          );
        })(t, { ...n, id: e });
        return (
          r &&
            Object.keys(r).forEach((e) => {
              s.dataset[e] = r[e];
            }),
          zn(s, o.props, o.options),
          [s, !0]
        );
      }
      async function Xn({ containerSpec: e, iframeSpec: t }) {
        await new Promise((e) => {
          if (document.body) e();
          else {
            const t = () => {
              "loading" !== document.readyState &&
                (e(), document.removeEventListener("readystatechange", t));
            };
            document.addEventListener("readystatechange", t);
          }
        });
        const [n, r] = Fn({
          id: e.id,
          tagName: e.tagName,
          styles: { props: e.styles, options: { important: !0 } },
          attributes: { tabIndex: "-1", ...e.attributes },
          dataset: e.dataset,
        });
        r && document.body.appendChild(n);
        const o = t.attributes || {},
          [i, s] = Fn({
            id: t.id,
            tagName: "iframe",
            styles: { props: t.styles, options: { important: !0 } },
            attributes: { tabIndex: "-1", ...o, name: t.id, src: t.src },
          });
        if (s) {
          if (t.privileges) {
            if (
              !(function (e) {
                return "sandbox" in e;
              })(i)
            )
              throw new ht(
                "browser does not support the sandbox attribute on IFrames"
              );
            i.setAttribute("sandbox", t.privileges.join(" "));
          }
          n.appendChild(i);
        }
        return { container: n, iframe: i };
      }
      async function Jn({ state: e, extensionsBaseUrl: t, onHelperReady: n }) {
        const r = await (async function ({
            extensionsBaseUrl: e,
            height: t = 216,
            position: n = null,
          }) {
            const r = `${e}/web-pixels-helper/h${nt}m.html`;
            return Xn({
              containerSpec: {
                id: "web-pixels-helper-sandbox-container",
                tagName: "dialog",
                attributes: { popover: "manual" },
                styles: {
                  ...(n
                    ? {
                        top: `${n.y}px`,
                        left: `${n.x}px`,
                        right: "auto",
                        bottom: "auto",
                      }
                    : {
                        top: "max(0px, calc(100% - 770px))",
                        bottom: "auto",
                        right: "30px",
                        left: "auto",
                      }),
                  width: "393px",
                  height: `${t}px`,
                  position: "fixed",
                  border: "0",
                  opacity: "0",
                  margin: "0",
                  padding: "0",
                  background: "transparent",
                  overflow: "hidden",
                  visibility: "hidden",
                  transform: "translate(0px, 0px)",
                  "border-radius": "16px",
                  "box-shadow":
                    "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px",
                  transition:
                    "opacity 200ms ease-in-out, height 300ms ease-in-out, top 300ms ease-in-out, box-shadow 300ms",
                  display: "block",
                  "pointer-events": "auto",
                },
                dataset: { shopifyPrivacy: "exclude" },
              },
              iframeSpec: {
                id: "web-pixels-helper-sandbox-iframe",
                src: r,
                styles: {
                  border: "none",
                  background: "#fff",
                  clip: "initial",
                  display: "inline",
                  margin: "0",
                  opacity: "1",
                  padding: "0",
                  visibility: "visible",
                  width: "100%",
                  height: "100%",
                  "border-radius": "16px",
                },
              },
            });
          })({ extensionsBaseUrl: t, height: e.height, position: e.position }),
          o = Mn(En(r.iframe), {
            callable: [
              "initializeHelper",
              "logConsentGranted",
              "logPixelRegister",
              "logSubscribe",
              "logEvent",
            ],
          });
        return (
          o.expose(
            (function ({ state: e, reference: t, onHelperReady: n }) {
              return {
                async setHelperReady() {
                  t.container.showPopover(),
                    zn(
                      t.container,
                      { visibility: "visible", opacity: "1" },
                      { important: !0 }
                    ),
                    n();
                },
                setHeight: ({ height: n }) =>
                  new Promise((r, o) => {
                    try {
                      zn(t.container, { height: `${n}px` }, { important: !0 }),
                        e.setHeight(n),
                        r(!0);
                    } catch (i) {
                      r(!1);
                    }
                  }),
                async proceedWithoutConsent() {
                  try {
                    const { success: e } = await (function (e, t) {
                      if (
                        (new Re().produce("setTrackingConsent", "v0.2"),
                        (function (e) {
                          if ("boolean" != typeof e && "object" != typeof e)
                            throw new V(
                              `setTrackingConsent received an invalid argument of type "${typeof e}". Expected an object with consent keys. Example: setTrackingConsent({ analytics: true, marketing: false }). See ${De} for documentation.`
                            );
                          if ("object" == typeof e) {
                            const t = Object.keys(e);
                            if (0 === t.length)
                              throw new V(
                                `The submitted consent object is empty. Expected at least one consent key: ${$e}. Example: setTrackingConsent({ analytics: true, marketing: false }). See ${De} for documentation.`
                              );
                            for (const e of t)
                              if (!je.includes(e))
                                throw new V(
                                  `The submitted consent object contains an invalid key: "${e}". Valid keys are: ${$e}. Example: setTrackingConsent({ analytics: true, marketing: false }). See ${De} for documentation.`
                                );
                          }
                        })(e),
                        void 0 !== t && "function" != typeof t)
                      )
                        throw new V(
                          `setTrackingConsent received an invalid callback of type "${typeof t}". The second argument must be a function if provided. Example: setTrackingConsent({ analytics: true }, (error, result) => { ... }). See ${De} for documentation.`
                        );
                      const n = (function (e) {
                          return e ? (Me() ? document.referrer : "") : null;
                        })(e.analytics),
                        r = (function (e) {
                          return e
                            ? Me()
                              ? window.location.pathname +
                                window.location.search
                              : "/"
                            : null;
                        })(e.analytics);
                      return Te(
                        Le,
                        {
                          granular_consent: e,
                          ...(null !== n && { referrer: n }),
                          ...(null !== r && { landing_page: r }),
                        },
                        t
                      );
                    })(Et.reduce((e, t) => ((e[t] = !0), e), {}));
                    return Boolean(e);
                  } catch (e) {
                    return !1;
                  }
                },
                async setClipboard({ text: e }) {
                  try {
                    return self.navigator.clipboard.writeText(e), !0;
                  } catch (t) {
                    return !1;
                  }
                },
                async sendMonorailEvent({ schemaKey: e, payload: t }) {
                  Kt(e, t);
                },
              };
            })({ state: e, reference: r, onHelperReady: n })
          ),
          (function (e, t) {
            if (e.querySelector(`#${Bn}`)) return;
            const n = document.createElement("div");
            n.setAttribute("id", Bn),
              zn(
                n,
                {
                  display: "block",
                  position: "absolute",
                  cursor: "grab",
                  background: "transparent",
                  ...Hn,
                },
                { important: !0 }
              ),
              e.appendChild(n),
              n.addEventListener(
                "mousedown",
                (function ({ container: e, handle: t, onMove: n }, r) {
                  function o(t) {
                    t.preventDefault();
                    const o = qn,
                      i = self.innerHeight - qn,
                      s = qn,
                      a = self.innerWidth - qn;
                    if (
                      t.clientY < o ||
                      t.clientY > i ||
                      t.clientX < s ||
                      t.clientX > a
                    )
                      return;
                    n && n(t.clientX - qn, t.clientY - qn),
                      (r[1] = r[3] - t.clientX),
                      (r[2] = r[4] - t.clientY),
                      (r[3] = t.clientX),
                      (r[4] = t.clientY);
                    const c = new DOMMatrix(getComputedStyle(e).transform),
                      u = c.e,
                      l = c.f,
                      d = u - r[1],
                      p = l - r[2];
                    zn(
                      e,
                      { transform: `translate(${d}px, ${p}px)` },
                      { important: !0 }
                    );
                  }
                  function i(e) {
                    zn(t, Hn, { important: !0 }),
                      self.removeEventListener("mouseup", i),
                      self.removeEventListener("mousemove", o);
                  }
                  return (e) => {
                    e.preventDefault(),
                      (r[3] = e.clientX),
                      (r[4] = e.clientY),
                      self.addEventListener("mouseup", i),
                      self.addEventListener("mousemove", o),
                      zn(t, Wn, { important: !0 });
                  };
                })(
                  { container: e, handle: n, onMove: t },
                  { 1: 0, 2: 0, 3: 0, 4: 0 }
                )
              );
          })(r.container, (t, n) => {
            e.setPosition({ x: t, y: n });
          }),
          o
        );
      }
      let Kn = (function (e) {
        return (e.Standard = "standard"), (e.Advanced = "advanced"), e;
      })({});
      const Yn = new Set(),
        Gn = "webPixelDebug";
      class Zn extends f {
        constructor(e) {
          super(`Helper state is invalid.\n\nState: ${JSON.stringify(e)}`),
            (this.name = "InvalidHelperStateError");
        }
      }
      class Qn extends f {
        constructor(e, t) {
          super(
            `Helper's selected pixel is invalid.\n\nPixel: ${JSON.stringify(
              t
            )}\n\nState: ${JSON.stringify(e)}`
          ),
            (this.name = "InvalidPixelHelperError");
        }
      }
      const er = [h.Custom, h.App];
      function tr(e) {
        try {
          sessionStorage.setItem(Gn, JSON.stringify(e));
        } catch {
          (t =
            "Session storage is not available. The Pixel Helper experience may be degraded."),
            Yn.has(t) || (Yn.add(t), "console" in self && console.warn(t));
        }
        var t;
      }
      function nr() {
        ot(() => sessionStorage.removeItem(Gn));
      }
      const rr = (e, t) => ({
          version: et,
          pageUrl: self.location.href,
          surface: e.surface ?? m.Unknown,
          status: t,
          bundleTarget: tt,
          shopId: e.shopId,
        }),
        or = (function () {
          const e = new xn(1e3, "newest");
          let t = null;
          return {
            message(n, r) {
              if (t)
                try {
                  t.call[n](r);
                } catch (o) {
                  gt.notify(o, {
                    context: "createWebPixelsHelper/message/endpoint-call",
                    unhandled: !1,
                    severity: "warning",
                  });
                }
              else
                e?.add(() => {
                  t?.call[n](r);
                });
            },
            async init(n) {
              const r = (() => {
                try {
                  return ((e) => {
                    const t = new URL(window.location.href),
                      n = t.searchParams.get(Gn),
                      r = ot(() => (n ? JSON.parse(atob(n)) : null), null);
                    n &&
                      (t.searchParams.delete(Gn),
                      self.history.replaceState(null, "", t.toString()));
                    const o = ot(
                      () => JSON.parse(sessionStorage.getItem(Gn) ?? "null"),
                      null
                    );
                    if (!r && !o) return null;
                    const i = { position: null, height: 216, ...(r ?? o) };
                    if (
                      !(function (e) {
                        return !(
                          !e ||
                          !e.pixel ||
                          "string" != typeof e.pixel.type ||
                          "string" != typeof e.pixel.id ||
                          (e.pixel.name && "string" != typeof e.pixel.name) ||
                          "number" != typeof e.height
                        );
                      })(i)
                    )
                      throw (nr(), new Zn(i));
                    const s = e.find(
                      (e) => e.type === i.pixel.type && e.id === i.pixel.id
                    );
                    if (!s || !er.includes(s.type) || s.id.match(/shopify/i))
                      throw (nr(), new Qn(i, i.pixel));
                    return (
                      (i.pixel = {
                        ...i.pixel,
                        name: i.pixel.name || s?.name || "",
                      }),
                      tr(i),
                      {
                        get pixel() {
                          return i.pixel;
                        },
                        get height() {
                          return i.height;
                        },
                        get position() {
                          return i.position;
                        },
                        setHeight(e) {
                          (i.height = e), tr(i);
                        },
                        setPosition(e) {
                          (i.position = e), tr(i);
                        },
                      }
                    );
                  })(n.webPixelsConfigList);
                } catch (e) {
                  gt.notify(e, {
                    context: "createWebPixelsHelper/init/state",
                    unhandled: !1,
                    severity: "warning",
                    options: { sampleRate: 0.1 },
                  }),
                    Kt("helperLoad", rr(n, "helper-read-error"));
                }
                return null;
              })();
              if (!r) return;
              let o = !1;
              const { shopId: i, surface: s = m.Unknown } = n,
                a = Bt("helperLoad", {
                  version: et,
                  pageUrl: self.location.href,
                  surface: s,
                  status: "loaded",
                  bundleTarget: tt,
                  shopId: i,
                });
              await Jn({
                state: r,
                extensionsBaseUrl: n.extensionsBaseUrl,
                onHelperReady: () => {
                  o || (Jt(a), (o = !0));
                },
              })
                .then((o) => {
                  if (!o) return;
                  t = o;
                  const i = r.pixel;
                  this.message("initializeHelper", {
                    pixelUid: { id: i.id, type: i.type },
                    pixelName: i.name ?? "",
                    config: n,
                    isCollapsed: r.height <= 216,
                    loggerLevel: ot(
                      () =>
                        "true" ===
                        self.localStorage.getItem("pixel-helper-advanced")
                          ? Kn.Advanced
                          : Kn.Standard,
                      Kn.Standard
                    ),
                  }),
                    e.forEach((e) => e()),
                    e.clear();
                })
                .catch((e) => {
                  gt.notify(e, {
                    context: "createWebPixelsHelper/init/createHelperSandbox",
                    unhandled: !1,
                    severity: "warning",
                  }),
                    Kt("helperLoad", rr(n, "helper-create-error"));
                });
            },
          };
        })();
      class ir {
        constructor({
          bufferSize: e = 50,
          replayKeep: t = "oldest",
          subscribeAllKey: n,
          onSubscriberError: r,
        } = {}) {
          (this.channelSubscribers = new Map()),
            (this.replayQueue = void 0),
            (this.bufferSize = void 0),
            (this.replayKeep = void 0),
            (this.subscribeAllKey = void 0),
            (this.onSubscriberError = void 0),
            (this.middlewareChain = void 0),
            (this.bufferSize = e),
            (this.replayKeep = t),
            (this.subscribeAllKey = n),
            (this.replayQueue = new xn(e, t)),
            (this.onSubscriberError = r),
            (this.middlewareChain = (e) => e());
        }
        use(...e) {
          return e.forEach((e) => this.useMiddleware(e)), this;
        }
        publish(e, t, n = {}) {
          if (this.subscribeAllKey && e === this.subscribeAllKey)
            throw new Error(`Cannot publish to ${String(e)}`);
          this.replayQueue.add({ name: e, payload: t, options: n });
          const r = (r, o) => {
            this.processEvent(e, t, o, n, r);
          };
          return (
            [
              this.channelSubscribers.get(e),
              this.subscribeAllKey
                ? this.channelSubscribers.get(this.subscribeAllKey)
                : void 0,
            ]
              .filter((e) => Boolean(e))
              .forEach((e) => e.forEach(r)),
            !0
          );
        }
        subscribe(e, t, n = {}) {
          const r = this.channelSubscribers.get(e) || new Map();
          return (
            this.channelSubscribers.set(e, r.set(t, n)),
            this.replayQueue.forEach(({ name: r, payload: o, options: i }) => {
              (e === r ||
                (this.subscribeAllKey && e === this.subscribeAllKey)) &&
                this.processEvent(r, o, t, i, n);
            }),
            () => r.delete(t)
          );
        }
        processEvent(e, t, n, r = {}, o = {}) {
          const i = (e = t) => {
            n.call({}, e);
          };
          try {
            this.middlewareChain(i, e, t, r, o);
          } catch (a) {
            var s;
            this.onSubscriberError
              ? this.onSubscriberError(a)
              : null === (s = console) ||
                void 0 === s ||
                s.error(`Error in subscriber for event ${e}:`, a);
          }
        }
        useMiddleware(e) {
          const t = this.middlewareChain;
          this.middlewareChain = (n, r, o, ...i) => {
            let s = !1;
            const a = (e = o) => {
              s || ((s = !0), n(e));
            };
            t(
              (t = o) => {
                e(a, r, t, ...i), (s = !0);
              },
              r,
              o,
              ...i
            );
          };
        }
      }
      let sr = (function (e) {
          return (
            (e.WebPixelExtension = "web-pixel-extension"),
            (e.CheckoutOneSdk = "checkout-one-sdk"),
            (e.Unknown = "unknown"),
            e
          );
        })({}),
        ar = (function (e) {
          return (
            (e.Storefront = "storefront"),
            (e.Checkout = "checkout"),
            (e.Unknown = "unknown"),
            e
          );
        })({}),
        cr = (function (e) {
          return (e.Custom = "custom"), (e.All = "all"), e;
        })({});
      function ur(e) {
        return "shopify-custom-pixel" === e.id
          ? "shopify-pixel"
          : e.type === h.Custom
          ? "-1"
          : e.apiClientId
          ? `${e.apiClientId}`
          : void 0;
      }
      const lr = "[object Undefined]",
        dr = "[object Null]",
        pr = ["[object String]", "[object Number]", "[object Boolean]", lr, dr],
        fr = (e) =>
          null === e
            ? dr
            : void 0 === e
            ? lr
            : Object.prototype.toString.call(e);
      function mr(e) {
        let t = null,
          n = null;
        function r(e) {
          return "[object Object]" === fr(e);
        }
        return void 0 === e || r(e)
          ? {
              isValid: (function e(o, i = "root") {
                if (Array.isArray(o))
                  return o.every((t, n) => e(t, `${i}[${n}]`));
                if (r(o))
                  return Object.keys(o).every((t) => e(o[t], `${i}.${t}`));
                const s = fr(o),
                  a = pr.includes(s);
                return (
                  a ||
                    ((n = i),
                    (t = `Value of type "${s}" at "${n}" must be one of the following types: ${pr.join(
                      ", "
                    )}.`)),
                  a
                );
              })(e, "root"),
              error: t,
              errorKey: n,
            }
          : ((n = "root"),
            (t = `Value of type "${fr(e)}" at "${n}" must be an object.`),
            { isValid: !1, error: t, errorKey: n });
      }
      const hr = new Set();
      function vr() {
        document.removeEventListener("visibilitychange", vr);
        for (const e of hr) e();
        hr.clear();
      }
      function gr() {
        return new Promise((e) => {
          hr.add(e),
            "visible" === document.visibilityState
              ? (document.addEventListener("visibilitychange", vr),
                requestAnimationFrame(() =>
                  setTimeout(() => {
                    hr.delete(e), e();
                  })
                ))
              : vr();
        });
      }
      const br = dn(
          (e) => {
            if (!e) return 0;
            let t = 5381;
            for (let n = 0; n < e.length; n++)
              t = (t << 5) + t + e.charCodeAt(n);
            return Math.abs(t);
          },
          { cacheKey: (e) => e }
        ),
        yr = [
          "page_viewed",
          "product_viewed",
          "collection_viewed",
          "cart_viewed",
          "clicked",
          "form_submitted",
          "input_blurred",
          "input_focused",
          "input_changed",
          "advanced_dom_clicked",
          "advanced_dom_scrolled",
          "advanced_dom_window_resized",
        ];
      function wr(e, t, n) {
        try {
          if (!yr.includes(e.name)) return;
          const r = vn("_shopify_s") || "";
          (function (e, t) {
            if (!t) return !1;
            return (br(t.toLowerCase()) % 100) + 1 <= 1;
          })(0, r) &&
            Kt("buyerEventSample", {
              shopId: t,
              eventType: e.type,
              eventName: e.name,
              surface: n,
              eventPayloadJson: JSON.stringify(e),
              sessionToken: r,
            });
        } catch (r) {
          gt.notify(r, {
            severity: "warning",
            unhandled: !1,
            context: "logBuyerEvent",
            options: { sampleRate: 20 },
          });
        }
      }
      const xr = new Set([
        "innerHeight",
        "innerWidth",
        "scrollX",
        "scrollY",
        "pageXOffset",
        "pageYOffset",
      ]);
      let _r = {},
        Er = !1,
        Sr = !0;
      function kr() {
        (_r.innerHeight = ot(() => window.innerHeight, 0)),
          (_r.innerWidth = ot(() => window.innerWidth, 0));
        const e = ot(() => window.scrollX, 0),
          t = ot(() => window.scrollY, 0);
        (_r.scrollX = e),
          (_r.pageXOffset = e),
          (_r.scrollY = t),
          (_r.pageYOffset = t),
          (Sr = !1);
      }
      function Ar() {
        Sr = !0;
      }
      const Cr = new Proxy(window, {
        get: (e, t) => (
          Er ||
            ((Er = !0),
            kr(),
            window.addEventListener("resize", Ar, { passive: !0 }),
            window.addEventListener("scroll", Ar, { passive: !0 }),
            window.addEventListener("orientationchange", Ar, { passive: !0 })),
          xr.has(t) ? (Sr && kr(), _r[t]) : ot(() => Reflect.get(e, t))
        ),
      });
      function Ir() {
        const e = Cr.location,
          t = Cr.screen,
          n = {
            href: ot(() => e?.href) ?? "",
            hash: ot(() => e?.hash) ?? "",
            host: ot(() => e?.host) ?? "",
            hostname: ot(() => e?.hostname) ?? "",
            origin: ot(() => e?.origin) ?? "",
            pathname: ot(() => e?.pathname) ?? "",
            port: ot(() => e?.port) ?? "",
            protocol: ot(() => e?.protocol) ?? "",
            search: ot(() => e?.search) ?? "",
          };
        return {
          document: {
            location: n,
            referrer: ot(() => document?.referrer) ?? "",
            characterSet: ot(() => document?.characterSet) ?? "",
            title: ot(() => document?.title) ?? "",
          },
          navigator: {
            language: ot(() => navigator?.language) ?? "",
            cookieEnabled: ot(() => navigator?.cookieEnabled) ?? !1,
            languages: ot(() => navigator?.languages) ?? [],
            userAgent: ot(() => navigator?.userAgent) ?? "",
          },
          window: {
            innerHeight: Cr.innerHeight ?? 0,
            innerWidth: Cr.innerWidth ?? 0,
            outerHeight: Cr.outerHeight ?? 0,
            outerWidth: Cr.outerWidth ?? 0,
            pageXOffset: Cr.pageXOffset ?? 0,
            pageYOffset: Cr.pageYOffset ?? 0,
            location: n,
            origin: Cr.origin ?? "",
            screen: {
              height: ot(() => t?.height) ?? 0,
              width: ot(() => t?.width) ?? 0,
            },
            screenX: Cr.screenX ?? 0,
            screenY: Cr.screenY ?? 0,
            scrollX: Cr.scrollX ?? 0,
            scrollY: Cr.scrollY ?? 0,
          },
        };
      }
      const Pr = new Map(),
        Or = (e) => {
          const t = (Pr.get(e) ?? 0) + 1;
          return Pr.set(e, t), t;
        },
        Tr = (e) => ({
          ...e,
          get clientId() {
            return yn();
          },
          timestamp: new Date().toISOString(),
          context: Ir(),
          id: "string" == typeof e.id && e.id.length > 0 ? e.id : rn(),
          seq: Or(e.name),
        });
      function Rr(e, t, n = {}) {
        const r = (function (e, t, n) {
          if ("checkout_completed" === e && n.eventId) return n.eventId;
          const r = { analyticsFramework: "wpm" };
          try {
            return (
              "product_added_to_cart" === e &&
                "cartLine" in t &&
                (r.cacheKey = (function ({ cartLine: e } = { cartLine: null }) {
                  const t = e?.merchandise.product.id,
                    n = e?.merchandise.id;
                  if (t && n) return `${t}-${n}`;
                })(t)),
              window.Shopify?.evids?.(e, r)
            );
          } catch {
            return;
          }
        })(e, t, n);
        return Tr({ id: r, name: e, data: t, type: c(e) });
      }
      function Nr(e, t = null) {
        return Tr({ name: e, customData: t, type: s.Custom });
      }
      n(2341);
      const jr = "wpmLoggedConversion1",
        $r = ["thank_you", "thank-you", "post_purchase", "post-purchase"];
      class Dr extends f {
        constructor(e) {
          super(
            `Duplicate conversion event blocked for checkout token: "${e}"`
          ),
            (this.name = "ExcludedConversionError");
        }
      }
      class Mr extends f {
        constructor() {
          super("Checkout token unavailable from payload"),
            (this.name = "MissingCheckoutTokenError");
        }
      }
      class Ur extends f {
        constructor() {
          super("Failed to extract valid checkout token from pathname"),
            (this.name = "MissingPathnameCheckoutTokenError");
        }
      }
      function Lr(e) {
        const t = {},
          n = new Date().getTime();
        for (const [r, o] of Object.entries(e))
          if ("number" == typeof o) {
            const e = new Date(o);
            e.setMonth(e.getMonth() + 2), n < e.getTime() && (t[r] = o);
          }
        return t;
      }
      const zr =
          /^\/checkouts\/([^/]+)\/([^/]+)(?:\/((?:[a-z]{2,3}|zh-hans|zh-hant)(?:-[a-zA-Z0-9]+)?))?(?:\/([^/]+))\/?$/,
        Br = (e, t, n, r, o) => {
          const { pixelRuntimeConfig: i } = o || {},
            { apiClientId: s, restrictions: a } = i || {},
            { allowedEvents: c, disallowedEvents: u } = a || {},
            { sendTo: l } = r || {},
            d = l && String(l) === String(s),
            p = l && !d,
            f = !c || c.includes(t),
            m = u && u.includes(t);
          Boolean((f && !m && !p) || d) && e();
        },
        Hr = (e, t, n, r, o) => {
          if (!p(t)) return void e();
          const { pixelRuntimeConfig: i } = o || {},
            { capabilities: s, type: a } = i || {},
            c = s?.includes(g.AdvancedDomEvents);
          c && a === h.App && e();
        };
      class Wr extends f {
        constructor(e) {
          super(
            `Circular reference detected at "${e}" while applying protected customer data filtering. Event payload contains cyclic structures which are not supported.`
          ),
            (this.name = "ProtectedCustomerDataTransformError");
        }
      }
      function qr(e, t, n) {
        if ("function" == typeof t) {
          const r = t(e, n.context);
          return n.onTransformed?.(e, r, n.path), r;
        }
        if (null == t || "object" != typeof t)
          return n.onTransformed?.(e, t, n.path), t;
        if (null == e) return n.onTransformed?.(e, e, n.path), e;
        if ("object" != typeof e) return n.onTransformed?.(e, e, n.path), e;
        if (n.ancestors.has(e)) throw new Wr(n.path);
        const r = (function (e, t, n) {
          return e.get(t)?.get(n);
        })(n.cache, e, t);
        if (void 0 !== r) return r;
        let o;
        return (
          n.ancestors.add(e),
          (o = Array.isArray(e)
            ? (function (e, t, n) {
                let r = e;
                for (let o = 0; o < e.length; o++) {
                  const i = e[o],
                    s = qr(i, t, { ...n, path: `${n.path}[${o}]` });
                  s !== i && (r === e && (r = e.slice()), (r[o] = s));
                }
                return r;
              })(e, t, n)
            : (function (e, t, n) {
                const r = Object.keys(t);
                if (0 === r.length) return e;
                let o = e;
                for (const i of r)
                  if (i in e) {
                    const r = e[i],
                      s = qr(r, t[i], { ...n, path: `${n.path}.${i}` });
                    s !== r && (o === e && (o = { ...e }), (o[i] = s));
                  }
                return o;
              })(e, t, n)),
          n.ancestors.delete(e),
          (function (e, t, n, r) {
            let o = e.get(t);
            o || ((o = new WeakMap()), e.set(t, o)), o.set(n, r);
          })(n.cache, e, t, o),
          o
        );
      }
      const Vr = dn(
          (e) => {
            const t = e?.protectedCustomerApprovalScopes ?? [];
            return {
              protectedCustomerApprovalScopes: {
                read_customer_address: t.includes("read_customer_address"),
                read_customer_email: t.includes("read_customer_email"),
                read_customer_name: t.includes("read_customer_name"),
                read_customer_personal_data: t.includes(
                  "read_customer_personal_data"
                ),
                read_customer_phone: t.includes("read_customer_phone"),
              },
            };
          },
          { cache: new WeakMap(), cacheKey: (e) => e }
        ),
        Fr = (e, t, n, r) => {
          if (!n?.protectedCustomerApprovalScopes) return e;
          const o = { adjustmentsTriggers: 0, adjustmentsApplied: 0 },
            i = (function (e, t, n) {
              return qr(e, t, {
                context: n,
                ancestors: new WeakSet(),
                cache: new WeakMap(),
                path: "$",
                onTransformed: (e, t, n) => {
                  o.adjustmentsTriggers++, e !== t && o.adjustmentsApplied++;
                },
              });
            })(e, t, Vr(n));
          return r?.(o), i;
        },
        Xr = (e) => (t, n) => n.protectedCustomerApprovalScopes[e] ? t : null,
        Jr = {
          data: {
            checkout: {
              email: Xr("read_customer_email"),
              phone: Xr("read_customer_phone"),
              smsMarketingPhone: Xr("read_customer_phone"),
              billingAddress: {
                firstName: Xr("read_customer_name"),
                lastName: Xr("read_customer_name"),
                phone: Xr("read_customer_phone"),
                address1: Xr("read_customer_address"),
                address2: Xr("read_customer_address"),
                zip: Xr("read_customer_address"),
              },
              shippingAddress: {
                firstName: Xr("read_customer_name"),
                lastName: Xr("read_customer_name"),
                phone: Xr("read_customer_phone"),
                address1: Xr("read_customer_address"),
                address2: Xr("read_customer_address"),
                zip: Xr("read_customer_address"),
              },
            },
          },
        },
        Kr = {
          checkout_address_info_submitted: Jr,
          checkout_completed: Jr,
          checkout_contact_info_submitted: Jr,
          checkout_shipping_info_submitted: Jr,
          checkout_started: Jr,
          payment_info_submitted: Jr,
        };
      class Yr extends f {
        constructor(e, t) {
          super(
            `Failed to apply protected customer data filtering for event: ${e}. ${t.message}`
          ),
            (this.name = "ProtectedCustomerDataError");
        }
      }
      const Gr = "all_standard_events",
        Zr = "all_custom_events",
        Qr = "all_dom_events";
      class eo extends f {
        constructor(e, t = "PublishEventError") {
          super(e, { groupingHash: `EventBus:${t}` }), (this.name = t);
        }
      }
      function to(e) {
        const { shopId: t, surface: n, emit: r } = e,
          o = (({ logError: e }) =>
            function (t, n) {
              if ("checkout_completed" !== t) return !1;
              let r = n && "checkout" in n ? n?.checkout?.token : null;
              if (
                ((r && "string" == typeof r) ||
                  (e(new Mr(), {
                    severity: "info",
                    unhandled: !1,
                    context: "isExcludedDuplicateConversion",
                  }),
                  (r = (function () {
                    try {
                      const e = new URL(window.location.href),
                        t = zr.exec(e.pathname);
                      if (!t) return null;
                      const [, n, r, o, i] = t;
                      return r ?? null;
                    } catch (e) {
                      return null;
                    }
                  })())),
                !r || "string" != typeof r)
              )
                return (
                  e(new Ur(), {
                    severity: "info",
                    unhandled: !1,
                    context: "isExcludedDuplicateConversion",
                  }),
                  !1
                );
              if (
                !(function () {
                  try {
                    const e = new URL(window.location.href).pathname
                      .split("/")
                      .filter(Boolean);
                    return (
                      e.includes("checkouts") && e.some((e) => $r.includes(e))
                    );
                  } catch (e) {
                    return !1;
                  }
                })()
              )
                return !1;
              const o = (function () {
                try {
                  const e = localStorage.getItem(jr);
                  if (!e) return {};
                  const t = JSON.parse(e);
                  return "object" != typeof t || null === t ? {} : Lr(t);
                } catch (e) {
                  return {};
                }
              })();
              return r in o
                ? (e(new Dr(r), {
                    severity: "info",
                    unhandled: !1,
                    context: "isExcludedDuplicateConversion",
                  }),
                  !0)
                : ((function (e, t) {
                    (t[e] = new Date().getTime()),
                      (function (e) {
                        try {
                          const t = Lr(e);
                          localStorage.setItem(jr, JSON.stringify(t));
                        } catch (t) {}
                      })(t);
                  })(r, o),
                  !1);
            })(e),
          i = new ir({
            bufferSize: Number.POSITIVE_INFINITY,
            subscribeAllKey: Gr,
          }).use(
            Br,
            ((e) => (t, n, r, o, i) => {
              const s = i?.pixelRuntimeConfig,
                { dataSharingAdjustments: a } = s || {},
                c = Kr[n] ?? null;
              if (c)
                try {
                  const n = Fr(r, c, a, (t) => {
                    s &&
                      e.emit("log:event-bus:publish:transformed", {
                        pixel: s,
                        event: r,
                        adjustmentsTriggers: t.adjustmentsTriggers,
                        adjustmentsApplied: t.adjustmentsApplied,
                      });
                  });
                  Ct(Pt) ? t(n) : t(r);
                } catch (u) {
                  e.logError(
                    new Yr(n, u instanceof Error ? u : new Error(String(u))),
                    {
                      context: "eventBus/middleware/protected-customer-data",
                      unhandled: !1,
                      severity: "error",
                      pixelId: s?.id,
                    }
                  ),
                    Ct(Pt) || t();
                }
              else t();
            })(e)
          ),
          a = new ir({ bufferSize: 1e3, subscribeAllKey: Zr }).use(Br),
          f = new ir({
            bufferSize: 1e3,
            replayKeep: "newest",
            subscribeAllKey: Qr,
          }).use(Br),
          h = new ir({ bufferSize: 1e3, replayKeep: "newest" }).use(Br, Hr);
        return {
          publish(e, v, g) {
            if (!Ct(It) && n !== m.CustomerAccount)
              return (function (e, s, a) {
                if ("string" != typeof e)
                  throw new eo(
                    "Expected event name to be a string, but got " + typeof e,
                    "LegacyPublishStandardEventError"
                  );
                if (!u(e)) return !1;
                const c = mr(s);
                if (!c.isValid) return console.error(c.error), !1;
                const l = Rr(e, s, a),
                  d = l.data?.checkout?.token;
                return (
                  wr(l, t, n),
                  Kt("eventPublish", {
                    version: et,
                    bundleTarget: tt,
                    pageUrl: self.location.href,
                    shopId: t,
                    surface: n,
                    eventName: l.name,
                    eventType: l.type,
                    extensionId: a?.extension?.extensionId,
                    extensionAppId: a?.extension?.appId,
                    extensionType: a?.extension?.type,
                    userCanBeTracked: Ue().toString(),
                    eventId: l.id,
                    checkoutToken: d,
                    checkoutCompletedPageType: a?.checkoutCompletedPageType,
                  }),
                  r("log:event-bus:publish", { event: l, options: a }),
                  !o(e, l.data) && i.publish(l.name, l)
                );
              })(e, v, g);
            if ("string" != typeof e) {
              const t = JSON.stringify(e);
              throw new eo(
                `Expected event name "${t}" to be a string, but got ${typeof e}`,
                "PublishEventError"
              );
            }
            if (
              (function (e) {
                return c(e) === s.Meta;
              })(e)
            )
              return !1;
            const b = mr(v);
            if (!b.isValid) {
              if (d(e) || p(e)) {
                const t = new eo(
                  `Input Validation Error for event ${e}: ${
                    b.error
                  }\nPayload: ${JSON.stringify(v)}`,
                  "PublishAdvancedDomEventError"
                );
                return (
                  gt.notify(t, {
                    type: "metric",
                    context: "publish/invalidPayload",
                  }),
                  !1
                );
              }
              return console.error(b.error), !1;
            }
            let y;
            if (((y = l(e) ? Nr(e, v) : Rr(e, v, g)), l(e) || u(e))) {
              let r = {
                version: et,
                bundleTarget: tt,
                pageUrl: self.location.href,
                shopId: t,
                surface: n,
                eventName: y.name,
                eventType: y.type,
                extensionId: g?.extension?.extensionId,
                extensionAppId: g?.extension?.appId,
                extensionType: g?.extension?.type,
                eventId: y.id,
              };
              if (u(e)) {
                const e = y.data?.checkout?.token;
                wr(y, t, n),
                  (r = {
                    ...r,
                    userCanBeTracked: Ue().toString(),
                    checkoutToken: e,
                    checkoutCompletedPageType: g?.checkoutCompletedPageType,
                  });
              }
              Kt("eventPublish", r);
            } else wr(y, t, n);
            return (
              r("log:event-bus:publish", { event: y, options: g }),
              !o(e, y.data) &&
                (u(e)
                  ? i.publish(e, y)
                  : d(e)
                  ? f.publish(e, y)
                  : p(e)
                  ? h.publish(e, y)
                  : a.publish(e, y, g))
            );
          },
          publishCustomEvent(e, r, o) {
            if (Ct(It)) return this.publish(e, r, o);
            if ("string" != typeof e)
              throw new eo(
                "Expected event name to be a string, but got " + typeof e,
                "PublishCustomEventError"
              );
            if (!l(e)) return !1;
            const i = mr(r);
            if (!i.isValid) return console.error(i.error), !1;
            const s = Nr(e, r);
            return (
              Kt("eventPublish", {
                version: et,
                bundleTarget: tt,
                pageUrl: self.location.href,
                shopId: t,
                surface: n,
                eventName: s.name,
                eventType: "custom",
                extensionId: o?.extension?.extensionId,
                extensionAppId: o?.extension?.appId,
                extensionType: o?.extension?.type,
                eventId: s.id,
              }),
              a.publish(e, s, o)
            );
          },
          publishDomEvent(e, r, o) {
            if (Ct(It)) return this.publish(e, r, o);
            if ("string" != typeof e) {
              const t = JSON.stringify(e);
              throw new eo(
                `Expected event name "${t}" to be a string, but got ${typeof e}`,
                "PublishDomEventError"
              );
            }
            if (!d(e) && !p(e))
              throw new eo(
                `Event name "${e}" is not a supported DOM Event`,
                "PublishDomEventError"
              );
            const i = mr(r);
            if (!i.isValid) {
              const t = new eo(
                `Input Validation Error for event ${e}: ${i.error}`,
                "PublishDomEventError"
              );
              return (
                gt.notify(t, {
                  type: "metric",
                  context: "publishDomEvent/invalidPayload",
                }),
                !1
              );
            }
            const s = Rr(e, r, o);
            return wr(s, t, n), p(e) ? h.publish(e, s) : f.publish(e, s);
          },
          subscribe(e, t, r = {}) {
            const o = rn(),
              l = async (i) => {
                if (n === m.CheckoutOneSdk && r.scope !== sr.CheckoutOneSdk)
                  return;
                await gr();
                const a = {
                    configuration: r.pixelRuntimeConfig?.configuration,
                    eventPayloadVersion:
                      r.schemaVersion ||
                      r.pixelRuntimeConfig?.eventPayloadVersion ||
                      "unknown",
                    id: r.pixelRuntimeConfig?.id || "unknown",
                    type: r.pixelRuntimeConfig?.type || "unknown",
                    runtimeContext:
                      r.pixelRuntimeConfig?.runtimeContext || "unknown",
                    restrictions: r.pixelRuntimeConfig?.restrictions,
                    scriptVersion:
                      r.pixelRuntimeConfig?.scriptVersion || "unknown",
                    apiClientId: r.pixelRuntimeConfig?.apiClientId,
                    name: r.pixelRuntimeConfig?.name,
                  },
                  l = {
                    pixelUid: { id: a.id, type: a.type },
                    event: i,
                    eventNameAsSubscribed: e,
                    subscriptionId: o,
                    status: "SUCCESS",
                  };
                let d;
                try {
                  await t.call(i, i), or.message("logEvent", l);
                } catch (g) {
                  (d = g),
                    or.message("logEvent", { ...l, status: "FAIL", error: d });
                }
                const p = c(i.name),
                  f = {
                    version: et,
                    bundleTarget: tt,
                    pageUrl: self.location.href,
                    shopId: r.shopId,
                    surface: r.surface,
                    pixelName: a.name,
                    pixelId: a.id,
                    pixelAppId: ur(a),
                    pixelSource: a.type,
                    pixelRuntimeContext: a.runtimeContext,
                    pixelScriptVersion: a.scriptVersion,
                    pixelConfiguration: a.configuration,
                    pixelEventSchemaVersion: a.eventPayloadVersion,
                    eventName: i.name,
                    eventId: i.id,
                  },
                  h = d ? "FAILURE" : "SUCCESS",
                  v = d ? String(d) : void 0;
                if ([s.Dom, s.AdvancedDom].includes(p))
                  at(1) &&
                    Kt("subscriberEventEmitDom", {
                      ...f,
                      status: h,
                      errorMessage: v,
                    });
                else {
                  let e;
                  u(i.name) && (e = i?.data?.checkout?.token),
                    Kt("subscriberEventEmit", {
                      ...f,
                      eventType: p,
                      checkoutToken: e || void 0,
                      status: h,
                      errorMessage: v,
                    });
                }
              };
            if (p(e)) return h.subscribe(e, l, r);
            if ("all_events" === e) {
              const e = i.subscribe(Gr, l, r),
                t = a.subscribe(Zr, l, r),
                n = f.subscribe(Qr, l, r);
              return () => {
                const r = e(),
                  o = t(),
                  i = n();
                return r && o && i;
              };
            }
            return e === Zr
              ? a.subscribe(Zr, l, r)
              : e === Gr || u(e)
              ? i.subscribe(e, l, r)
              : e === Qr || d(e)
              ? f.subscribe(e, l, r)
              : a.subscribe(e, l, r);
          },
        };
      }
      const no = ["31014027265", "28638674945", "44186959873"],
        ro = {
          customer: {
            email: Xr("read_customer_email"),
            firstName: Xr("read_customer_name"),
            lastName: Xr("read_customer_name"),
            phone: Xr("read_customer_phone"),
          },
        };
      class oo extends f {
        constructor(e) {
          super(
            `Failed to apply protected customer data filtering to init data. ${e.message}`
          ),
            (this.name = "ProtectedCustomerDataInitError");
        }
      }
      function io(e, t, n) {
        const r = {
          context: Ir(),
          data: {
            customer:
              ((s = t.customer),
              s
                ? {
                    email: s.email,
                    firstName: s.firstName,
                    id: s.id,
                    lastName: s.lastName,
                    phone: s.phone,
                    ordersCount: s.ordersCount,
                  }
                : null),
            cart:
              ((i = t.cart),
              i
                ? {
                    id: i?.id,
                    cost: {
                      totalAmount: {
                        amount: i?.cost?.totalAmount?.amount,
                        currencyCode: i?.cost?.totalAmount?.currencyCode,
                      },
                    },
                    lines: i?.lines,
                    totalQuantity: i?.totalQuantity,
                    attributes: i?.attributes,
                  }
                : null),
            shop: t.shop,
            purchasingCompany:
              ((o = t.purchasingCompany),
              o ? { company: o.company, location: o.location } : null),
          },
          customerPrivacy: {
            analyticsProcessingAllowed: Be(),
            marketingAllowed: ze(),
            preferencesProcessingAllowed: He(),
            saleOfDataAllowed: We(),
          },
        };
        var o, i, s;
        const a = (function (e, t, n) {
          const { dataSharingAdjustments: r } = n;
          try {
            const o = Fr(t, ro, r, (t) => {
              e.emit("log:pixel:init:transformed", { pixel: n, ...t });
            });
            return Ct(Pt) ? o : t;
          } catch (o) {
            return (
              gt.notify(new oo(o instanceof Error ? o : new Error(String(o))), {
                context: "createRegisterInit/filterProtectedCustomerData",
                unhandled: !1,
                severity: "error",
                pixelId: n.id,
              }),
              {
                ...t,
                customer: t.customer
                  ? {
                      ...t.customer,
                      email: null,
                      firstName: null,
                      lastName: null,
                      phone: null,
                    }
                  : null,
              }
            );
          }
        })(e, r.data, n);
        return { ...r, data: a };
      }
      const so = new Set();
      function ao(e) {
        so.add(e);
      }
      function co(
        e,
        {
          eventBus: t,
          customerPrivacyEventBus: n,
          webPixelConfig: r,
          initData: o,
          forRPC: i = !1,
        }
      ) {
        const { shopId: s, surface: a } = e;
        let c = {};
        try {
          c = r.configuration ? JSON.parse(r.configuration) : {};
        } catch (l) {}
        const u = (function (e) {
          return e === m.Shopify ||
            e === m.CheckoutOne ||
            e === m.CheckoutOneSdk
            ? ar.Checkout
            : e === m.StorefrontRenderer
            ? ar.Storefront
            : ar.Unknown;
        })(a);
        return {
          analytics: {
            subscribe(e, n, o) {
              i && Pn(n);
              const c = t.subscribe(e, n, {
                ...o,
                pixelRuntimeConfig: r,
                shopId: s,
                surface: a,
                scope: sr.WebPixelExtension,
              });
              return (
                ao(() => {
                  c(), i && ot(() => Tn(n));
                }),
                c
              );
            },
          },
          browser: {
            cookie: {
              get: async (e) => (e ? vn(e) ?? "" : mn() ?? ""),
              set: async (e, t) => {
                if (t) {
                  const n = `${e}=${t}`;
                  document.cookie = n;
                } else document.cookie = e;
                return mn() ?? "";
              },
            },
            sendBeacon: async (e, t = "") => {
              if (
                e.includes(self.location.origin) &&
                !e.match(
                  /\/\.well-known\/shopify\/monorail\/unstable\/produce_batch/
                )
              )
                return !1;
              const n = new window.Blob([t], { type: "text/plain" });
              return ot(() => window.navigator.sendBeacon(e, n), !1);
            },
            localStorage: {
              setItem: async (e, t) => {
                ot(() => window.localStorage.setItem(e, t));
              },
              getItem: async (e) =>
                ot(() => window.localStorage.getItem(e), null),
              key: async (e) => ot(() => window.localStorage.key(e), null),
              removeItem: async (e) => {
                ot(() => window.localStorage.removeItem(e));
              },
              clear: async () => {
                ot(() => window.localStorage.clear());
              },
              length: async () => ot(() => window.localStorage.length, 0),
            },
            sessionStorage: {
              setItem: async (e, t) => {
                ot(() => window.sessionStorage.setItem(e, t));
              },
              getItem: async (e) =>
                ot(() => window.sessionStorage.getItem(e), null),
              key: async (e) => ot(() => window.sessionStorage.key(e), null),
              removeItem: async (e) => {
                ot(() => window.sessionStorage.removeItem(e));
              },
              clear: async () => {
                ot(() => window.sessionStorage.clear());
              },
              length: async () => ot(() => window.sessionStorage.length, 0),
            },
          },
          settings: c,
          init: io(e, o, r),
          _pixelInfo: { ...r, surface: a, surfaceNext: u },
          customerPrivacy: {
            subscribe(e, t, o) {
              i && Pn(t);
              const c = n.subscribe(e, t, {
                ...o,
                pixelRuntimeConfig: r,
                shopId: s,
                surface: a,
                scope: sr.WebPixelExtension,
              });
              return (
                ao(() => {
                  c(), i && ot(() => Tn(t));
                }),
                c
              );
            },
          },
        };
      }
      window.addEventListener(
        "pagehide",
        ({ persisted: e }) => {
          e ||
            (so.forEach((e) => {
              ot(e);
            }),
            so.clear());
        },
        { capture: !0 }
      );
      class uo extends Error {
        constructor(e, t) {
          super(e),
            (this.url = void 0),
            (this.name = "WebWorkerTopLevelError"),
            (this.url = t);
        }
      }
      let lo;
      class po extends Error {
        constructor(...e) {
          super(...e),
            (this.name = "SandboxAlreadyCreatedError"),
            (this.message = "Sandbox already created.");
        }
      }
      class fo extends Error {
        constructor(e, t) {
          super(e), (this.name = "PixelInitializationError"), (this.stack = t);
        }
      }
      class mo extends f {
        constructor(...e) {
          super(...e),
            (this.name = "InvalidExtensionPointError"),
            (this.message = "Invalid Extension Point");
        }
      }
      const ho = new Map();
      async function vo(e, t) {
        let n = !1,
          r = null;
        const { webPixelConfig: o, eventBus: i } = t,
          { shopId: s, surface: a } = e,
          c = o.id,
          u = o.type.toLowerCase(),
          l = Ot.WebPixels;
        var d, p;
        switch (
          (o.restrictions ||
            (o.restrictions = (function (e, t) {
              const n = {};
              return (
                no.includes(String(e)) &&
                  ((n.allowedEvents = []),
                  t !== m.StorefrontRenderer &&
                    (n.preventLoadingBeforeEvent = `shopify:app:pixels:load:${e}`)),
                n
              );
            })(String(o.apiClientId), a)),
          await Promise.all([
            (async () => {
              await kt(
                (function (e) {
                  if (e)
                    return Et.reduce(
                      (t, n) => ((t[n] = e.includes(n.toUpperCase())), t),
                      {}
                    );
                })(o.privacyPurposes)
              ),
                or.message("logConsentGranted", {
                  pixelUid: { id: c, type: o.type },
                });
            })(),
            ((d = (e, t) =>
              i.subscribe(e, t, {
                pixelRuntimeConfig: { apiClientId: "PIXEL-LOADER" },
              })),
            (p = o.restrictions?.preventLoadingBeforeEvent),
            new Promise((e, t) => {
              void 0 === p
                ? e(!0)
                : d(p, () => {
                    e(!0);
                  });
            })),
          ]),
          jt("pixel:register", "start", { pixelId: c, source: u }),
          o.runtimeContext)
        ) {
          case v.Lax:
          case v.Strict:
            try {
              n = await (async function (
                e,
                {
                  webPixelConfig: t,
                  eventBus: n,
                  customerPrivacyEventBus: r,
                  initData: o,
                  cookieRestrictedDomains: i,
                  pixelPath: s,
                }
              ) {
                const { shopId: a, storefrontBaseUrl: c } = e,
                  u = `web-pixel-sandbox-${t.type}-${t.id}-${t.runtimeContext}-${nt}`;
                if (t.runtimeContext === v.Lax && document.getElementById(u)) {
                  const e = new po();
                  throw (
                    (gt.notify(e, {
                      type: "metric",
                      pixelId: t.id,
                      pixelType: t.type,
                      runtimeContext: t.runtimeContext,
                      shopId: a,
                      context: "createWebPixelSandbox/alreadyCreatedError",
                      userAgent: self.navigator.userAgent,
                      hashVersionSandbox: nt,
                      sandboxUrl: self.location.href || "unknown",
                      options: { sampleRate: 15 },
                    }),
                    e)
                  );
                }
                let l, d;
                switch (t.runtimeContext) {
                  case v.Strict:
                    [l, d] = await (async function ({
                      sandboxId: e,
                      webPixelConfig: t,
                      storefrontBaseUrl: n,
                      pixelPath: r = Ot.Wpm,
                    }) {
                      const o = t.id,
                        i = [
                          Lt(n),
                          `/${r}`,
                          `@${nt}`,
                          `/web-pixel-${o}`,
                          `@${t.scriptVersion}`,
                          "/sandbox",
                          `/worker.${tt}.js`,
                        ].join(""),
                        s = new Worker(i, {
                          name: e,
                          type: "classic",
                          credentials: "omit",
                        }),
                        a = new Promise((e, t) => {
                          const n = (e) => {
                            s.removeEventListener("error", n),
                              t(
                                e?.filename && e?.lineno && e?.message
                                  ? new uo(e.message, i)
                                  : new f(
                                      `Failed to load web worker for pixel ${o} with url ${i}}`,
                                      {
                                        groupingHash:
                                          "WebPixelCreateWebWorkerSandbox:WebWorkerLoadError",
                                      }
                                    )
                              );
                          };
                          s.addEventListener("error", n);
                        });
                      return [s, a];
                    })({
                      sandboxId: u,
                      webPixelConfig: t,
                      storefrontBaseUrl: c,
                      pixelPath: s,
                    });
                    break;
                  case v.Lax:
                    [l, d] = await (async function ({
                      sandboxId: e,
                      webPixelConfig: t,
                      storefrontBaseUrl: n,
                      pixelPath: r = Ot.Wpm,
                    }) {
                      const { search: o } = self.location,
                        i = t.id,
                        s = t.type.toLowerCase(),
                        a = [
                          Lt(n),
                          `/${r}`,
                          `@${nt}`,
                          `/${s}`,
                          `/web-pixel-${i}`,
                          `@${t.scriptVersion}`,
                          "/sandbox",
                          `/${tt}`,
                          /\.(js|json|xml)$/.test(self.location.pathname)
                            ? ""
                            : self.location.pathname,
                          o,
                        ].join(""),
                        { iframe: c } = await Xn({
                          containerSpec: {
                            id: "web-pixels-manager-sandbox-container",
                            tagName: "div",
                            styles: {
                              height: "0",
                              width: "0",
                              position: "fixed",
                              visibility: "hidden",
                              overflow: "hidden",
                              "z-index": "-100",
                              margin: "0",
                              padding: "0",
                              border: "0",
                            },
                            attributes: { "aria-hidden": "true" },
                            dataset: { shopifyPrivacy: "exclude" },
                          },
                          iframeSpec: {
                            id: e,
                            src: a,
                            privileges: ["allow-scripts", "allow-forms"],
                            styles: {
                              height: "0",
                              width: "0",
                              visibility: "hidden",
                            },
                            attributes: { "aria-hidden": "true" },
                          },
                        }),
                        { promise: u, reject: l } = st();
                      let d;
                      const p = () => {
                        d = setTimeout(() => {
                          l(
                            new f(
                              `Failed to load iframe for pixel ${i} with url ${a}`,
                              {
                                groupingHash:
                                  "WebPixelCreateIframeSandbox:IframeLoadError",
                              }
                            )
                          );
                        }, 1e3);
                      };
                      c.addEventListener("load", p);
                      const m = En(c);
                      return (
                        m.addEventListener("message", (e) => {
                          "remote-ui::ready" === e.data &&
                            (clearTimeout(d), c.removeEventListener("load", p));
                        }),
                        [m, u]
                      );
                    })({
                      sandboxId: u,
                      webPixelConfig: t,
                      storefrontBaseUrl: c,
                      pixelPath: s,
                    });
                    break;
                  default:
                    throw new f(
                      `Unsupported runtime context: ${t.runtimeContext}`,
                      {
                        groupingHash:
                          "WebPixelCreateSandbox:UnsupportedRuntimeContext",
                      }
                    );
                }
                const p = Mn(l, { callable: ["initialize"] }),
                  m = co(e, {
                    eventBus: n,
                    customerPrivacyEventBus: r,
                    webPixelConfig: t,
                    initData: o,
                    forRPC: !0,
                  }),
                  h = Ir();
                let g = {
                  status: "unknown",
                  hashVersion: "unknown",
                  sandboxUrl: "unknown",
                };
                const b =
                    t.runtimeContext === v.Lax
                      ? (lo ||
                          (lo = {
                            localStorageItems: { ...self.localStorage },
                            sessionStorageItems: { ...self.sessionStorage },
                          }),
                        lo)
                      : { localStorageItems: {}, sessionStorageItems: {} },
                  y = [
                    p.call
                      .initialize({
                        pageTitle: self.document.title,
                        webPixelConfig: t,
                        shopId: a,
                        webPixelApi: m,
                        cookieRestrictedDomains: i,
                        cookie: mn() ?? "",
                        origin: self.origin,
                        referrer: self.document.referrer,
                        ...b,
                      })
                      .then((e) => {
                        g = e;
                      })
                      .catch((e) => {
                        throw new fo(e.toString(), e.stack ?? "");
                      }),
                  ];
                if (
                  (d && y.push(d), await Promise.race(y), nt !== g.hashVersion)
                ) {
                  const e = new f(
                    `The main bundle hash (${nt}) does not match the sandbox hash (${g.hashVersion})`,
                    { groupingHash: "WebPixelCreateSandbox:HashMismatch" }
                  );
                  throw (
                    (gt.notify(e, {
                      type: "metric",
                      severity: "warning",
                      pixelId: t.id,
                      pixelType: t.type,
                      runtimeContext: t.runtimeContext,
                      context: "createSandbox/hashMismatch",
                      shopId: a,
                      userAgent:
                        h.navigator.userAgent || self.navigator.userAgent,
                      hashVersionSandbox: g.hashVersion,
                      sandboxUrl: g.sandboxUrl,
                    }),
                    e)
                  );
                }
                return !0;
              })(e, { ...t, pixelPath: l });
            } catch (w) {
              (r = w), (n = !1);
            }
            break;
          case v.Open:
            try {
              n = await (async function (
                e,
                {
                  webPixelConfig: t,
                  eventBus: n,
                  customerPrivacyEventBus: r,
                  initData: o,
                  pixelPath: i = Ot.Wpm,
                }
              ) {
                const { storefrontBaseUrl: s } = e,
                  { promise: a, resolve: c, reject: u } = st(),
                  { id: l, type: d, integrityHash: p } = t,
                  m = `${l}-${d}`.toLowerCase(),
                  h = Ct("72028870");
                ho.set(m, () => ({
                  webPixelApi: co(e, {
                    eventBus: n,
                    customerPrivacyEventBus: r,
                    webPixelConfig: t,
                    initData: o,
                    forRPC: !0,
                  }),
                  resolve: c,
                  reject: u,
                }));
                const v = [
                  Lt(s),
                  `/${i}@${nt}`,
                  `/${t.type.toLocaleLowerCase()}`,
                  `/web-pixel-${l}@${t.scriptVersion}`,
                  h ? "~2" : "",
                  `/pixel.${tt}.js`,
                ].join("");
                if (!self[Ze]) {
                  const e = new f(
                    `${Ze} was not found on the global scope. ${Ze}.createShopifyExtend() was not exposed to the window.`,
                    {
                      groupingHash: "WebPixelOpen:GlobalObjectMissing",
                      severity: "warning",
                    }
                  );
                  return (
                    gt.notify(e, {
                      type: "metric",
                      context: "createWebPixelOpen/globalObjectMissing",
                      severity: "warning",
                      unhandled: !1,
                    }),
                    u(e),
                    a
                  );
                }
                if (!("createShopifyExtend" in self[Ze])) {
                  const e = (e, t) => {
                    let n;
                    try {
                      n = document.currentScript?.dataset || {};
                    } catch (w) {
                      (n = {}),
                        gt.notify(w, {
                          type: "metric",
                          context:
                            "createWebPixel/createWebPixelOpen/createShopifyExtend",
                          unhandled: !1,
                        });
                    }
                    let { pixelId: r, pixelType: o } = n;
                    if (((r && o) || ((r = e), (o = t)), !r || !o))
                      return (
                        u(
                          new f(
                            "No pixelId or pixelType found in script tag or params.",
                            { groupingHash: "WebPixelOpen:NoPixelIdOrType" }
                          )
                        ),
                        null
                      );
                    const i = `${r}-${o}`.toLowerCase(),
                      s = ho.get(i);
                    if (!s)
                      return (
                        u(
                          new f(`No openPixelFn found for ${i}.`, {
                            groupingHash: "WebPixelOpen:NoOpenPixelFn",
                          })
                        ),
                        null
                      );
                    const { resolve: a, reject: c, webPixelApi: l } = s();
                    return (
                      l ||
                        c(
                          new f(`No api found for pixel ${i}.`, {
                            groupingHash: "WebPixelOpen:NoApiFound",
                          })
                        ),
                      Object.freeze({
                        extend: (e, t) => {
                          "WebPixel::Render" !== e &&
                            c(
                              new mo(`Invalid extension point: ${e}`, {
                                groupingHash:
                                  "WebPixelOpen:InvalidExtensionPoint",
                              })
                            );
                          try {
                            t.call(l, l), a(!0);
                          } catch (w) {
                            c(
                              new f(w, {
                                groupingHash: "WebPixelOpen:PixelCallbackError",
                              })
                            );
                          }
                        },
                      })
                    );
                  };
                  an(self[Ze], "createShopifyExtend", {
                    value: e,
                    enumerable: !1,
                    writable: !1,
                    configurable: !1,
                  });
                }
                var g, b;
                return (
                  await ((g = v),
                  (b = (e) => {
                    (e.dataset.pixelId = l),
                      (e.dataset.pixelType = d),
                      h &&
                        (p
                          ? ((e.integrity = p), (e.crossOrigin = "anonymous"))
                          : gt.notify(
                              new f(
                                `Missing integrityHash for SRI-enabled open pixel of type ${d} with id ${l} and src ${v}`,
                                {
                                  groupingHash:
                                    "WebPixelOpen:MissingIntegrityHash",
                                }
                              ),
                              {
                                type: "metric",
                                context: "createWebPixelOpen/loadScript",
                                severity: "warning",
                                unhandled: !1,
                              }
                            ));
                  }),
                  new Promise((e, t) => {
                    try {
                      const n = document.createElement("script");
                      (n.src = g),
                        (n.async = !0),
                        (n.onload = () => {
                          e();
                        }),
                        (n.onerror = () => {
                          r(),
                            t(
                              new f(`Failed to load script: ${g}`, {
                                groupingHash: "WebPixelOpen:LoadScriptError",
                              })
                            );
                        });
                      const r = () => {
                        (n.onload = null), (n.onerror = null), n.remove();
                      };
                      b && b(n), document.head.appendChild(n);
                    } catch (w) {
                      t(w);
                    }
                  })),
                  a
                );
              })(e, { ...t, pixelPath: l });
            } catch (w) {
              (r = w), (n = !1);
            }
            break;
          default: {
            const e = new f(`Invalid runtimeContext: ${o.runtimeContext}`, {
              groupingHash: "WebPixel:InvalidRuntimeContext",
            });
            throw (
              (or.message("logPixelRegister", {
                pixelUid: { id: c, type: o.type },
                status: "FAIL",
                errorType: "PixelRegistrationError",
                error: e,
              }),
              e)
            );
          }
        }
        const h = ur(o),
          { measurement: g } = Nt("pixel:register", { pixelId: c, source: u });
        r && !n
          ? or.message("logPixelRegister", {
              pixelUid: { id: c, type: o.type },
              status: "FAIL",
              errorType:
                r instanceof fo
                  ? "PixelInitializationError"
                  : "PixelRegistrationError",
              error: r,
            })
          : n &&
            or.message("logPixelRegister", {
              pixelUid: { id: c, type: o.type },
              status: "SUCCESS",
            });
        const b = r ? "failed" : "registered",
          y = r ? r.message : void 0;
        return (
          Kt("register", {
            version: et,
            pageUrl: self.location.href,
            shopId: s,
            surface: a,
            pixelId: c,
            pixelAppId: h,
            pixelSource: o.type,
            pixelRuntimeContext: o.runtimeContext,
            pixelScriptVersion: o.scriptVersion,
            pixelConfiguration: o?.configuration,
            pixelEventSchemaVersion: o.eventPayloadVersion,
            pixelName: o.name,
            status: b,
            userCanBeTracked: Ue().toString(),
            bundleTarget: tt,
            errorMsg: y,
            duration: g?.duration,
            startTime: g?.startTime,
            sessionId: sn(),
          }),
          n
        );
      }
      let go;
      const bo = () => (
          void 0 === go &&
            (go = (function () {
              let e = !1;
              try {
                const t = {
                    get passive() {
                      return (e = !0), !1;
                    },
                  },
                  n = () => {};
                self.addEventListener("test", n, t),
                  self.removeEventListener("test", n, t);
              } catch (t) {
                return !1;
              }
              return e;
            })()),
          go
        ),
        yo = { capture: !0, passive: !0 };
      function wo(e, t, n, r = {}) {
        const o = r.addEventListenerOptions
          ? { ...yo, ...r.addEventListenerOptions }
          : yo;
        try {
          const i = (function (e, { sampleRate: t, throttleDelay: n } = {}) {
            const r = (n) => {
              gr()
                .then(() => {
                  e(n);
                })
                .catch((e) => {
                  const n = /Maximum call stack size exceeded/i.test(
                    e?.message || ""
                  )
                    ? "metric"
                    : "error";
                  gt.notify(e, {
                    context: "createDomEventsListener/listenTo/handler",
                    type: n,
                    unhandled: !1,
                    options: { sampleRate: t ?? 50 },
                  });
                });
            };
            return "number" == typeof n
              ? (function (e, t, { leading: n = !0, trailing: r = !0 } = {}) {
                  if (t <= 0)
                    throw new f(
                      "The throttle function requires a positive wait time above zero.",
                      { groupingHash: "Utilities:Throttle:InvalidWaitTime" }
                    );
                  if (!n && !r)
                    throw new f(
                      "The throttle function requires at least one of leading or trailing to be true, otherwise, its callback will never be called.",
                      { groupingHash: "Utilities:Throttle:InvalidOptions" }
                    );
                  let o,
                    i,
                    s,
                    a = null,
                    c = 0;
                  function u() {
                    (c = !1 === n ? 0 : new Date().valueOf()),
                      (a = null),
                      o && (i = e.apply(s, o)),
                      (s = null),
                      (o = null);
                  }
                  return function (...l) {
                    const d = new Date().valueOf();
                    c || !1 !== n || (c = d);
                    const p = t - (d - c);
                    return (
                      (s = this),
                      (o = l),
                      p <= 0 || p > t
                        ? (a && (clearTimeout(a), (a = null)),
                          (c = d),
                          o && (i = e.apply(s, o)),
                          (s = null),
                          (o = null))
                        : a || !1 === r || (a = setTimeout(u, p)),
                      i
                    );
                  };
                })(r, n)
              : r;
          })(n, r);
          return (
            e.addEventListener(t, i, bo() ? o : o.capture),
            () => {
              e.removeEventListener(t, i, bo() ? o : o.capture);
            }
          );
        } catch (i) {
          gt.notify(i, {
            context: "createDomEventsListener/listenTo",
            unhandled: !1,
          });
        }
        return () => {};
      }
      const xo = new RegExp(
          [
            "password",
            "pass",
            "pw",
            "ssn",
            "sin",
            "social",
            "security",
            "cc",
            "card",
            "creditcard",
            "cvv",
            "cvc",
            "cvn",
            "billing",
            "license",
            "health",
            "secret",
            "unique",
          ]
            .map((e) => `^(.*[^a-z])?${e}([^a-z].*)?$`)
            .join("|"),
          "i"
        ),
        _o = (function (e, { cache: t, cacheKey: n } = {}) {
          if ("function" != typeof queueMicrotask) return e;
          const r = t ?? un();
          let o = !1;
          const i = dn(e, { cache: r, cacheKey: n });
          return function (...e) {
            return (
              o ||
                (queueMicrotask(() => {
                  r.clear(), (o = !1);
                }),
                (o = !0)),
              i(...e)
            );
          };
        })(
          function (e) {
            return (
              !!Vn(e) &&
              null !==
                e.closest('script, iframe, [data-shopify-privacy="exclude"]')
            );
          },
          { cacheKey: (e) => e }
        ),
        Eo = ["id", "name", "type"],
        So = ["number", "string", "boolean"];
      function ko(e, t, n) {
        const r = t.reduce((t, r) => {
          const o = (function (e, t, n) {
            if (t in e)
              try {
                const n = e[t];
                if (So.includes(typeof n)) return n;
              } catch (r) {
                gt.notify(r, {
                  context:
                    "createDomEventsListener/getElementAttributes/getElementAttribute",
                  type: "metric",
                });
              }
            return e.getAttribute(t) ?? n;
          })(e, r, n?.[r]);
          return void 0 !== o && (t[r] = o), t;
        }, {});
        return (
          ((e, t) => {
            "value" in t &&
              "string" == typeof t.value &&
              ((e) => {
                if (!Vn(e)) return !1;
                const t = e.dataset?.shopifyPrivacy;
                return (
                  "redact" === t ||
                  Eo.some((t) => {
                    const n = e.getAttribute(t);
                    return "string" == typeof n && n.match(xo);
                  })
                );
              })(e) &&
              (t.value = "******");
          })(e, r),
          r
        );
      }
      const Ao = {
          id: null,
          href: null,
          name: null,
          tagName: null,
          type: null,
          value: null,
        },
        Co = Object.keys(Ao);
      function Io(e) {
        return ko(e, Co, Ao);
      }
      const Po = [
          "screenX",
          "screenY",
          "pageX",
          "pageY",
          "clientX",
          "clientY",
          "offsetX",
          "offsetY",
          "movementX",
          "movementY",
        ],
        Oo = Po.reduce((e, t) => ((e[t] = 0), e), {});
      let To = 0;
      const Ro = new WeakMap();
      function No(e) {
        if (!e) return -1;
        let t = Ro.get(e);
        return void 0 === t && ((t = To), Ro.set(e, t), (To += 1)), t;
      }
      const jo = new WeakMap();
      function $o(e) {
        if (!e)
          return { parentSerializationId: -1, prevSiblingSerializationId: -1 };
        if (!jo.has(e)) {
          let t = e.previousSibling;
          for (; t && _o(t); ) t = t.previousSibling;
          jo.set(e, {
            parentSerializationId: No(e.parentNode),
            prevSiblingSerializationId: No(t),
          });
        }
        return jo.get(e);
      }
      function Do(e) {
        jo.delete(e);
      }
      const Mo = ["checkbox", "radio"];
      function Uo(e) {
        const t = { nodeType: e.nodeType, serializationId: No(e) };
        if (e instanceof Element) {
          const n = [];
          if (e.attributes)
            for (let t = 0; t < e.attributes.length; t++) {
              const r = e.attributes[t];
              r && n.push(r.name);
            }
          if (
            (n.push("value"),
            (t.attributes = ko(e, n)),
            e instanceof HTMLInputElement && Mo.includes(e.type))
          ) {
            const n = e.getAttribute("checked");
            null !== n && (t.attributes.checked = n), (t.checked = e.checked);
          }
          t.tagName = e.tagName;
          const { x: r, y: o, height: i, width: s } = e.getBoundingClientRect();
          (t.clientRect = { x: r, y: o, height: i, width: s }),
            (t.scroll = {
              x: e.scrollLeft,
              y: e.scrollTop,
              width: e.scrollWidth,
              height: e.scrollHeight,
            });
        }
        return (
          e.nodeType === Node.TEXT_NODE
            ? (t.textContent = e.textContent ?? "")
            : e instanceof DocumentType &&
              (t.attributes = {
                name: e.name,
                publicId: e.publicId,
                systemId: e.systemId,
              }),
          t
        );
      }
      function Lo(e, t) {
        return { node: Uo(t), ...Oo, ...wn(e, Po) };
      }
      const zo = [
          HTMLInputElement,
          HTMLSelectElement,
          HTMLTextAreaElement,
          HTMLButtonElement,
        ],
        Bo = ["id", "name", "tagName", "type", "value"];
      function Ho(e) {
        return ko(e, Bo);
      }
      const Wo =
          (e, t) =>
          (n, { eventPrefix: r } = {}) =>
            wo(window, e, (o) => {
              try {
                const e = o?.target;
                if (
                  !(
                    e instanceof HTMLInputElement ||
                    e instanceof HTMLSelectElement ||
                    e instanceof HTMLTextAreaElement
                  ) ||
                  _o(e)
                )
                  return;
                r ? n(`${r}${t}`, { node: Uo(e) }) : n(t, { element: Ho(e) });
              } catch (i) {
                gt.notify(i, {
                  context: `createInputListenerFactory/${e}/${t}`,
                  type: "error",
                  unhandled: !1,
                });
              }
            }),
        qo = Wo("blur", "input_blurred"),
        Vo = Wo("focus", "input_focused"),
        Fo = Wo("change", "input_changed"),
        Xo = ["action", "id"],
        Jo = [
          qo,
          Fo,
          (e, { eventPrefix: t } = {}) =>
            wo(
              self.window,
              "click",
              (n) => {
                const r = n?.target;
                if (!(r instanceof Element) || _o(r)) return;
                const o = t
                  ? Lo(n, r)
                  : (function (e, t) {
                      return { element: Io(t), ...Oo, ...wn(e, Po) };
                    })(n, r);
                e(`${t ?? ""}clicked`, o);
              },
              { throttleDelay: 50 }
            ),
          Vo,
          (e, { eventPrefix: t } = {}) =>
            wo(window, "submit", (n) => {
              const r = n?.target;
              r instanceof HTMLFormElement &&
                !_o(r) &&
                (t
                  ? e(`${t}form_submitted`, { node: Uo(r) })
                  : e("form_submitted", {
                      element: {
                        ...ko(r, Xo),
                        elements: Array.from(r.elements)
                          .filter(
                            (e) => zo.some((t) => e instanceof t) && !_o(e)
                          )
                          .map((e) => Ho(e)),
                      },
                    }));
            }),
        ],
        Ko = (e, t) => {
          const n = Jo.map((n) => {
            try {
              return n(e, t);
            } catch (r) {
              return (
                gt.notify(r, { context: "createDomEventsListener" }), () => {}
              );
            }
          });
          return () => {
            n.forEach((e) => e());
          };
        };
      function Yo(e, t) {
        return wo(
          document,
          e,
          (n) => {
            if (!(n instanceof Event && n.type === e)) return;
            const r = n.target;
            if (!(r instanceof Element) || _o(r)) return;
            const o = Uo(r);
            t("advanced_dom_clipboard", { node: o, action: n.type ?? "copy" });
          },
          { throttleDelay: 100 }
        );
      }
      const Go = (e, t) =>
          Array.from(e).reduce((e, n) => (_o(n) || e.push(t(n)), e), []),
        Zo = (e) => ({ node: Uo(e), children: Go(e.childNodes, Zo), ...$o(e) }),
        Qo = [
          (e) => {
            let t = null;
            return wo(
              self.window,
              "mousemove",
              (n) => {
                if (!(n instanceof MouseEvent)) return;
                const r = n?.target;
                if (!(r instanceof Element) || _o(r)) return;
                const o = Lo(n, r);
                (o.movementX = t ? n.screenX - t.screenX : 0),
                  (o.movementY = t ? n.screenY - t.screenY : 0),
                  e("advanced_dom_mouse_moved", o),
                  (t = n);
              },
              { throttleDelay: 50 }
            );
          },
          (e) =>
            wo(
              self.window,
              "resize",
              (t) => {
                const n = t.view;
                n &&
                  e("advanced_dom_window_resized", {
                    innerHeight: n.innerHeight,
                    innerWidth: n.innerWidth,
                  });
              },
              { throttleDelay: 100 }
            ),
          (e) =>
            wo(
              self.window,
              "scroll",
              (t) => {
                if (!(t instanceof Event)) return;
                const n = t?.target;
                let r;
                if (n instanceof Document)
                  r = n.scrollingElement ?? document.documentElement;
                else {
                  if (!(n instanceof Element)) return;
                  r = n;
                }
                _o(r) || e("advanced_dom_scrolled", { node: Uo(r) });
              },
              { throttleDelay: 100 }
            ),
          (e) => {
            const t = [Yo("cut", e), Yo("paste", e), Yo("copy", e)];
            return () => {
              t.forEach((e) => e());
            };
          },
          (e) =>
            wo(
              self.document,
              "selectionchange",
              (t) => {
                const n = document.activeElement;
                n instanceof Element &&
                  !_o(n) &&
                  e("advanced_dom_selection_changed", { node: Uo(n) });
              },
              { throttleDelay: 250 }
            ),
          (e) => {
            const t = () => {
              e("advanced_dom_available", { root: Zo(self.document) });
            };
            return "loading" !== document.readyState
              ? (t(), () => {})
              : wo(self.window, "DOMContentLoaded", t);
          },
          (e) => {
            const t = new MutationObserver(async (t) => {
                await gr(),
                  t.forEach((t) => {
                    if (_o(t.target)) return;
                    const n = Go(
                        Array.from(t.addedNodes).filter((e) => e.parentNode),
                        Zo
                      ),
                      r = (function (e) {
                        if (0 === e.removedNodes.length) return [];
                        if (_o(e.target))
                          return e.removedNodes.forEach((e) => Do(e)), [];
                        const t = Array.from(e.removedNodes).filter((e) => {
                          const { parentSerializationId: t } = $o(e);
                          return -1 !== t || (Do(e), !1);
                        });
                        return Go(t, (e) => {
                          const t = Uo(e);
                          return Do(e), t;
                        });
                      })(t),
                      o = [];
                    if ("attributes" === t.type) {
                      const { target: e, attributeName: n } = t;
                      n &&
                        e instanceof HTMLElement &&
                        t.oldValue !== e.getAttribute(n) &&
                        o.push(Uo(t.target));
                    }
                    if ("characterData" === t.type) {
                      const { target: e } = t;
                      e instanceof Text &&
                        t.oldValue !== e.data &&
                        o.push(Uo(e));
                    }
                    (0 === n.length && 0 === r.length && 0 === o.length) ||
                      e("advanced_dom_changed", {
                        addedFragments: n,
                        removedNodes: r,
                        modifiedNodes: o,
                      });
                  });
              }),
              n = () => {
                t.observe(self.document.documentElement, {
                  attributes: !0,
                  attributeOldValue: !0,
                  childList: !0,
                  subtree: !0,
                  characterData: !0,
                  characterDataOldValue: !0,
                });
              };
            if ("loading" !== document.readyState)
              return (
                n(),
                () => {
                  t.disconnect();
                }
              );
            const r = wo(self.window, "DOMContentLoaded", n);
            return () => {
              r(), t.disconnect();
            };
          },
        ];
      class ei extends Error {
        constructor(...e) {
          super(...e), (this.name = "VisitorError");
        }
      }
      const ti = {
        publish: () => !1,
        publishCustomEvent: () => !1,
        publishDomEvent: () => !1,
        visitor: () => !1,
        subscribe: () => () => !1,
      };
      class ni {
        constructor(e, { onError: t } = {}) {
          (this.eventBus = void 0),
            (this.eventBus = new ir({
              subscribeAllKey: "*",
              onSubscriberError: t,
            }));
          const n = this.eventBus.subscribe.bind(this.eventBus);
          e.forEach((e) => {
            try {
              e.register(n);
            } catch (r) {
              t
                ? t(r)
                : console?.error("Error registering event hub adapter:", r);
            }
          });
        }
        emit(e, t) {
          this.eventBus.publish(e, {
            name: e,
            timestamp: new Date().valueOf(),
            payload: t,
          });
        }
      }
      function ri(e, t) {
        if (!{}.hasOwnProperty.call(e, t))
          throw new TypeError("attempted to use private field on non-instance");
        return e;
      }
      var oi = 0;
      function ii(e) {
        return "__private_" + oi++ + "_" + e;
      }
      var si = ii("client"),
        ai = ii("surface");
      class ci {
        constructor(e, { surface: t }) {
          Object.defineProperty(this, si, { writable: !0, value: void 0 }),
            Object.defineProperty(this, ai, { writable: !0, value: void 0 }),
            (ri(this, si)[si] = e),
            (ri(this, ai)[ai] = t);
        }
        register(e) {
          ri(this, ai)[ai] === m.CustomerAccount &&
            e("log:event-bus:publish", ({ payload: { event: e } }) => {
              if ("page_viewed" === e.name) {
                const { context: t } = e;
                ri(this, si)[si].track({
                  eventName: "page_rendered",
                  shopifyEmitted: !0,
                  eventTime: new Date(e.timestamp).valueOf(),
                  eventId: e.id,
                  uniqueToken: e.clientId,
                  userAgent: t.navigator.userAgent,
                  acceptLanguage: t.navigator.language,
                  referrer: t.document.referrer,
                  eventSourceUrl: t.document.location.href,
                });
              }
            });
        }
      }
      var ui = ii("sendEvent"),
        li = ii("configuration");
      class di {
        constructor(e, t) {
          Object.defineProperty(this, ui, { writable: !0, value: void 0 }),
            Object.defineProperty(this, li, { writable: !0, value: void 0 }),
            (ri(this, ui)[ui] = e),
            (ri(this, li)[li] = t);
        }
        track(e) {
          ri(this, ui)[ui](
            Bt("firstPartyTracking", {
              source: "web-pixels-manager",
              shopId: ri(this, li)[li].shopId,
              isMerchantRequest: ri(this, li)[li].isMerchantRequest,
              apiClientId: 5677769,
              analyticsAllowed: ri(this, li)[li].analyticsProcessingAllowed(),
              marketingAllowed: ri(this, li)[li].marketingAllowed(),
              preferencesAllowed: ri(this, li)[
                li
              ].preferencesProcessingAllowed(),
              saleOfDataAllowed: ri(this, li)[li].saleOfDataAllowed(),
              ...e,
            })
          );
        }
      }
      const pi = [
          "checkout_completed",
          "checkout_started",
          "payment_info_submitted",
          "checkout_shipping_info_submitted",
          "checkout_contact_info_submitted",
          "checkout_address_info_submitted",
        ],
        fi = new Set([
          ...pi,
          "page_viewed",
          "product_viewed",
          "collection_viewed",
          "product_added_to_cart",
          "search_submitted",
        ]),
        mi = {
          page_viewed: "page_rendered",
          product_viewed: "product_page_rendered",
          collection_viewed: "collection_page_rendered",
        },
        hi = (e) => mi[e] || e;
      var vi = ii("client"),
        gi = ii("surface");
      class bi {
        constructor(e, { surface: t }) {
          Object.defineProperty(this, vi, { writable: !0, value: void 0 }),
            Object.defineProperty(this, gi, { writable: !0, value: void 0 }),
            (ri(this, vi)[vi] = e),
            (ri(this, gi)[gi] = t);
        }
        register(e) {
          e("log:event-bus:publish", ({ payload: { event: e } }) => {
            if (!((e) => fi.has(e.name))(e)) return;
            const { context: t } = e,
              n = {
                eventTime: new Date(e.timestamp).valueOf(),
                eventId: e.id,
                uniqueToken: e.clientId,
                eventSourceUrl: t.document.location.href,
                surface: ri(this, gi)[gi],
                userAgent: t.navigator.userAgent,
                sessionId: sn(),
                referrer: t.document.referrer,
              };
            if (((e) => pi.includes(e.name))(e)) {
              const { checkout: t } = e.data;
              ri(this, vi)[vi].track({
                ...n,
                eventName: e.name,
                checkoutToken: t.token || void 0,
                subtotalValue: t.subtotalPrice?.amount,
                totalValue: t.totalPrice?.amount,
                currency: t.currencyCode || void 0,
                email: t.email || void 0,
                phone: t.shippingAddress?.phone || void 0,
                billingAddressCity: t.shippingAddress?.city || void 0,
                billingAddressCountry: t.shippingAddress?.country || void 0,
                billingAddressRegion: t.shippingAddress?.province || void 0,
              });
            } else if ("product_viewed" === e.name) {
              const { productVariant: t } = e.data;
              ri(this, vi)[vi].track({
                ...n,
                eventName: hi(e.name),
                productId: t.product?.id || void 0,
                productTitle: t.product?.title || void 0,
                totalValue: t.price?.amount || void 0,
                currency: t.price?.currencyCode || void 0,
              });
            } else if ("collection_viewed" === e.name) {
              const { collection: t } = e.data;
              ri(this, vi)[vi].track({
                ...n,
                eventName: hi(e.name),
                collectionName: t?.title || void 0,
                currency:
                  t?.productVariants?.find((e) => e?.price?.currencyCode)?.price
                    ?.currencyCode || void 0,
              });
            } else if ("product_added_to_cart" === e.name) {
              const { cartLine: t } = e.data,
                { merchandise: o } = t || {},
                i = o?.product?.title,
                s = o?.title,
                a = i && s ? `${i} - ${s}` : i,
                c = {
                  variant_id: o?.id || void 0,
                  product_id: o?.product?.id || void 0,
                  name: a || void 0,
                  price: o?.price?.amount || void 0,
                  sku: o?.sku || void 0,
                  brand: o?.product?.vendor || void 0,
                  variant: o?.title || void 0,
                  category: o?.product?.type || void 0,
                  quantity: t?.quantity || void 0,
                };
              let u = [];
              try {
                u = [JSON.stringify(c)];
              } catch (r) {
                console.warn(
                  "Failed to serialize product object for tracking:",
                  r
                );
              }
              ri(this, vi)[vi].track({
                ...n,
                eventName: e.name,
                products: u,
                totalValue: t?.cost?.totalAmount?.amount || void 0,
                currency: t?.cost?.totalAmount?.currencyCode || void 0,
              });
            } else if ("page_viewed" === e.name)
              ri(this, vi)[vi].track({
                ...n,
                eventName: hi(e.name),
                referrer: t.document.referrer,
              });
            else if ("search_submitted" === e.name) {
              const { searchResult: r } = e.data;
              ri(this, vi)[vi].track({
                ...n,
                eventName: e.name,
                searchString: r?.query || "",
                referrer: t.document.referrer,
              });
            }
          });
        }
      }
      var yi = ii("sendEvent"),
        wi = ii("configuration");
      class xi {
        constructor(e, t) {
          Object.defineProperty(this, yi, { writable: !0, value: void 0 }),
            Object.defineProperty(this, wi, { writable: !0, value: void 0 }),
            (ri(this, yi)[yi] = e),
            (ri(this, wi)[wi] = t);
        }
        track(e) {
          try {
            if (!this.hasRequiredConsent()) return;
            const t = {
              ...e,
              shopId: ri(this, wi)[wi].shopId,
              source: this.constructSource(e.surface),
              analyticsAllowed: ri(this, wi)[wi].analyticsProcessingAllowed(),
              marketingAllowed: ri(this, wi)[wi].marketingAllowed(),
              preferencesAllowed: ri(this, wi)[
                wi
              ].preferencesProcessingAllowed(),
              saleOfDataAllowed: ri(this, wi)[wi].saleOfDataAllowed(),
              assetVersionId: nt,
              facebookCapiEnabled: !1,
              shopifyEmitted: !0,
            };
            ri(this, yi)[yi](Bt("webPixelsStorefrontCustomerTracking", t));
          } catch (t) {}
        }
        hasRequiredConsent() {
          return (
            ri(this, wi)[wi].analyticsProcessingAllowed() ||
            ri(this, wi)[wi].marketingAllowed()
          );
        }
        constructSource(e) {
          return `wpm-${e}`;
        }
      }
      var _i = ii("client");
      class Ei {
        constructor(e) {
          Object.defineProperty(this, _i, { writable: !0, value: void 0 }),
            (ri(this, _i)[_i] = e);
        }
        register(e) {
          e("log:event-bus:publish:transformed", ({ payload: e }) => {
            const { pixel: t, event: n } = e;
            ri(this, _i)[_i].track({
              eventName: n.name,
              pixelId: t.id,
              pixelAppId: ur(t),
              pixelSource: t.type,
              adjustmentsTriggers: e.adjustmentsTriggers,
              adjustmentsApplied: e.adjustmentsApplied,
              adjustmentsContext: "publish",
              dataSharingAdjustments: t.dataSharingAdjustments,
            });
          }),
            e("log:pixel:init:transformed", ({ payload: e }) => {
              const { pixel: t } = e;
              ri(this, _i)[_i].track({
                eventName: "register:init",
                pixelId: t.id,
                pixelAppId: ur(t),
                pixelSource: t.type,
                adjustmentsTriggers: e.adjustmentsTriggers,
                adjustmentsApplied: e.adjustmentsApplied,
                adjustmentsContext: "init",
                dataSharingAdjustments: t.dataSharingAdjustments,
              });
            });
        }
      }
      const Si = dn((e) => JSON.stringify(e), {
        cache: new WeakMap(),
        cacheKey: (e) => e,
      });
      var ki = ii("sendEvent"),
        Ai = ii("configuration");
      class Ci {
        constructor(e, t) {
          Object.defineProperty(this, ki, { writable: !0, value: void 0 }),
            Object.defineProperty(this, Ai, { writable: !0, value: void 0 }),
            (ri(this, ki)[ki] = e),
            (ri(this, Ai)[Ai] = t);
        }
        track(e) {
          try {
            ri(this, ki)[ki](
              Bt("webPixelsPublicEventPayloadTransform", {
                shopId: ri(this, Ai)[Ai].shopId,
                pixelSource: e.pixelSource,
                surface: ri(this, Ai)[Ai].surface,
                eventName: e.eventName,
                pixelId: e.pixelId,
                pixelAppId: e.pixelAppId,
                pageUrl: ri(this, Ai)[Ai].pageUrl,
                bundleTarget: tt,
                adjustmentsTriggers: e.adjustmentsTriggers,
                adjustmentsApplied: e.adjustmentsApplied,
                adjustmentsContext: e.adjustmentsContext,
                adjustmentsJson: e.dataSharingAdjustments
                  ? Si(e.dataSharingAdjustments)
                  : void 0,
              })
            );
          } catch (t) {}
        }
      }
      let Ii;
      const Pi = Object.values(b),
        Oi = (e) => {
          const t = e.trim().toLowerCase();
          return (n = t), Pi.includes(n) ? t : b.NotAvailable;
          var n;
        },
        Ti = Object.values(m),
        Ri = [m.NotAvailable, m.Unknown, m.StorefrontRenderer],
        Ni = (e) => {
          if (!e) return -1;
          const t = e.trim();
          if (!/^\d+$/.test(t)) return -1;
          const n = window.parseInt(t, 10);
          return window.isNaN(n) || n <= 0 ? -1 : n;
        };
      function ji(e) {
        if (!e) return [];
        try {
          const t = JSON.parse(e);
          return Array.isArray(t) ? t : [];
        } catch (t) {
          return [];
        }
      }
      const $i = () => {
        const e = (() => {
            try {
              return document.currentScript?.dataset;
            } catch {
              return null;
            }
          })(),
          t = ((e) => {
            const t = e.trim().toLowerCase();
            return (
              (n = t),
              Ti.includes(n)
                ? t
                : window.Shopify?.Checkout
                ? m.Shopify
                : window.Shopify?.analytics?.replayQueue
                ? m.StorefrontRenderer
                : window.CardFields
                ? m.CheckoutOne
                : m.Unknown
            );
            var n;
          })(e?.surface ?? ""),
          n = ((e) => {
            if (!e) return [];
            try {
              const t = JSON.parse(e);
              return Array.isArray(t)
                ? t.filter((e) => "string" == typeof e)
                : [];
            } catch {
              return [];
            }
          })(e?.enabledBetaFlags),
          r = n.includes("532bb929");
        return {
          browserTarget: Oi(e?.browserTarget ?? ""),
          surface: t,
          enabledBetaFlags: n,
          isMerchantRequest: "true" === e?.isMerchantRequest,
          hashVersion: e?.hashVersion ?? "",
          shopId: Ni(e?.shopId),
          storefrontBaseUrl:
            (window.location.origin || e?.storefrontBaseUrl) ?? "",
          extensionBaseUrl: e?.extensionBaseUrl ?? "",
          shopDomain: e?.shopDomain ?? window.Shopify?.shop ?? "",
          events: ji(e?.events),
          features: {
            domEvents: !r && "false" !== e?.domEvents && Ri.includes(t),
            advancedDomEvents: !r && "false" !== e?.advancedDomEvents,
            storefrontEvents: "false" !== e?.storefrontEvents && Ri.includes(t),
            cartPermalink:
              "false" !== e?.cartPermalink &&
              [...Ri, m.CheckoutOne, m.Shopify].includes(t),
          },
          scope: { publish: e?.publish === cr.All ? cr.All : cr.Custom },
        };
      };
      try {
        !(function ({ configuration: t, eventHub: n }) {
          const s = window.location.href;
          gt.metadata = wn(t, [
            "shopId",
            "surface",
            "browserTarget",
            "shopDomain",
          ]);
          try {
            (({ storefrontBaseUrl: e }) => {
              if (!e) throw new ht("storefrontBaseUrl is required.");
              if (
                !(function (e) {
                  try {
                    return new URL(e), !0;
                  } catch (t) {
                    return (function (e) {
                      const t = new RegExp(
                        "^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*[a-z]{1,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
                        "i"
                      );
                      return Boolean(t.test(e));
                    })(e);
                  }
                })(e)
              )
                throw new ht(
                  `storefrontBaseUrl is not a valid absolute URL: "${e}"`
                );
            })(t),
              qt(t.storefrontBaseUrl),
              (function (e = []) {
                (Array.isArray(e) ? e : [e]).forEach((e) => At.add(e));
              })(t.enabledBetaFlags);
            const c =
                n ??
                ((e, { onError: t, pageUrl: n } = {}) => {
                  const r = [
                    new ci(
                      new di(Jt, {
                        ...e,
                        analyticsProcessingAllowed: Be,
                        marketingAllowed: ze,
                        preferencesProcessingAllowed: He,
                        saleOfDataAllowed: We,
                      }),
                      { surface: e.surface }
                    ),
                  ];
                  return (
                    Ct("f12a06f7") &&
                      r.push(
                        new bi(
                          new xi(Jt, {
                            ...e,
                            analyticsProcessingAllowed: Be,
                            marketingAllowed: ze,
                            preferencesProcessingAllowed: He,
                            saleOfDataAllowed: We,
                          }),
                          { surface: e.surface }
                        )
                      ),
                    r.push(
                      new Ei(
                        new Ci(Jt, {
                          shopId: e.shopId,
                          surface: e.surface,
                          pageUrl: n ?? "",
                        })
                      )
                    ),
                    new ni(r, { onError: t })
                  );
                })(t, {
                  pageUrl: s,
                  onError: (e) => {
                    gt.notify(e, {
                      context: "createWebPixelsManager/eventHub",
                      severity: "warning",
                      unhandled: !1,
                    });
                  },
                }),
              d = c.emit.bind(c),
              {
                shopId: p,
                surface: h,
                storefrontBaseUrl: v,
                extensionBaseUrl: b,
                browserTarget: y,
                features: w,
                scope: x,
              } = t,
              _ = {
                shopId: p,
                surface: h,
                browserTarget: y,
                pageUrl: s,
                storefrontBaseUrl: v,
                extensionBaseUrl: b,
                addMonorailEvent: Jt,
                logError: gt.notify,
                userConsent: kt,
                getClientId: yn,
                emit: d,
              };
            if (self[Ze]) {
              const e = [];
              let t = {};
              try {
                const n = document.querySelectorAll(
                  "#web-pixels-manager-setup"
                );
                n.length > 0 &&
                  Array.from(n).map((t) => {
                    e.push(
                      Array.from(t.attributes).reduce(
                        (e, t) => ((e[t.name] = t.value), e),
                        {}
                      )
                    );
                  });
                const r = document.currentScript;
                r &&
                  (t = Array.from(r.attributes).reduce(
                    (e, t) => ((e[t.name] = t.value), e),
                    {}
                  ));
              } catch (a) {}
              const n = new f(
                `WebPixelsManager: ${Ze} global object is already defined`,
                {
                  groupingHash: "WebPixelsManager:GlobalObjectAlreadyDefined",
                  severity: "info",
                }
              );
              return (
                gt.notify(n, {
                  type: "metric",
                  context: "createWebPixelsManager",
                  severity: "info",
                  unhandled: !1,
                  notes: `setupScriptElementAttributes: ${JSON.stringify(
                    e
                  )}, currentScriptElementAttributes: ${JSON.stringify(t)}`,
                }),
                self[Ze]
              );
            }
            const E = Bt("load", {
                version: et,
                bundleTarget: tt,
                pageUrl: s,
                status: "loading",
                surface: h,
              }),
              S = sn(),
              k = {
                init(n) {
                  if (
                    (function () {
                      const e = `\\/(${Ot.Wpm}|${Ot.WebPixels})@(.+)\\/sandbox`;
                      return null !== self.location.href.match(new RegExp(e));
                    })()
                  )
                    return ti;
                  const {
                      initData: c,
                      isMerchantRequest: d,
                      monorailRegion: v,
                      webPixelsConfigList: b,
                    } = n,
                    y = { ...n, ...t };
                  if (Ii)
                    return (
                      gt.notify(
                        new f(
                          `WebPixelsManager: ${Ze} is being initialized multiple times`,
                          {
                            groupingHash:
                              "WebPixelsManager:MultipleInitialization",
                            severity: "info",
                          }
                        ),
                        {
                          type: "metric",
                          context: "createWebPixelsManager/init",
                          severity: "info",
                          unhandled: !1,
                          initConfig: y,
                        }
                      ),
                      Ii
                    );
                  const E = (function () {
                    const e = self?.location?.hostname || "",
                      t = bn.get(e);
                    if (t) return t;
                    const n = e.split("."),
                      r = [];
                    return (
                      n.reverse().reduce((e, t) => {
                        const n = "" === e ? t : `${t}.${e}`;
                        return (
                          (function (e) {
                            hn(`${gn}=1; path=/; domain=${e}`);
                          })(n),
                          vn(gn) || r.push(n),
                          (function (e) {
                            hn(
                              `${gn}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${e}`
                            );
                          })(n),
                          n
                        );
                      }, ""),
                      bn.set(e, r),
                      r
                    );
                  })();
                  d && ot(() => self.sessionStorage.setItem(it, "true")),
                    Ge(),
                    (Vt = v),
                    (ot(() => "true" === self.sessionStorage.getItem(it), !1) ||
                      h === m.CustomerAccount) &&
                      or.init(y);
                  const k = Ue().toString(),
                    A = Bt("unload", {
                      version: et,
                      bundleTarget: tt,
                      pageUrl: s,
                      shopId: p,
                      surface: h,
                      isCompleted: "false",
                      runtimeErrorCaught: "false",
                      userCanBeTracked: k,
                      sessionId: S,
                    });
                  var C;
                  (C = A),
                    window.addEventListener("pagehide", () => {
                      (C.payload.pageDuration =
                        Nt("page:session")?.measurement?.duration),
                        (Wt = !0),
                        Jt(C),
                        Yt();
                    });
                  const I = to(_),
                    P = (function (e) {
                      const t = new ir({
                        bufferSize: 1e3,
                        subscribeAllKey: "all_customer_privacy_events",
                      });
                      return (
                        t.use(Br),
                        {
                          publish(e, n, r) {
                            if ("string" != typeof e)
                              throw new f(
                                "Expected event name to be a string, but got " +
                                  typeof e,
                                {
                                  groupingHash:
                                    "CustomerPrivacyEventBus:PublishEventNameNotString",
                                }
                              );
                            if (e !== F)
                              throw new f(
                                `Expected event name to be a ${F}, but got "${e}".`,
                                {
                                  groupingHash:
                                    "CustomerPrivacyEventBus:PublishEventNameNotSupported",
                                }
                              );
                            return t.publish(e, n, r);
                          },
                          subscribe(n, r, o = {}) {
                            if (n !== F)
                              throw new f(
                                `Event name "${n}" is not supported in the CustomerPrivacyEventBus.`,
                                {
                                  groupingHash:
                                    "CustomerPrivacyEventBus:SubscribeEventNameNotSupported",
                                }
                              );
                            return t.subscribe(
                              n,
                              (t) => {
                                if (
                                  e === m.CheckoutOneSdk &&
                                  o.scope !== sr.CheckoutOneSdk
                                )
                                  return;
                                const n = {
                                  configuration:
                                    o.pixelRuntimeConfig?.configuration,
                                  eventPayloadVersion:
                                    o.schemaVersion ||
                                    o.pixelRuntimeConfig?.eventPayloadVersion ||
                                    "unknown",
                                  id: o.pixelRuntimeConfig?.id || "unknown",
                                  type: o.pixelRuntimeConfig?.type || "unknown",
                                  runtimeContext:
                                    o.pixelRuntimeConfig?.runtimeContext ||
                                    "unknown",
                                  restrictions:
                                    o.pixelRuntimeConfig?.restrictions,
                                  scriptVersion:
                                    o.pixelRuntimeConfig?.scriptVersion ||
                                    "unknown",
                                  apiClientId:
                                    o.pixelRuntimeConfig?.apiClientId,
                                };
                                r.call(t, t),
                                  Kt("subscriberEventEmitPrivacy", {
                                    version: et,
                                    bundleTarget: tt,
                                    pageUrl: self.location.href,
                                    shopId: o.shopId,
                                    surface: o.surface,
                                    pixelId: n.id,
                                    pixelAppId: ur(n),
                                    pixelSource: n.type,
                                    pixelRuntimeContext: n.runtimeContext,
                                    pixelScriptVersion: n.scriptVersion,
                                    pixelConfiguration: n.configuration,
                                    pixelEventSchemaVersion:
                                      n.eventPayloadVersion,
                                    eventName: F,
                                    eventId: rn(),
                                  });
                              },
                              o
                            );
                          },
                        }
                      );
                    })(h),
                    O = {
                      context: "createWebPixelsManager/init",
                      severity: "warning",
                      unhandled: !1,
                      initConfig: y,
                    },
                    T = Bt("init", {
                      version: et,
                      bundleTarget: tt,
                      pageUrl: s,
                      shopId: p,
                      surface: h,
                      status: "initializing",
                      userCanBeTracked: k,
                    });
                  try {
                    if (self.Shopify && !0 === self.Shopify.designMode)
                      return (
                        self.console &&
                          console.log(
                            "[WebPixelsManager] Prevented from executing in the Theme Editor"
                          ),
                        ti
                      );
                    if (/^web-pixel-sandbox/.test(self.name)) {
                      const e = new ht(
                        "WebPixelsManager: browser library is being run in a sandbox"
                      );
                      throw (
                        (gt.notify(e, {
                          ...O,
                          type: "metric",
                          library: "browser",
                        }),
                        e)
                      );
                    }
                    h === m.CheckoutOneSdk && (b.length = 0);
                    const n = b.reduce(
                      (e, t) => {
                        (t.type = t.type.toUpperCase()),
                          (t.runtimeContext = t.runtimeContext?.toUpperCase());
                        const n = vo(_, {
                          webPixelConfig: t,
                          eventBus: I,
                          customerPrivacyEventBus: P,
                          initData: c,
                          cookieRestrictedDomains: E,
                        });
                        return (
                          t.restrictions?.preventLoadingBeforeEvent
                            ? e.waiting.push(n)
                            : e.ready.push(n),
                          e
                        );
                      },
                      { ready: [], waiting: [] }
                    );
                    Promise.all(n.ready)
                      .then(() =>
                        (function (e) {
                          const { measurement: t } = Nt("completed");
                          (e.payload.isCompleted = "true"),
                            (e.payload.runTimeDuration = t?.duration),
                            (e.payload.startTime = t?.startTime);
                        })(A)
                      )
                      .catch((e) => {
                        self.console && console.error("[Web Pixels]", e);
                      }),
                      Promise.all(n.waiting).catch(() => {}),
                      (function () {
                        if (!_t)
                          try {
                            document.addEventListener(F, xt), (_t = !0);
                          } catch (a) {
                            gt.notify(a, {
                              context:
                                "onConsentCollected/createOnConsentCollectedListener",
                              unhandled: !1,
                            });
                          }
                      })(),
                      wt((e) => {
                        e &&
                          e.detail &&
                          P.publish(F, {
                            customerPrivacy: {
                              analyticsProcessingAllowed:
                                e.detail.analyticsAllowed,
                              marketingAllowed: e.detail.marketingAllowed,
                              preferencesProcessingAllowed:
                                e.detail.preferencesAllowed,
                              saleOfDataAllowed: e.detail.saleOfDataAllowed,
                            },
                          });
                      });
                    const s = (
                      h === m.CustomerAccount ? I.publish : I.publishDomEvent
                    ).bind(I);
                    if (w.storefrontEvents)
                      try {
                        !(function (e, t, n) {
                          q(e, t, n),
                            (function (e, t) {
                              i((n) => {
                                const r = n.querySelector(
                                  '[name="previous_step"]'
                                );
                                r &&
                                  r instanceof HTMLInputElement &&
                                  "payment_method" === r.value &&
                                  o(document.body, "submit", (n) => {
                                    !(function (e, t, n) {
                                      const r = t || window.event;
                                      if (!r) return;
                                      const o = r.target || r.srcElement;
                                      if (
                                        o &&
                                        o instanceof HTMLFormElement &&
                                        o.getAttribute("action") &&
                                        null !==
                                          o.getAttribute("data-payment-form")
                                      )
                                        try {
                                          const t = n.checkout;
                                          if (!t)
                                            throw new f(
                                              "Checkout data not found"
                                            );
                                          e("payment_info_submitted", {
                                            checkout: t,
                                          });
                                        } catch (a) {}
                                    })(e, n, t);
                                  });
                              });
                            })(e, t);
                        })(I.publish.bind(I), c, {
                          filterRemoteProducts: Ct("2dca8a86"),
                        });
                      } catch (a) {
                        gt.notify(a, {
                          context:
                            "createWebPixelsManager/createShopEventsListener",
                        });
                      }
                    return (
                      w.cartPermalink &&
                        (function (t, { cart: n }) {
                          try {
                            if (!window.localStorage) return;
                            const o = new URLSearchParams(
                              window.location.search
                            ).get(r);
                            if (!o) return;
                            if (o === window.localStorage.getItem(r)) return;
                            window.localStorage.setItem(r, o),
                              null == n ||
                                n.lines.forEach((n) => {
                                  R(t, n, n.quantity, e, "permalink");
                                });
                          } catch (a) {}
                        })(I.publish.bind(I), c),
                      w.domEvents && Ko(s),
                      w.advancedDomEvents &&
                        b.some(({ capabilities: e }) =>
                          (e || []).includes(g.AdvancedDomEvents)
                        ) &&
                        ((N = s),
                        Qo.map((e) => {
                          try {
                            return e(N);
                          } catch (a) {
                            return (
                              gt.notify(a, {
                                context: "createAdvancedDomEventsListener",
                              }),
                              () => {}
                            );
                          }
                        }),
                        Ko(s, { eventPrefix: "advanced_dom_" })),
                      (T.payload.status = "initialized"),
                      Jt(T),
                      (Ii = (function (
                        e,
                        { eventBus: t, customerId: n, scope: r }
                      ) {
                        const o = (function (
                            {
                              addMonorailEvent: e,
                              logError: t,
                              userConsent: n,
                              shopId: r,
                              pageUrl: o,
                              surface: i,
                              getClientId: s,
                            },
                            a
                          ) {
                            return {
                              visitor: (c = {}, u) => {
                                const l = (function (e = {}, t) {
                                  if (!e || "object" != typeof e)
                                    return "Visitor info must be of type object";
                                  const { email: n, phone: r } = e;
                                  return n || r
                                    ? n && "string" != typeof n
                                      ? "Email must be of type string"
                                      : r && "string" != typeof r
                                      ? "Phone must be of type string"
                                      : t?.appId && "string" != typeof t.appId
                                      ? "appId must be of type string"
                                      : t?.apiClientId &&
                                        "string" != typeof t.apiClientId
                                      ? "apiClientId must be of type string"
                                      : null
                                    : "Visitor must have one of phone or email";
                                })(c, u);
                                if (l) throw new ei(l);
                                return (
                                  n({
                                    analytics: !0,
                                    marketing: !0,
                                    preferences: !1,
                                    sale_of_data: !1,
                                  })
                                    .then(() =>
                                      e(
                                        Bt("visitor", {
                                          ...a,
                                          ...c,
                                          shopId: r,
                                          version: et,
                                          pageUrl: o,
                                          surface: i,
                                          apiClientId:
                                            u?.appId || u?.apiClientId,
                                          clientId: s(),
                                        })
                                      )
                                    )
                                    .catch(() =>
                                      t("visitor error", {
                                        severity: "error",
                                        context: "createVisitorApi/visitor",
                                        unhandled: !1,
                                        shopId: r,
                                        surface: i,
                                      })
                                    ),
                                  !0
                                );
                              },
                            };
                          })(e, { customerId: n }),
                          { shopId: i, surface: s } = e,
                          a = (e, n, o) =>
                            !(
                              s === m.CustomerAccount &&
                              !l(e) &&
                              r.publish !== cr.All
                            ) && t.publish(e, n, o);
                        return {
                          publish: (e, t, n) => a(e, t, n),
                          publishCustomEvent: (e, n, r = {}) =>
                            s === m.CustomerAccount
                              ? a(e, n, r)
                              : t.publishCustomEvent(e, n, r),
                          publishDomEvent: (e, n, r = {}) =>
                            s === m.CustomerAccount
                              ? a(e, n, r)
                              : t.publishDomEvent(e, n, r),
                          subscribe: (e, n, r) =>
                            t.subscribe(e, n, {
                              ...r,
                              shopId: i,
                              surface: s,
                              scope:
                                s === m.CheckoutOneSdk
                                  ? sr.CheckoutOneSdk
                                  : void 0,
                            }),
                          visitor: (e, t) => o.visitor(e, t),
                        };
                      })(_, {
                        eventBus: I,
                        customerId: c?.customer?.id,
                        scope: x,
                      })),
                      t.events.forEach(([e, t, n]) => {
                        try {
                          h === m.CustomerAccount || u(e)
                            ? I.publish(e, t, n)
                            : I.publishCustomEvent(e, t, n);
                        } catch (a) {
                          gt.notify(a, {
                            context: "createWebPixelsManager/init/replayEvents",
                            severity: "warning",
                            unhandled: !1,
                            initConfig: y,
                          });
                        }
                      }),
                      Ii
                    );
                  } catch (a) {
                    return (
                      a instanceof ht ||
                        gt.notify(a, { context: "init", initConfig: y }),
                      self.console && console.error(a),
                      (T.payload.status = "failed"),
                      (T.payload.errorMsg = a?.message),
                      Jt(T),
                      (A.payload.runtimeErrorCaught = "true"),
                      ti
                    );
                  }
                  var N;
                },
              };
            return (
              an(
                self,
                Ze,
                { value: k, writable: !1, configurable: !1, enumerable: !1 },
                !1
              ),
              (E.payload.status = "loaded"),
              Jt(E),
              k
            );
          } catch (a) {
            const e = a instanceof ht || "WebPixelsHandledError" === a.name;
            return (
              gt.notify(a, {
                context: "createWebPixelsManager",
                severity: e ? "warning" : "error",
                unhandled: !e,
              }),
              self.console && console.error(a),
              Jt(
                Bt("load", {
                  version: et,
                  bundleTarget: tt,
                  pageUrl: s,
                  status: "manager-create-error",
                  surface: t.surface,
                  errorMsg: a?.message,
                }),
                !0
              ),
              { init: () => ti }
            );
          }
        })({ configuration: $i() });
      } catch (Di) {
        gt.notify(Di, {
          context: "entry-browser",
          severity: "error",
          unhandled: !1,
        });
      }
    })();
})();
