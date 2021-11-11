export class TypeTag {
	text: string;
	type: string = '';
	route: string;

	public constructor(init?: Partial<TypeTag>) {
		Object.assign(this, init);
		this.route = this.type && `/pokemon/${this.type.toLowerCase()}`;
	}
}
