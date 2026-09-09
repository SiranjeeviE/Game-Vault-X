import React, { useState } from 'react';
import { Cpu, HardDrive, MemoryStick, Monitor, RefreshCw, Server, CheckCircle2, AlertCircle } from 'lucide-react';
import { detectHardware } from '../services/hardwareService';

const panelStyle = {
    background: 'rgba(255, 255, 255, 0.035)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '16px',
    padding: '1.25rem'
};

const HardwareDetection = () => {
    const [hardware, setHardware] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDetect = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await detectHardware();
            setHardware(data);
        } catch (err) {
            setError(err.message || 'Unable to detect hardware.');
        } finally {
            setLoading(false);
        }
    };

    const formatValue = (value) => value ?? 'Not available';

    return (
        <section className="container" style={{ padding: '2rem 0 4rem' }}>
            <div style={{ ...panelStyle, maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Server size={22} color="var(--accent-violet)" />
                            <h2 style={{ margin: 0, color: '#fff' }}>My Hardware</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                            Detect the hardware of the machine running your local GameVault X backend.
                        </p>
                    </div>

                    <button
                        onClick={handleDetect}
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        {loading ? 'Detecting...' : 'Detect Hardware'}
                    </button>
                </div>

                {error && (
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.9rem 1rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', marginBottom: '1rem' }}>
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {!hardware && !loading && !error && (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                        Click <strong>Detect Hardware</strong> to scan this machine.
                    </div>
                )}

                {hardware && (
                    <>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-emerald)', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
                            <CheckCircle2 size={17} /> Hardware detected successfully
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                            <div style={panelStyle}>
                                <Cpu size={22} color="var(--accent-violet)" />
                                <h3 style={{ color: '#fff', margin: '0.7rem 0' }}>CPU</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0' }}>{formatValue(hardware.cpu?.brand)}</p>
                                <small style={{ color: 'var(--text-muted)' }}>
                                    {formatValue(hardware.cpu?.physicalCores)} physical / {formatValue(hardware.cpu?.logicalCores)} logical cores
                                    {' • '}{formatValue(hardware.cpu?.speedGHz)} GHz
                                </small>
                            </div>

                            <div style={panelStyle}>
                                <Monitor size={22} color="var(--accent-cyan, #22d3ee)" />
                                <h3 style={{ color: '#fff', margin: '0.7rem 0' }}>GPU</h3>
                                {hardware.gpu?.length ? hardware.gpu.map((gpu, index) => (
                                    <div key={`${gpu.model || 'gpu'}-${index}`} style={{ marginBottom: index < hardware.gpu.length - 1 ? '0.8rem' : 0 }}>
                                        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0' }}>{formatValue(gpu.model)}</p>
                                        <small style={{ color: 'var(--text-muted)' }}>
                                            {formatValue(gpu.manufacturer)} • {formatValue(gpu.vramGB)} GB VRAM
                                        </small>
                                    </div>
                                )) : <p style={{ color: 'var(--text-muted)' }}>GPU information not available</p>}
                            </div>

                            <div style={panelStyle}>
                                <MemoryStick size={22} color="var(--text-emerald)" />
                                <h3 style={{ color: '#fff', margin: '0.7rem 0' }}>Memory</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0' }}>
                                    {formatValue(hardware.memory?.totalGB)} GB RAM
                                </p>
                                <small style={{ color: 'var(--text-muted)' }}>
                                    {formatValue(hardware.memory?.availableGB)} GB available
                                </small>
                            </div>

                            <div style={panelStyle}>
                                <HardDrive size={22} color="var(--text-cyan, #22d3ee)" />
                                <h3 style={{ color: '#fff', margin: '0.7rem 0' }}>System</h3>
                                <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0' }}>
                                    {formatValue(hardware.device?.manufacturer)} {formatValue(hardware.device?.model)}
                                </p>
                                <small style={{ color: 'var(--text-muted)' }}>
                                    {formatValue(hardware.os?.distro)} {formatValue(hardware.os?.release)} • {formatValue(hardware.os?.arch)}
                                </small>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default HardwareDetection;
