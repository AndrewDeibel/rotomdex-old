import { Select, SelectOption, SelectOptionGroup } from "@app/controls";

export class EvolutionChain {
	id: number;
	name: string;
	national_dex_number: number;
	sprite: string;
}

export class Pokemon {
	id: number;
	name: string;
	generation: PokemonGeneration;
	national_dex_number: number;
	order: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	color: string;
	shape: string;
	evolves_from_pokemon: number;
	image: string;
	slug: string;
	variants: PokemonVariant[] = [];
	variant: PokemonVariant;
	sprites: PokemonSprites;
	types: string[] = [];
	height: number;
	weight: number;
	evolution_chain: EvolutionChain[] = [];

	route: string;

	constructor(init?:Partial<Pokemon>) {
		Object.assign(this, init);
		
		// Route
		this.route = `/pokemon/${this.slug}`;

		// Initalize variants
		if (init.variants) {
			this.variants = [];
			init.variants.forEach(variant => {
				this.variants.push(new PokemonVariant(variant));
			});
		}
		if (init.variant) {
			this.variant = new PokemonVariant(this.variant);
			this.variant.pokemon = this;
		}
	}
}

export class PokemonGeneration {
	id: number;
	name: string;
	region: string;
	constructor(init?:Partial<PokemonGeneration>) {
		Object.assign(this, init);
	}
}

export class PokemonVariant {
	id: number;
	pokemon: Pokemon;
	name: string;
	slug: string;
	is_default: boolean;
	sprites: PokemonSprites;
	height: number;
	weight: number;
	types: string[] = [];
	previous_pokemon: string;
	next_pokemon: string;

	route: string;

	constructor(init?:Partial<PokemonVariant>) {
		Object.assign(this, init);
		
		// Route
		this.route = `/pokemon/${this.slug}`;

		// Init sprites
		this.sprites = new PokemonSprites(init.sprites);
	}
}

export class PokemonSprites {
	default?: string;
	official?: string;
	shiny?: string;
	icon?: string;
	
	constructor(init?:Partial<PokemonSprites>) {
		Object.assign(this, init);
	}
}

export function SetSortByPokemon(select: Select) {
	select.optionGroups[0] = new SelectOptionGroup({
		label: "Sort By",
		options: [
			new SelectOption({
				text: "Number",
				value: "pokemon.order"
			}),
			new SelectOption({
				text: "Name",
				value: "pokemon_variants.name"
			}),
			new SelectOption({
				text: "Weight",
				value: "pokemon_variants.weight"
			}),
			new SelectOption({
				text: "Height",
				value: "pokemon_variants.height"
			}),
		]
	});
	select.value = "pokemon.order";
};