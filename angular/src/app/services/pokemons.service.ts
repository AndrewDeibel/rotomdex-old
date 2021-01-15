import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "@app/models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Pokemon, PokemonVariant } from "../pages/pokemons/pokemon/pokemon";

// Get pokemons interfaces
export interface GetPokemons {
    page: number;
    page_size: number;
    sort_by: string;
	sort_direction: string;
	query: string;
}
export interface ResPokemons {
	total_results: number;
	total_pages: number;
	pokemons?: Pokemon[];
}

// Get pokemon variation interfaces
export interface GetPokemonVariants {
	page: number;
    page_size: number;
    sort_by: string;
	sort_direction: string;
	query: string;
}
export interface ResPokemonVariants {
	total_results: number;
	total_pages: number;
	pokemon_variants?: PokemonVariant[];
}

@Injectable({
    providedIn: 'root'
})

export class PokemonsService {

	constructor(private http: HttpClient) {}

	// Get all pokemons
	private getPokemonsSubject = new BehaviorSubject<ResPokemons>(null);
	getPokemonsObservable() {
		this.getPokemonsSubject = new BehaviorSubject<ResPokemons>(null);
		return this.getPokemonsSubject.asObservable();
	}
	getPokemons(params: GetPokemons) {
		this.http.get<APIResponse>(`${environment.api}pokemon?page=${params.page}`).subscribe(res => {
			let pokemons: Pokemon[] = [];
			res.data.forEach(pokemon => {
				pokemons.push(new Pokemon(pokemon));
			});
			this.getPokemonsSubject.next({
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
				pokemons: pokemons,
			});
		});
	}

	// Get all pokemons
	private getPokemonVariantsSubject = new BehaviorSubject<ResPokemonVariants>(null);
	getPokemonVariantsObservable() {
		this.getPokemonVariantsSubject = new BehaviorSubject<ResPokemonVariants>(null);
		return this.getPokemonVariantsSubject.asObservable();
	}
	getPokemonVariants(params: GetPokemonVariants) {
		this.http.get<APIResponse>(`${environment.api}pokemon-variants?page=${params.page}&page_size=${params.page_size}&sort_by=${params.sort_by}&sort_direction=${params.sort_direction}`).subscribe(res => {
			let pokemon_variants: PokemonVariant[] = [];
			res.data.forEach(pokemon_variant => {
				pokemon_variants.push(new PokemonVariant(pokemon_variant));
			});
			this.getPokemonVariantsSubject.next({
				total_pages: res.meta.last_page,
				total_results: res.meta.total,
				pokemon_variants: pokemon_variants,
			});
		});
	}
}