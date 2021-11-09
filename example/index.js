import Settings from "./collection/settings";
import Order from "./collection/order";
import User from "./collection/user";
import Business from "./collection/business";
export const routes = [
  ...Settings.routes,
  ...Order.routes,
  ...User.routes,
  ...Business.routes,
];
export const menus = [Settings.menus, Order.menus, User.menus, Business.menus];
