import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<{
  id: string;
  username: string;
  isAdmin: boolean;
} | null>("userAtom", null);
