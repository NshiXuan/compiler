class LocalCache {
  setCache(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = window.sessionStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleCache(key: string) {
    window.sessionStorage.removeItem(key)
  }

  clearCache(key: string) {
    window.sessionStorage.clear()
  }
}

export default new LocalCache()
