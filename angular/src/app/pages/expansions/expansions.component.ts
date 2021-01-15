import { Component, OnInit } from '@angular/core';
import { Items, } from '@app/page/main';
import { ExpansionsService } from '../../services/expansions.service';
import { SelectOptionGroup, SelectOption } from '@app/controls/select';
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

		// Init
		this.items = new Items();
		this.items.showHeader = false;
		this.items.itemClasses = "width-3 medium-4 small-6";
		this.items.header.title = "Expansions",
		
		this.titleService.setTitle(AppSettings.titlePrefix + 'Expansions');

		this.setupControls();

		// Get data
		this.expansionsService.allExpansionsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();
				this.items.footer.totalPages = res.total_pages;
				this.items.itemGroups = [];
				let count = 0;
				res.series.forEach(_series => {
					this.items.itemGroups.push({
						items: _series.expansions,
						name: _series.name
					});
					count += _series.expansions.length;
				});
				this.items.header.subtitle = `total: ${count}`;
			}
		});
	}

	setupControls() {

		// Search
		this.items.filter.textboxSearch.placeholder = "Search expansions...";

		// Sort by
		SetSortByExpansions(this.items.filter.selectSortBy);

		// Page size
		this.items.footer.pageSize = 100;
	}

	getItems() {
		this.loaderService.show();
		this.expansionsService.getExpansions({
			sort_direction: this.items.filter.selectSortBy.value
		});
	}

}