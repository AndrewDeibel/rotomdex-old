// Angular
import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, PokemonVariant } from '@app/pages';

import { Card } from '@app/pages/cards/card';
import { Expansion } from '@app/pages/expansions/expansion';

@Component({
    selector: 'mb-items-list',
	templateUrl: './items-list.component.html',
	styleUrls: ['./items-list.component.scss']
})

export class ItemsListComponent implements OnInit {

	@Input() items: any[];

    constructor() {}

    ngOnInit() {}
	
	isCard(item) { return item instanceof Card; }
	isPokemon(item) { return item instanceof Pokemon; }
	isExpansion(item) { return item instanceof Expansion; }
	isPokemonVariant(item) { return item instanceof PokemonVariant; }
}