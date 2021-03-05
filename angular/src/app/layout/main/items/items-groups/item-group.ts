export class ItemGroup {
	name: string;
	progress?: number;
	items: any[] = [];
	constructor(init?:Partial<ItemGroup>) {
		Object.assign(this, init);
	}
}