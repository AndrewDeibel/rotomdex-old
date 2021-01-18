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
import { ItemGroup, Items } from '@app/layout/main';
import { ExpansionService, GetExpansion } from '@app/services/expansion.service';
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
			this.relatedCards.header.title = "Related Cards";
			this.relatedCards.filter.textboxSearch.placeholder = "Search related cards...";
			this.relatedCards.noResults = "No related cards found";
			this.relatedCards.showFilters = false;
			if (res) {
				this.loaderService.hide();

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
		this.expansionService.getExpansionObservable().subscribe(expansion => {
			if (expansion) {
				this.loaderService.hide();

				this.expansionCards.header.title = "More " + expansion.name;
				this.expansionCards.showFilters = false;
				this.expansionCards.showFooter = false;
				this.expansionCards.itemClasses = "width-2 medium-3 small-4";
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
			this.expansionService.getExpansion(new GetExpansion({
				code: this.card.expansion.code,
				page: this.expansionCards.footer.page,
				page_size: this.expansionCards.footer.pageSize,
				query: this.expansionCards.filter.query,
				sort_by: this.expansionCards.filter.sortBy,
				sort_direction: this.expansionCards.filter.sortDirection
			}));
		}
	}

	getRelatedCards() {
		// if (this.card) {
		// 	this.loaderService.show();
		// 	this.pokemonService.getPokemonVariantCards({
		// 		page: this.relatedCards.footer.page,
		// 		page_size: this.relatedCards.footer.pageSize,
		// 		query: this.relatedCards.filter.query,
		// 		slug: this.card.pokemon.slug,
		// 		sort_by: this.relatedCards.filter.sortBy,
		// 		sort_direction: this.relatedCards.filter.sortDirection
		// 	});
		// }
	}

}