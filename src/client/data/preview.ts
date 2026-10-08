import type { LocalApp } from '../types/preview'

export const LOCAL_APP_OPTIONS: LocalApp[] = [
  {
    name: 'Discord',
    urlScheme: 'discord://',
    nestedUrlScheme: 'discord://-/channels/{serverId}/{channelId}',
    imageURL: '/localAppImages/discord-logo.png',
  },
  {
    name: 'Figma',
    urlScheme: 'figma://',
    nestedUrlScheme: 'figma://file/{fileKey}',
    imageURL: '/localAppImages/discord-logo.png',
  },
  {
    name: 'Notion',
    urlScheme: 'notion://',
    nestedUrlScheme: 'notion://www.notion.so/{pageId}',
    imageURL: '/localAppImages/discord-logo.png',
  },
  {
    name: 'Spotify',
    urlScheme: 'spotify:',
    nestedUrlScheme: 'spotify:{type}:{id}', // type: playlist | track | album | artist
    imageURL: '/localAppImages/discord-logo.png',
  },
  {
    name: 'VS Code',
    urlScheme: 'vscode://',
    nestedUrlScheme: 'vscode://file/{absolutePath}:{line}:{col}',
    imageURL: '/localAppImages/discord-logo.png',
  },
]

export const LOCAL_APPS_CACHE_AMOUNT = 3

export const LOCAL_BACKGROUND_IMAGES = [
  { name: 'game-controller', path: '/public/previewBackground/297738_game-controller-icon.png' },
  { name: 'jack-o-lantern', path: '/public/previewBackground/340629_jack-o-lantern-icon.png' },
  { name: 'broom', path: '/public/previewBackground/340633_broom-icon.png' },
  { name: 'witch-hat', path: '/public/previewBackground/340634_witch-hat-icon.png' },
  { name: 'witch', path: '/public/previewBackground/340636_witch-icon.png' },
]
export const WEB_BACKGROUND_IMAGE_COUNT = 3

export const WEB_BACKGROUND_SIZE = "&w=1600&dpr=2"