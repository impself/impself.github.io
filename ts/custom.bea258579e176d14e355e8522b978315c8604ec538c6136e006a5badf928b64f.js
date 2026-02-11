(() => {
  // <stdin>
  var CODE_FOLD_LINE_THRESHOLD = 18;
  function countCodeLines(codeElement) {
    const text = (codeElement.textContent || "").replace(/\n$/, "");
    if (!text) return 0;
    return text.split("\n").length;
  }
  function setupCodeFold() {
    const highlights = document.querySelectorAll(".article-content div.highlight");
    highlights.forEach((highlight) => {
      if (highlight.dataset.foldReady === "true") return;
      const code = highlight.querySelector("code");
      if (!code) return;
      const lineCount = countCodeLines(code);
      if (lineCount <= CODE_FOLD_LINE_THRESHOLD) return;
      const wrapper = document.createElement("div");
      wrapper.className = "code-fold-block is-collapsed";
      const parent = highlight.parentElement;
      if (!parent) return;
      parent.insertBefore(wrapper, highlight);
      wrapper.appendChild(highlight);
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "code-fold-toggle";
      toggle.textContent = `\u5C55\u5F00\u4EE3\u7801 (${lineCount} \u884C)`;
      toggle.setAttribute("aria-expanded", "false");
      toggle.addEventListener("click", () => {
        const collapsed = wrapper.classList.toggle("is-collapsed");
        toggle.textContent = collapsed ? `\u5C55\u5F00\u4EE3\u7801 (${lineCount} \u884C)` : "\u6536\u8D77\u4EE3\u7801";
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      });
      wrapper.appendChild(toggle);
      highlight.dataset.foldReady = "true";
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCodeFold);
  } else {
    setupCodeFold();
  }
})();
