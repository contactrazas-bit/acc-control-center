export function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) {
    return "hidden@example.com";
  }

  return `${name.slice(0, 1)}***@${domain}`;
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) {
    return "***";
  }

  return `***-***-${digits.slice(-4)}`;
}

export function maskUsername(username: string) {
  if (username.length <= 2) {
    return "**";
  }

  return `${username.slice(0, 1)}***${username.slice(-1)}`;
}
