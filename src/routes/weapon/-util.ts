export const getRarityColor = (damage: number) => {
  if (damage >= 40) return 'border-purple-500 shadow-purple-500/20'
  if (damage >= 25) return 'border-blue-500 shadow-blue-500/20'
  if (damage >= 15) return 'border-green-500 shadow-green-500/20'
  return 'border-gray-500 shadow-gray-500/20'
}

export const getRarityLabel = (damage: number) => {
  if (damage >= 40) return 'Legendary'
  if (damage >= 25) return 'Epic'
  if (damage >= 15) return 'Rare'
  return 'Common'
}
