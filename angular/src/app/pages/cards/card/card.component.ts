import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Size } from '@app/models/size';
import { Menu, MenuItem } from '@app/controls/menu';
import { Card } from './card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from './card.service';
import { AuthenticationService } from '@app/pages/auth/auth.service';
import "@app/extensions/string.extensions";
import { Icons } from '@app/models/icons';
import { LoaderService, Tag } from '@app/controls';
import { CardsService } from '../cards.service';
import { Cards } from '../cards';
import { ItemGroup, Items } from '@app/page/main';

@Component({
    selector: 'mb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CardComponent implements OnInit {

	@Input() card: Card;
	relatedCards: Cards = new Cards();
	expansionCards: Cards = new Cards();
	cardImageHover: boolean = false;
	tagRarity: Tag;

    constructor(
		private loaderService: LoaderService,
		private cardService: CardService,
		private cardsService: CardsService,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
		
		this.loaderService.show();

		// Response get card
		this.cardService.cardObservable().subscribe(card => {
			if (card) {
				this.loaderService.hide();
				this.card = card;
				if (this.card.rarity) {
					this.tagRarity = new Tag({
						text: this.card.rarity,
						classes: this.card.rarity.toLowerCase().replace(' ', '-')
					});
				}
			}
		});

		// Response get related cards
		this.cardsService.allCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();

				this.relatedCards.items.header.title = "Related";
				this.relatedCards.items.showFilters = false;
				this.relatedCards.items.showFooter = false;
				this.relatedCards.items.itemClasses = "width-2 medium-3 small-4";
				this.relatedCards.items.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];

				this.expansionCards.items.header.title = "More Darkness Ablaze";
				this.expansionCards.items.showFilters = false;
				this.expansionCards.items.showFooter = false;
				this.expansionCards.items.itemClasses = "width-2 medium-3 small-4";
				this.expansionCards.items.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});
		this.handleRoute();
		this.getCards();
	}
	
	handleRoute() {
		// ID param
		this.route.params.subscribe(params => {
			this.loaderService.show();
			// Request card
			this.cardService.getCard(params["slug"]);
		});
	}

	getCards() {
		this.loaderService.show();
		this.cardsService.allCards({
			page: 1,
			page_size: 6,
			language_id: 1,
			sort_by: "name"
		});
	}

}