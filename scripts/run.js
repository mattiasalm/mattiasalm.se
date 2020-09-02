const createManifest = require('./create-manifest');
const createIcons = require('./create-icons');
const createRobots = require('./create-robots');
const createBasicServiceWorker = require('./create-basic-service-worker');

createManifest();
createIcons();
createRobots();
createBasicServiceWorker();