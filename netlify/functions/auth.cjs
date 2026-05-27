/** Decap CMS GitHub OAuth — runs on jon-portfolio-cms.netlify.app */
const SCOPES = "repo";

function siteUrl() {
  return process.env.URL || "https://jon-portfolio-cms.netlify.app";
}

function redirectUri() {
  return `${siteUrl()}/callback`;
}

function authRedirect(params) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return { statusCode: 500, body: "GITHUB_CLIENT_ID is not set in Netlify env vars." };
  }

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri());
  url.searchParams.set("scope", SCOPES);
  if (params.state) url.searchParams.set("state", params.state);

  return { statusCode: 302, headers: { Location: url.toString() } };
}

async function authCallback(params) {
  const code = params.code;
  if (!code) {
    return { statusCode: 400, body: "Missing authorization code." };
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: "GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET not set." };
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri(),
    }),
  });

  const data = await tokenRes.json();
  if (data.error) {
    const msg = data.error_description || data.error;
    return htmlResponse(
      `<p>GitHub error: ${escapeHtml(msg)}</p><script>setTimeout(() => window.close(), 4000);</script>`,
    );
  }

  const payload =
    "authorization:github:success:" +
    JSON.stringify({ token: data.access_token, provider: "github" });

  const html = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8"><title>Authorized</title></head>
  <body>
    <p>Authorized. Closing…</p>
    <script>
      (function () {
        if (window.opener) {
          window.opener.postMessage(${JSON.stringify(payload)}, "*");
        }
        setTimeout(function () { window.close(); }, 500);
      })();
    </script>
  </body>
</html>`;

  return htmlResponse(html);
}

function htmlResponse(body) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body,
  };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

exports.handler = async (event) => {
  const params = event.queryStringParameters || {};
  const path = event.path || event.rawUrl || "";

  if (path.includes("/callback") || params.code) {
    return authCallback(params);
  }

  return authRedirect(params);
};
