import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@app/controls';
import { ItemGroup, Items } from '@app/page/main';
import { Card, Cards } from '@app/pages/cards';
import { SetSortByPokemon, PokemonVariant } from './pokemon';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
	selector: 'mb-pokemon',
	templateUrl: 'pokemon.component.html',
	styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent implements OnInit {

	@Input() pokemonVariant: PokemonVariant;
	items: Items;
	slug: string;

	constructor(
		private pokemonService: PokemonService,
		private loaderService: LoaderService,
		private route: ActivatedRoute,
		private router: Router,
	) { }

	ngOnInit() {

		// Init
		this.items = new Items();
		this.items.showHeader = false;
		SetSortByPokemon(this.items.filter.selectSortBy);
		this.items.filter.sortBy = this.items.filter.selectSortBy.value;
		this.items.footer.pageSize = 24;
		this.items.footer.selectPageSize.value = this.items.footer.pageSize.toString();

		this.loaderService.show();

		// Response get pokemon
		this.pokemonService.getPokemonVariantObservable().subscribe(pokemonVariant => {
			if (pokemonVariant) {
				this.loaderService.hide();
				this.pokemonVariant = pokemonVariant;
				this.getCards();
			}
		});

		// Response get pokemon cards
		this.pokemonService.getPokemonVariantCardsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();
				this.items.footer.totalPages = res.total_pages;
				this.items.filter.textboxSearch.placeholder = `Search ${this.pokemonVariant.name} cards...`;
				this.items.itemGroups = [
					new ItemGroup({
						items: res.cards
					})
				];
			}
		});

		// Request get pokemon
		this.route.params.subscribe(params => {
			this.slug = params["slug"];
			this.pokemonService.getPokemonVariant(this.slug);
		});

	}

	getCards() {
		this.loaderService.show();
		this.pokemonService.getPokemonVariantCards({
			page: this.items.footer.page,
			slug: this.slug,
			page_size: this.items.footer.pageSize,
			sort_by: this.items.filter.sortBy,
			sort_direction: this.items.filter.sortDirection,
			query: this.items.filter.query
		});
	}
	displayModeChanged() {

	}
}