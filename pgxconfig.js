module.exports = {
  user          : process.env.NODE_PGX_USER || "mapalogo",
  password      : process.env.NODE_PGX_PASSWORD || "mapalogo",
  pgxUrl : process.env.NODE_PGX_CONNECTIONSTRING || "https://localhost:7007/",
  // Setting externalAuth is optional.  It defaults to false.  See:
  // https://oracle.github.io/node-oracledb/doc/api.html#extauth
  externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

