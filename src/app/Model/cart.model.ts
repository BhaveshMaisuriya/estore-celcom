import { CartItem } from './cart-item.model';
import { CommonUtilService } from '../Service/commonUtil.service';
import { BaseComponent } from '../base.component';

export class Cart extends BaseComponent {
  public items: CartItem[] = new Array<CartItem>();
  public GST = 0.00;
  public grossTotal = 0.00;
  public itemsTotal = 0.00;
  public roundOffAdjustment = 0.00;
  public rebateAmount = 0.00;
  GSTInPercentage = this.appConstant.GST_IN_PERCENTAGE;
  public setCart(cart: Cart) {
    this.items = cart.items;
    this.setTotalPrices(cart);
  }

  public setTotalPrices(cart: Cart) {
    this.itemsTotal = 0.00;
    if (cart && cart.items && cart.items.length > 0 ) {
        cart.items.forEach(item => {
            this.itemsTotal += parseFloat(item.itemTotal);
        });
    }
    // this.GST = this.itemsTotal * this.GSTInPercentage;

    const grossTotalBeforeRounding = this.grossTotal;
    this.grossTotal = this.roundOffNumber(grossTotalBeforeRounding);

    this.roundOffAdjustment = this.grossTotal - grossTotalBeforeRounding;
    this.roundOffAdjustment = this.roundToTwoDecimal(this.roundOffAdjustment);
    this.roundOffAdjustment = (this.roundOffAdjustment < 0.01 && this.roundOffAdjustment > -0.01) ? 0.00 : this.roundOffAdjustment;
  }

  private roundToTwoDecimal(value: number) {
    const factor = Math.pow(10, 2);
    return (Math.round(value * factor) / factor);
  }

  private roundOffNumber(value: number) {
    return (new CommonUtilService()).RoundingOff2Number(value);
  }
}
