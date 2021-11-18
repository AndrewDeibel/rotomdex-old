export class Select {
	label: string;
	value: string;
	values: string[] = [];
	options: SelectOption[] = [];
	optionGroups: SelectOptionGroup[] = [];
	classes: string;
	dark: boolean;
	multiple: boolean;
	advancedSelect: boolean = false;
	placeholder: string = 'Select option';
	open: boolean;
	change: (value: string) => void;
	_change: (value: string) => void;

	getSelectedOptions = () => this.options.filter((option) => option.selected);
	getUnselectedOptions = () =>
		this.options.filter((option) => !option.selected);

	public constructor(init?: Partial<Select>) {
		Object.assign(this, init);
	}
}
export class SelectOption {
	text: string;
	value: string;
	selected: boolean;
	icon: string;

	public constructor(init?: Partial<SelectOption>) {
		Object.assign(this, init);
	}
}
export class SelectOptionGroup {
	label: string;
	options: SelectOption[] = [];

	public constructor(init?: Partial<SelectOptionGroup>) {
		Object.assign(this, init);
	}
}
