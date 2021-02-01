import { Select, SelectOption, SelectOptionGroup } from '@app/controls';
import { Menu } from '@app/controls/menu';
import "@app/extensions/string.extensions";
import { ItemsFilter } from '@app/layout';
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
	last_prices: CardLastPrices;

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

		// Initalize pokemon
		if (init.pokemon) {
			this.pokemon = new Pokemon(init.pokemon);
		}
	}
}

export class CardLastPrices {
	card_id: number;
	condition: string;
	created_at: Date;
	direct_price: string;
	high_price: number;
	id: number;
	low_price: number;
	market_price: number;
	mid_price: number;
	source: string;
	updated_at: Date;
	variation: string;

    constructor(init?:Partial<CardLastPrices>) {
		Object.assign(this, init);
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

export function SetSortByCards(itemFilter: ItemsFilter) {
	itemFilter.selectSortBy.optionGroups[0] = new SelectOptionGroup({
		label: "Sort By",
		options: [
			new SelectOption({
				text: "Number",
				value: "number"
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
	itemFilter.selectSortBy.value = "number";
	itemFilter.sortBy = itemFilter.selectSortBy.value;
};