import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Icons, Size } from '@app/models';

import { Select } from './select';
import { SelectOption } from '@app/controls';
import { Textbox } from './../textbox/textbox';

@Component({
	selector: 'mb-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],

	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent implements ControlValueAccessor {
	constructor() {}

	onChange: any = () => {};
	onTouched: any = () => {};
	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouched = fn;
	}
	writeValue(_value) {
		this.value = _value;
	}
	get value() {
		return this.select.value;
	}
	set value(_value) {
		this.select.value = _value;
		this.select.options.forEach((option) => {
			option.selected = option.value === _value;
		});
		this.select.optionGroups.forEach((group) => {
			group.options.forEach((option) => {
				option.selected = option.value === _value;
			});
		});
		this.onChange(_value);
		this.onTouched();
	}

	@Input() select: Select;

	textboxSearch: Textbox = new Textbox({
		placeholder: 'Search...',
		type: 'search',
		icon: Icons.search,
		size: Size.small,
		keyup: (_value) => {
			this.select.searchValue = _value;
		},
	});

	click() {
		if (this.select.multiple || !this.select.value.length)
			this.select.open = true;
	}

	clickOutside() {
		this.select.open = false;
	}

	change() {
		if (this.select.change) this.select.change(this.select.value);
	}

	selectOption(option: SelectOption) {
		option.selected = true;
	}

	unselectOption(option: SelectOption) {
		option.selected = false;
	}
}
