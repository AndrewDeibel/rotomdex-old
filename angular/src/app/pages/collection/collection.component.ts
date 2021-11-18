import { Icons } from '@app/models';
import { Menu, MenuItem } from '@app/controls/menu';
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
	menuSidebar: Menu;
	constructor() {}

	ngOnInit() {
		this.progressBar = new ProgressBar({
			total: 80,
			value: 20,
		});
		this.symbolCards = Symbols.cards;
		this.symbolPokemon = Symbols.pokeball;

		this.menuSidebar = new Menu({
			items: [
				new MenuItem({
					text: 'Dashboard',
					icon: Icons.dashboard,
					route: '/collection/dashboard',
				}),
				new MenuItem({
					text: 'All Cards',
					symbol: Symbols.cards,
					route: '/collection',
				}),
				new MenuItem({
					text: 'Example Binder 1',
					icon: Icons.archive,
					route: '/collection/123',
				}),
				new MenuItem({
					text: 'Add Group',
					icon: Icons.plus,
					route: '/collection/add',
				}),
			],
		});
	}
}
