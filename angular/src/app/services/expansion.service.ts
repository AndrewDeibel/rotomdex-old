import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIGetPaged, APIResponse } from "@app/models";
import { Card, Expansion } from "@app/pages";
import { BehaviorSubject } from "rxjs";
import { CardResults } from "./cards.service";

export class GetExpansion extends APIGetPaged {
	code: string;
	constructor(init?:Partial<GetExpansion>) {
		super();
		Object.assign(this, init);
	}
}

export class GetExpansionCards extends APIGetPaged {
	code: string;
	constructor(init?:Partial<GetExpansion>) {
		super();
		Object.assign(this, init);
	}
}

@Injectable({
    providedIn: 'root'
})

export class ExpansionService {

	constructor(
		private http: HttpClient) {}

	// Get expansion
    private getExpansionSubject = new BehaviorSubject<Expansion>(null);
	getExpansionObservable() {
		this.getExpansionSubject = new BehaviorSubject<Expansion>(null);
		return this.getExpansionSubject.asObservable()
	}
	getExpansion(params: GetExpansion) {
		var url = params.buildUrl("expansion/" + params.code);
		this.http.get<APIResponse>(url).subscribe(res => {
			var expansion = new Expansion(res.data);
			this.getExpansionSubject.next(expansion);
		});
	}

	// Expansions cards
    private getExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
    getExpansionCardsObservable() {
		this.getExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.getExpansionCardsSubject.asObservable()
	}
    getExpansionCards(params: GetExpansionCards) {
		var url = params.buildUrl("expansion/" + params.code + "/cards");
        this.http.get<APIResponse>(url).subscribe(res => {
			let cards: Card[] = [];
			res.data.forEach(card => {
				cards.push(new Card(card));
			});
			this.getExpansionCardsSubject.next({
				cards: cards,
				total_pages: res.meta.last_page,
				total_results: res.meta.total
			});
		});
	}

}