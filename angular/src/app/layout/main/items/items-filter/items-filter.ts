import { Textbox  } from '@app/controls/textbox';
import { Select, SelectOptionGroup, SelectOption } from '@app/controls/select';
import { Menu, MenuItem } from '@app/controls/menu';
import { Icons } from '@app/models/icons';

export enum ItemDisplayType {
	grid = "Grid",
	list = "List",
}

export class ItemsFilter {

	// Values
	query: string = "";
	sortBy: string = "";
	sortDirection: string = "asc";
	displayMode: ItemDisplayType = ItemDisplayType.grid;
	showGridDisplayMode: boolean = true;
	showListDisplayMode: boolean = true;
	showSimpleDisplayMode: boolean = false;
	showVisualDisplayMode: boolean = false;
	showSort: boolean = true;
	dark: boolean;

	// Controls
	textboxSearch: Textbox;
	selectSortBy: Select;
	selectSortDirection: Select;
	menuDisplayMode: Menu;
	menuItemGridDisplayMode: MenuItem = new MenuItem();
	menuItemListDisplayMode: MenuItem = new MenuItem();
	menuItemSimpleDisplayMode: MenuItem = new MenuItem();
	menuItemVisualDisplayMode: MenuItem = new MenuItem();

    constructor(init?:Partial<ItemsFilter>) {
		Object.assign(this, init);

		// Search
		this.textboxSearch = new Textbox({
			value: this.query,
			icon: Icons.search,
			placeholder: "Search items...",
			clearable: true,
			autoComplete: false
		});

		// Sort by
		this.selectSortBy = new Select({
			classes: "square-right",
			value: this.sortBy,
			optionGroups: [
				new SelectOptionGroup({
					label: "Sort By",
					options: [
						new SelectOption({
							text: "Name",
							value: "name"
						}),
						new SelectOption({
							text: "Price",
							value: "price"
						}),
						new SelectOption({
							text: "Release Date",
							value: "released_at"
						})
					]
				})
			]
		});

		// Sort direction
		this.selectSortDirection = new Select({
			classes: "square-left",
			value: this.sortDirection,
			optionGroups: [
				new SelectOptionGroup({
					label: "Sort Direction",
					options: [
						new SelectOption({
							text: "Asc",
							value: "asc"
						}),
						new SelectOption({
							text: "Desc",
							value: "desc"
						})
					]
				})
			]
		});
	}


	setDisplayMode(type: ItemDisplayType) {
		this.menuItemGridDisplayMode.active = false;
		this.menuItemListDisplayMode.active = false;
		this.menuItemSimpleDisplayMode.active = false;
		this.menuItemVisualDisplayMode.active = false;
		switch (type) {
			case ItemDisplayType.grid: {
				this.menuItemGridDisplayMode.active = true;
				break;
			}
			case ItemDisplayType.list: {
				this.menuItemListDisplayMode.active = true;
				break;
			}
		}
	}
}