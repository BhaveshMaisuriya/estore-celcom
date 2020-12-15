export class Product {
    public id: string;
    public sku: string;
    public name: string;
    public description: string;
    public price: number;
    public image: string;

    public setDevice(device: Product): void {
        this.id = device.id;
        this.sku = device.sku;
        this.name = device.name;
        this.description = device.description;
        this.price = device.price;
        this.image = device.image;
    }
}
