import { Select, SelectOption, SelectOptionGroup } from '@app/controls';
import { Menu } from '@app/controls/menu';
import "@app/extensions/string.extensions";
import { Icons } from '@app/models';
import { Expansion } from '@app/pages/expansions';
import { Pokemon } from '@app/pages/pokemons/pokemon/pokemon';

export const DEFAULT_IMAGE = "/assets/back.jpg";

export class Weakness {
	type: string;
	value: string;
}

export class Attack {
	cost: string[] = [];
	name: string;
	text: string;
	damage: number;
	convertedEnergyCost: number;
}

export class Card {
	id: number;
	name: string;
	slug: string;
	pokemon: Pokemon;
	expansion: Expansion;
	number: string;
	rarity: string;
	image: string;
	image_high_res?: string;
	super_type: string;
	sub_type?: string;
	hp?: number;
	retreat_cost: string[] = [];
	weaknesses: Weakness[] = [];
	attacks: Attack[] = [];
	artist: string;
	is_shiny: boolean;
	is_promo: boolean;
	is_full_art: boolean;
	is_gold: boolean;
	has_first_edition: boolean;
	has_shadowless: boolean;
	has_reverse_holo: boolean;
	types: string[] = [];
	price: number;

	route: string;
	tempId: number;

    constructor(init?:Partial<Card>) {
		Object.assign(this, init);

		// Route
		this.route = "/card/" + this.slug;

		// Initalize expansion
		if (init.expansion) {
			this.expansion = new Expansion(init.expansion);
		}
	}
}

export class CardGroup {
	title: string;
	icon: Icons;
	cards: Card[] = [];
	count: number = 0;
    constructor(init?:Partial<CardGroup>) {
        Object.assign(this, init);
	}
}

export class CardCount {
	get count(): number {
		return this.cards.length;
	}
	cards: Card[] = [];
    constructor(init?:Partial<CardCount>) {
        Object.assign(this, init);
	}
}

export function SetSortByCards(select: Select) {
	select.optionGroups[0] = new SelectOptionGroup({
		label: "Sort By",
		options: [
			new SelectOption({
				text: "Number",
				value: "card.order"
			}),
			new SelectOption({
				text: "Name",
				value: "card.name"
			}),
			new SelectOption({
				text: "Price",
				value: "card.price"
			}),
			new SelectOption({
				text: "Release Date",
				value: "card.release_date"
			}),
			new SelectOption({
				text: "Rarity",
				value: "card.rarity"
			})
		]
	});
	select.value = "card.order";
};