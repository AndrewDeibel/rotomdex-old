import { Size } from './../../models/size';
import { Icons } from '@app/models/icons';

export class Textbox {
	value: string = '';
	label: string;
	type: string = 'text';
	valid: boolean;
	min: number;
	max: number;
	integer: boolean;
	icon?: Icons;
	placeholder?: string;
	width: number;
	classes: string;
	wrapperClasses: string;
	disabled: boolean;
	clearable: boolean;
	colorPicker: boolean;
	autoComplete: boolean;
	dark: boolean;
	size: Size;

	keyup: (value: string) => void;
	keydown: (value: string) => void;
	keydownEnter: (value: string) => void;
	_keydownEnter: (value: string) => void;
	clickIcon: (value: string) => void;
	_clickIcon: (value: string) => void;
	change: (value: string) => void;
	_change: (value: string) => void;

	clickClear: () => void;
	clear = () => {
		this.value = '';
	};

	public constructor(init?: Partial<Textbox>) {
		Object.assign(this, init);
	}
}
