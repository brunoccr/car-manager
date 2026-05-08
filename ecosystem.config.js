module.exports = {
  apps: [
    {
      name: "backend",
      script: "/pb/pocketbase",
      args: "serve --http=0.0.0.0:8090 --automigrate",
    },
    {
      name: "frontend",
      script: "node",
      args: "server.js",
    },
  ],
};
