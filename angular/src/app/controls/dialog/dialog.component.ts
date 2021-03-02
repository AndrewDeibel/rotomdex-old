import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Dialog } from './dialog';

@Component({
	selector: 'mb-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

	@Input() dialog: Dialog;

	constructor(private elRef: ElementRef) { }

	ngOnInit(): void {
		
	}

}