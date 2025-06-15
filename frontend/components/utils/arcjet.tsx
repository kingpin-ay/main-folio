import arcjet, {
  detectBot,
  protectSignup,
  shield,
  tokenBucket,
} from "@arcjet/next";

export default arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [],
});

export { detectBot, protectSignup, shield, tokenBucket };
