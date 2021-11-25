import {
	Condition,
	ConditionGraded,
	GradingCompany,
	PrintVersion,
} from '@app/models';

export class CardCollectionItem {
	id: string;
	condition: Condition;
	conditionGraded: ConditionGraded;
	gradingCompany: GradingCompany;
	printVersion: PrintVersion;
	notes: string;

	constructor(init?: Partial<CardCollectionItem>) {
		Object.assign(this, init);
	}
}
