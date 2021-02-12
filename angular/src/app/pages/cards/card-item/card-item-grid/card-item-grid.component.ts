// Angular
import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../../card/card';

@Component({
	selector: 'mb-card-item-grid',
	templateUrl: 'card-item-grid.component.html',
	styleUrls: ['./card-item-grid.component.scss']
})

export class CardItemGridComponent implements OnInit {

	@Input() card: Card;
	imageLoading: boolean = true;

	constructor() { }

	ngOnInit() { }

	onLoad() {
		this.imageLoading = false;
	}
}