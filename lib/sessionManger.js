class SessionManager {
  constructor(id, userName) {
    this.id = id;
    this.userName = userName;
  }
  static createSession(userName) {
    const id = new Date().getTime() * Math.random();
    return new SessionManager(id, userName);
  }
}

module.exports = SessionManager;
