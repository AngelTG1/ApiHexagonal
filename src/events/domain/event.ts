export class Event {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly date: Date,
    readonly hour: string,
    readonly location: string,
    readonly userId: number,
  ) {}
}