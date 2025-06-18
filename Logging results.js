function logValidationResultsGrouped(errors, payload) {
    const eventName = payload?.event || '[Unknown Event]';

    const eventStyle = `
        background: #cce5ff;
        color: #004085;
        font-weight: bold;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
    `;

    console.log(`%c📌 Validating Event: ${eventName}`, eventStyle);

    if (!errors.length) {
        console.log(
            '%c✅ Payload is valid!',
            'background: #d4edda; color: #155724; font-weight: bold; padding: 6px 12px; border-radius: 6px;'
        );
        return;
    }

    console.groupCollapsed(
        `%c❌ ${errors.length} Validation Error(s) Found`,
        'background: #f8d7da; color: #721c24; font-weight: bold; padding: 6px 12px; border-radius: 6px;'
    );

    const typeStyles = {
        missing: {
            label: '[MISSING]',
            emoji: '🚫',
            style: 'background: #fff3cd; color: #856404; border-left: 4px solid #ffc107;'
        },
        type: {
            label: '[TYPE]',
            emoji: '❌',
            style: 'background: #f8d7da; color: #721c24; border-left: 4px solid #f5c6cb;'
        },
        enum: {
            label: '[ENUM]',
            emoji: '⚠️',
            style: 'background: #d1ecf1; color: #0c5460; border-left: 4px solid #bee5eb;'
        },
        pattern: {
            label: '[PATTERN]',
            emoji: '🧩',
            style: 'background: #d6d8d9; color: #383d41; border-left: 4px solid #c6c8ca;'
        },
        format: {
            label: '[FORMAT]',
            emoji: '🔗',
            style: 'background: #e2e3e5; color: #41464b; border-left: 4px solid #d6d8db;'
        },
        extra: {
            label: '[EXTRA]',
            emoji: '➕',
            style: 'background: #fefefe; color: #818182; border-left: 4px solid #e2e3e5;'
        },
        runtime: {
            label: '[RUNTIME]',
            emoji: '🧠',
            style: 'background: #ffe5b4; color: #7a4f01; border-left: 4px solid #ffa500;'
        }
        

    };

    // Group errors by top-level object
    const grouped = {};
    errors.forEach(err => {
        const section = err.path.split('.')[0] || 'root';
        if (!grouped[section]) grouped[section] = [];
        grouped[section].push(err);
    });

    for (const section in grouped) {
        const sectionErrors = grouped[section];
        const sectionLabel = `${section} (${sectionErrors.length} error${sectionErrors.length > 1 ? 's' : ''})`;

        console.groupCollapsed(`%c🔎 ${sectionLabel}`, 'color: #0056b3; font-weight: bold;');

        sectionErrors.forEach(err => {
            const { label, emoji, style } = typeStyles[err.type] || {
                label: '[UNKNOWN]',
                emoji: '❓',
                style: 'background: #f0f0f0; color: #333; border-left: 4px solid #ccc;'
            };

            const fullStyle = `
                ${style}
                font-weight: bold;
                padding: 6px 10px;
                border-radius: 6px;
                margin: 4px 0;
                display: block;
            `;

            //console.log(`%c${emoji} ${label} ${err.path}: ${err.message}`, fullStyle);
            if (err.message) {
                console.log(`   ${emoji} %c${label} ${err.path}: ${err.message}`, style);
                if (err.expected !== undefined && err.actual !== undefined) {
                    console.log(
                        `%c       ↪ Expected: ${err.expected}`,
                        'color: #006400; font-style: italic;'
                    );
                    console.log(
                        `%c       ↪ Actual:   ${JSON.stringify(err.actual)}`,
                        'color: #8B0000; font-style: italic;'
                    );
                }
            }
            
        });

        console.groupEnd();
    }

    console.groupEnd();
}
