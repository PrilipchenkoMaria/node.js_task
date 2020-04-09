const router = require('express').Router();
const users = require('../../controlers/users');

router.get('/csv', users.getUsersAsCsv);
router.get('/json', users.getUsersAsJson);
router.post('/csv', users.uploadUsersFromCsv);

module.exports = router;
