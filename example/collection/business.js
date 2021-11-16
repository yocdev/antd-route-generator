import { createRoutes } from "../utils";
import UserList from "../../UserList";

const routePrefix = "/dashboard/user";

const routes = createRoutes(routePrefix, "user", {
  userList: {
    path: "/user-list",
    component: UserList,
  },
});

const menus = {
  title: "用户管理",
  icon: "menu",
  children: [
    {
      title: "用户列表",
      icon: "menu",
      path: routes.userList.path,
    },
  ],
};

export default { routes, menus };
