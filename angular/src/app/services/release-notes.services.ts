import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface ReleaseNote {
	title: string;
	version: string;
	content: string;
	date: Date;
}

@Injectable({ providedIn: 'root' })
export class ReleaseNotesServices {

	private _releaseNotes: ReleaseNote[] = [
		{
			title: "First alpha release",
			content: "Welcome to RotomDex! This first release is focused on expansion, card, and pokemon data. Because this is the initial version please expect to find some issues.",
			version: "0.9.7",
			date: new Date("3/2/2021"),
		}
	];

	constructor(private http: HttpClient) {}

	// Get release notes
	private allReleaseNotesSubject = new BehaviorSubject<ReleaseNote[]>([]);
	getReleaseNotesObservable() {
		this.allReleaseNotesSubject = new BehaviorSubject<ReleaseNote[]>([]);
		return this.allReleaseNotesSubject.asObservable();
	}
    getReleaseNotes() {
		this.allReleaseNotesSubject.next(this._releaseNotes);
	}

}