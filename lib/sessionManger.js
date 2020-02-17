class SessionManager {
  constructor(id) {
    this.lastId = id;
    this.sessions = {};
  }

  createNewSession(userName) {
    this.lastId++;
    this.sessions[this.lastId] = userName;
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
