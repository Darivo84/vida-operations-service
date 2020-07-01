import fetch from "node-fetch";

const injectToken = async (req, res, next) => {
  // We need to hit the care api to receive the token for subsequent requests.
  const body = await fetch(`http://api.care-planner.co.uk/oauth2/token`, {
    method: "post",
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: "fd3b0c9b-d4ce-4a97-aa7e-d2ced9c3ddc6",
      client_secret: "RfhA+LlbeKJQNi5ympCNDtFzihzeZRjD",
      organisation_name: "vida",
    }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());

  req.token = body.access_token;

  return next();
};

export default injectToken;
