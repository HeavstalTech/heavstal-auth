// src/index.ts
// © HEAVSTAL TECH
// Official NextAuth Provider

// Migration Notice for Heavstal Auth
if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "\n[HEAVSTAL TECH]  DEPRECATION NOTICE:",
    "\nThe package 'heavstal-auth' has been moved to '@heavstal/auth'.",
    "\nThis version is no longer maintained and will not receive security updates.",
    "\n\nRun: npm install @heavstal/auth",
    "\nVisit: https://www.npmjs.com/package/@heavstal/auth\n"
  );
}

// import type { OAuthConfig } from "@auth/core/providers"
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";


export interface HeavstalProfile extends Record<string, any> {
  sub: string;     
  name: string;
  email: string;
  picture: string;
}

export interface HeavstalProviderOptions extends OAuthUserConfig<HeavstalProfile> {
  mode?: "oidc" | "oauth2";
  clientId: string;
  clientSecret: string;
}

export default function HeavstalProvider(
  options: HeavstalProviderOptions
): OAuthConfig<HeavstalProfile> {
  const { mode = "oidc", clientId, clientSecret, ...restOptions } = options;
  
  const config = {
    id: "heavstal",
    name: "Heavstal Tech",
   // type: mode as "oauth" | "oidc",
    type: "oauth",
    clientId,
    clientSecret,
    checks: ["pkce", "state"],
    
    profile(profile: HeavstalProfile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    style: {
      logo: "https://heavstal.com.ng/ht_icon.svg",
      bg: "#000",
      text: "#fff",
    },
    
    ...(mode === "oidc"
      ? {
          wellKnown: "https://accounts.heavstal.com.ng/.well-known/openid-configuration",
          authorization: { params: { scope: "openid profile email" } },
          idToken: true,
        }
      : {
          authorization: {
            url: "https://accounts.heavstal.com.ng/oauth/authorize",
            params: { scope: "profile email" },
          },
          token: "https://accounts.heavstal.com.ng/api/oauth/token",
          userinfo: "https://accounts.heavstal.com.ng/api/oauth/userinfo",
          idToken: false,
        }),
    ...restOptions,
  };
  
  return config as OAuthConfig<HeavstalProfile>;
}
