export type BriefField = "name" | "company" | "email" | "phone" | "message";
export type BriefIssue = "required" | "nameShort" | "badEmail" | "badPhone" | "messageShort";

export type BriefValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const ARABIC_DIGITS: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9",
};

export function westernDigits(value: string) {
  return value.replace(/[٠-٩۰-۹]/g, (digit) => ARABIC_DIGITS[digit] ?? digit);
}

export function phoneDigits(value: string) {
  let digits = westernDigits(value).replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  return digits;
}

/** Keep only what a mobile field should accept while typing. */
export function sanitizePhoneInput(value: string) {
  const compact = value.replace(/[^\d+٠-٩۰-۹]/g, "");
  const plus = compact.startsWith("+") ? "+" : "";
  const digits = compact.replace(/\+/g, "").slice(0, 15);
  return `${plus}${digits}`;
}

export function sanitizeNameInput(value: string) {
  return value.replace(/[0-9٠-٩۰-۹]/g, "").replace(/[^\p{L}\s'.-]/gu, "");
}

export function sanitizeCompanyInput(value: string) {
  return value.replace(/[^\p{L}\p{N}\s&'.-]/gu, "");
}

export function sanitizeEmailInput(value: string) {
  return value.replace(/\s/g, "").replace(/[^a-zA-Z0-9.@_+-]/g, "");
}

/** Egypt mobiles + international E.164 without +. */
export function normalizePhone(value: string): string | null {
  let digits = phoneDigits(value);
  if (!digits) return null;

  if (/^01[0125]\d{8}$/.test(digits)) return `20${digits.slice(1)}`;
  if (/^1[0125]\d{8}$/.test(digits)) return `20${digits}`;
  if (/^201[0125]\d{8}$/.test(digits)) return digits;
  if (/^[1-9]\d{9,14}$/.test(digits)) return digits;
  return null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export function validateBrief(input: Partial<BriefValues>): {
  issues: Partial<Record<BriefField, BriefIssue>>;
  values: BriefValues | null;
} {
  const name = sanitizeNameInput(input.name ?? "").trim();
  const company = sanitizeCompanyInput(input.company ?? "").trim();
  const email = sanitizeEmailInput(input.email ?? "").trim();
  const phoneRaw = sanitizePhoneInput(input.phone ?? "").trim();
  const message = (input.message ?? "").trim();
  const issues: Partial<Record<BriefField, BriefIssue>> = {};

  if (!name) issues.name = "required";
  else if (name.replace(/\s/g, "").length < 2) issues.name = "nameShort";

  if (email && !EMAIL.test(email)) issues.email = "badEmail";

  const phone = normalizePhone(phoneRaw);
  if (!phoneRaw) issues.phone = "required";
  else if (!phone) issues.phone = "badPhone";

  if (!message) issues.message = "required";
  else if (message.length < 8) issues.message = "messageShort";

  if (Object.keys(issues).length) return { issues, values: null };

  return {
    issues,
    values: {
      name,
      company,
      email,
      phone: phone ?? "",
      message,
    },
  };
}
