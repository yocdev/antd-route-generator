const { validate } = require("jtd");
const configSchema = require("../bin/constants/config-schema");

test("valid config", () => {
  expect(validate(configSchema, {})).toEqual([
    { instancePath: [], schemaPath: ["properties", "routePath"] },
  ]);
  expect(validate(configSchema, { routePath: 1 })).toEqual([
    {
      instancePath: ["routePath"],
      schemaPath: ["properties", "routePath", "type"],
    },
  ]);
  expect(validate(configSchema, { routePath: "" })).toEqual([]);
});
