const express = require('express');
const router = express.Router();

const si = require('systeminformation');


router.get('/', (req, res) =>{
    res.redirect('/api/status');
});

router.get('/api/status', async (req, res) =>{
    return res.json({
        status: "ONLINE",
        error: null,
    });
});

module.exports = router;




async function getinfo() {
    const cpu = await si.cpu();
    const disk = (await si.diskLayout())[0];
    const os = await si.osInfo();
    const versions = await si.versions();
    const ram = await si.mem();
   
    // CPU Info
    let cpuInfo = `CPU: ${cpu.manufacturer} ${cpu.brand} ${cpu.speed}GHz`;
    let coreInfo = `Cores: ${cpu.cores} (${cpu.physicalCores} Physical)`;
   
    // RAM Info
    const totalRam = Math.round(ram.total / 1024 / 1024 / 1024);
    let ramInfo = `RAM: ${totalRam}GB`;
   
    // Disk Info
    const size = Math.round(disk.size / 1024 / 1024 / 1024);
    let storageInfo = `Disk: ${disk.vendor} ${disk.name} ${size}GB ${disk.type} (${disk.interfaceType})`;
   
    //OS Info
    let osInfo = `OS: ${os.distro} ${os.codename} (${os.platform})`;
    let kernelInfo = `Kernel: ${os.kernel} ${os.arch}`;
   
    // Node Info
    let nodeInfo = `Node: v${versions.node}`;
    let verInfo = `V8: ${versions.v8}`;
    return {
        CPU: cpuInfo,
        Cores: coreInfo,
        RAM: ramInfo,
        Disk: storageInfo,
        OS: osInfo,
        Kernel: kernelInfo,
        Node: nodeInfo,
        V8: verInfo,
    };
}