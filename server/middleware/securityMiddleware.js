const requestBuckets = new Map();
const unsafeInputPattern = /<\s*script|<\s*iframe|javascript\s*:|on\w+\s*=|<\s*\/?\s*(?:img|svg|object|embed)/i;

function sanitizeValue(value) {
  if (typeof value === 'string') {
    const normalized = value.trim();

    if (unsafeInputPattern.test(normalized)) {
      throw new Error('UNSAFE_INPUT');
    }

    if (normalized.length > 100_000) {
      throw new Error('PAYLOAD_FIELD_TOO_LARGE');
    }

    return normalized;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, sanitizeValue(item)]),
    );
  }

  return value;
}

export function securityHeaders(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  );
  return next();
}

export function sanitizeRequest(req, res, next) {
  try {
    if (req.body) req.body = sanitizeValue(req.body);
    if (req.query) sanitizeValue(req.query);
    if (req.params) sanitizeValue(req.params);
    return next();
  } catch (error) {
    return next(error);
  }
}

export function apiRateLimit({ windowMs = 60_000, max = 120 } = {}) {
  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const current = requestBuckets.get(key);

    if (!current || current.resetAt <= now) {
      requestBuckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    current.count += 1;

    if (current.count > max) {
      res.setHeader('Retry-After', Math.ceil((current.resetAt - now) / 1000));
      return res.status(429).json({ error: 'RATE_LIMIT_EXCEEDED' });
    }

    return next();
  };
}
