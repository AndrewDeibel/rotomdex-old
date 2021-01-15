import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpansionService } from '@app/services/expansion.service';
import { Expansion } from './expansion';
import { Cards } from '@app/pages/cards/cards';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { CardGroup, CardsComponent } from '@app/pages/cards';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { LoaderService } from '@app/controls';
import { ItemGroup } from '@app/page/main';
import { AppSettings } from '@app/app';

@AutoUnsubscribe()
@Component({
    selector: 'mb-expansion',
	templateUrl: './expansion.component.html'
})

export class ExpansionComponent implements OnInit {

	@ViewChild(CardsComponent) cardsComponent: CardsComponent;

	cards: Cards;

    constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private datePipe: DatePipe,
        private expansionService: ExpansionService,
        private route: ActivatedRoute) { }

	ngOnDestroy() { }
    ngOnInit() { 
		this.buildControls();
		this.subExpansion();
		this.handleParams();
	}

	handleParams() {
		this.route.params.subscribe(params => {
			this.getExpansion(params["code"]);
		});
	}
	
	getExpansion(code) {
		this.loaderService.show();
		this.expansionService.getExpansion(code);
	}

	subExpansion() {
		this.expansionService.expansionObservable().subscribe(expansion => {
			if (expansion) {
				this.loaderService.hide();
				this.titleService.setTitle(AppSettings.titlePrefix + expansion.name);
				this.cards.items.itemGroups.push(new ItemGroup({
					items: expansion.cards
				}));
				this.cards.items.header.symbol = expansion.symbol;
				this.cards.items.header.title = expansion.name;
				this.cards.items.header.subtitle = `${expansion.total_cards} Cards - ${this.datePipe.transform(expansion.release_date)}`;
				this.cards.items.footer.pageSize = expansion.total_cards;
			}
		});
	}

	buildControls() {
		// Cards
		// TODO: change to items component? No need to reuse cards component...
		this.cards = new Cards({ getCardsOnInit: false });
		this.cards.items.filter.sortBy = "price";
		this.cards.items.filter.selectSortBy.value = "price";
		this.cards.items.showFooter = false;
	}

}