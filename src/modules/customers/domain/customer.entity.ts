export class Customer {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly email: string,
    public document: string,
    public phone?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
