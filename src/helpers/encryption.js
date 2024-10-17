import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // استخدم مفتاحًا سريًا آمنًا

export function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
