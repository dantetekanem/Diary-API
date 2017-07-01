module.exports = {
  API_URL: process.env.API_URL || "http://localhost:3000/api",
  CLIENT_ROOT_URL: process.env.CLIENT_ROOT_URL || "http://localhost:8080",
  GRAPHQL_URL: process.env.GRAPHQL_URL || "http://localhost:3000/api/graphql",
  SOCKET_URL: process.env.SOCKET_URL || "http://localhost:3000"
}
