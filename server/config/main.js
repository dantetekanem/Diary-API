module.exports = {
  "secret": "supersecretpasswordgoesherebutnotnwo",
  "database": "mongodb://localhost:27017/diary",
  "port": process.env.PORT || 3000,
  // test configurations
  test_port: 3001,
  test_db: "diary-test-db",
  test_env: "test"
}
