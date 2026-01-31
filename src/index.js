const textarea = document.querySelector("textarea#input");
textarea.addEventListener("paste", (evt) => {
  console.log(evt);

  const pastedText = evt.clipboardData.getData("text");

  const arr = pastedText
    .split("\n")
    .map((line) => {
      let tr = line.toLowerCase();

      line.trim().replaceAll(" ", "");

      if (!line.includes("/")) {
        line = "";
      }


      if (!tr.includes("config") && !tr.includes("dam")) {
        line = line.replace(".html", "/jcr:content");
        line = line.replace(".htm", "/jcr:content");
      }

      if (
        tr.includes("content/") &&
        tr.includes("dam/")
      ) {
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

        //fix dam being at the beginning of the path
        if (line.startsWith("dam/")) {
          line = `/content/${line}`;
        }

      }

      if(!tr.includes('content/') && !tr.includes('dam/')) {
        line = "";
      }

      

      line = line.replace("config.html#", "config/jcr:content/sling:configs");
      line = line.replace("config.html", "config/jcr:content/sling:configs");

      if (line.length !== 0 && !line.startsWith("/")) {
        line = `/${line}`;
      }

      





      //line = line.replace("/content/", "/content/");
      //line = line.replace("/dam/", "/dam/");
      return line;
    })
    .filter(Boolean);

  document.querySelector("#output").textContent = arr.join("\n");
  setTimeout(() => {
    document.querySelector("#output").select();
  }, 100);
  //document.execCommand("copy");
});
