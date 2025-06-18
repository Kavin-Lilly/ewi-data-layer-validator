function validateAgainstSchema(data, schema, path = '') {
    const errors = [];

    // Check required fields
    // if (schema.required) {
    //     for (const key of schema.required) {
    //         if (!(key in data)) {
    //             errors.push({
    //                 type: 'missing',
    //                 path: `${path}${key}`,
    //                 message: `Missing required field`
    //             });
    //         }
    //     }
    // }

    // Check required fields
    if (schema.required) {
        for (const key of schema.required) {
            const val = data[key];

            if (
                !(key in data) ||
                val === null ||
                val === undefined ||
                (typeof val === 'string' && val.trim() === '')
            ) {
                errors.push({
                    type: 'missing',
                    path: `${path}${key}`,
                    message: `Missing required field or value is empty`
                });
            }
        }
    }


    for (const key in data) {
        const value = data[key];
        const currentPath = `${path}${key}`;
        const propSchema = schema.properties?.[key];

        if (!propSchema) {
            if (schema.additionalProperties === false) {
                errors.push({
                    type: 'extra',
                    path: currentPath,
                    message: `Field not allowed`
                });
            }
            continue;
        }

        // Type check
        if (propSchema.type && typeof value !== propSchema.type) {
            errors.push({
                type: 'type',
                path: currentPath,
                message: `Expected type ${propSchema.type}, got ${typeof value}`
            });
            continue;
        }

        // Enum check
        if (propSchema.enum && !propSchema.enum.includes(value)) {
            errors.push({
                type: 'enum',
                path: currentPath,
                message: `Expected one of [${propSchema.enum.join(', ')}], got '${value}'`
            });
        }

        // Pattern check
        if (propSchema.pattern && typeof value === 'string') {
            const regex = new RegExp(propSchema.pattern);
            if (!regex.test(value)) {
                errors.push({
                    type: 'pattern',
                    path: currentPath,
                    message: `Value '${value}' does not match pattern: ${propSchema.pattern}`
                });
            }
        }

        // Format check
        if (propSchema.format === 'uri' && typeof value === 'string') {
            try {
                new URL(value);
            } catch {
                errors.push({
                    type: 'format',
                    path: currentPath,
                    message: `Invalid URI format: '${value}'`
                });
            }
        }

        // Recurse for nested objects
        if (propSchema.type === 'object' && typeof value === 'object') {
            errors.push(...validateAgainstSchema(value, propSchema, currentPath + '.'));
        }
    }

    return errors;
}
