class BodaCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const title = this.title;
    const body = this.body;
    const link = this.link;
    const linkText = this.linkText;

    const card = document.createElement("div");
    card.innerHTML = `
      <h2 class="font-bold text-lg">${title}</h2>
      <p class="text-center text-6xl font-semibold my-4">${body}</p>
      <a href="${link}" class="text-blue-700">${linkText}</a>
    `;

    shadow.appendChild(card);
  }

  get title() {
    return this.getAttribute("title");
  }

  get body() {
    return this.getAttribute("body");
  }

  get link() {
    return this.getAttribute("link");
  }

  get linkText() {
    return this.getAttribute("linkText");
  }
}

customElements.define("boda-card", BodaCard);
