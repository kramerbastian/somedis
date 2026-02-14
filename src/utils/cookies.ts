export function getCookieBannerBeenShown() {
  if (typeof window !== 'undefined') {
    const match = localStorage.getItem('cookieBanner');

    if (!match) return false;

    if (match == 'true') return true;

    return false;
  }
  return false;
}

export function setCookieBannerBeenShown() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cookieBanner', 'true');
  }
}
