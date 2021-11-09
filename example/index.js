import Settings from "./settings";
import Order from "./order";
import User from "./user";
import Business from "./business";
export const routes = [...Settings.routes, ...Order.routes, ...User.routes, ...Business.routes];
export const menus = [...Settings.menus, ...Order.menus, ...User.menus, ...Business.menus];