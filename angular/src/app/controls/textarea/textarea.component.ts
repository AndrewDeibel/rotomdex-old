import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Textarea } from './textarea';

@Component({
	selector: 'mb-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],

	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent implements ControlValueAccessor {
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
		return this.textarea.value;
	}
	set value(_value) {
		this.textarea.value = _value;
		this.onChange(_value);
		this.onTouched();
	}

	@Input() textarea: Textarea;
	@Output() outputKeydownEnter: EventEmitter<string> = new EventEmitter();
	@Output() clickIcon: EventEmitter<string> = new EventEmitter();

	keydownEnter() {
		this.outputKeydownEnter.emit(this.value);
		if (this.textarea.keydownEnter) {
			this.textarea.keydownEnter(this.value);
		}
	}

	change() {
		if (this.textarea.change) {
			this.textarea.change(this.value);
		}
	}

	constructor() {}
}
