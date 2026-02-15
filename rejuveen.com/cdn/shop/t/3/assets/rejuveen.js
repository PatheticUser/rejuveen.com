document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".shopify-section.text-detail-switcher")
    .forEach((section) => {
      const sectionId = section.id,
        ingredientNames = section.querySelectorAll(
          `#${sectionId} .text-detail-switcher-name`
        ),
        contentItems = section.querySelectorAll(
          `#${sectionId} .text-detail-switcher-item`
        );
      let activeIndex = 0;
      contentItems.forEach((content, index) => {
        (content.style.visibility = index === 0 ? "visible" : "hidden"),
          (content.style.opacity = index === 0 ? "1" : "0");
      });
      function showContent(index) {
        if (index === activeIndex) return;
        const currentContent = contentItems[activeIndex],
          newContent = contentItems[index];
        (currentContent.style.opacity = "0"),
          (currentContent.style.visibility = "hidden"),
          setTimeout(() => {
            (newContent.style.visibility = "visible"),
              (newContent.style.opacity = "1");
          }, 100),
          ingredientNames[activeIndex].classList.remove("active-text-detail"),
          ingredientNames[index].classList.add("active-text-detail"),
          (activeIndex = index);
      }
      ingredientNames.forEach((name) => {
        const index = parseInt(name.getAttribute("data-index"));
        name.addEventListener("click", () => showContent(index));
      });
    });
  const items = document.querySelectorAll(".images-scrolling-mobile__item"),
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const heading = entry.target.querySelector(".h1");
          heading &&
            heading.classList.toggle("italic-heading", entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
  items.forEach((item) => observer.observe(item)),
    document
      .querySelectorAll(".product-info__accordion, .faq-accordion")
      .forEach((accordion) => {
        new MutationObserver((mutationsList) => {
          mutationsList.forEach((mutation) => {
            mutation.attributeName === "open" &&
              accordion.hasAttribute("open") &&
              (document
                .querySelectorAll(`[${mutation.attributeName}][open]`)
                .forEach((otherAccordion) => {
                  otherAccordion !== accordion &&
                    otherAccordion.querySelector(".accordion__toggle").click();
                }),
              accordion.setAttribute("aria-expanded", "true"));
          });
        }).observe(accordion, { attributes: !0 });
      });
}),
  (function () {
    var discountMap = {
      3918896169122: 38,
      3918896300194: 19,
      3918896431266: 6,
    };
    function createDiscountNote(variantId) {
      var discount = discountMap[variantId];
      return discount
        ? '<div class="pdp-promo-discount">Save <b>$' +
            discount +
            "</b>. Discount shows on checkout.</div>"
        : "";
    }
    function insertDiscountInto(rootElement) {
      rootElement
        .querySelectorAll(".pdp-promo-discount")
        .forEach(function (el) {
          el.remove();
        });
      var selectedRadio = rootElement.querySelector(
        'input[type="radio"][data-option-position]:checked'
      );
      if (selectedRadio) {
        var discountHTML = createDiscountNote(selectedRadio.value);
        if (discountHTML) {
          var optionParent = selectedRadio.closest(".variant-picker__option");
          if (optionParent) {
            var infoBlock = optionParent.querySelector(
              ".variant-picker__option-info"
            );
            infoBlock &&
              infoBlock.insertAdjacentHTML("beforeend", discountHTML);
          }
        }
      }
    }
    (function () {
      window.location.pathname.includes("/products/provitalean") &&
        document.addEventListener("DOMContentLoaded", function () {
          if (!document.body.classList.contains("product-handle-provitalean"))
            return;
          function updateNotePDP() {
            insertDiscountInto(document);
          }
          updateNotePDP(),
            document
              .querySelectorAll(
                '.variant-picker__option-values input[type="radio"]'
              )
              .forEach(function (radio) {
                radio.addEventListener("change", updateNotePDP);
              }),
            document.body.addEventListener(
              "product:variantChange",
              updateNotePDP
            );
          var lastVariantParam =
            new URLSearchParams(window.location.search).get("variant") || "";
          setInterval(function () {
            var currentVariantParam =
              new URLSearchParams(window.location.search).get("variant") || "";
            currentVariantParam !== lastVariantParam &&
              ((lastVariantParam = currentVariantParam), updateNotePDP());
          }, 300);
        });
    })(),
      document.addEventListener("dialog:after-show", function (ev) {
        if (!ev.target.matches("quick-buy-drawer")) return;
        console.log("aaaaa");
        var drawerEl = ev.target;
        function updateNoteQuickAdd() {
          insertDiscountInto(drawerEl);
        }
        function reattachRadioListeners() {
          var radios = drawerEl.querySelectorAll(
            'input[type="radio"][data-option-position]'
          );
          radios.forEach(function (radio) {
            console.log("11111"),
              radio.removeEventListener("change", onRadioChanged),
              console.log("22222"),
              radio.addEventListener("change", onRadioChanged),
              console.log("33333");
          });
        }
        function onRadioChanged() {
          updateNoteQuickAdd();
        }
        function onVariantEvent() {
          setTimeout(function () {
            reattachRadioListeners(), updateNoteQuickAdd();
          }, 0);
        }
        updateNoteQuickAdd(),
          reattachRadioListeners(),
          drawerEl.addEventListener("variant:change", onVariantEvent, {
            capture: !0,
          }),
          drawerEl.addEventListener("product:rerender", onVariantEvent, {
            capture: !0,
          });
      });
  })(),
  document.addEventListener("DOMContentLoaded", function () {
    const superscriptTest = /[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻᶦ⁰¹²³⁴⁵⁶⁷⁸⁹⁽⁾]/,
      superscriptReplace = /[ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻᶦ⁰¹²³⁴⁵⁶⁷⁸⁹⁽⁾]/g;
    function scanForSuperscripts(element) {
      element.nodeType === Node.TEXT_NODE &&
      superscriptTest.test(element.nodeValue)
        ? processTextWithDOM(element)
        : element.nodeType === Node.ELEMENT_NODE &&
          element.childNodes &&
          Array.from(element.childNodes).forEach(scanForSuperscripts);
    }
    function processTextWithDOM(textNode) {
      const text = textNode.nodeValue,
        parts = text.split(superscriptReplace),
        matches = text.match(superscriptReplace) || [];
      if (matches.length === 0) return;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < parts.length; i++)
        if (
          (parts[i] && fragment.appendChild(document.createTextNode(parts[i])),
          matches[i])
        ) {
          const span = document.createElement("span");
          (span.className = "superscript-fixed"),
            (span.textContent = matches[i]),
            fragment.appendChild(span);
        }
      textNode.parentNode.replaceChild(fragment, textNode);
    }
    document
      .querySelectorAll(".shopify-section")
      .forEach((section) => scanForSuperscripts(section));
  });
//# sourceMappingURL=/cdn/shop/t/3/assets/rejuveen.js.map?v=143380720201353592391756778793
