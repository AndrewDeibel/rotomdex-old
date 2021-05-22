import { ProgressBar } from './../../controls/progress-bar/progress-bar';
import { Component, OnInit } from '@angular/core';
import { Symbols } from '@app/models';

@Component({
	selector: 'collection',
	templateUrl: 'collection.component.html',
	styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
	progressBar: ProgressBar;
	symbolCards: Symbols;
	symbolPokemon: Symbols;
	constructor() {}

	ngOnInit() {
		this.progressBar = new ProgressBar({
			total: 80,
			value: 20,
		});
		this.symbolCards = Symbols.cards;
		this.symbolPokemon = Symbols.pokeball;
	}
}
