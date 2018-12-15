import { createElement } from "./element.mjs";

const virtualDom = createElement("ui", { class: "list" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);

console.log(virtualDom);
