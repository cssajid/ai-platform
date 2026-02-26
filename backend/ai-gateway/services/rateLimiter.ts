const requestMap = new Map<string, number>();

export function rateLimiter(req: any, res: any, next: any) {
  const ip = req.ip;
  const now = Date.now();

  if (!requestMap.has(ip)) {
    requestMap.set(ip, now);
    return next();
  }

  const lastRequest = requestMap.get(ip)!;

  if (now - lastRequest < 1000) {
    return res.status(429).json({ error: "Too many requests" });
  }

  requestMap.set(ip, now);
  next();
}
