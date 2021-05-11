import { Component, Input, OnInit } from '@angular/core';
import { ProgressBar } from '@app/controls/progress-bar/progress-bar';
import { ItemDisplayType } from '../items-filter';
import { ItemGroup } from './item-group';

@Component({
	selector: 'mb-items-groups',
	templateUrl: 'items-groups.component.html',
	styleUrls: ['./items-groups.component.scss']
})

export class ItemsGroupsComponent implements OnInit {

	@Input() groups: ItemGroup[];
	@Input() itemDisplayType: ItemDisplayType;
	@Input() itemClasses: string;
	progressBar: ProgressBar;

	constructor() { }

	ngOnInit() {
	}

	getProgressBar(group) {
		this.progressBar = new ProgressBar({
			value: group.progress,
			total: group.total_cards
		});
	}

	showGrid(group: ItemGroup) {
		return group.items.length
			&& this.itemDisplayType == ItemDisplayType.grid;
	}

	showList(group: ItemGroup) {
		return group.items.length
			&& this.itemDisplayType == ItemDisplayType.list;
	}

	showEmpty(group: ItemGroup) {
		return group.items.length == 0;
	}

}