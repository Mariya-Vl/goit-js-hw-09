const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=null;t.stopBtn.setAttribute("disabled",!0),t.startBtn.addEventListener("click",(function(){e=setInterval((()=>{let e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.body.style.backgroundColor=e,t.stopBtn.removeAttribute("disabled"),t.startBtn.setAttribute("disabled",!0)}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.714ab661.js.map