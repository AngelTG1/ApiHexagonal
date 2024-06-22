export class Event {
  constructor(public name: string, public status: number = 0) {}

  toggle() {
    this.status = this.status === 0 ? 1 : 0;
  }
}
