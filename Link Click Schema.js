window.util = window.util || {};
window.util.schema = window.util.schema || [];

window.util.schema.push({
  event: "link_click",
  schema: {
    type: "object",
    required: ["event", "eventinfo", "componentInfo"],
    additionalProperties: false,
    properties: {
      event: {
        type: "string",
        enum: ["link_click"]
      },
      eventinfo: {
        type: "object",
        required: [
          "eventName",
          "linkText",
          "linkType",
          "linkUrl",
          "linkLocation",
          "linkLabel",
          "userSelections"
        ],
        additionalProperties: false,
        properties: {
          eventName: { type: "string" },
          linkText: { type: "string" },
          linkType: {
            type: "string",
            enum: ["internal", "external"]
          },
          linkUrl: {
            type: "string",
            format: "uri",
            // ✅ Runtime check added below
            "x-runtime-check": "linkUrl.startsWith('http')"
          },
          linkLocation: { type: "string" },
          linkLabel: { type: "string" },
          userSelections: {
            type: "string",
            pattern: "^(filter|dropdown|radio|checkbox)\\|\\|([a-zA-Z0-9_\\- ]+:([a-zA-Z0-9_\\- ]+(\\|)?)+;?)*$"
          }
        }
      },
      componentInfo: {
        type: "object",
        required: ["componentName"],
        additionalProperties: false,
        properties: {
          componentName: { type: "string" }
        }
      }
    }
  }
});
