import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { APIResponse } from '@app/models';
import { Expansion, Series } from '@app/pages/expansions/expansion/expansion';
import { Card } from '@app/pages/cards/card/card';
import { CardResults } from '../cards/cards.service';
import { ExpansionFactory, SeriesFactory } from './expansions.factory';
import { CardFactory } from '../cards/cards.factory';

export interface SearchExpansionCardsParams {
	expansion_id: number;
    page: number;
    page_size: number;
    sort_by: string;
    sort_direction: string;
    query: string;
}

export interface SearchExpansionsParams {
	expansion_id: number;
    page: number;
    page_size: number;
    sort_by: string;
    sort_direction: string;
    query: string;
}

export interface ExpansionsResults {
	total_results: number;
	total_pages: number;
	series?: Series[];
}

@Injectable({
    providedIn: 'root'
})

export class ExpansionsService {

    constructor(private http: HttpClient) {}

	// Get all expansions
	private allExpansionsSubject = new BehaviorSubject<ExpansionsResults>(null);
	allExpansionsObservable() {
		this.allExpansionsSubject = new BehaviorSubject<ExpansionsResults>(null);
		return this.allExpansionsSubject.asObservable();
	}
	getExpansions() {
		this.http.get<APIResponse>(environment.api + "expansions").subscribe(res => {
			let series: Series[] = [];
			res.data.forEach(_series => {
				series.push(new Series(_series));
			});
			this.allExpansionsSubject.next({
				total_pages: res.data.total_pages,
				total_results: res.data.total_results,
				series: series,
			});
		});
		
		// FAKE DATA
		// let series: Series[] = new SeriesFactory().createSeries(4, 4);
		// this.allExpansionsSubject.next({
		// 	total_pages: 1,
		// 	total_results: 1,
		// 	series: series
		// });
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
	
}