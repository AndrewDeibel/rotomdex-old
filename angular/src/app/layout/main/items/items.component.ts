// Angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Items } from './items';
import { ItemDisplayType } from './items-filter';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';

@Component({
	selector: 'mb-items',
	templateUrl: 'items.component.html',
	styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

	@Input() items: Items;
	@Output() outputGetItems: EventEmitter<void> = new EventEmitter;
	@Output() outputDisplayModeChanged: EventEmitter<ItemDisplayType> = new EventEmitter;

	constructor(
		private titleService: Title,
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		
		if (this.items.header.title) {
			this.titleService.setTitle(AppSettings.titlePrefix + this.items.header.title);
		}
		
		// Get query params
		this.route.queryParams.subscribe(params => {

			if (params["search"]) {
				this.items.filter.textboxSearch.value = params["search"];
			}

			if (params["sortby"]) {
				this.items.filter.selectSortBy.value = params["sortby"];
			}

			if (params["sortdirection"]) {
				this.items.filter.selectSortDirection.value = params["sortdirection"];
			}

			if (params["displaymode"]) {
				this.items.filter.setDisplayMode(ItemDisplayType[params["displaymode"]]);
			}

			if (params["pagesize"]) {
				this.items.footer.pageSize = +params["pagesize"];
			}

			if (params["page"]) {
				this.items.footer.page = +params["page"];
			}

		});

		this.outputGetItems.emit();
	}

	updateQueryParams() {
		this.router.navigate([], {
			queryParams: {
				pagesize: this.items.footer.pageSize,
				page: this.items.footer.page,
				search: this.items.filter.textboxSearch.value,
				sortby: this.items.filter.selectSortBy.value,
				sortdirection: this.items.filter.selectSortDirection.value,
				displaymode: this.items.filter.displayMode.toLowerCase()
			}
		});
	}

	showEmpty() {
		return this.items.itemGroups.length == 0;
	}

	showGroups() {
		return this.items.itemGroups.length > 0;
	}

	displayModeChanged(itemDisplayType: ItemDisplayType) {
		this.items.itemDisplayType = itemDisplayType;
		this.items.filter.displayMode = this.items.itemDisplayType;
		this.outputDisplayModeChanged.emit(itemDisplayType);
		this.updateQueryParams();
	}

	_outputGetItems() {
		this.outputGetItems.emit();
		this.updateQueryParams();
	}
}