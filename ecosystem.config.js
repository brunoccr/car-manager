module.exports = {
  apps: [
    {
      name: "backend",
      script: "/pb/pocketbase",
      args: "serve --http=0.0.0.0:8090 --automigrate --dir /data --migrationsDir /pb/pb_migrations",
    },
    {
      name: "frontend",
      script: "node",
      args: "server.js",
    },
  ],
};
