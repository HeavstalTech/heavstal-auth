# Heavstal Auth Provider

<div align="center">
  <img src="https://files.catbox.moe/u1hm7q.jpg" alt="Heavstal Logo" width="100" height="100" />
</div>

[![NPM Version](https://img.shields.io/npm/v/heavstal-auth?style=flat-square&color=blue)](https://www.npmjs.com/package/heavstal-auth)
[![License](https://img.shields.io/npm/l/heavstal-auth?style=flat-square)](https://github.com/HeavstalTech/heavstal-auth/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/heavstal-auth?style=flat-square)](https://www.npmjs.com/package/heavstal-auth)

The official **[NextAuth.js](https://next-auth.js.org/)** (Auth.js) provider for the **Heavstal Tech Identity Platform**.

This package enables seamless integration of **Heavstal OAuth 2.0 & OpenID Connect (OIDC)** authentication into Next.js and Node.js applications. It pre-configures authorization endpoints, token exchanges, and user profile mapping, ensuring security best practices.

---

## Features

- **Zero-Configuration:** Pre-configured endpoints for Heavstal Identity services.
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
Register your application in the [Heavstal Developer Console](https://heavstal-tech.vercel.app/oauth/apps) to obtain your **Client ID** and **Client Secret**.

### 2. Environment Variables
Add the following to your `.env` or `.env.local` file:

```bash
HEAVSTAL_CLIENT_ID=ht_id_xxxxxxxxxxxx
HEAVSTAL_CLIENT_SECRET=ht_secret_xxxxxxxxxxxx
```

### 3. Usage with NextAuth.js
Import `HeavstalProvider` and add it to your NextAuth configuration.

**File:** `app/api/auth/[...nextauth]/route.ts` (App Router) or `pages/api/auth/[...nextauth].ts` (Pages Router).

```typescript
import NextAuth from "next-auth";
import HeavstalProvider from "heavstal-auth";

const handler = NextAuth({
  providers: [
    HeavstalProvider({
      clientId: process.env.HEAVSTAL_CLIENT_ID!,
      clientSecret: process.env.HEAVSTAL_CLIENT_SECRET!,
// you might need to add issuer failed depending on your configuration
issuer: https://accounts-heavstal.vervel.app,
    }),
    // ...other providers
  ],
  // Optional: Enable debug mode for development
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
```

---

## Integration with Non-Next.js Applications

Heavstal Tech is a standard **OpenID Connect (OIDC)** provider. If you are using a different framework (Express, Python, Go, etc.) or a library that supports OIDC Discovery, you do not need this specific SDK.

You can configure your client using the **Issuer URL**.

### OIDC Discovery Configuration

| Parameter | Value |
| :--- | :--- |
| **Issuer URL** | `https://accounts-heavstal.vercel.app` |
| **Discovery Document** | `https://accounts-heavstal.vercel.app/.well-known/openid-configuration` |
| **JWKS Endpoint** | `https://accounts-heavstal.vercel.app/.well-known/jwks.json` |

### Example: Generic Node.js OIDC Client
```javascript
const client = new OIDCClient({
  issuer: 'https://accounts-heavstal.vercel.app', 
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

- [Developer Console](https://heavstal-tech.vercel.app/oauth/apps)
- [API Documentation](https://heavstal-tech.vercel.app/docs/api/oauth-guide)
- [Heavstal Platform](https://heavstal-tech.vercel.app)

---

### License

This project is licensed under the **MIT License**.

Copyright © 2025 - 2026 **Heavstal Tech™**. All rights reserved

