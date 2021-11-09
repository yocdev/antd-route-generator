const { validate } = require("jtd");
const configSchema = require("../constants/config-schema");
const path = require("path");
const { fstat } = require("fs");
const fs = require("fs");
/**
 * @description 获取 config 配置
 */

module.exports = () => {
  const commandPath = process.cwd();
  const configPath = path.resolve(commandPath, "./generator.config.js");

  if (fs.existsSync(configPath)) {
    const config = require(configPath);
    if (validate(configSchema, config).length === 0) {
      return config;
    }
  }
  return null;
};
