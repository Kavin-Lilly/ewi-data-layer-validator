// VALID PAYLOAD — PAGE VIEW
adobeDataLayer.push({
    event: "page_view",
    pageInfo: {
      pageTitle: document.title, // Valid
      pageName: "sample:dtc:en:section:pagename", // Valid
      pageUrl: location.href, // Valid
      pagePath: location.pathname, // Valid
      pageLanguage: "en", // Valid
      siteSection1: "Users", // Valid
      siteSection2: "L091690", // Valid
      siteSection3: "Desktop", // Valid
      siteSection4: "Data%20Layer%20Validator", // Valid
      sectionHash: "", // Valid
      previousPageUrl: 'https://www.lillyhub.com/legal/lillyusa/cookienotice.html', // Valid
      previousPageName: "sample:dtc:en:home", // Valid
      timeStamp: new Date().toISOString() // Valid
    },
    userInfo: {
      signinStatus: "not logged in", // Valid
      audienceSegment: "hcp" // Valid
    },
    applicationInfo: {
      hostName: 'test', // Valid
      brandName: "exampleBrand", // Valid
      browserType: "Chrome", // Valid
      operatingSystemType: "macOS", // Valid
      deviceType: "desktop", // Valid
      screenResolution: `${window.screen.width}x${window.screen.height}` // Valid
    }
  });

// ERROR PAYLOAD — PAGE VIEW
  adobeDataLayer.push({
    event: "page_view",
    pageInfo: {
      pageTitle: "Wrong Title", // Invalid — does not match document.title
      pageName: "", // Invalid — required but empty
      pageUrl: "filee:///path/to/file.html", // Invalid — non-HTTP/HTTPS URL
      pagePath: "", // Invalid — required but empty
      pageLanguage: "spanish", // Invalid — not in allowed enum list
      siteSection1: "", // Invalid — empty
      siteSection2: "", // Invalid — empty
      siteSection3: "", // Invalid — empty
      siteSection4: "", // Invalid — empty
      sectionHash: "", // Invalid — required but empty
      previousPageUrl: "not-a-valid-url", // Invalid — bad format
      previousPageName: "", // Invalid — empty
      timeStamp: "06/10/2025" // Invalid — not ISO format
    },
    userInfo: {
      signinStatus: "", // Invalid — empty
      audienceSegment: "" // Invalid — empty
    },
    applicationInfo: {
      hostName: "", // Invalid — empty
      brandName: "", // Invalid — empty
      browserType: "XYZ", // Invalid — unsupported
      operatingSystemType: "", // Invalid — empty
      deviceType: "watch", // Invalid — not in enum
      screenResolution: "1920x" // Invalid — incomplete pattern
    }
  });

// ERROR PAYLOAD — PAGE VIEW
// Event type is valid, but has extra properties not allowed in the schema
adobeDataLayer.push({
    event: "page_view", // Valid event
    pageInfo: {
      pageTitle: document.title,
      pageName: "sample:dtc:en:section:pagename",
      pageUrl: location.href,
      pagePath: location.pathname,
      pageLanguage: "en",
      siteSection1: "dtc",
      siteSection2: "en",
      siteSection3: "section",
      siteSection4: "pagename",
      sectionHash: "health",
      previousPageUrl: document.referrer,
      previousPageName: "sample:dtc:en:home",
      timeStamp: new Date().toISOString(),
      additionalextra: "test" // This field is not allowed by schema
    },
    userInfo: {
      signinStatus: "not-logged-in",
      audienceSegment: "HCPs"
    },
    applicationInfo: {
      hostName: location.hostname,
      brandName: "exampleBrand",
      browserType: "Chrome",
      operatingSystemType: "macOS",
      deviceType: "desktop",
      screenResolution: `${window.screen.width}x${window.screen.height}`
    },
    productspecific: { // This field is not allowed by schema
      medecine: "42",
      tabler: true
    }
  });
  

// VALID PAYLOAD — LINK CLICK
adobeDataLayer.push({
    event: "link_click",
    eventinfo: { 
      eventName: "Read More Clicked", // Valid
      linkText: "Read More", // Valid
      linkType: "internal", // Valid
      linkUrl: "https://example.com/articles/heart-health", // Valid
      linkLocation: "Home Page > Health Tips Section", // Valid
      linkLabel: "Article 1 - Heart Health", // Valid
      userSelections: "filter||Category:Health|Fitness;Sort:Newest" // Valid
    },
    componentInfo: {
      componentName: "article-listing" // Valid
    }
  });


// ERROR PAYLOAD — LINK CLICK
adobeDataLayer.push({
    event: "link_click",
    eventinfo: { 
      eventName: "", // Invalid — required but empty
      linkText: "", // Invalid — required but empty
      linkType: "internal ", // Invalid — must be "internal" or "external"
      linkUrl: "example.com", // Invalid — not a proper URL (no protocol)
      linkLocation: "", // Invalid — required but empty
      linkLabel: "", // Invalid — required but empty
      userSelections: "||;" // Invalid — pattern not matching
    },
    componentInfo: {
      componentName: "" // Invalid — required but empty
    }
  });
  

// ERROR PAYLOAD — Additional Event 
adobeDataLayer.push({
    event: "quiz_events",
    eventinfo: { 
      quizName: "",
      quizResponse: "",
    },
    componentInfo: {
      componentName: ""
    }
});