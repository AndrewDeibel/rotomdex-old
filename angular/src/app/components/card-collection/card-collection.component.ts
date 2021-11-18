import { Component, Input, OnInit } from '@angular/core';
import { GUID } from '@app/helpers';
import { Condition, Icons, PrintVersion } from '@app/models';
import { Button } from '../../controls/button';
import { Checkbox } from '../../controls/checkbox';
import { Empty } from '../../controls/empty';
import { CardCollectionItem } from './card-collection-item';

@Component({
	selector: 'mb-card-collection',
	templateUrl: './card-collection.component.html',
	styleUrls: ['./card-collection.component.scss'],
})
export class CardCollectionComponent implements OnInit {
	@Input() slug: string;
	collection: CardCollectionItem[] = [];
	buttonAdd: Button;
	checkboxWishList: Checkbox;
	buttonViewAll: Button;
	totalValue: number;
	empty: Empty;

	constructor() {}

	ngOnInit(): void {
		this.setupControls();
	}

	setupControls() {
		this.empty = new Empty({
			text: 'This card is not in your collection',
			icon: Icons.box,
			button: new Button({
				text: 'Add to Collection',
				icon: Icons.plus,
				click: () => {
					this.addItem();
				},
			}),
		});

		this.addItem();

		// Button add
		this.buttonAdd = new Button({
			text: 'Add to Collection',
			icon: Icons.plus,
			classes: 'secondary',
			click: () => {
				this.addItem();
			},
		});

		// Button view all
		this.buttonViewAll = new Button({
			text: 'View Collection',
			icon: Icons.externalLink,
		});

		// Checkbox wish list
		this.checkboxWishList = new Checkbox({
			text: 'Wishlist',
		});

		this.calculateTotal();
	}

	addItem() {
		this.collection.push(
			new CardCollectionItem({
				condition: Condition.Mint,
				printVersion: PrintVersion.Unlimited,
				quantity: 1,
				id: GUID(),
				price: 10,
			})
		);
		this.calculateTotal();
	}

	deleteItem(itemToDelete) {
		this.collection = this.collection.filter((item) => {
			return item.id !== itemToDelete.id;
		});
		this.calculateTotal();
	}

	calculateTotal() {
		this.totalValue = this.collection
			.filter((item) => {
				return item.price;
			})
			.reduce((sum, item) => sum + item.price, 0);
	}
}