import { Select, SelectOption, SelectOptionGroup } from '@app/controls';
import { Card } from '@app/pages/cards';

export class Expansion {
	id: number;
    name: string;
	code: string;
	ptcgo_code?: string;
	series: Series;
	standard_legal: boolean;
	expanded_legal: boolean;
	total_cards: number;
	release_date: Date;
	symbol: string;
	logo: string;

	route: string;
	cards: Card[] = [];

    constructor(init?:Partial<Expansion>) {
		Object.assign(this, init);
		
		// Route
		this.route = `/expansions/${this.code}`;

		// Initalize cards
		if (init.cards) {
			this.cards = [];
			init.cards.forEach(card => {
				this.cards.push(new Card(card));
			});
		}
    }
}

export class Series {
	id: number;
	name: string;
	expansions: Expansion[] = [];

    constructor(init?:Partial<Series>) {
		Object.assign(this, init);
		
		// Initalize expanions
		if (init.expansions) {
			this.expansions = [];
			init.expansions.forEach(expansion => {
				this.expansions.push(new Expansion(expansion));
			});
		}
    }
}

export function SetSortByExpansions(select: Select) {
	select.optionGroups[0] = new SelectOptionGroup({
		label: "Sort By",
		options: [
			new SelectOption({
				text: "Release Date",
				value: "expansion.release_date"
			}),
		]
	});
	select.value = "expansion.release_date";
}