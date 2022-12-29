import type { Roles } from "./roles";
import type { Profile } from "$lib/models/accounts/profile";

export interface Account {
	readonly id: string;
	roles: Roles[];
	termsAgree: boolean;
	emailConfirmed: boolean;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}

export interface AccountWithReports extends Account {
	readonly profiles: Profile[];
	readonly total: number;
}
