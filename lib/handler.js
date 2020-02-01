const App = require('./app');
const {serveStaticFile, notFound, methodNotAllowed} = require('./servePages');

const app = new App();

app.get('/', serveStaticFile);
app.get('', notFound);
app.post('', notFound);
app.use(methodNotAllowed);

module.exports = {app};
