import { AddUserCard, CardCollectionService } from './card-collection.service';
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
	@Input() card_id: number;
	collection: CardCollectionItem[] = [];
	buttonAdd: Button;
	checkboxWishList: Checkbox;
	buttonViewAll: Button;
	empty: Empty;

	constructor(private cardCollectionService: CardCollectionService) {}

	ngOnInit(): void {
		this.setupControls();
		this.setupSubscriptions();
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
	}

	setupSubscriptions() {
		this.cardCollectionService
			.addUserCardObservable()
			.subscribe((addedCard) => {
				if (addedCard) {
					this.collection.push(addedCard);
				}
			});
	}

	addItem(
		userCard: CardCollectionItem = new CardCollectionItem({
			card_id: this.card_id,
		})
	) {
		this.cardCollectionService.addUserCard(userCard);
	}

	deleteItem(itemToDelete) {
		// this.collection = this.collection.filter((item) => {
		// 	return item.id !== itemToDelete.id;
		// });
	}

	updateItem(userCard: CardCollectionItem) {}
}
