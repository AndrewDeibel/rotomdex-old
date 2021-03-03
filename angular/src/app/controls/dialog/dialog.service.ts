import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Dialog } from "./dialog";

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	dialog: BehaviorSubject<Dialog> = new BehaviorSubject(null);
	constructor() {}

	setDialog(dialog: Dialog) {
		this.dialog.next(dialog);
	}

}