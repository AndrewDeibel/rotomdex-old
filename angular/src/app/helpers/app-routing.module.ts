import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Pages
import {
	CardComponent,
	CardsComponent,
	HomeComponent,
	ExpansionsComponent,
	ExpansionComponent,
	AuthComponent,
	ScannerComponent,
	ScannerListsComponent,
	ScannerListComponent,
	PokemonsComponent,
	PokemonComponent,
} from '../pages';

const routes: Routes = [

	// Home
	{
		path: '',
		component: HomeComponent
	},

	// Cards
	{
		path: 'cards',
		//canActivate: [AuthGuard],
		component: CardsComponent,
	},
	{
		path: 'card/:slug',
		component: CardComponent,
	},

	// Scanner
	{
		path: 'scanner',
		component: ScannerComponent
	},
	{
		path: 'scanner/lists',
		component: ScannerListsComponent
	},
	{
		path: 'scanner/lists/:id',
		component: ScannerListComponent
	},

	// Auth
	{
		path: 'signin',
		component: AuthComponent
	},
	{
		path: 'signup',
		component: AuthComponent
	},

	// Expansions
	{
		path: 'expansions',
		component: ExpansionsComponent
	},
	{
		path: 'expansions/:code',
		component: ExpansionComponent
	},

	// Pokemon
	{
		path: 'pokemon',
		component: PokemonsComponent
	},
	{
		path: 'pokemon/:slug',
		component: PokemonComponent
	},

	// otherwise redirect to home
	{
		path: '**',
		redirectTo: ''
	}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }