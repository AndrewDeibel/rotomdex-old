import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { Textbox } from './textbox';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Alert } from '../alert';

@Component({
	selector: 'mb-textbox',
	templateUrl: './textbox.component.html',
	styleUrls: ['./textbox.component.scss'],

	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextboxComponent),
			multi: true
		}
	]
})

export class TextboxComponent implements ControlValueAccessor {

	onChange: any = () => {};
	onTouched: any = () => {};
	registerOnChange(fn) { this.onChange = fn }
	registerOnTouched(fn) { this.onTouched = fn }
	writeValue(_value) { this.value = _value; }
	previousValue: string;
	get value() { return this.textbox.value; }
	set value(_value) {
		this.textbox.value = _value;
		this.onChange(_value);
		this.onTouched();
	}

	@Input() textbox: Textbox;
	@Input() alert: Alert;
	@Output() keydownEnter: EventEmitter<string> = new EventEmitter();
	@Output() clickIcon: EventEmitter<string> = new EventEmitter();
	@Output() clickClear: EventEmitter<string> = new EventEmitter();

	constructor() {}

	_keydownEnter() {
		this.keydownEnter.emit(this.value);
		if (this.textbox.keydownEnter) {
			this.textbox.keydownEnter(this.value);
		}
	}

	_clickIcon() {
		this.clickIcon.emit(this.value);
		if (this.textbox.clickIcon) {
			this.textbox.clickIcon(this.value);
		}
	}

	_clickClear() {
		this.textbox.clear();
		this.clickClear.emit(this.value);
		if (this.textbox.clickClear) {
			this.textbox.clickClear();
		}
	}
	
	_setPreviousValue() {
		this.value = this.previousValue;
	}

	_validate() {
		this.textbox.valid = true;

		// If max, check it
		if (this.textbox.max) {
			let num = Number(this.value);

			// Not a number
			if (isNaN(num)) {
				this.textbox.valid = false;
			}

			// No large
			if (num > this.textbox.max) {
				this.textbox.valid = false;
			}
		}

		// If min, check it
		if (this.textbox.min) {
			let num = Number(this.value);

			// Not a number
			if (isNaN(num)) {
				this.textbox.valid = false;
			}

			// No large
			if (num < this.textbox.min) {
				this.textbox.valid = false;
			}
		}

		return this.textbox.valid;
	}

	_change() {

		// If valid
		if (this._validate()) {
			if (this.textbox.change) {
				this.textbox.change(this.value);
			}
		}
		else {
			this._setPreviousValue();
		}

		// Set previous value after change
		this.previousValue = this.value;
	}
	
	_colorPickerChange(value: string) {
		this.textbox.value = value;
		this._change();
	}

}
