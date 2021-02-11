import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { LoaderService, SelectOption, SelectOptionGroup } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByPokemon, PokemonVariant } from './pokemon/pokemon';
import { GetPokemonVariants, PokemonsService } from '../../services/pokemons.service';

@Component({
	selector: 'mb-pokemons',
	templateUrl: 'pokemons.component.html'
})

export class PokemonsComponent implements OnInit {

	items: Items = new Items();
	
	constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private pokemonService: PokemonsService) { }

	ngOnInit() {
		this.setupControls();

		// Get data
		this.pokemonService.getPokemonVariantsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();
				this.items.footer.totalPages = res.total_pages;
				var group = new ItemGroup();
				res.pokemon_variants.forEach(pokemon_variant => {
					group.items.push(new PokemonVariant(pokemon_variant));
				})
				this.items.itemGroups = [
					group
				];
			}
		})
	}

	setupControls() {
		SetSortByPokemon(this.items.filter.selectSortBy);
		this.titleService.setTitle(AppSettings.titlePrefix + 'Pokemon');
		this.items.showHeader = false;
		this.items.itemClasses = "width-3 medium-6 small-12";
		this.items.filter.textboxSearch.placeholder = "Search Pokémon...";
		this.items.footer.pageSize = 24;
		this.items.footer.selectPageSize.value = this.items.footer.pageSize.toString();
	}

	getPokemonVariants() {
		this.loaderService.show();
		this.pokemonService.getPokemonVariants(new GetPokemonVariants({
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			sort_by: this.items.filter.selectSortBy.value,
			sort_direction: this.items.filter.selectSortDirection.value,
			query: this.items.filter.textboxSearch.value
		}));
	}
}