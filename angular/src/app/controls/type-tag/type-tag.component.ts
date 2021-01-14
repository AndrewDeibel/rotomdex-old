import { Component, Input, OnInit } from '@angular/core';
import { TypeTag } from './type-tag';

@Component({
	selector: 'mb-type-tag',
	templateUrl: 'type-tag.component.html',
	styleUrls: ['./type-tag.component.scss']
})

export class TypeTagComponent implements OnInit {

	@Input() type: string;

	constructor() { }

	ngOnInit() { }
}