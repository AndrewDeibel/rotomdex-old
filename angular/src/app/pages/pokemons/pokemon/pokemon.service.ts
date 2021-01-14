import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "@app/models";
import { Card } from "@app/pages/cards";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Pokemon, PokemonVariant } from "./pokemon";

// Get pokemon interfaces
export interface GetPokemonVariantCards {
	page: number;
	page_size: number;
	sort_by: string;
	sort_direction: string;
	query: string;
	slug: string;
}
export interface ResPokemonVariantCards {
	total_results: number;
	total_pages: number;
	cards: Card[];
}

@Injectable({
    providedIn: 'root'
})

export class PokemonService {

	constructor(private http: HttpClient) {}

	// Get pokemon
	private getPokemonSubject = new BehaviorSubject<Pokemon>(null);
	getPokemonObservable() {
		this.getPokemonSubject = new BehaviorSubject<Pokemon>(null);
		return this.getPokemonSubject.asObservable();
	}
	getPokemon(slug: string) {
		this.http.get<APIResponse>(`${environment.api}pokemon/${slug}`).subscribe(res => {
			this.getPokemonSubject.next(new Pokemon(res.data));
		});
	}

	// Get pokemon variant
	private getPokemonVariantSubject = new BehaviorSubject<PokemonVariant>(null);
	getPokemonVariantObservable() {
		this.getPokemonVariantSubject = new BehaviorSubject<PokemonVariant>(null);
		return this.getPokemonVariantSubject.asObservable();
	}
	getPokemonVariant(slug: string) {
		this.http.get<APIResponse>(`${environment.api}pokemon-variants/${slug}`).subscribe(res => {
			this.getPokemonVariantSubject.next(new PokemonVariant(res.data));
		});
	}

	// Get pokemon variant cards
	private getPokemonVariantCardsSubject = new BehaviorSubject<ResPokemonVariantCards>(null);
	getPokemonVariantCardsObservable() {
		this.getPokemonVariantCardsSubject = new BehaviorSubject<ResPokemonVariantCards>(null);
		return this.getPokemonVariantCardsSubject.asObservable();
	}
	getPokemonVariantCards(params: GetPokemonVariantCards) {
		this.http.get<APIResponse>(`${environment.api}pokemon-variants/${params.slug}/cards?page=${params.page}&page_size=${params.page_size}`).subscribe(res => {
			let cards = [];
			res.data.forEach(card => {
				cards.push(new Card(card));
			});
			this.getPokemonVariantCardsSubject.next({
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
				cards: cards
			});
		});
	}

}