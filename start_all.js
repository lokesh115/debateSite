const { exec } = require("child_process");

const apps = [
  { name: "app1", path: "cd ApiGateway && nodemon api_gateway.js" },
  { name: "app2", path: "cd Backend && nodemon index.js" },
  { name: "app3", path: "cd Frontend && nodemon index.js" },
];

apps.forEach(({ name, path }) => {
  console.log(`Starting ${name}...`);
  const process = exec(path);

  process.stdout.on("data", (data) => console.log(`${name}: ${data}`));
  process.stderr.on("data", (data) => console.error(`${name} ERROR: ${data}`));
});
