import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppSettings } from '@app/app';
import { LoaderService, SelectOption, SelectOptionGroup } from '@app/controls';
import { ItemGroup, Items } from '@app/layout/main';
import { SetSortByPokemon, PokemonVariant } from './pokemon/pokemon';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
	selector: 'mb-pokemons',
	templateUrl: 'pokemons.component.html'
})

export class PokemonsComponent implements OnInit {

	items: Items;
	
	constructor(
		private loaderService: LoaderService,
		private titleService: Title,
		private pokemonService: PokemonsService) { }

	ngOnInit() { 

		// Init
		this.items = new Items();
		SetSortByPokemon(this.items.filter.selectSortBy);
		this.items.showHeader = false;
		this.items.itemClasses = "width-3 medium-6 small-12";
		this.items.filter.textboxSearch.placeholder = "Search Pokémon...";
		this.items.filter.sortBy = this.items.filter.selectSortBy.value;
		this.items.footer.pageSize = 24;
		this.items.footer.selectPageSize.value = this.items.footer.pageSize.toString();
		
		this.titleService.setTitle(AppSettings.titlePrefix + 'Pokemon');

		// Get data
		this.pokemonService.getPokemonVariantsObservable().subscribe(res => {
			if (res) {
				this.loaderService.hide();
				this.items.footer.totalPages = res.total_pages;
				this.items.filter.dark = true;
				this.items.filter.textboxSearch.classes = "color-white";
				this.items.filter.textboxSearch.wrapperClasses = "color-white";
				this.items.filter.textboxSearch.dark = true;
				this.items.filter.selectSortBy.dark = true;
				this.items.filter.selectSortDirection.dark = true;
				this.items.filter.menuDisplayMode.dark = true;
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

	getItems() {
		this.loaderService.show();
		this.pokemonService.getPokemonVariants({
			page: this.items.footer.page,
			page_size: this.items.footer.pageSize,
			sort_by: this.items.filter.sortBy,
			sort_direction: this.items.filter.sortDirection,
			query: this.items.filter.query
		});
	}
}