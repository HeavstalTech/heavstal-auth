<div align="center">
  <img src="https://heavstal.com.ng/ht_icon.svg" width="120" alt="Heavstal Tech Logo" />
  <h1>Heavstal Auth Provider</h1>
</div>

[![NPM Version](https://img.shields.io/npm/v/heavstal-auth?style=flat-square&color=blue)](https://www.npmjs.com/package/heavstal-auth)
[![License](https://img.shields.io/npm/l/heavstal-auth?style=flat-square)](https://github.com/HeavstalTech/heavstal-auth/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/heavstal-auth?style=flat-square)](https://www.npmjs.com/package/heavstal-auth)
[![OIDC Check](https://img.shields.io/github/actions/workflow/status/HeavstalTech/heavstal-auth/validate-oidc.yml?label=OIDC%20Check&style=flat-square)](https://github.com/HeavstalTech/heavstal-auth/actions)

> [!NOTE]
> This version introduces breaking changes due to a change of domain. Older versions are by default deprecated. Please install this version to keep your app running.

> [!IMPORTANT]
> This package has been moved to [@heavstal/auth](https://www.npmjs.com/package/@heavstal/auth) and is no longer maintained, please migrate as soon as possible to receive new updates

The official **[NextAuth.js](https://next-auth.js.org/)** (Auth.js) provider for the **Heavstal Tech Identity Platform**.

This package enables seamless integration of **Heavstal OAuth 2.0 & OpenID Connect (OIDC)** authentication into Next.js and Node.js applications. It pre-configures authorization endpoints, token exchanges, and user profile mapping, ensuring security best practices.

---

## Features

- **Zero-Configuration:** Pre-configured endpoints for Heavstal Identity services.
- **Dual-Protocol Support:** Seamlessly toggle between full OpenID Connect (OIDC) or pure OAuth 2.0 modes.
- **OIDC Compliant:** Fully supports OpenID Connect discovery and ID Token verification.
- **TypeScript Support:** Written in TypeScript with included type definitions.
- **Secure Defaults:** Enforces `PKCE` (Proof Key for Code Exchange) and state verification by default.

---

## Installation

Ensure you have `next-auth` installed in your project.

```bash
npm install heavstal-auth
# or
yarn add heavstal-auth
# or
pnpm add heavstal-auth
```

---

## Configuration

### 1. Obtain Credentials
Register your application in the [Heavstal Developer Console](https://heavstal.com.ng/oauth/apps) to obtain your **Client ID** and **Client Secret**.

### 2. Environment Variables
Add the following to your `.env` or `.env.local` file:

```bash
HEAVSTAL_CLIENT_ID=ht_id_xxxxxxxxxxxx
HEAVSTAL_CLIENT_SECRET=ht_secret_xxxxxxxxxxxx
```

### 3. Basic Usage (OIDC Mode)
Import `HeavstalProvider` and add it to your NextAuth configuration. By default, the provider runs in modern `oidc` mode and uses our Discovery Document to fetch configurations automatically.

**File:** `app/api/auth/[...nextauth]/route.ts` (App Router) or `pages/api/auth/[...nextauth].ts` (Pages Router).

```typescript
import NextAuth from "next-auth";
import HeavstalProvider from "heavstal-auth";

const handler = NextAuth({
  providers:[
    HeavstalProvider({
      clientId: process.env.HEAVSTAL_CLIENT_ID!,
      clientSecret: process.env.HEAVSTAL_CLIENT_SECRET!,
    }),
    // ...other providers
  ],
});

export { handler as GET, handler as POST };
```

### 4. Pure OAuth2 Mode (Bypassing JWKS)
If your environment has strict edge-runtime limitations or you simply prefer not to deal with cryptographic JWT verification (JWKS), you can switch the provider into pure `oauth2` mode. 

This forces NextAuth to ignore the `id_token` and fetch user data directly from the Heavstal `/userinfo` API instead.

```typescript
HeavstalProvider({
  clientId: process.env.HEAVSTAL_CLIENT_ID!,
  clientSecret: process.env.HEAVSTAL_CLIENT_SECRET!,
  mode: "oauth2", // <--- Bypasses OIDC / JWKS validation
})
```

---

## Integration with Non-Next.js Applications

Heavstal Tech is a standard **OpenID Connect (OIDC)** provider. If you are using a different framework (Express, Python, Go, etc.) or a library that supports OIDC Discovery, you do not need this specific SDK.

You can configure your client using the **Issuer URL**.

### OIDC Discovery Configuration

| Parameter | Value |
| :--- | :--- |
| **Issuer URL** | `https://accounts.heavstal.com.ng` |
| **Discovery Document** | `https://accounts.heavstal.com.ng/.well-known/openid-configuration` |
| **JWKS Endpoint** | `https://accounts.heavstal.com.ng/.well-known/jwks.json` |

### Example: Generic Node.js OIDC Client
```javascript
const client = new OIDCClient({
  issuer: 'https://accounts.heavstal.com.ng', 
  client_id: process.env.HEAVSTAL_CLIENT_ID,
  client_secret: process.env.HEAVSTAL_CLIENT_SECRET,
  redirect_uri: 'https://your-app.com/callback',
  response_type: 'code',
  scope: 'openid profile email'
});
```

---

## User Profile Data

On successful authentication, the provider returns the following normalized user profile structure:

```typescript
interface HeavstalProfile {
  id: string;       // The unique Heavstal User ID
  name: string;     // Public Display Name
  email: string;    // Verified Email Address
  image: string;    // Profile Picture URL
}
```

---

## Resources

- [Developer Console](https://heavstal.com.ng/oauth/apps)
-[API Documentation](https://heavstal.com.ng/docs/api/oauth-guide)
-[Heavstal Platform](https://heavstal.com.ng)

---

### License

This project is licensed under the **MIT License**.

Copyright © 2025 - 2026 **Heavstal Tech™**. All rights reserved.
