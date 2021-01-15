import { Component, OnInit } from '@angular/core';
import { Items, } from '@app/page/main';
import { ExpansionsService } from '../../services/expansions.service';
import { Title } from '@angular/platform-browser';
import { LoaderService } from '@app/controls';
import { AppSettings } from '@app/app';
import { SetSortByExpansions } from './expansion/expansion';

@Component({
	selector: 'mb-expansions',
	templateUrl: './expansions.component.html'
})

export class ExpansionsComponent implements OnInit {

	items: Items;
	
	constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private expansionsService: ExpansionsService) { }

	ngOnInit() {

		this.titleService.setTitle(AppSettings.titlePrefix + 'Expansions');
		this.setupControls();
		this.subAllExpansions();
	}

	subAllExpansions() {
		this.expansionsService.allExpansionsObservable().subscribe(series => {
			if (series) {
				this.loaderService.hide();
				this.items.itemGroups = [];
				let expansionCount = 0;
				series.forEach(_series => {
					this.items.itemGroups.push({
						items: _series.expansions,
						name: _series.name
					});
					expansionCount += _series.expansions.length;
				});
				this.items.header.subtitle = `total: ${expansionCount}`;
			}
		});
	}

	setupControls() {

		// Items
		this.items = new Items();
		this.items.showHeader = false;
		this.items.showFooter = false;
		this.items.itemClasses = "width-3 medium-4 small-6";
		this.items.header.title = "Expansions",
		this.items.filter.textboxSearch.placeholder = "Search expansions...";

		// Sort by
		SetSortByExpansions(this.items.filter);
		this.items.filter.sortDirection = "desc";
		this.items.filter.selectSortDirection.value = this.items.filter.sortDirection;

		// Page size
		this.items.footer.pageSize = 100;
	}

	getItems() {
		this.loaderService.show();
		this.expansionsService.getExpansions({
			query: this.items.filter.query,
			sort_by: this.items.filter.sortBy,
			sort_direction: this.items.filter.sortDirection
		});
	}

}