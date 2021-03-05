import { Component, Input, OnInit } from '@angular/core';
import { GUID } from '@app/helpers';
import { Condition, Icons, PrintVersion } from '@app/models';
import { Button } from '../button';
import { Empty } from '../empty';
import { CardCollectionItem } from './card-collection-item';

@Component({
	selector: 'mb-card-collection',
	templateUrl: './card-collection.component.html',
	styleUrls: ['./card-collection.component.scss']
})

export class CardCollectionComponent implements OnInit {

	@Input() slug: string;
	collection: CardCollectionItem[] = [];
	buttonAdd: Button;
	buttonViewAll: Button;
	totalValue: number;
	empty: Empty;

	constructor() { }

	ngOnInit(): void {
		this.setupControls();
	}

	setupControls() {

		this.empty = new Empty({
			text: "No collection items found",
			icon: Icons.box
		});
		
		this.addItem();

		// Button add
		this.buttonAdd = new Button({
			text: "Card",
			icon: Icons.plus,
			classes: "secondary",
			click: () => {
				this.addItem();
			}
		});

		// Button view all
		this.buttonViewAll = new Button({
			text: "View Collection",
			icon: Icons.externalLink,
		});

		this.calculateTotal();
	}

	addItem() {
		this.collection.push(new CardCollectionItem({
			condition: Condition.Mint,
			printVersion: PrintVersion.Unlimited,
			quantity: 1,
			id: GUID(),
			price: 10,
		}));
		this.calculateTotal();
	}
	
	deleteItem(itemToDelete) {
		this.collection = this.collection.filter(item => {
			return item.id !== itemToDelete.id;
		});
		this.calculateTotal();
	}

	calculateTotal() {
		this.totalValue = this.collection
			.filter(item => { return item.price })
			.reduce((sum, item) => sum + item.price, 0);
	}

}