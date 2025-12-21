# Heavstal Auth Provider

<div align="center">
  <img src="https://files.catbox.moe/u1hm7q.jpg" alt="Heavstal Logo" width="100" height="100" />
</div>

The official [NextAuth.js](https://next-auth.js.org/) (Auth.js) provider for **Heavstal Tech**.

Easily integrate **"Sign in with Heavstal"** into your Next.js applications without manually configuring authorization URLs, token endpoints, or user profile mappings.

![NPM Version](https://img.shields.io/npm/v/heavstal-auth?style=flat-square&color=blue)
![License](https://img.shields.io/npm/l/heavstal-auth?style=flat-square)

## 📦 Installation

```bash
npm install heavstal-auth
# or
yarn add heavstal-auth
# or
pnpm add heavstal-auth
```

> **Note:** You must have `next-auth` installed in your project.

## 🚀 Usage

### 1. Get your Credentials
Go to the [Heavstal Developer Console](https://heavstal-tech.vercel.app/oauth/apps) and create a new application to get your **Client ID** and **Client Secret**.

### 2. Add Environment Variables
Add these to your `.env` or `.env.local` file:

```bash
HEAVSTAL_CLIENT_ID=ht_id_xxxxxxxxxxxx
HEAVSTAL_CLIENT_SECRET=ht_secret_xxxxxxxxxxxx
```

### 3. Configure NextAuth
Import `HeavstalProvider` and add it to your providers list. It works exactly like the built-in Google or GitHub providers.

**In `app/api/auth/[...nextauth]/route.ts` (or `auth.ts`):**

```typescript
import NextAuth from "next-auth";
import HeavstalProvider from "heavstal-auth";

const handler = NextAuth({
  providers: [
    // The Heavstal Provider
    HeavstalProvider({
      clientId: process.env.HEAVSTAL_CLIENT_ID!,
      clientSecret: process.env.HEAVSTAL_CLIENT_SECRET!,
    }),
    
    // Other providers...
  ],
  // Optional: Enable debug to see OAuth flow details in console
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
```

## 🧩 TypeScript Support

This package is written in TypeScript and includes type definitions out of the box. The user profile returned by Heavstal includes:

- `id` (Heavstal User ID)
- `name`
- `email`
- `image` (Profile Picture URL)

## ⚙️ How it works
Under the hood, this package pre-configures:
- **Authorization URL:** `https://accounts-heavstal.vercel.app/oauth/authorize`
- **Token URL:** `https://accounts-heavstal.vercel.app/api/oauth/token`
- **User Info URL:** `https://accounts-heavstal.vercel.app/api/oauth/userinfo`
- **Token Style:** `client_secret_post`

You don't need to worry about endpoints or OIDC discovery—it's all handled for you.

## 🔗 Links
- [Heavstal Developer Console](https://heavstal-tech.vercel.app/oauth/apps)
- [Official Documentation](https://heavstal-tech.vercel.app/docs/api/oauth-guide)
- [Heavstal Tech Platform](https://heavstal-tech.vercel.app)

---
Made with ❤️ by [Heavstal Tech](https://heavstal-tech.vercel.app)
