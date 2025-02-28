export class ExenaiApply extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    
        // Create an iframe
        this.iframe = document.createElement("iframe");
        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";
        this.iframe.style.border = "none";

        // Append the iframe inside the shadow DOM
        this.shadowRoot.appendChild(this.iframe);
    }

    connectedCallback() {
        // Set the iframe source from the "src" attribute
        const src = this.getAttribute("src");

        // console.log('exenai embed src? ->', src);

        if (src) {
            this.iframe.src = src;
        }

        // Listen for messages from the iframe
        window.addEventListener("message", (event) => {
            
            if (event.data?.exenai__embedHeight) {
                // console.log('adjustElement height: ', event.data?.exenai__embedHeight)
                this.iframe.style.height = event?.data?.exenai__embedHeight + "px";
            }
        });
    }
}

// Register the custom element
customElements.define("exenai-apply", ExenaiApply);
