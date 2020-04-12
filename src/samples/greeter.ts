
export class Greeter {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): void {
        const msg = (`Hi, ${this.name}!`);
        console.log(msg);
    }
}