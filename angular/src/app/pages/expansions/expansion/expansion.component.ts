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

@AutoUnsubscribe()
@Component({
    selector: 'mb-expansion',
	templateUrl: './expansion.component.html'
})

export class ExpansionComponent implements OnInit {

	@ViewChild(CardsComponent) cardsComponent: CardsComponent;

	code: string;
	expansion: Expansion;
	cards: Cards;

    constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private datePipe: DatePipe,
        private expansionService: ExpansionService,
        private route: ActivatedRoute) { }

	ngOnDestroy() { }
    ngOnInit(): void {

		// Init cards
		this.cards = new Cards({ getCardsOnInit: false });
		this.cards.items.filter.sortBy = "price";
		this.cards.items.filter.selectSortBy.value = "price";
		this.cards.items.showFooter = false;

		// Response from expansion request
		this.expansionService.expansionObservable().subscribe(expansion => {
			if (expansion) {
				this.loaderService.hide();
				this.expansion = expansion;
				this.cards.items.itemGroups.push(new ItemGroup({
					items: this.expansion.cards
				}));
				this.cards.items.header.symbol = expansion.symbol;
				this.cards.items.header.title = expansion.name;
				this.cards.items.header.subtitle = `${expansion.total_cards} Cards - ${this.datePipe.transform(expansion.release_date)}`;
				this.cards.items.footer.pageSize = expansion.total_cards;
			}
		});
		
		// Get id from route
		this.route.params.subscribe(params => {
			this.code = params["code"];

			// Request expansion
			this.loaderService.show();
			this.expansionService.getExpansion(this.code);

		});
	}

}