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
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByCards } from './card/card';
import { AppSettings } from '@app/app';

@Component({
    selector: 'mb-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

	@Output() outputGetCards: EventEmitter<void> = new EventEmitter;

	// Controls
	items: Items;
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
		}

    ngOnInit(): void {

		this.setupControls();

		// Query
		this.route.queryParams.subscribe(params => {
			if (params["search"]) {
				this.items.filter.textboxSearch.value = params["search"];
			}
		});

		// Response quicksearch
        this.searchService.getSearchObservable().subscribe(query => {
			this.items.filter.textboxSearch.value = query;
			this.getCards();
		});

		// Response all cards
		this.cardsService.allCardsObservable().subscribe(res => {
			this.getCardsResponse(res);
		});
	}

	setupControls() {
		this.items = new Items();
		SetSortByCards(this.items.filter);
		this.items.filter.sortBy = this.items.filter.selectSortBy.value;
	}
	
	getCardsResponse(res: CardResults) {
		if (res) {
			this.loaderService.hide();

			this.items.itemGroups = [
				new ItemGroup({
					items: res.cards
				})
			];

			this.items.footer.totalPages = res.total_pages;
			this.items.header.subtitle = `cards: ${res.total_results}`;
			this.titleService.setTitle(AppSettings.titlePrefix + this.items.header.title);
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
		let classes: string = this.getCardMenuAnchorClasses(this.items.itemDisplayType);

	}

    getCards() {
       	this.loaderService.show();

		// Sort by + direction
		if (this.items.filter.selectSortBy.value == "released_at" &&
			this.items.filter.selectSortDirection.value == "desc") {
			this.sortByDirection = "cards";
		}
		else if (this.items.filter.selectSortBy.value == "released_at") {
			this.sortByDirection = "cards_release_date_" + this.items.filter.selectSortDirection.value;
		}
		else {
			this.sortByDirection = "cards_" + this.items.filter.selectSortBy.value + "_" + this.items.filter.selectSortDirection.value;
		}

		if (this.items.filter.textboxSearch.value.length > 0) {
			this.items.header.title = "Search Results";
			this.cardsService.searchCards({
				page: this.items.footer.page,
				page_size: this.items.footer.pageSize,
				query: this.items.filter.query,
				language_id: 1,
				sort_by: this.sortByDirection,
			});
		}
		else {
			this.items.showHeader = false;
			this.cardsService.allCards({
				page: this.items.footer.page,
				page_size: this.items.footer.pageSize,
				sort_by: this.sortByDirection,
				language_id: 1
			});
		}
	}
}