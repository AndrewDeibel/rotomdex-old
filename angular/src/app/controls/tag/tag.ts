export class Tag {
	text: string;
	classes: string = "";
	route: string;
	icon: string;

    public constructor(init?:Partial<Tag>) {
        Object.assign(this, init);
	}
}