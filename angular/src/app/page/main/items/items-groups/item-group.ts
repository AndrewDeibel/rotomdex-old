export class ItemGroup {
	name: string;
	items: any[] = [];
	constructor(init?:Partial<ItemGroup>) {
		Object.assign(this, init);
	}
}