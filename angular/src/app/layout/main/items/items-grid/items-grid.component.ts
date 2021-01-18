import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonVariant } from '@app/pages';
import { Card } from '@app/pages/cards/card';
import { Expansion } from '@app/pages/expansions/expansion/expansion';

@Component({
    selector: 'mb-items-grid',
	templateUrl: './items-grid.component.html',
	styleUrls: ['./items-grid.component.scss']
})

export class ItemsGridComponent implements OnInit {

	@Input() items: any[] = [];
	@Input() itemClasses: string;

	constructor() {}

    ngOnInit() {}

	isCard(item) { return item instanceof Card }
	isPokemon(item) { return item instanceof Pokemon }
	isExpansion(item) { return item instanceof Expansion }
	isPokemonVariant(item) { return item instanceof PokemonVariant }
	
}