import React from 'react';

const SpecList = ({ title, specs, accentColor, delay }) => (
    <div
        className="spec-column"
        style={{
            flex: 1,
            background: 'var(--bg-card)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            borderTop: `4px solid ${accentColor}`,
            animation: `slideIn 0.6s ease-out forwards ${delay}s`,
            opacity: 0,
            transform: 'translateX(-20px)'
        }}
    >
        <h4 style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: accentColor,
            textTransform: 'uppercase',
            letterSpacing: '1px'
        }}>
            {title}
        </h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li className="spec-item"><span className="label">OS</span> <span className="value">{specs.os}</span></li>
            <li className="spec-item"><span className="label">CPU</span> <span className="value">{specs.cpu}</span></li>
            <li className="spec-item"><span className="label">GPU</span> <span className="value">{specs.gpu}</span></li>
            <li className="spec-item"><span className="label">RAM</span> <span className="value">{specs.ram}</span></li>
            <li className="spec-item"><span className="label">Storage</span> <span className="value">{specs.storage}</span></li>
        </ul>
        <style>{`
            .spec-item {
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 0.8rem;
            }
            .spec-item:last-child {
                border-bottom: none;
            }
            .spec-item .label {
                font-size: 0.8rem;
                color: var(--text-secondary);
                text-transform: uppercase;
                margin-bottom: 0.25rem;
            }
            .spec-item .value {
                font-size: 1rem;
                font-weight: 500;
            }
            @keyframes slideIn {
                to { opacity: 1; transform: translateX(0); }
            }
        `}</style>
    </div>
);

const SpecsComparison = ({ minimal, recommended }) => {
    return (
        <div className="specs-container" style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem' }}>
                <span style={{ width: '4px', height: '28px', background: 'var(--accent-secondary)' }}></span>
                SYSTEM REQUIREMENTS
            </h3>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <SpecList
                    title="Minimum Requirements"
                    specs={minimal}
                    accentColor="var(--text-secondary)"
                    delay={0.1}
                />
                <SpecList
                    title="Recommended Requirements"
                    specs={recommended}
                    accentColor="var(--accent-primary)"
                    delay={0.3}
                />
            </div>
        </div>
    );
};

export default SpecsComparison;
