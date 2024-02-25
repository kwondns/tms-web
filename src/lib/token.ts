export function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return now >= payload.exp;
  } catch (e) {
    return true;
  }
}
