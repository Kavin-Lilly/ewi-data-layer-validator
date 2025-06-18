function validateRuntimeChecks(payload, schema, pathPrefix = '') {
    const results = [];

    function traverse(schemaNode, currentData, currentPath) {
        if (!schemaNode || typeof schemaNode !== 'object') return;

        const keys = schemaNode.properties ? Object.keys(schemaNode.properties) : [];

        keys.forEach(key => {
            const propSchema = schemaNode.properties[key];
            const fullPath = currentPath ? `${currentPath}.${key}` : key;
            const value = currentData?.[key];

            if (propSchema['x-runtime-check']) {
                const expression = propSchema['x-runtime-check'];
                const context = {
                    [key]: value,
                    document,
                    location
                };

                // console.log(
                //     `%c[Runtime Check] Evaluating: ${fullPath} → ${expression}`,
                //     'color: #888; font-style: italic;'
                // );
                

                // try {
                //     const fn = Function(
                //         ...Object.keys(context),
                //         `return (${expression})`
                //     );

                //     const result = fn(...Object.values(context));

                //     // if (!result) {
                //     //     results.push({
                //     //         type: 'runtime',
                //     //         path: fullPath,
                //     //         message: `Runtime check failed: ${expression}`,
                //     //         actual: value,
                //     //         expected: expression
                //     //     });
                //     // }
                //     if (!result) {
                //         const expectedValue = (() => {
                //             try {
                //                 return fn(...Object.values(context));
                //             } catch {
                //                 return expression; // fallback
                //             }
                //         })();
                    
                //         results.push({
                //             type: 'runtime',
                //             path: fullPath,
                //             message: `Runtime check failed: ${expression}`,
                //             actual: value,
                //             expected: expectedValue
                //         });
                //     }
                    
                // }
                try {
                    const fn = Function(
                        ...Object.keys(context),
                        `return (${expression})`
                    );
                
                    const result = fn(...Object.values(context));
                
                    if (!result) {
                        // 👇 Extract expected value from the RHS of the expression
                        let expectedValue;
                        try {
                            const rhs = expression.split("===").pop().trim(); // "document.title"
                            const rhsFn = Function(...Object.keys(context), `return (${rhs})`);
                            expectedValue = rhsFn(...Object.values(context));
                        } catch {
                            expectedValue = expression; // fallback
                        }
                
                        results.push({
                            type: 'runtime',
                            path: fullPath,
                            message: `Runtime check failed: ${expression}`,
                            actual: value,
                            expected: expectedValue
                        });
                    }
                }
                 catch (err) {
                    results.push({
                        type: 'runtime',
                        path: fullPath,
                        message: `Runtime check error: ${expression} (${err.message})`,
                        actual: value,
                        expected: expression
                    });
                }
            }

            if (propSchema.type === 'object' && propSchema.properties) {
                traverse(propSchema, value, fullPath);
            }
        });
    }

    traverse(schema, payload, pathPrefix);
    return results;
}

