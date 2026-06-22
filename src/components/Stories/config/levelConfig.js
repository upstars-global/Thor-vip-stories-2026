import ironCube from '@components/Stories/img/levels/iron.png'
import bronzeCube from '@components/Stories/img/levels/bronze.png'
import silverCube from '@components/Stories/img/levels/silver.png'
import goldCube from '@components/Stories/img/levels/gold.png'
import platinumCube from '@components/Stories/img/levels/platinum.png'
import diamondCube from '@components/Stories/img/levels/diamond.png'

// --- VIP level mapping (decision C) ---------------------------------------
export const SHOW_IRON_FOR_REGULAR = true

export const LEVEL_CUBES = {
  IRON: ironCube,
  BRONZE: bronzeCube,
  SILVER: silverCube,
  GOLD: goldCube,
  PLATINUM: platinumCube,
  DIAMOND: diamondCube,
}

export const LEVEL_WORD_KEY = {
  IRON: 'vip_level_regular',
  REGULAR: 'vip_level_regular',
  BRONZE: 'vip_level_bronze',
  SILVER: 'vip_level_silver',
  GOLD: 'vip_level_gold',
  PLATINUM: 'vip_level_platinum',
  DIAMOND: 'vip_level_diamond',
}

export const resolveLevel = raw => {
  const lv = (raw || '').trim().toUpperCase()
  if (!lv) return { skip: true }
  if (lv === 'REGULAR') {
    return SHOW_IRON_FOR_REGULAR
      ? { skip: false, cube: LEVEL_CUBES.IRON, key: 'REGULAR' }
      : { skip: true }
  }
  if (LEVEL_CUBES[lv]) return { skip: false, cube: LEVEL_CUBES[lv], key: lv }
  console.warn('[stories] unknown level value:', raw)
  return { skip: true }
}
