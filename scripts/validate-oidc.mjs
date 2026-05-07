// scripts/validate-oidc.js
// © Heavstal Tech
// Modify before re-use
import https from 'https'
var DISCOVERY_URL = "https://accounts.heavstal.com.ng/.well-known/openid-configuration"

console.log(`Validating OIDC Discovery: ${DISCOVERY_URL}`);

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    var config = await fetchJson(DISCOVERY_URL);
    if (!config.issuer) throw new Error("Missing 'issuer' in OIDC config");
    if (!config.jwks_uri) throw new Error("Missing 'jwks_uri' in OIDC config");
    console.log("OIDC Config found.");
    console.log(`Checking Keys: ${config.jwks_uri}`);
    var jwks = await fetchJson(config.jwks_uri);
    if (!jwks.keys || jwks.keys.length === 0) throw new Error("No keys found in JWKS");
    console.log("JWKS Keys valid.");
    console.log("Pre-flight check passed. Ready to publish.");
    process.exit(0);
  } catch (error) {
    console.error("OIDC Validation Failed:", error.message);
    process.exit(1);
  }
}

run();
