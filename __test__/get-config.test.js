const getConfig = require("../bin/helper/get-config");

test("get config", () => {
  expect(getConfig()).toEqual({
    routePath: "./example",
  });
});
