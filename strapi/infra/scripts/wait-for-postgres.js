const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec strapi-postgres pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    process.stdout.write("\n🟢 Postgres is ready for connections\n");
  }
}

process.stdout.write("\n\n🔴 Waiting Postgres to be open to connections");

checkPostgres();
