export const canUseDom = (): boolean => !!(
  typeof window === "object" &&
  window.document &&
  window.document.createElement
)

export const isServer = (): boolean => !canUseDom();
