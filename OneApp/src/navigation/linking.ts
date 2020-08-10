import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Main: {
        screens: {
          Home: {
            path: '/home',
            screens: {
              HomeScreen: 'home',
            },
          },
          Message: {
            path: '/message',
            screens: {
              MessageScreen: 'message',
            },
          },
          Tribe: {
            path: '/tribe',
            screens: {
              TribeScreen: 'tribe',
            },
          },
          Mine: {
            path: '/mine',
            screens: {
              MineScreen: 'mine',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
