// Angular
import { Component, Input, OnInit } from '@angular/core';

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
	
	isCard(item: any) {
		return item instanceof Card;
	}

	isExpansion(item: any) {
		return item instanceof Expansion;
	}
}