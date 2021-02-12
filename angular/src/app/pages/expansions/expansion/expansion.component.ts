import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpansionService, GetExpansion, GetExpansionCards } from '@app/services/expansion.service';
import { Expansion, SetPageSize, SetSortByExpansion } from './expansion';
import { Cards } from '@app/pages/cards/cards';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { CardGroup, CardsComponent, SetSortByCards } from '@app/pages/cards';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { LoaderService, Menu, MenuItem } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { AppSettings } from '@app/app';
import { Icons } from '@app/models';

@AutoUnsubscribe()
@Component({
    selector: 'mb-expansion',
	templateUrl: './expansion.component.html',
	styleUrls: ['./expansion.component.scss']
})

export class ExpansionComponent implements OnInit {

	@ViewChild(CardsComponent) cardsComponent: CardsComponent;
	items: Items = new Items();
	code: string;

    constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private datePipe: DatePipe,
        private expansionService: ExpansionService,
        private route: ActivatedRoute) { }

	ngOnDestroy() { }
    ngOnInit() { 
		this.subscribeExpansion();
		this.subscribeExpansionCards();
		this.setupControls();
		this.handleParams();
		SetSortByExpansion(this.items.filter);
		SetPageSize(this.items.footer);
	}

	subscribeExpansion() {
		this.expansionService.getExpansionObservable().subscribe(expansion => {
			if (expansion) {
				this.titleService.setTitle(AppSettings.titlePrefix + expansion.name);
				this.items.header.symbol = expansion.logo;
				if (expansion.series.name === expansion.name) {
					this.items.header.title = expansion.name;
				}
				else {
					this.items.header.title = expansion.series.name + " - " + expansion.name;
				}
				this.items.header.subtitle = `${expansion.total_cards} Cards - ${this.datePipe.transform(expansion.release_date)}`;
			}
		});
	}

	subscribeExpansionCards() {
		this.expansionService.getExpansionCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();
				this.items.itemGroups = [];
				this.items.itemGroups.push(new ItemGroup({
					items: res.cards
				}));
				this.items.footer.totalPages = res.total_pages;
			}
		});
	}

	setupControls() {
		SetSortByCards(this.items.filter);
	}

	handleParams() {
		this.route.params.subscribe(params => {
			this.getExpansion(params["code"]);
		});
	}

	getExpansion(code) {
		this.code = code;
		this.loaderService.show();
		this.expansionService.getExpansion(new GetExpansion({
			code: code,
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			query: this.items.filter.textboxSearch.value,
			sort_by: this.items.filter.selectSortBy.value,
			sort_direction: this.items.filter.selectSortDirection.value
		}));
		this.getExpansionCards();
	}
	
	getExpansionCards() {
		this.loaderService.show();
		this.expansionService.getExpansionCards(new GetExpansionCards({
			code: this.code,
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			query: this.items.filter.textboxSearch.value,
			sort_by: this.items.filter.selectSortBy.value,
			sort_direction: this.items.filter.selectSortDirection.value
		}));
	}

}