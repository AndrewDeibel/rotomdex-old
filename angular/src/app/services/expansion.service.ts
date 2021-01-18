import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIGetPaged, APIResponse } from "@app/models";
import { Expansion } from "@app/pages";
import { CardFactory } from "@app/services/factory/card.factory";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CardResults } from "./cards.service";

export class GetExpansion extends APIGetPaged {
	code: string;

	constructor(init?:Partial<GetExpansion>) {
		super();
		Object.assign(this, init);
	}
}

export interface GetExpansionCards extends APIGetPaged {
	expansion_id: number;
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

		// Don't cache paged data
		this.http.get<APIResponse>(url).subscribe(res => {
			var expansion = new Expansion(res.data);
			this.getExpansionSubject.next(expansion);
		});
	}

	// Search expansions cards
    private searchExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
    searchExpansionsCardsObservable() {
		this.searchExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.searchExpansionCardsSubject.asObservable()
	}
    searchExpansionCards(params: GetExpansionCards) {
        // this.http.post<APIResponse>(environment.api + "expansion/cards", params).subscribe(res => {
		// 	let cards: Card[] = [];
		// 	res.data.cards.forEach(card => {
		// 		cards.push(new Card(card));
		// 	});
		// 	let cardResuls: CardResults = {
		// 		cards: cards,
		// 		total_pages: res.data.total_pages,
		// 		total_results: res.data.total_results
		// 	}
		// 	this.searchExpansionCardsSubject.next(cardResuls);
		// });

		// FAKE DATA
		let cards = new CardFactory().createCards(10);
		this.searchExpansionCardsSubject.next({
			cards: cards,
			total_pages: 1,
			total_results: 10
		});
	}

}