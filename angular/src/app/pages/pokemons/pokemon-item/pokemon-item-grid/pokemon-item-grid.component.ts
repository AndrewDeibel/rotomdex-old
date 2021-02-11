import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, PokemonVariant } from '../../pokemon/pokemon';

@Component({
	selector: 'mb-pokemon-item-grid',
	templateUrl: 'pokemon-item-grid.component.html',
	styleUrls: ['./pokemon-item-grid.component.scss']
})

export class PokemonItemGridComponent implements OnInit {

	@Input() pokemonVariant: PokemonVariant;
	@Input() size: string;
	
	constructor() {}

	ngOnInit() {}

	getSprite(pokemon_variant: PokemonVariant): string {
		if (pokemon_variant.sprites.default)
			return pokemon_variant.sprites.default;
		else
			return pokemon_variant.sprites.official;
	}
}