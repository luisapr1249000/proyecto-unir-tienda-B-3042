export const AlphanumericAndDotsRegex = /^[a-zA-Z0-9.]+$/;
export const numericRegex = /^[0-9]+$/;
export const lettersRegex = /^[a-zA-Z]+$/;
export const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const letterNumberDotHyphenUnderscoreRegex = /^[a-zA-Z0-9._-]+$/;
export const uppercaseRegex = /[A-Z]/;
export const lowercaseRegex = /[a-z]/;
export const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

export const phoneNumberRegex =
  /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?[\d\s.-]{7,10}$/;
