export const QUERY_KEYS = {
  MASTER_CLASS: 'master-class',
  WEAPON: 'weapon',
  ENEMIES: 'enemies',
  PLAYER_DETAILS: 'player-details',
}
export const BASE_CONFIG = {
  baseURL: import.meta.env.VITE_PUBLIC_BASE_API_URL,
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
}
export const BASE_STATS = {
  ENEMY: {
    BASE_DAMAGE: 10,
  },
  PLAYER: {
    BASE_CONSTITUTION: 10,
  },
}
