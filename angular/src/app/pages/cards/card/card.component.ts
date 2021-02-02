import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Size } from '@app/models/size';
import { Menu, MenuItem } from '@app/controls/menu';
import { Card, SetSortByCards } from './card';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../../services/card.service';
import { AuthenticationService } from '@app/services/auth.service';
import "@app/extensions/string.extensions";
import { Icons } from '@app/models/icons';
import { Button, LoaderService, Tag } from '@app/controls';
import { CardsService } from '../../../services/cards.service';
import { ItemGroup, Items } from '@app/layout/main';
import { ExpansionService, GetExpansion, GetExpansionCards } from '@app/services/expansion.service';
import { PokemonService } from '@app/pages/pokemons';

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
	buttonTCGPlayer: Button;
	buttonEbay: Button;

    constructor(
		private loaderService: LoaderService,
		private cardService: CardService,
		private cardsService: CardsService,
		private route: ActivatedRoute,
		private expansionService: ExpansionService,
		private pokemonService: PokemonService,
		private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
		
		this.loaderService.show();

		this.relatedCards.footer.pageSize = 12;
		this.expansionCards.footer.pageSize = 12;
		SetSortByCards(this.relatedCards.filter);
		SetSortByCards(this.expansionCards.filter);

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
				if (this.card.expansion.name.toLowerCase().includes("promo")) {
					this.tagRarity = new Tag({
						text: "Promo",
						classes: "promo"
					});
				}
				this.getRelatedCards();
				this.getExpansionCards();

				this.buttonTCGPlayer = new Button({
					text: "Buy on TCGPlayer",
					icon: 'external-link',
				});
				if (this.card.last_prices) {
					this.buttonTCGPlayer.text = `Buy on TCGPlayer <span class="money-tag">$${this.card.last_prices.market_price}</span>`;
				}
				this.buttonEbay = new Button({
					text: "Buy on eBay",
					icon: 'external-link',
				});
				if (this.card.last_prices) {
					this.buttonEbay.text = `Buy on eBay <span class="money-tag">$${this.card.last_prices.market_price}</span>`;
				}
				this.expansionCards.header.title = "More " + this.card.expansion.name + " Cards";
				this.expansionCards.noResults = "No " + this.card.expansion.name + " cards found";
			}
		});

		// Response get related cards
		this.cardsService.allCardsObservable().subscribe(res => {
			this.relatedCards.header.title = "Related Cards";
			this.relatedCards.noResults = "No related cards found";
			this.relatedCards.itemClasses = "width-2 medium-3 small-6";
			this.relatedCards.showFilters = false;
			this.relatedCards.showFooter = false;
			if (res) {
				this.loaderService.hide();
				this.relatedCards.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});

		// Response get expansion cards
		this.expansionService.getExpansionCardsObservable().subscribe(res => {
			this.expansionCards.itemClasses = "width-2 medium-3 small-6";
			this.expansionCards.showFilters = false;
			this.expansionCards.showFooter = false;
			if (res) {
				this.loaderService.hide();
				this.expansionCards.itemGroups = [
					new ItemGroup({
						items: res.cards
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

	getRelatedCards() {
		if (this.card) {
			this.loaderService.show();
			this.pokemonService.getPokemonVariantCards({
				page: this.relatedCards.footer.page,
				page_size: this.relatedCards.footer.pageSize,
				query: this.relatedCards.filter.textboxSearch.value,
				slug: this.card.pokemon.slug,
				sort_by: this.relatedCards.filter.selectSortBy.value,
				sort_direction: this.relatedCards.filter.selectSortDirection.value
			});
		}
	}

	getExpansionCards() {
		if (this.card) {
			this.loaderService.show();
			this.expansionService.getExpansionCards(new GetExpansionCards({
				code: this.card.expansion.code,
				page: this.expansionCards.footer.page,
				page_size: this.expansionCards.footer.pageSize,
				query: this.expansionCards.filter.textboxSearch.value,
				sort_by: this.expansionCards.filter.selectSortBy.value,
				sort_direction: this.expansionCards.filter.selectSortDirection.value
			}));
		}
	}

}