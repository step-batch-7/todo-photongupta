const SessionManger = require('./sessionManger');

class UserStore {
  constructor(path, writer) {
    this.path = path;
    this.writer = writer;
    this.userCredentials = {};
  }

  static initialize(userCredentials, path, writer) {
    const userStore = new UserStore(path, writer);
    for (const userName in userCredentials) {
      userStore.userCredentials[userName] = userCredentials[userName];
    }
    return userStore;
  }

  getUserName(sessionId) {
    const users = Object.keys(this.userCredentials);
    return users.find(
      user => this.userCredentials[user].sessionId === +sessionId
    );
  }

  addNewUser(userName, credentials) {
    this.userCredentials[userName] = credentials;
    this.save();
  }

  createNewSession(userName) {
    const session = SessionManger.createSession(userName);
    this.userCredentials[userName].sessionId = session.id;
    this.save();
    return this.userCredentials[userName].sessionId;
  }

  isUserPresent(userName) {
    return this.userCredentials[userName];
  }

  isCorrectPassword(password, userName) {
    return this.userCredentials[userName].password === password;
  }

  isValidLogin(userName, password) {
    return (
      this.isUserPresent(userName) && this.isCorrectPassword(password, userName)
    );
  }

  logOut(userName) {
    delete this.userCredentials[userName].sessionId;
    this.save();
  }

  save() {
    this.writer(this.path, JSON.stringify(this.userCredentials));
  }
}

module.exports = UserStore;
