// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { ColorPickerModule } from 'ngx-color-picker';

// Thirdpart
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { WebcamModule } from 'ngx-webcam';
import { InlineSVGModule } from 'ng-inline-svg';
import { AngularFittextModule } from 'angular-fittext';

// App
import { AppRoutingModule } from './helpers/app-routing.module';
import { AppComponent } from './app.component';

// Controls
import {
	AlertComponent,
	ButtonComponent,
	CheckboxComponent,
	EditorComponent,
	FormComponent,
	FormGroupComponent,
	FormControlComponent,
	LoaderComponent,
	MenuComponent,
	NotificationsComponent,
	SelectComponent,
	TagComponent,
	TextareaComponent,
	TextboxComponent,
	ToggleComponent,
	ProgressBarComponent,
	TypeTagComponent,
} from './controls';

// Pages
import {
	AuthComponent,
	SignInComponent,
	SignUpComponent,
	CardsComponent,
	CardComponent,
	CardItemGridComponent,
	HomeComponent,
	ScannerComponent,
	ScannerListsComponent,
	ScannerListComponent,
	ExpansionsComponent,
	ExpansionComponent,
	ExpansionItemGridComponent,
	ExpansionItemListComponent,
	PokemonsComponent,
	PokemonItemGridComponent,
	PokemonComponent
} from './pages';

// Page
import {
	FooterComponent,
	HeaderComponent,
	ProfileComponent,
	SearchComponent,
	ItemsComponent,
	ItemsHeaderComponent,
	ItemsFilterComponent,
	ItemsFooterComponent,
	ItemsGridComponent,
	ItemsListComponent,
	ItemsGroupsComponent,
} from './page';

// Helpers
import {
	ErrorIntercept,
	JwtInterceptor,
	ClickOutsideDirective
} from './helpers';

// Icons
import {
	faSearch,
	faList,
	faArchive,
	faBookSpells,
	faChartLine,
	faUser,
	faCrown,
	faLightSwitchOn,
	faCog,
	faBox,
	faFolders,
	faUsers,
	faEllipsisV,
	faArrowUp,
	faArrowDown,
	faHorizontalRule,
	faTrash,
	faPalette,
	faCrosshairs,
	faHistory,
	faExternalLink,
	faDollarSign,
	faAngleLeft,
	faAngleRight,
	faArrowLeft,
	faArrowRight,
	faCaretUp,
	faCaretRight,
	faCaretDown,
	faCaretLeft,
	faSignIn,
	faPlus,
	faSignOut,
	faUserPlus,
	faTh,
	faVideo,
	faCamera,
	faBringFront,
	faSync,
	faPlay,
	faStop,
	faPause,
	faDonate,
	faTachometer,
	faCheck,
	faInfo,
	faExclamationTriangle,
	faTimesOctagon,
	faTimes,
	faLayerGroup,
	faRectanglePortrait,
	faAlbumCollection,
	faShoppingCart,
	faGavel,
	faBalanceScale,
	faSave,
	faLineColumns,
	faShieldAlt,
	faSwords,
	faAlignLeft,
	faEye,
	faRepeat,
	faUndo,
	faArrowToTop,
	faArrowToBottom,
	faRandom,
	faHandHoldingMedical,
	faTombstoneAlt,
	faLevelUp,
	faLevelDown,
	faSortSizeUp,
	faSortSizeDownAlt,
	faSortAlt,
	faDiceThree,
	faDice,
	faExclamationCircle,
	faThumbsUp,
	faExclamation,
	faCoin,
	faForward,
	faHourglassStart,
	faHourglassEnd,
	faKeyboard,
	faDiceD4,
	faDiceD6,
	faDiceD10,
	faDiceD12,
	faDiceD20,
	faDiceD8,
	faClone,
	faFlaskPotion,
	faFolder,
	faEdit,
	faAngleUp,
	faAngleDown,
	faMinus,
	faCompress,
	faExpand,
	faLock,
	faLockOpen,
	faImage,
	faPawClaws,
	faTrophy,
	faBolt,
	faMagic,
	faMountains,
	faEclipse,
	faHoodCloak,
	faDragon,
	faTools,
	faToolbox,
	faHeart,
	faHeartbeat,
	faThunderstorm,
	faNewspaper,
	faSparkles,
	faQuestion
} from '@fortawesome/pro-duotone-svg-icons';
import { CardItemListComponent } from './pages/cards/card-item/card-item-list/card-item-list.component';


@NgModule({
	declarations: [
		AppComponent,

		// Page
		// ====================
		HeaderComponent,
		SearchComponent,
		ProfileComponent,
		FooterComponent,
		ItemsComponent,
		ItemsHeaderComponent,
		ItemsFilterComponent,
		ItemsFooterComponent,
		ItemsGridComponent,
		ItemsListComponent,
		ItemsGroupsComponent,

		// Controls
		// ====================
		MenuComponent,
		ButtonComponent,
		CheckboxComponent,
		LoaderComponent,
		SelectComponent,
		TextboxComponent,
		TextareaComponent,
		NotificationsComponent,
		FormComponent,
		FormGroupComponent,
		FormControlComponent,
		EditorComponent,
		ToggleComponent,
		TagComponent,
		AlertComponent,
		ProgressBarComponent,
		TypeTagComponent,

		// Pages
		// ====================
		// Website
		HomeComponent,
		// Cards
		CardsComponent,
		CardItemGridComponent,
		CardItemListComponent,
		CardComponent,
		// Auth
		AuthComponent,
		SignInComponent,
		SignUpComponent,
		// Scanner
		ScannerComponent,
		ScannerListsComponent,
		ScannerListComponent,
		// Expansion
		ExpansionsComponent,
		ExpansionItemGridComponent,
		ExpansionItemListComponent,
		ExpansionComponent,
		// Pokemon
		PokemonsComponent,
		PokemonItemGridComponent,
		PokemonComponent,
		// Social
		ProfileComponent,

		// Helpers
		ClickOutsideDirective
	],
	imports: [
		DragDropModule,
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		//ChartsModule,
		FontAwesomeModule,
		WebcamModule,
		ReactiveFormsModule,
		CKEditorModule,
		OverlayModule,
		AngularFittextModule,
		ColorPickerModule,
		InlineSVGModule.forRoot()
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorIntercept,
			multi: true
		},
		DatePipe
	],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(private library: FaIconLibrary, private faConfig: FaConfig) {
		library.addIcons(
			faSearch,
			faList,
			faArchive,
			faBookSpells,
			faChartLine,
			faUser,
			faCrown,
			faLightSwitchOn,
			faCog,
			faBox,
			faFolders,
			faUsers,
			faEllipsisV,
			faArrowUp,
			faArrowDown,
			faHorizontalRule,
			faTrash,
			faPalette,
			faCrosshairs,
			faHistory,
			faExternalLink,
			faDollarSign,
			faCog,
			faAngleLeft,
			faAngleRight,
			faArrowLeft,
			faArrowRight,
			faCaretUp,
			faCaretRight,
			faCaretDown,
			faCaretLeft,
			faSignIn,
			faSignOut,
			faPlus,
			faUserPlus,
			faTh,
			faCamera,
			faVideo,
			faBringFront,
			faSync,
			faPlay,
			faPause,
			faStop,
			faDonate,
			faTachometer,
			faCheck,
			faInfo,
			faExclamationTriangle,
			faTimesOctagon,
			faTimes,
			faLayerGroup,
			faRectanglePortrait,
			faAlbumCollection,
			faShoppingCart,
			faGavel,
			faBalanceScale,
			faSave,
			faLineColumns,
			faShieldAlt,
			faPalette,
			faSwords,
			faAlignLeft,
			faEye,
			faRepeat,
			faUndo,
			faArrowToTop,
			faArrowToBottom,
			faRandom,
			faHandHoldingMedical,
			faTombstoneAlt,
			faLevelUp,
			faLevelDown,
			faSwords,
			faSortSizeUp,
			faSortSizeDownAlt,
			faSortAlt,
			faDiceThree,
			faDice,
			faDiceD4,
			faDiceD6,
			faDiceD8,
			faDiceD10,
			faDiceD12,
			faDiceD20,
			faExclamationCircle,
			faThumbsUp,
			faExclamation,
			faCoin,
			faForward,
			faHourglassStart,
			faHourglassEnd,
			faKeyboard,
			faClone,
			faFlaskPotion,
			faFolder,
			faEdit,
			faAngleUp,
			faAngleRight,
			faAngleDown,
			faAngleLeft,
			faMinus,
			faExpand,
			faCompress,
			faLock,
			faLockOpen,
			faImage,
			faPawClaws,
			faTrophy,
			faBolt,
			faMagic,
			faMountains,
			faEclipse,
			faHoodCloak,
			faDragon,
			faTools,
			faToolbox,
			faHeart,
			faHeartbeat,
			faThunderstorm,
			faNewspaper,
			faSparkles,
			faQuestion
		);
		faConfig.defaultPrefix = "fad";
	}
}