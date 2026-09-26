/**
 * Verifies a Google reCAPTCHA v3 token server-side.
 * Returns true if the token is valid and its score is above the threshold.
 * Verification is skipped (returns true) when:
 *  - RECAPTCHA_SECRET_KEY isn't set at all, OR
 *  - it's still the unfilled placeholder from .env.example, OR
 *  - the token is the frontend's dev-placeholder value (no real key configured yet).
 * This keeps local development and testing frictionless without a real Google key.
 */
const verifyRecaptcha = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const isConfigured = secret && secret !== 'your_recaptcha_secret_key';

  if (!isConfigured) return true; // skip in dev — no real key set up yet
  if (token === 'dev-placeholder') return true; // frontend hasn't wired a real widget yet
  if (!token) return false;

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
    });
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (err) {
    console.error('[verifyRecaptcha] error:', err.message);
    return false;
  }
};

module.exports = verifyRecaptcha;