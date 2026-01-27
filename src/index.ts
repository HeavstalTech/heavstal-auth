// HEAVSTAL TECH - Official NextAuth Provider

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface HeavstalProfile extends Record<string, any> {
  sub: string;     
  name: string;
  email: string;
  picture: string;
}

export default function HeavstalProvider(
  options: OAuthUserConfig<HeavstalProfile>
): OAuthConfig<HeavstalProfile> {
  return {
    id: "heavstal",
    name: "Heavstal Tech",
    type: "oauth",
    wellKnown: "https://accounts-heavstal.vercel.app/.well-known/openid-configuration",
    authorization: { params: { scope: "openid profile email" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    style: {
      logo: "https://heavstal-tech.vercel.app/ht_icon.svg",
      bg: "#000",
      text: "#fff",
    },
    
    ...options,
  };
}
