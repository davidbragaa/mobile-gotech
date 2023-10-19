import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gotech.app',
  appName: 'GoTech',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
