import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpansionService, GetExpansion, GetExpansionCards } from '@app/services/expansion.service';
import { Expansion, SetSortByExpansion } from './expansion';
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
	templateUrl: './expansion.component.html'
})

export class ExpansionComponent implements OnInit {

	@ViewChild(CardsComponent) cardsComponent: CardsComponent;
	items: Items = new Items();

    constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private datePipe: DatePipe,
        private expansionService: ExpansionService,
        private route: ActivatedRoute) { }

	ngOnDestroy() { }
    ngOnInit() { 
		this.subscribeExpansion();
		this.setupControls();
		this.handleParams();
		SetSortByExpansion(this.items.filter);
	}

	subscribeExpansion() {
		this.expansionService.getExpansionObservable().subscribe(expansion => {
			if (expansion) {
				this.loaderService.hide();
				this.titleService.setTitle(AppSettings.titlePrefix + expansion.name);
				this.items.itemGroups.push(new ItemGroup({
					items: expansion.cards
				}));
				this.items.header.symbol = expansion.symbol;
				this.items.header.title = expansion.name;
				this.items.header.subtitle = `${expansion.total_cards} Cards - ${this.datePipe.transform(expansion.release_date)}`;
				this.items.footer.pageSize = expansion.total_cards;
				this.items.header.menu = new Menu({
					round: true,
					classes: "border",
					dark: true,
					items: [
						new MenuItem({
							icon: Icons.bars
						})
					]
				});
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
		this.loaderService.show();
		this.expansionService.getExpansion(new GetExpansion({
			code: code,
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			query: this.items.filter.query,
			sort_by: this.items.filter.sortBy,
			sort_direction: this.items.filter.sortDirection
		}));
		this.expansionService.getExpansionCards(new GetExpansionCards({
			code: code,
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			query: this.items.filter.query,
			sort_by: this.items.filter.sortBy,
			sort_direction: this.items.filter.sortDirection
		}));
	}

}