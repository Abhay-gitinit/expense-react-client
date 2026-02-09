export const getUserName = (email, members = [], fallback = "") => {
  if (!email) return fallback;

  const user = members.find((m) => m.email === email);
  return user?.name || email; // fallback only if name missing
};
