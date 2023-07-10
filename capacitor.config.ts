import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.suna.sunayumi',
  appName: 'Sunayumi',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['openid'],
      androidClientId: '153647853356-1n9mdr3406hdkkgb4bj55fg4bnjj7qqt.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },

};

export default config;