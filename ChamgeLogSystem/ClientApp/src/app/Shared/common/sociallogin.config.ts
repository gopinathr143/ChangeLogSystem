import {  FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';

const config =  ([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('2203659926599837')
    }
  ]);
  
  export function provideConfig() {
    return config;
  }