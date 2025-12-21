// HEAVSTAL TECH

import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface HeavstalProfile extends Record<string, any> {
  sub: string;     
  name: string;
  email: string;
  picture: string;
  heavstal_id?: string;
}

export default function HeavstalProvider(
  options: OAuthUserConfig<HeavstalProfile>
): OAuthConfig<HeavstalProfile> {
  return {
    id: "heavstal",
    name: "Heavstal Tech",
    type: "oauth",
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    authorization: {
      url: "https://accounts-heavstal.vercel.app/oauth/authorize",
      params: { scope: "profile email" },
    },
    token: {
      url: "https://accounts-heavstal.vercel.app/api/oauth/token",
    },
    userinfo: {
      url: "https://accounts-heavstal.vercel.app/api/oauth/userinfo",
    },
    client: {
      token_endpoint_auth_method: "client_secret_post",
    },
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
