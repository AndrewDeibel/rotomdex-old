import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Size } from '@app/models/size';
import { Menu, MenuItem } from '@app/controls/menu';
import { Card } from './card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../services/card.service';
import { AuthenticationService } from '@app/services/auth.service';
import "@app/extensions/string.extensions";
import { Icons } from '@app/models/icons';
import { LoaderService, Tag } from '@app/controls';
import { CardsService } from '../../../services/cards.service';
import { ItemGroup, Items } from '@app/page/main';
import { ExpansionService } from '@app/services/expansion.service';

@Component({
    selector: 'mb-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	encapsulation: ViewEncapsulation.None
})

export class CardComponent implements OnInit {

	@Input() card: Card;
	relatedCards: Items = new Items();
	expansionCards: Items = new Items();
	cardImageHover: boolean = false;
	tagRarity: Tag;

    constructor(
		private loaderService: LoaderService,
		private cardService: CardService,
		private cardsService: CardsService,
		private route: ActivatedRoute,
		private expansionService: ExpansionService,
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
				this.getRelatedCards();
				this.getExpansionCards();
			}
		});

		// Response get related cards
		this.cardsService.allCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();

				this.relatedCards.header.title = "Related";
				this.relatedCards.showFilters = false;
				this.relatedCards.showFooter = false;
				this.relatedCards.itemClasses = "width-2 medium-3 small-4";
				this.relatedCards.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});

		// Response get expansion cards
		this.expansionService.expansionObservable().subscribe(expansion => {
			if (expansion) {
				this.loaderService.hide();

				this.expansionCards.header.title = "More " + expansion.name;
				this.expansionCards.showFilters = false;
				this.expansionCards.showFooter = false;
				this.expansionCards.itemClasses = "width-2 medium-3 small-4";
				// Exclude the card we are viewing
				expansion.cards = expansion.cards.filter(card => {
					return card.id !== this.card.id;
				});
				this.expansionCards.itemGroups = [
					new ItemGroup({
						items: expansion.cards
					})
				];
			}
		});

		this.handleRoute();
	}
	
	handleRoute() {
		// ID param
		this.route.params.subscribe(params => {
			this.loaderService.show();
			// Request card
			this.cardService.getCard(params["slug"]);
		});
	}

	getExpansionCards() {
		if (this.card) {
			this.loaderService.show();
			this.expansionService.getExpansion(this.card.expansion.code);
		}
	}

	getRelatedCards() {
		this.loaderService.show();
		this.cardsService.allCards({
			page: 1,
			page_size: 6,
			language_id: 1,
			sort_by: "name"
		});
	}

}