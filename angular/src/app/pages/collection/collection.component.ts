import { AuthenticationService } from './../../services/auth.service';
import { CardCollectionService } from './../../components/card-collection/card-collection.service';
import { Items } from './../../layout/main/items/items';
import { LoaderService } from './../../controls/loader/loader.service';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '@app/models';
import { Menu, MenuItem } from '@app/controls/menu';
import { ProgressBar } from './../../controls/progress-bar/progress-bar';
import { Component, OnInit } from '@angular/core';
import { Symbols } from '@app/models';
import { GetCards } from '@app/services/cards.service';
import { ItemGroup } from '@app/layout';

@Component({
	selector: 'collection',
	templateUrl: 'collection.component.html',
	styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
	progressBar: ProgressBar;
	symbolCards: Symbols;
	symbolPokemon: Symbols;
	menuSidebar: Menu;
	items: Items = new Items();

	constructor(
		private loaderService: LoaderService,
		private cardCollectionService: CardCollectionService,
		private authenticationService: AuthenticationService
	) {}

	showDashboard = () => {
		return window.location.pathname === '/collection/dashboard';
	};
	showAddGroup = () => {
		return window.location.pathname === '/collection/add';
	};
	showAll = () => {
		return window.location.pathname === '/collection';
	};

	ngOnInit() {
		this.setupSubscriptions();
		this.setupControls();
		this.getCollectionCards();
	}

	setupSubscriptions() {
		this.cardCollectionService.getUserCardsObservable().subscribe((res) => {
			if (res) {
				this.loaderService.clearItemLoading('getCollectionCards');
				this.items.footer.totalPages = res.total_pages;
				if (res.cards && res.cards.length) {
					this.items.itemGroups = [
						new ItemGroup({
							items: res.cards,
						}),
					];
				} else {
					this.items.itemGroups = [];
				}
			}
		});
	}

	setupControls() {
		this.progressBar = new ProgressBar({
			total: 80,
			value: 20,
		});
		this.symbolCards = Symbols.cards;
		this.symbolPokemon = Symbols.pokeball;

		this.menuSidebar = new Menu({
			round: false,
			items: [
				new MenuItem({
					text: 'Dashboard',
					icon: Icons.dashboard,
					route: '/collection/dashboard',
					exactMatch: true,
				}),
				new MenuItem({
					text: 'All Cards',
					symbol: Symbols.cards,
					route: '/collection',
					exactMatch: true,
				}),
				new MenuItem({
					text: 'Example Binder 1',
					icon: Icons.archive,
					route: '/collection/123',
					exactMatch: true,
				}),
				new MenuItem({
					text: 'Add Group',
					icon: Icons.plus,
					route: '/collection/add',
					exactMatch: true,
				}),
			],
		});
	}

	getCollectionCards() {
		this.loaderService.addItemLoading('getCollectionCards');
		this.cardCollectionService.getUserCards(
			new GetCards({
				page: this.items.footer.page,
				page_size: this.items.footer.pageSize,
				query: this.items.filter.textboxSearch.value,
				sort_by: this.items.filter.selectSortBy.value,
				sort_direction: this.items.filter.selectSortDirection.value,
				user_id: this.authenticationService.currentUserValue.id,
			})
		);
	}
}
