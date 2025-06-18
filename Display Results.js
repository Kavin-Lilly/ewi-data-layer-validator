

// const schema = window.util.schema.find(s => s.event === "page_view")?.schema;
// const payload = adobeDataLayer.find(e => e.event === "page_view");

// // const errors = validateAgainstSchema(payload, schema);
// // logValidationResults(errors);


// // const errors = validateAgainstSchema(payload, schema);
// // logValidationResultsGrouped(errors);


// const schemaErrors = validateAgainstSchema(payload, schema);
// const runtimeErrors = validateRuntimeChecks(payload, schema);
// const allErrors = [...schemaErrors, ...runtimeErrors];

// logValidationResultsGrouped(allErrors, payload);


// Step 1: Build a map from event name to schema
// const schemaMap = {};
// (window.util.schema || []).forEach(s => {
//   schemaMap[s.event] = s.schema;
// });

// // Step 2: Set up the real-time listener
// window.adobeDataLayer = window.adobeDataLayer || [];
// window.adobeDataLayer.push(function(dl) {
//   dl.addEventListener("adobeDataLayer:event", function(e) {
//     const payload = e.detail;
//     const schema = schemaMap[payload.event];

//     if (!schema) {
//       console.warn(`[DL Validator] No schema found for event: ${payload.event}`);
//       return;
//     }

//     // Step 3: Run validations
//     const schemaErrors = validateAgainstSchema(payload, schema);
//     const runtimeErrors = validateRuntimeChecks(payload, schema);
//     const allErrors = [...schemaErrors, ...runtimeErrors];

//     // Step 4: Show results in grouped format
//     logValidationResultsGrouped(allErrors, payload);
//   });

//   console.log(
//     "%c[DL Validator] Real-time listening for adobeDataLayer events is ON",
//     "background: #2196f3; color: #fff; padding: 2px 6px; border-radius: 4px;"
//   );
// });



// window.adobeDataLayer = window.adobeDataLayer || [];

// window.adobeDataLayer.push(function(dl) {
//   dl.addEventListener("adobeDataLayer:event", function(event) {
//     const payload = event?.detail;
//     const schema = window.util?.schema?.find(s => s.event === payload?.event)?.schema;
    
//     if (!schema) {
//       console.log(`%c❓ [UNKNOWN] Event "${payload?.event}" – No matching schema found`, "background: #555; color: #fff; padding: 2px 6px; border-radius: 3px;");
//       return;
//     }

//     const schemaErrors = validateAgainstSchema(payload, schema);
//     const runtimeErrors = validateRuntimeChecks(payload, schema);
//     const allErrors = [...schemaErrors, ...runtimeErrors];

//     logValidationResultsGrouped(allErrors, payload);
//   });
// });


///////////

// (function waitForAdobeDataLayerAndBindListener() {
//     if (
//       window.adobeDataLayer &&
//       typeof window.adobeDataLayer.push === "function" &&
//       typeof window.adobeDataLayer.getState === "function"
//     ) {
//       // Adobe Data Layer is fully initialized ✅
//       window.adobeDataLayer.push(function (dl) {
//         console.log("%c✅ AdobeDataLayer Listener Attached", "color: white; background: green; padding: 2px 6px; border-radius: 3px;");
  
//         dl.addEventListener("adobeDataLayer:event", function (event) {
//             // Find the latest event (we're assuming this is pushed after the dataLayer is initialized)
//             const lastEventIndex = adobeDataLayer.length - 1;
//             const payload = adobeDataLayer[lastEventIndex];
          
//             if (typeof payload !== "object" || payload === null || !payload.event) {
//               console.warn(
//                 "%c❓ Skipped: Event name is missing or not defined",
//                 "background: gray; color: white; padding: 2px 6px;"
//               );
//               console.log("🔍 Raw Event Payload:", payload);
//               return;
//             }
          
//             const eventName = payload.event;
//             const schema = window.util?.schema?.find(s => s.event === eventName)?.schema;
          
//             if (!schema) {
//               console.warn(`%c❓ [UNKNOWN] Event "${eventName}" – No matching schema found`, "background: gray; color: white; padding: 2px 6px;");
//               console.log("🔍 Raw Event Payload:", payload);
//               return;
//             }
          
//             const schemaErrors = validateAgainstSchema(payload, schema);
//             const runtimeErrors = validateRuntimeChecks(payload, schema);
//             const allErrors = [...schemaErrors, ...runtimeErrors];
          
//             logValidationResultsGrouped(allErrors, payload);
//           });
          
//       });
//     } else {
//       // Adobe Data Layer not ready yet – try again shortly 🔁
//       console.log("%c⌛ Waiting for adobeDataLayer to initialize...", "color: orange");
//       setTimeout(waitForAdobeDataLayerAndBindListener, 250);
//     }
//   })();
  



  
// (function waitForAdobeDataLayerAndBindListener() {
//     if (
//       window.adobeDataLayer &&
//       typeof window.adobeDataLayer.push === "function" &&
//       typeof window.adobeDataLayer.getState === "function"
//     ) {
//       // Adobe Data Layer is fully initialized ✅
//       window.adobeDataLayer.push(function (dl) {
//         console.log(
//           "%c✅ AdobeDataLayer Listener Attached",
//           "color: white; background: green; padding: 2px 6px; border-radius: 3px;"
//         );
  
//         dl.addEventListener("adobeDataLayer:event", function (event) {
//           const payload = event.detail;
  
//           if (
//             typeof payload !== "object" ||
//             payload === null ||
//             typeof payload.event !== "string"
//           ) {
//             console.warn(
//               "%c❓ Skipped: Event name is missing or not defined",
//               "background: gray; color: white; padding: 2px 6px;"
//             );
//             console.log("🔍 Raw Event Payload:", payload);
//             return;
//           }
  
//           const eventName = payload.event;
//           const schema = window.util?.schema?.find(
//             (s) => s.event === eventName
//           )?.schema;
  
//           if (!schema) {
//             console.warn(
//               `%c❓ [UNKNOWN] Event "${eventName}" – No matching schema found`,
//               "background: gray; color: white; padding: 2px 6px;"
//             );
//             console.log("🔍 Raw Event Payload:", payload);
//             return;
//           }
  
//           const schemaErrors = validateAgainstSchema(payload, schema);
//           const runtimeErrors = validateRuntimeChecks(payload, schema);
//           const allErrors = [...schemaErrors, ...runtimeErrors];
  
//           logValidationResultsGrouped(allErrors, payload);
//         });
//       });
//     } else {
//       // Adobe Data Layer not ready yet – try again shortly 🔁
//       console.log(
//         "%c⌛ Waiting for adobeDataLayer to initialize...",
//         "color: orange"
//       );
//       setTimeout(waitForAdobeDataLayerAndBindListener, 250);
//     }
//   })();
  

// (function waitForAdobeDataLayerAndBindListener() {
//     if (
//       window.adobeDataLayer &&
//       typeof window.adobeDataLayer.push === "function" &&
//       typeof window.adobeDataLayer.getState === "function"
//     ) {
//       window.adobeDataLayer.push(function (dl) {
//         console.log(
//           "%c✅ AdobeDataLayer Listener Attached",
//           "color: white; background: green; padding: 2px 6px; border-radius: 3px;"
//         );
  
//         dl.addEventListener("adobeDataLayer:event", function (event) {
//             // ✅ Get the event name from the event object itself
//             const eventName = event?.event;
          
//             if (!eventName) {
//               console.warn(
//                 "%c❓ Skipped: Event name is missing or not defined",
//                 "background: gray; color: white; padding: 2px 6px;"
//               );
//               console.log("🔍 Raw Event (no name):", event);
//               return;
//             }
          
//             // ✅ Use adobeDataLayer.getState() for the full payload for that event
//             const fullState = window.adobeDataLayer.getState();
//             const payload = fullState?.[event];
          
//             if (!payload || typeof payload !== "object") {
//               console.warn(
//                 `%c❓ Could not find full payload for event "${fullState}" in adobeDataLayer.getState()`,
//                 "background: gray; color: white; padding: 2px 6px;"
//               );
//               console.log("📦 Current Data Layer State:", fullState);
//               return;
//             }
          
//             // ✅ Find matching schema
//             const schema = window.util?.schema?.find((s) => s.event === eventName)?.schema;
          
//             if (!schema) {
//               console.warn(
//                 `%c❓ [UNKNOWN] Event "${eventName}" – No matching schema found`,
//                 "background: gray; color: white; padding: 2px 6px;"
//               );
//               console.log("🔍 Raw Event Payload:", payload);
//               return;
//             }
          
//             // ✅ Run validation
//             const schemaErrors = validateAgainstSchema(payload, schema);
//             const runtimeErrors = validateRuntimeChecks(payload, schema);
//             const allErrors = [...schemaErrors, ...runtimeErrors];
          
//             // ✅ Display grouped results
//             logValidationResultsGrouped(allErrors, payload);
//           });
          
//       });
//     } else {
//       console.log(
//         "%c⌛ Waiting for adobeDataLayer to initialize...",
//         "color: orange"
//       );
//       setTimeout(waitForAdobeDataLayerAndBindListener, 250);
//     }
//   })();
  


// (function waitForAdobeDataLayerAndBindListener() {
//     if (
//       window.adobeDataLayer &&
//       typeof window.adobeDataLayer.push === "function" &&
//       typeof window.adobeDataLayer.getState === "function"
//     ) {
//       window.adobeDataLayer.push(function (dl) {
//         console.log(
//           "%c✅ AdobeDataLayer Listener Attached",
//           "color: white; background: green; padding: 2px 6px; border-radius: 3px;"
//         );
  
//         dl.addEventListener("adobeDataLayer:event", function (event) {
//           const eventName = event?.detail?.event; // ✅ THIS IS IMPORTANT
  
//           if (!eventName) {
//             console.warn(
//               "%c❓ Skipped: Event name is missing or not defined",
//               "background: gray; color: white; padding: 2px 6px;"
//             );
//             console.log("🔍 Raw Event (no name):", event);
//             return;
//           }
  
//           const fullState = window.adobeDataLayer.getState();
//           const payload = fullState?.[eventName]; // ✅ This will now work
  
//           if (!payload || typeof payload !== "object") {
//             console.warn(
//               `%c❓ Could not find full payload for event "${eventName}" in adobeDataLayer.getState()`,
//               "background: gray; color: white; padding: 2px 6px;"
//             );
//             console.log("📦 Current Data Layer State:", fullState);
//             return;
//           }
  
//           const schema = window.util?.schema?.find((s) => s.event === eventName)?.schema;
  
//           if (!schema) {
//             console.warn(
//               `%c❓ [UNKNOWN] Event "${eventName}" – No matching schema found`,
//               "background: gray; color: white; padding: 2px 6px;"
//             );
//             console.log("🔍 Raw Event Payload:", payload);
//             return;
//           }
  
//           const schemaErrors = validateAgainstSchema(payload, schema);
//           const runtimeErrors = validateRuntimeChecks(payload, schema);
//           const allErrors = [...schemaErrors, ...runtimeErrors];
  
//           logValidationResultsGrouped(allErrors, payload);
//         });
//       });
//     } else {
//       console.log(
//         "%c⌛ Waiting for adobeDataLayer to initialize...",
//         "color: orange"
//       );
//       setTimeout(waitForAdobeDataLayerAndBindListener, 250);
//     }
//   })();


(function waitForAdobeDataLayerAndBindListener() {
    if (
      window.adobeDataLayer &&
      typeof window.adobeDataLayer.push === "function" &&
      typeof window.adobeDataLayer.getState === "function"
    ) {
      window.adobeDataLayer.push(function (dl) {
        console.log(
          "%cAdobeDataLayer Callback Listener Attached",
          "color: white; background: green; padding: 2px 6px; border-radius: 3px;"
        );
  
        const originalPush = window.adobeDataLayer.push;
  
        // Override push to intercept manually added objects
        window.adobeDataLayer.push = function (...args) {
          const result = originalPush.apply(this, args);
  
          const maybeEvent = args[0];
          if (maybeEvent && typeof maybeEvent === "object" && maybeEvent.event) {
            const eventName = maybeEvent.event;
  
            const schema = window.util?.schema?.find((s) => s.event === eventName)?.schema;
  
            if (!schema) {
              console.warn(
                `%c❓ [UNKNOWN] Event "${eventName}" – No matching schema found`,
                "background: gray; color: white; padding: 2px 6px;"
              );
              console.log(" Raw Event Payload:", maybeEvent);
              return result;
            }
  
            const schemaErrors = validateAgainstSchema(maybeEvent, schema);
            const runtimeErrors = validateRuntimeChecks(maybeEvent, schema);
            const allErrors = [...schemaErrors, ...runtimeErrors];
  
            logValidationResultsGrouped(allErrors, maybeEvent);
          } else {
            console.warn(
              "%c❓ Skipped: Event name is missing or not defined",
              "background: gray; color: white; padding: 2px 6px;"
            );
            console.log(" Raw Event Payload:", maybeEvent);
          }
  
          return result;
        };
      });
    } else {
      console.log(
        "%c Waiting for adobeDataLayer to initialize...",
        "color: orange"
      );
      setTimeout(waitForAdobeDataLayerAndBindListener, 100);
    }
  })();
  

  