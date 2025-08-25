const Client = require('kubernetes-client').Client;
const { config } = require('kubernetes-client');

const client = new Client({ config: config.fromKubeconfig(), version: '1.13' });

// สร้าง Android Emulator pod สำหรับผู้ใช้
async function createAndroidPod(userId) {
  const podName = `android-${userId}`;
  const podManifest = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: { name: podName, labels: { app: 'cloud-android', user: userId } },
    spec: {
      containers: [{
        name: 'android-emulator',
        image: 'cloud-android-image',
        ports: [{ containerPort: 5901 }, { containerPort: 6080 }]
      }]
    }
  };
  await client.api.v1.namespaces('default').pods.post({ body: podManifest });
  return podName;
}

// ลบ pod
async function deleteAndroidPod(podName) {
  await client.api.v1.namespaces('default').pods(podName).delete();
}

module.exports = { createAndroidPod, deleteAndroidPod };
