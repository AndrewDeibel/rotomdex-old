import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { SearchService } from '@app/services/search.service';
import { Card } from '@app/pages/cards/card';
import { Cards } from './cards';
import { CardsService, CardResults } from '../../services/cards.service';
import { ActivatedRoute } from '@angular/router';
import { ItemDisplayType } from '@app/layout/main/items/items-filter/items-filter';
import { Icons } from '@app/models/icons';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth.service';
import "@app/extensions/string.extensions";
import { LoaderService } from '@app/controls';
import { ItemGroup } from '@app/layout/main';
import { SetSortByCards } from './card/card';
import { AppSettings } from '@app/app';

@Component({
    selector: 'mb-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

	@Input() cards: Cards;

	@Output() outputGetCards: EventEmitter<void> = new EventEmitter;

	// Controls
	headerMenu: Menu;
	addToDeckMenuItem: MenuItem;

	// Service
	sortByDirection: string;

    constructor(
		private titleService: Title,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private cardsService: CardsService,
		private searchService: SearchService,
		private loaderService: LoaderService) {

			// Default
			if (!this.cards) {
				this.cards = new Cards({
					isDefault: true,
				});
			}
		}

    ngOnInit(): void {

		SetSortByCards(this.cards.items.filter);
		this.cards.items.filter.sortBy = this.cards.items.filter.selectSortBy.value;

		// Query
		this.route.queryParams.subscribe(params => {
			if (params["search"]) {
				this.cards.items.filter.textboxSearch.value = params["search"];
			}
		});

		// Response quicksearch
        this.searchService.getSearchObservable().subscribe(query => {
			this.cards.items.filter.textboxSearch.value = query;
			this.getCards();
		});
		
		// Response search cards
		if (this.cards.isDefault) {
			this.cardsService.searchCardsObservable().subscribe(res => {
				this.getCardsResponse(res);
			});
		}

		// Response all cards
		this.cardsService.allCardsObservable().subscribe(res => {
			this.getCardsResponse(res);
		});
	}
	
	getCardsResponse(res: CardResults) {
		if (res) {
			this.loaderService.hide();

			this.cards.items.itemGroups = [
				new ItemGroup({
					items: res.cards
				})
			];

			this.cards.items.footer.totalPages = res.total_pages;
			this.cards.totalCards = res.total_results;
			this.cards.items.filter.dark = true;
			this.cards.items.filter.textboxSearch.classes = "color-white";
			this.cards.items.filter.textboxSearch.wrapperClasses = "color-white";
			this.cards.items.filter.textboxSearch.dark = true;
			this.cards.items.filter.selectSortBy.dark = true;
			this.cards.items.filter.selectSortDirection.dark = true;
			this.cards.items.filter.menuDisplayMode.dark = true;
			this.cards.items.header.subtitle = `cards: ${res.total_results}`;
			this.titleService.setTitle(AppSettings.titlePrefix + this.cards.items.header.title);
		}
	}

	getCardMenuAnchorClasses(type: ItemDisplayType) {
		switch (type) {
			case ItemDisplayType.list: {
				return "anchor-top anchor-right";
				break;
			}
			case ItemDisplayType.grid: {
				return "anchor-bottom anchor-left";
				break;
			}
		}
	}

	displayModeChanged() {
		
		// Update menu position
		let classes: string = this.getCardMenuAnchorClasses(this.cards.items.itemDisplayType);

	}

	getItems() {
		// Set to false in cases like Sets where ID Set isn't known until get set is returned
		//if (this.cards.getCardsOnInit) {
			if (this.cards.isDefault) {
				this.getCards();
			}
			else {
				this.outputGetCards.emit();
			}
		//}
	}

    getCards() {
       	this.loaderService.show();

		// Sort by + direction
		if (this.cards.items.filter.selectSortBy.value == "released_at" &&
			this.cards.items.filter.selectSortDirection.value == "desc") {
			this.sortByDirection = "cards";
		}
		else if (this.cards.items.filter.selectSortBy.value == "released_at") {
			this.sortByDirection = "cards_release_date_" + this.cards.items.filter.selectSortDirection.value;
		}
		else {
			this.sortByDirection = "cards_" + this.cards.items.filter.selectSortBy.value + "_" + this.cards.items.filter.selectSortDirection.value;
		}

		if (this.cards.items.filter.textboxSearch.value.length > 0) {
			this.cards.items.header.title = "Search Results";
			this.cardsService.searchCards({
				page: this.cards.items.footer.page,
				page_size: this.cards.items.footer.pageSize,
				query: this.cards.items.filter.query,
				language_id: 1,
				sort_by: this.sortByDirection,
			});
		}
		else {
			this.cards.items.showHeader = false;
			this.cardsService.allCards({
				page: this.cards.items.footer.page,
				page_size: this.cards.items.footer.pageSize,
				sort_by: this.sortByDirection,
				language_id: 1
			});
		}
	}
}