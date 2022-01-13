import { Condition } from './../../../models/condition';
export class CardCollectionItem {
	id: string;
	card_id: number;
	card_group_id?: number;
	condition: string = Condition.Mint;
	graded_by: string;
	printing: string;
	notes: string;
	date_obtained: Date;
	purchase_price: Number;

	constructor(init?: Partial<CardCollectionItem>) {
		Object.assign(this, init);
	}
}
