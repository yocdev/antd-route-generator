import settings from "./collection/settings";
import order from "./collection/order";
import user from "./collection/user";
import business from "./collection/business";
import orderList from "./collection/orderList";
export const routes = [
  ...settings.routes,
  ...order.routes,
  ...user.routes,
  ...business.routes,
  ...orderList.routes,
];
export const menus = [
  settings.menus,
  order.menus,
  user.menus,
  business.menus,
  orderList.menus,
];
