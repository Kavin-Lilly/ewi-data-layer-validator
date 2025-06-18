// console.log('%c 7 --> Color Coding loaded', 'background: #8A1538; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
(function showValidationColorLegend() {
    console.groupCollapsed(
      "%c Validation Color Legend",
      "background: white; background: green; padding: 2px 6px; border-radius: 3px;"
    )
  
    const legend = {
      '🟢 Valid Payload': 'background: #d4edda; color: #155724;',
      '🚫 [MISSING]': 'background: #fff3cd; color: #856404; border-left: 4px solid #ffc107;',
      '❌ [TYPE]': 'background: #f8d7da; color: #721c24; border-left: 4px solid #f5c6cb;',
      '⚠️ [ENUM]': 'background: #d1ecf1; color: #0c5460; border-left: 4px solid #bee5eb;',
      '🧩 [PATTERN]': 'background: #d6d8d9; color: #383d41; border-left: 4px solid #c6c8ca;',
      '🔗 [FORMAT]': 'background: #e2e3e5; color: #41464b; border-left: 4px solid #d6d8db;',
      '➕ [EXTRA]': 'background: #fefefe; color: #818182; border-left: 4px solid #e2e3e5;',
      '🧠 [RUNTIME]': 'background: #ffe5b4; color: #7a4f01; border-left: 4px solid #ffa500;',
      '❓ [UNKNOWN]': 'background: #f0f0f0; color: #333; border-left: 4px solid #ccc;'
    };
  
    Object.entries(legend).forEach(([label, style]) => {
      console.log(`%c${label}`, `${style} font-weight: bold; padding: 6px 10px; border-radius: 6px;`);
    });
  
    console.groupEnd();



  })();

