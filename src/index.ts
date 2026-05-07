// src/index.ts
// © HEAVSTAL TECH
// Official NextAuth Provider

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface HeavstalProfile extends Record<string, any> {
  sub: string;     
  name: string;
  email: string;
  picture: string;
}

export interface HeavstalProviderOptions extends OAuthUserConfig<HeavstalProfile> {
  /**
   * Choose the authentication protocol:
   * - 'oidc' (Default): Uses OpenID Connect discovery & validates the JWT ID Token.
   * - 'oauth2': Ignores the ID Token and fetches user data directly from the UserInfo API.
   */
  mode?: "oidc" | "oauth2";
}

export default function HeavstalProvider(
  options: HeavstalProviderOptions
): OAuthConfig<HeavstalProfile> {
  const mode = options.mode || "oidc";
  const { mode: _mode, ...restOptions } = options;
  
  let config: Partial<OAuthConfig<HeavstalProfile>> = {
    id: "heavstal",
    name: "Heavstal Tech",
    type: mode === "oidc" ? "oidc" : "oauth",
    checks:["pkce", "state"],
    
    profile(profile) {
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
  };

  if (mode === "oidc") {
    // OIDC (recommended)
    Object.assign(config, {
      wellKnown: "https://accounts.heavstal.com.ng/.well-known/openid-configuration",
      authorization: { params: { scope: "openid profile email" } },
      idToken: true, 
    });
  } else {
    // OAUTH2
    Object.assign(config, {
      authorization: {
        url: "https://accounts.heavstal.com.ng/oauth/authorize",
        params: { scope: "profile email" }
      },
      token: "https://accounts.heavstal.com.ng/api/oauth/token",
      userinfo: "https://accounts.heavstal.com.ng/api/oauth/userinfo",
      idToken: false,
    });
  }
  
  return {
    ...(config as OAuthConfig<HeavstalProfile>),
    ...restOptions,
  };
}
