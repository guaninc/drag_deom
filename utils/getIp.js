import os from 'os'
export function getIp() {
  const interfaces = os.networkInterfaces();
  let localIP = '';
  for (let interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];

    for (let i = 0; i < interfaceInfo.length; i++) {
      const alias = interfaceInfo[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        localIP = alias.address;
        break;
      }
    }
  }
  return localIP;
}