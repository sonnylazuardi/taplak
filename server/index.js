const { router, get, post } = require("microrouter");
const { json, send } = require("micro");
const { authentication } = require("bukalapak-api");

const createSession = async (req, res) => {
  try {
    const { username, password } = await json(req);
    const { token } = await authentication.getApiToken({
      username,
      password
    });
    send(res, 200, { token });
  } catch (error) {
    send(res, 500, {
      error,
      message: "not cool bro"
    });
  }
};

module.exports = router(post("/session", createSession));
