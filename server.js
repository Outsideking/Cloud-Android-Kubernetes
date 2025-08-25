const { createAndroidPod, deleteAndroidPod } = require('./k8s');

// Login
app.post('/api/login', async (req, res) => {
  ...
  const podName = await createAndroidPod(user._id);
  userPods[user._id] = podName;
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '12h' });
  res.json({ token, podName });
});

// Logout
app.post('/api/logout', async (req, res) => {
  ...
  if (userPods[decoded.id]) {
    await deleteAndroidPod(userPods[decoded.id]);
    delete userPods[decoded.id];
  }
});
