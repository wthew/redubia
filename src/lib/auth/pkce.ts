// utils/pkce.ts

// Gera string aleatória em base64url
function randomString(size = 64) {
  const array = new Uint8Array(size);
  crypto.getRandomValues(array);
  // convert Uint8Array to binary string without using spread
  let binary = "";
  for (let i = 0; i < array.length; i++) {
    binary += String.fromCharCode(array[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Base64URL sem padding
function base64url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Gera PKCE
export async function generatePKCE() {
  const code_verifier = randomString(64);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(code_verifier)
  );

  const code_challenge = base64url(hashBuffer);

  return { code_verifier, code_challenge };
}
