import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@app/../environments/environment';
import { APIResponse } from '@app/models';
import { Card } from '@app/pages/cards/card/card';
import { CardFactory } from './cards.factory';

export interface GetAllCardsParams {
    page: number;
    page_size: number;
    sort_by: string;
    language_id: number;
}

export interface SearchCardsParams {
    page: number;
    page_size: number;
    language_id: number;
    sort_by: string;
    query: string;
}

export interface CardResults {
	total_value?: number;
	total_results: number;
	total_pages: number;
	cards?: Card[];
}

@Injectable({ providedIn: 'root' })
export class CardsService {

	constructor(private http: HttpClient) {}

	// Search
    private searchCardsSubject = new BehaviorSubject<CardResults>(null);
    searchCardsObservable() {
		this.searchCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.searchCardsSubject.asObservable();
	}
    searchCards(params: SearchCardsParams) {
        this.http.post<APIResponse>(environment.api + "cards/quicksearch", params).subscribe(res => {
			let cards: Card[] = [];
			res.data.cards.forEach(card => {
				cards.push(new Card(card));
			});
			let results: CardResults = {
				cards: cards,
				total_pages: res.data.total_pages,
				total_results: res.data.total_results
			}
			this.searchCardsSubject.next(results);
        });
	}
	
	// Auto complete
	private autoCompleteCardsSubject = new BehaviorSubject<Card[]>([]);
	autoCompleteCardsObservable() {
		this.autoCompleteCardsSubject = new BehaviorSubject<Card[]>([]);
		return this.autoCompleteCardsSubject.asObservable();
	}
    autoCompleteCards(params: SearchCardsParams) {
        this.http.post<APIResponse>(environment.api + "cards/quicksearch", params).subscribe(res => {
			let cards: Card[] = [];
			res.data.cards.forEach(card => {
				cards.push(new Card(card));
			});
			this.autoCompleteCardsSubject.next(cards);
		});
	}

	// Get all
	private allCardsSubject = new BehaviorSubject<CardResults>(null);
	allCardsObservable() {
		this.allCardsSubject = new BehaviorSubject<CardResults>(null);
		return this.allCardsSubject.asObservable();
	}
    allCards(params: GetAllCardsParams) {
		this.http.get<APIResponse>(`${environment.api}cards?page=${params.page}&page_size=${params.page_size}`).subscribe(res => {
			let cards = [];
			res.data.forEach(card => {
				cards.push(new Card(card));
			});
			this.allCardsSubject.next({
				cards: cards,
				total_pages: res.meta.last_page,
				total_results: res.meta.total
			});
		});
	}

}