#!/usr/bin/env node
const t = require("@babel/types");
const parser = require("@babel/parser");
const path = require("path");
const fs = require("fs");
const rd = require("rd");
const prettier = require("prettier");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const getConfig = require("./helper/get-config");

// 获得当前执行node命令时候的文件夹目录名
const commandPath = process.cwd();
// NOTE: 读取 config 信息
let config = getConfig();
if (config === null) {
  console.log("缺少了配置文件，请查看使用文档");
  process.exit();
}

// NOTE: 读取 collection 下的所有文件信息

const routePath = path.isAbsolute(config.routePath)
  ? path.resolve(commandPath, config.routePath)
  : config.routePath;

const routeCollectionPath = path.join(routePath, "./collection");

// NOTE: 判断 collection 文件存在
if (!fs.existsSync(routePath) || !fs.existsSync(routeCollectionPath)) {
  console.log("路由目录不存在，请查看使用文档");
  process.exit();
}

// 同步
const files = rd.readFileSync(routeCollectionPath);

if (files.length === 0) {
  console.log("没有路由，请查看使用文档");
  process.exit();
}

let routes = files.map((filePath) => {
  return path.basename(filePath).replace(path.extname(filePath), "");
});

// NOTE: 根据 orders.json （外部可以调整菜单顺序）重新排序
const ordersPath = path.resolve(routePath, "./orders.json");
if (fs.existsSync(ordersPath)) {
  const orders = require(ordersPath);
  const currentOrders = orders.filter((it) => routes.includes(it));
  const addRoutes = routes.filter((it) => !currentOrders.includes(it));
  routes = [...currentOrders, ...addRoutes];
}
const ordersCode = `${JSON.stringify(routes)}`;

fs.writeFileSync(path.resolve(routePath, "./orders.json"), ordersCode, "utf8");

const templateCode = `
  export const routes = []

  export const menus = []
`;

const ast = parser.parse(templateCode, { sourceType: "module" });

traverse(ast, {
  Program(path) {
    const reversedRoutes = [...routes].reverse();
    const imports = reversedRoutes.forEach((name) => {
      path.node.body.unshift(
        t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(name))],
          t.stringLiteral(`./collection/${name}`)
        )
      );
    });
  },

  Identifier(path) {
    if (path.node.name === "routes") {
      if (t.isVariableDeclarator(path.container)) {
        // console.log(path.parent);
        routes.forEach((name) => {
          path.parent.init.elements.push(
            t.spreadElement(
              t.memberExpression(
                t.Identifier(`${name}`),
                t.Identifier("routes")
              )
            )
          );
        });
      }
    }

    if (path.node.name === "menus") {
      if (t.isVariableDeclarator(path.container)) {
        // console.log(path.parent);
        routes.forEach((name) => {
          path.parent.init.elements.push(
            t.memberExpression(t.Identifier(`${name}`), t.Identifier("menus"))
          );
        });
      }
    }
  },
});

const result = generate(ast);

const formateCode = prettier.format(result.code, {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  parser: "babel",
});
// console.log(result.code);

// NOTE: 写入到文件
fs.writeFileSync(path.resolve(routePath, "./index.js"), formateCode, "utf8");

function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
