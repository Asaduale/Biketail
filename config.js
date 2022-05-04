const env = process.env.NODE_ENV;

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'

module.exports = { env, USE_TEST_USER, TEST_USER_ID, TEST_USER_EMAIL }