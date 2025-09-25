module.exports = {
  apps: [
    {
      name: "merolink-docker",
      script: "docker",
      args: "run --rm -d -p 3000:3000 merolinkv1",
      exec_mode: "fork",
    },
  ],
};

