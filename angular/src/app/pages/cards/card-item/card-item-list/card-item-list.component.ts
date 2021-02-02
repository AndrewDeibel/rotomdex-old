import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../card/card';

@Component({
	selector: 'mb-card-item-list',
	templateUrl: 'card-item-list.component.html',
	styleUrls: ['./card-item-list.component.scss']
})

export class CardItemListComponent implements OnInit {

	@Input() card: Card;
	imageLoading: boolean = true;

	constructor() { }

	ngOnInit() { }

	getCardNumber(): string {
		// IS number
		if (!isNaN(+this.card.number)) {
			return `#${this.card.number}`;
		}
		// NOT number
		else {
			return this.card.number;
		}
	}

	onLoad() {
		this.imageLoading = false;
	}
}