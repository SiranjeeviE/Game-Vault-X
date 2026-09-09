const express = require('express');
const si = require('systeminformation');

const router = express.Router();

/**
 * Detect hardware of the machine running this Node.js backend.
 *
 * NOTE: This is local-machine detection. If the backend is deployed to a
 * cloud server, this endpoint reports the cloud server's hardware instead
 * of the visitor's PC.
 */
router.get('/detect', async (req, res) => {
    try {
        const [cpu, graphics, memory, os, system] = await Promise.all([
            si.cpu(),
            si.graphics(),
            si.mem(),
            si.osInfo(),
            si.system()
        ]);

        const gpus = (graphics.controllers || []).map((gpu) => ({
            manufacturer: gpu.vendor || null,
            model: gpu.model || null,
            vramMB: Number.isFinite(gpu.vram) ? gpu.vram : null,
            vramGB: Number.isFinite(gpu.vram) ? Number((gpu.vram / 1024).toFixed(2)) : null,
            bus: gpu.bus || null
        }));

        res.json({
            success: true,
            detectedAt: new Date().toISOString(),
            device: {
                manufacturer: system.manufacturer || null,
                model: system.model || null,
                version: system.version || null
            },
            cpu: {
                manufacturer: cpu.manufacturer || null,
                brand: cpu.brand || null,
                family: cpu.family || null,
                model: cpu.model || null,
                physicalCores: cpu.physicalCores || null,
                logicalCores: cpu.cores || null,
                speedGHz: Number.isFinite(cpu.speed) ? Number(cpu.speed.toFixed(2)) : null
            },
            gpu: gpus,
            memory: {
                totalGB: Number((memory.total / (1024 ** 3)).toFixed(2)),
                availableGB: Number((memory.available / (1024 ** 3)).toFixed(2))
            },
            os: {
                platform: os.platform || null,
                distro: os.distro || null,
                release: os.release || null,
                arch: os.arch || null
            }
        });
    } catch (error) {
        console.error('Hardware detection error:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to detect local hardware.',
            error: error.message
        });
    }
});

module.exports = router;
