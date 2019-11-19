import m from "mithril";

import { About, App, Rules } from "./views";

const root = document.querySelector("#app");
m.route(root, "/", {
  "/": App,
  "/about": About,
  "/rules": Rules,
});
