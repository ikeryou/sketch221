
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _rangeEl:any;
  private _rate:number = 0;
  private _isLeft:boolean;
  public offset:number;

  constructor(opt:any) {
    super(opt)
    this._isLeft = opt.isLeft;

    this.offset = Util.instance.mix(0.25, 1, opt.offset);

    this._rangeEl = document.createElement('input');
    this._rangeEl.setAttribute('type', 'range');
    this._rangeEl.setAttribute('min', '0');
    this._rangeEl.setAttribute('max', '100');
    this._rangeEl.setAttribute('step', '1');
    this.getEl().append(this._rangeEl);

    if(!this._isLeft) {
      Tween.instance.set(this._rangeEl, {
        scaleX:-1
      })
    }
  }


  public setRate(value:number): void {
    this._rate += (value - this._rate) * 0.25;
  }


  protected _update(): void {
    super._update();

    let v = Util.instance.map(this._rate, 0, 1, 0, 1);
    // if(this._isLeft) {
    //   v = 1 - v;
    // }
    this._rangeEl.value = ~~(v * 100);
  }
}