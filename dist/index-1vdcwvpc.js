// index.js
var textarea = document.querySelector("textarea#input");
textarea.addEventListener("paste", (evt) => {
  console.log(evt);
  const pastedText = evt.clipboardData.getData("text");
  const arr = pastedText.split(`
`).map((line) => {
    let testReference = line.toLowerCase();
    line.trim().replaceAll(" ", "");
    if (!line.includes("/")) {
      line = "";
    }
    if (!testReference.includes("config") && !testReference.includes("dam")) {
      line = line.replace(".html", "/jcr:content");
      line = line.replace(".htm", "/jcr:content");
    }
    if (testReference.includes("content/") && testReference.includes("dam/")) {
      const startContentIndex = line.indexOf("content/");
      if (startContentIndex !== -1) {
        line = line.substring(startContentIndex);
      }
    } else {
      const startContentIndex = line.indexOf("content/");
      if (startContentIndex !== -1) {
        line = line.substring(startContentIndex);
      }
      const startDamIndex = line.indexOf("dam/");
      if (startDamIndex !== -1) {
        line = line.substring(startDamIndex);
      }
    }
    line = line.replace("config.html#", "config/jcr:content/sling:configs");
    if (line.length !== 0 && !line.startsWith("/")) {
      line = `/${line}`;
    }
    return line;
  }).filter(Boolean);
  document.querySelector("#output").textContent = arr.join(`
`);
  setTimeout(() => {
    document.querySelector("#output").select();
  }, 100);
});
