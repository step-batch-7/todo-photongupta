class SessionManager {
  constructor() {
    this.sessions = {};
  }

  createNewSession(userName) {
    const sessionId = new Date().getTime() * Math.random();
    this.sessions[sessionId] = userName;
  }

  getSessionId(userName) {
    const sessionIds = Object.keys(this.sessions);
    return sessionIds.find(id => this.sessions[id] === userName);
  }

  deleteSession(sessionId) {
    delete this.sessions[sessionId];
  }

  getUserName(sessionId) {
    return this.sessions[sessionId];
  }
}

module.exports = SessionManager;
