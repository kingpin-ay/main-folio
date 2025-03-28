import { randomBytes, scryptSync } from "crypto";
const saltRound = process.env.SALT_ROUND;

const safelyParseInt = (value: string): number | null => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
};

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
export const hashPassword = (password: string): string => {
  const randomByteLength = safelyParseInt(saltRound!);
  if (!randomByteLength) {
    throw new Error("Invalid salt round");
  }
  // Any random string here (ideally should be at least 16 bytes)
  const salt = randomBytes(randomByteLength).toString("hex");
  return encryptPassword(password, salt) + salt;
};

// fetch the user from your db and then use this function

/**
 * Match password against the stored hash
 */
export const matchPassword = (password: string, hash: string): Boolean => {
  // extract salt from the hashed string
  // our hex password length is 32*2 = 64
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(password, salt);
  return originalPassHash === currentPassHash;
};
