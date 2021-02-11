import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu, MenuItem } from '@app/controls/menu';
import { SearchService } from '@app/services/search.service';
import { CardsService, CardResults, GetCards as GetCards } from '../../services/cards.service';
import { ActivatedRoute } from '@angular/router';
import { ItemDisplayType } from '@app/layout/main/items/items-filter/items-filter';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth.service';
import { LoaderService } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByCards } from './card/card';
import { AppSettings } from '@app/app';
import "@app/extensions/string.extensions";

@Component({
    selector: 'mb-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

	items: Items = new Items();

    constructor(
		private titleService: Title,
		private cardsService: CardsService,
		private loaderService: LoaderService) { }

    ngOnInit() {
		this.setupSubscriptions();
		this.setupControls();
	}

	setupSubscriptions() {
		this.cardsService.allCardsObservable().subscribe(res => {
			this.getCardsResponse(res);
		});
	}
	
	getCardsResponse(res: CardResults) {
		if (res) {
			this.loaderService.hide();
			this.items.footer.totalPages = res.total_pages;
			this.items.itemGroups = [
				new ItemGroup({
					items: res.cards
				})
			];
		}
	}

	setupControls() {
		this.titleService.setTitle(AppSettings.titlePrefix + 'All Cards');
		this.items.showHeader = false;
		this.items.filter.textboxSearch.placeholder = "Search cards...";
		this.items.filter.selectSortDirection.value = "desc";
		SetSortByCards(this.items.filter);
	}

    getCards() {
       	this.loaderService.show();
		this.items.showHeader = false;
		this.cardsService.getCards(new GetCards({
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			query: this.items.filter.textboxSearch.value,
			sort_by: this.items.filter.selectSortBy.value,
			sort_direction: this.items.filter.selectSortDirection.value
		}));
	}
}