const { router, get, post } = require("microrouter");
const { json, send } = require("micro");
const { authentication } = require("bukalapak-api");

const createSession = async (req, res) => {
  const { username, password } = await json(req);
  const { token } = await authentication.getApiToken({
    username,
    password
  });
  send(res, 200, token);
};

module.exports = router(post("/session", createSession));
