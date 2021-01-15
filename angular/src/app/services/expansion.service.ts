import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "@app/models";
import { Expansion } from "@app/pages";
import { CardFactory } from "@app/pages/cards/cards.factory";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { CardResults } from "./cards.service";

export interface SearchExpansionCardsParams {
	expansion_id: number;
    page: number;
    page_size: number;
    sort_by: string;
    sort_direction: string;
    query: string;
}

@Injectable({
    providedIn: 'root'
})

export class ExpansionService {

	constructor(private http: HttpClient) {}

	// Get expansion
    private expansionSubject = new BehaviorSubject<Expansion>(null);
	expansionObservable() {
		this.expansionSubject = new BehaviorSubject<Expansion>(null);
		return this.expansionSubject.asObservable()
	}
	getExpansion(code: string) {
		this.http.get<APIResponse>(environment.api + "expansion/" + code).subscribe(res => {
			this.expansionSubject.next(new Expansion(res.data))
		});
	}

	// Search expansions cards
    private searchExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
    searchExpansionsCardsObservable() {
		this.searchExpansionCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.searchExpansionCardsSubject.asObservable()
	}
    searchExpansionCards(params: SearchExpansionCardsParams) {
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