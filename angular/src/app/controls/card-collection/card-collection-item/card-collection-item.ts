import { Condition, ConditionGraded, GradingCompany, PrintVersion } from "@app/models";

export class CardCollectionItem {
	id: string;
	quantity: number;
	condition: Condition;
	conditionGraded: ConditionGraded;
	gradingCompany: GradingCompany;
	printVersion: PrintVersion;
	price: number;

    constructor(init?:Partial<CardCollectionItem>) {
		Object.assign(this, init);
	}
};