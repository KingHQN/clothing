export class Cart {
  constructor(
    public id: number,
    public image: string,
    public product: string,
    public size: string,
    public color: string,
    public quantity: number,
    public price: number
  ) {}
}
