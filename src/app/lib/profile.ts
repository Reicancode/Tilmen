const KEY = "kazlingo-profile";

export type Profile = {
  id: string; // в будущем userId
  nickname: string;
  avatar: string; // emoji / url
  createdAt: string;
};

const DEFAULT_PROFILE: Profile = {
  id: "local-user",
  nickname: "Гость",
  avatar: "🧑‍🎓",
  createdAt: new Date().toISOString(),
};

export function getProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;

  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_PROFILE));
    return DEFAULT_PROFILE;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function updateProfile(partial: Partial<Profile>) {
  const current = getProfile();
  saveProfile({ ...current, ...partial });
}
