class ServerErro extends Error {
  constructor() {
    super(`Internal server Error`);
    this.name = "ServerErro";
  }
}

export { ServerErro };
