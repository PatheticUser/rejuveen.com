import {
  _ as t,
  aq as e,
  aj as n,
  c as r,
  ar as i,
  ah as o,
} from "./chunk.common_DH6hE_eH.esm.js";
import "./chunk.modal_Coo4kjcu.esm.js";
function s() {
  return t(this, void 0, void 0, function* () {
    if ("userAgentData" in e && e.userAgentData)
      try {
        const t = e.userAgentData.brands || [];
        return t.some(({ brand: t }) => /chrome|edge|chromium/i.test(t));
      } catch (t) {}
    return (
      !(void 0 === e || !e.userAgent) &&
      (function () {
        const t = e.userAgent,
          n = /(chrome|crios)\/([\w.]+)/i.test(t),
          r = /(edg|edge|edga|edgios)\/([\w.]+)/i.test(t),
          i = /(opr|opera|brave|vivaldi)\/([\w.]+)/i.test(t);
        return (n || r) && !i;
      })()
    );
  });
}
function a(e) {
  return t(this, void 0, void 0, function* () {
    const t = new n("initShopCartSync");
    try {
      let t,
        n = !1;
      if (!(yield s())) return;
      (t = r.querySelector("shop-cart-sync")),
        t || ((t = i("shop-cart-sync")), (n = !0)),
        t.setAttribute(
          "experiments",
          JSON.stringify((null == e ? void 0 : e.experiments) || {})
        ),
        n && r.body.appendChild(t);
    } catch (e) {
      e instanceof Error && t.notify(e);
    }
  });
}
o("initShopCartSync", a);
//# sourceMappingURL=client.init-shop-cart-sync_CaXF8FF_.en.esm.js.map
