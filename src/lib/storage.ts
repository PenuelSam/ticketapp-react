const STORAGE_PREFIX = 'ticketapp_';

type StorageValue<T> = {
  value: T;
};

export function saveItem<T>(key: string, value: T) {
  const payload: StorageValue<T> = { value };
  localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(payload));
}

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as StorageValue<T>;
    return parsed.value ?? fallback;
  } catch (error) {
    console.error('Failed to read storage key', key, error);
    return fallback;
  }
}

export function removeItem(key: string) {
  localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
}
