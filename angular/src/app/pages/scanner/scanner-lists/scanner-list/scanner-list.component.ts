import { Component, OnInit } from '@angular/core';
import { Card } from '@app/pages/cards/card';
import { ScannerService } from '@app/services/scanner.service';
import { Cards } from '@app/pages/cards/cards';
import { MenuItem, Menu } from '@app/controls/menu';
import { Textbox } from '@app/controls/textbox';
import { Button } from '@app/controls/button';
import { Select } from '@app/controls/select';
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { CardsService } from '@app/pages/cards';
import { ItemsHeader, ItemsFooter, ItemsFilter, ItemGroup } from '@app/page/main';
import { Items } from '@app/page/main/items/items';
import { Icons } from '@app/models/icons';
import { AuthenticationService } from '@app/services/auth.service';
import { ScannerList } from './scanner-list';

@AutoUnsubscribe()
@Component({
	selector: 'mb-scanner-list',
	templateUrl: './scanner-list.component.html',
})

export class ScannerListComponent implements OnInit {

	query: string = "";
	page: number = 1;
	pageSize: number = 12;
	sortBy: string = "created_date";
	sortDirection: string = "desc";
	loading: boolean;
	cards: Cards;
	addToDeckMenuItem: MenuItem;

	constructor(
		private authenticationService: AuthenticationService,
		private scannerService: ScannerService,
		private cardsService: CardsService) { }

	ngOnDestroy() { }
	ngOnInit() {

		let addToMenuItem = new MenuItem({
			text: "Add to...",
			icon: Icons.plus,
			click: () => {
				this.addToDeckMenuItem = new MenuItem({
					text: "Deck",
					icon: Icons.deck,
					menu: new Menu({
						maxHeight: "320px"
					})
				});
				
				let addToBinderMenuItem = new MenuItem({
					text: "Binder",
					icon: Icons.binders,
					click: () => {
						
					}
				});
				addToMenuItem.menu = new Menu({
					classes: "anchor-right",
					items: [
						this.addToDeckMenuItem,
						addToBinderMenuItem
					]
				});
			}
		});

		// Initalize cards
		this.cards = new Cards({
			hidePaging: true,
			items: new Items({
				buttonNoResults: new Button({
					text: "Scan Cards",
					icon: Icons.scanner,
					route: "/scanner"
				}),
				header: new ItemsHeader({
					title: "Scanner Results",
					icon: Icons.scanner,
					menu: new Menu({
						items: [
							new MenuItem({
								menu: new Menu({
									classes: "anchor-right",
									items: [
										addToMenuItem,
										new MenuItem({
											text: "Clear Scans",
											icon: Icons.close,
											click: () => {
												this.cards.items.header.menu.clearActive();
												this.cards.items.itemGroups = [];
												this.scannerService.clearScans();
											}
										})
									]
								})
							})
						]
					})
				}),
				filter: new ItemsFilter({
					textboxSearch: new Textbox({
						icon: Icons.search,
						placeholder: "Search Scanner Results...",
						clickIcon: value => {
							this.query = value;
							this.search();
						},
						keydownEnter: value => {
							this.query = value;
							this.search();
						}
					}),
					selectSortBy: new Select({
						change: value => {
							this.sortBy = value;
							// this.getcards();
						}
					}),
					selectSortDirection: new Select({
						change: value => {
							this.sortDirection = value;
							// this.getCards();
						}
					}),
				}),
				footer: new ItemsFooter({
					buttonPrev: new Button({
						click: () => {
							this.page--;
							// this.getCards();
						}
					}),
					buttonNext: new Button({
						click: () => {
							this.page++;
							//this.nextPage();
						}
					}),
					selectPageSize: new Select({
						change: value => {
							this.pageSize = +value;
							// this.getCards();
						}
					}),
					textboxPage: new Textbox({
					}),
				})
			}),
		});

		// Response from get scans request
		this.scannerService.getScansObservable().subscribe(scans => {
			scans.forEach(card => {
				this.buildCardMenu(card);
			});
			this.cards.items.itemGroups = [
				new ItemGroup({
					items: scans
				})
			]
			this.cards.items.header.subtitle = "cards: " + scans.length;
			let price: number = 0;
			this.cards.items.itemGroups[0].items.forEach(card => {
				if (card.price) {
					price += card.price;
				}
			})
			this.cards.items.header.price = price;
		});

		// Request scans
		this.scannerService.getScans();
	}

	buildCardMenu(card: Card) {

		let removeMenuItem = new MenuItem({
			icon: Icons.trash,
			text: "Remove",
			click: (event: Event) => {
				event.stopPropagation();
				this.scannerService.removeCard(card);
				this.cards.items.itemGroups = [
					new ItemGroup({
						items: this.scannerService.scannerList.cards
					})
				];
			}
		});

		let cardMenuItem = new MenuItem({
			menu: new Menu({
				classes: "anchor-bottom anchor-left",
			})
		});
		
		cardMenuItem.menu.items.push(removeMenuItem);
	}

	search() {
		if (this.query.length) {
			let searchCards = this.scannerService.scannerList.cards.filter(card => {
				return card.name.toLowerCase().includes(this.query.toLowerCase());
			});
			this.cards.items.itemGroups = [
				new ItemGroup({
					items: searchCards
				})
			];
		}
		else {
			this.cards.items.itemGroups = [
				new ItemGroup({
					items: this.scannerService.scannerList.cards
				})
			];
		}
	}

}