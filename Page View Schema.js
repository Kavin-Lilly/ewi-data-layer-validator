
window.util = window.util || {};
window.util.schema = window.util.schema || [];

window.util.schema.push({
  "event": "page_view",
  "schema": {
    "type": "object",
    "required": [
        "event",
        "pageInfo",
        "userInfo",
        "applicationInfo"
    ],
    "additionalProperties": false,
    "properties": {
      "event": {
        "type": "string",
        "enum": ["page_view"]
      },
      "pageInfo": {
        "type": "object",
        "required": [
          "pageTitle",
          "pageName",
          "pageUrl",
          "pagePath", 
          "pageLanguage",
          "siteSection1",
          "siteSection2",
          "siteSection3",
          "siteSection4",
          "sectionHash",
          "previousPageUrl",
          "previousPageName",
          "timeStamp"
        ],
        "additionalProperties": false,
        "properties": {
          "pageTitle": {
            "type": "string",
            "description": "Should match document.title",
            "x-runtime-check": "pageTitle === document.title"
          },
          "pageName": {
            "type": "string",
            "description": "Format: brand:audience:lang:L1[:L2[:L3[:L4]]]:pagename",
            "pattern": "^[^:]+:(dtc|hcp|mcm):(en|es)(:[^:]+){0,4}:[^:]+$"
          },
          "pageUrl": {
            "type": "string",
            "description": "Should match location.origin + location.pathname",
            "x-runtime-check": "pageUrl === location.origin + location.pathname"
          },
          "pagePath": {
            "type": "string",
            "description": "Should match location.pathname",
            "x-runtime-check": "pagePath === location.pathname"
          },
          "pageLanguage": {
            "type": "string",
            "enum": ["en", "es"]
          },
          "siteSection1": {
            "type": "string",
            "x-runtime-check": "siteSection1 === location.pathname.split('/')[1] || ''"
          },
          "siteSection2": {
            "type": "string",
            "x-runtime-check": "siteSection2 === location.pathname.split('/')[2] || ''"
          },
          "siteSection3": {
            "type": "string",
            "x-runtime-check": "siteSection3 === location.pathname.split('/')[3] || ''"
          },
          "siteSection4": {
            "type": "string",
            "x-runtime-check": "siteSection4 === location.pathname.split('/')[4] || ''"
          },
          "sectionHash": {
            "type": "string",
            "x-runtime-check": "sectionHash === location.hash"
          },
          "previousPageUrl": {
            "type": "string",
            "format": "uri"
          },
          "previousPageName": {
            "type": "string",
            "pattern": "^[^:]+:(dtc|hcp|mcm):(en|es)(:[^:]+){0,4}:[^:]+$"
          },
          "timeStamp": {
            "type": "string"
          },
          "articleName": {
            "type": "string"
          },
          "articleCategory": {
            "type": "string"
          }
        }
      },
      "userInfo": {
        "type": "object",
        "required": [
            "signinStatus",
            "audienceSegment"
        ],
        "additionalProperties": false,
        "properties": {
          "signinStatus": {
            "type": "string",
            "enum": ["logged in", "not logged in"]
          },
          "audienceSegment": {
            "type": "string",
            "enum": ["dtc", "hcp", "mcm"]
          }
        }
      },
      "applicationInfo": {
        "type": "object",
        "required": [
          "hostName",
          "brandName",
          "browserType",
          "operatingSystemType",
          "deviceType",
          "screenResolution"
        ],
        "additionalProperties": false,
        "properties": {
          "hostName": {
            "type": "string",
            "description": "Should match location.hostname",
            "x-runtime-check": "hostName === location.hostname"
          },
          "brandName": { "type": "string" },
          "browserType": { "type": "string" },
          "operatingSystemType": { "type": "string" },
          "deviceType": {
            "type": "string",
            "enum": ["desktop", "mobile", "tablet"]
          },
          "screenResolution": {
            "type": "string",
            "pattern": "^\\d{3,4}x\\d{3,4}$"
          }
        }
      }
    }
  }
});
