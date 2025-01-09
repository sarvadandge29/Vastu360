import 'dotenv/config'

export default {
  "expo": {
    "name": "Vastu360",
    "slug": "Vastu360",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-document-picker",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra" : {
      projectId : process.env.SUPABASE_PROJECT_ID,
      supabaseUrl : process.env.SUPABASE_URL,
      supabaseKey : process.env.SUPABASE_KEY,
      emailjsServiceId:process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId:process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey:process.env.EMAILJS_PUBLIC_KEY,
    }
  }
}
