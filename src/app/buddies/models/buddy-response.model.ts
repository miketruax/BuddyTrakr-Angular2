import { Buddy } from "./buddy.model";

export interface BuddyResponse {
    err?: string;
    buddies?: Buddy[]
    buddy?: Buddy
  };
  