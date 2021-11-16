module.exports = {
  properties: {
    routePath: { type: "string" },
  },
  optionalProperties: {
    fileType: { enum: ["js", "ts"] },
  },
};
