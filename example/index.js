import Order from "./order";
import User from "./user";
import Settings from "./settings";
import Business from "./business";
export const routes = [...Order.routes, ...User.routes, ...Settings.routes, ...Business.routes];
export const menus = [...Order.menus, ...User.menus, ...Settings.menus, ...Business.menus];