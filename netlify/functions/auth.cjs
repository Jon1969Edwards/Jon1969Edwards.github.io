/** Decap CMS GitHub OAuth — runs on jon-portfolio-cms.netlify.app */
const SCOPES = "repo";

function siteUrl() {
  return process.env.URL || "https://jon-portfolio-cms.netlify.app";
}

function redirectUri() {
  return `${siteUrl()}/callback`;
}

function buildGitHubAuthorizeUrl(params) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return null;

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri());
  url.searchParams.set("scope", SCOPES);
  if (params.state) url.searchParams.set("state", params.state);
  return url.toString();
}

/** Decap expects `authorizing:github` from base_url before the OAuth redirect. */
function authRedirect(params) {
  const githubUrl = buildGitHubAuthorizeUrl(params);
  if (!githubUrl) {
    return { statusCode: 500, body: "GITHUB_CLIENT_ID is not set in Netlify env vars." };
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <head><meta charset="utf-8"><title>Authorizing…</title></head>
  <body>
    <p>Redirecting to GitHub…</p>
    <script>
      (function () {
        var githubUrl = ${JSON.stringify(githubUrl)};
        var started = false;
        function goToGitHub() {
          if (started) return;
          started = true;
          window.location.replace(githubUrl);
        }
        if (!window.opener) {
          goToGitHub();
          return;
        }
        // Decap echoes "authorizing:github" back before we may redirect to GitHub.
        window.addEventListener("message", function onEcho(e) {
          if (e.data === "authorizing:github") {
            window.removeEventListener("message", onEcho);
            goToGitHub();
          }
        });
        try {
          window.opener.postMessage("authorizing:github", "*");
        } catch (e) {}
        setTimeout(goToGitHub, 8000);
      })();
    </script>
  </body>
</html>`;

  return htmlResponse(html);
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
        var msg = ${JSON.stringify(payload)};
        var adminOrigin = "https://jon1969edwards.github.io";
        function deliver() {
          if (!window.opener || window.opener.closed) return;
          try { window.opener.postMessage(msg, "*"); } catch (e) {}
          try { window.opener.postMessage(msg, adminOrigin); } catch (e) {}
        }
        deliver();
        var n = 0;
        var timer = setInterval(function () {
          deliver();
          if (++n > 12) {
            clearInterval(timer);
            window.close();
          }
        }, 250);
      })();
    </script>
  </body>
</html>`;

  return htmlResponse(html);
}

function htmlResponse(body) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cross-Origin-Opener-Policy": "unsafe-none",
    },
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
