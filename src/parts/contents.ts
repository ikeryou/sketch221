
import { Func } from "../core/func";
import { Mouse } from "../core/mouse";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Update } from "../libs/update";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _itemLeft:Array<Item> = [];
  private _itemRight:Array<Item> = [];
  private _items:Array<Item> = [];

  constructor(opt:any) {
    super(opt)

    const num = 30

    for(let i = 0; i < num; i++) {
      // 左側用
      const l = document.createElement('div')
      l.classList.add('item')
      this.getEl().append(l);
      const lItem = new Item({
        el:l,
        id:i,
        offset:Util.instance.map(i, 0, 1, 0, num - 1),
        isLeft:true,
      })
      this._itemLeft.push(lItem);

      // 右側用
      const r = document.createElement('div')
      r.classList.add('item')
      this.getEl().append(r);
      const rItem = new Item({
        el:r,
        id:i,
        offset:Util.instance.map(i, 0, 1, 0, num - 1),
        isLeft:false,
      });
      this._itemRight.push(rItem);

      // 更新用
      this._items.push(lItem);
      this._items.push(rItem);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();

    if(Update.instance.cnt % 10 == 0) {
      this._resize()
    }

    // this._resize()

    const md = Mouse.instance.moveDist
    // console.log(md.y);


    this._items.forEach((val) => {
      const max = Func.instance.sh() * 0.75
      const r = (Math.abs(md.y) / max)

      val.setRate(r)
    })

    Tween.instance.set(document.body, {
      height:window.innerHeight
    })
  }


  protected _resize(): void {
    super._resize();

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    // const my = Mouse.instance.y;

    let itemW = this.getWidth(this._itemLeft[0].getEl());
    // itemW = (itemW <= 0) ? 129 : itemW;
    // const itemH = this.getHeight(this._itemLeft[0].getEl());
    // const margin = sh / this._itemLeft.length;


    // this._itemLeft.forEach((val,i) => {
    //   const l = val.getEl();
    //   const r = this._itemRight[i].getEl();
    //   let y = margin * 0.25 + margin * i

    //   const dist = Math.abs(my - y)
    //   const rate = 1 - Math.pow(Util.instance.map(dist, 0, 1, 0, sh * 0.5), 2)
    //   // val.setRate(rate);

    //   // this._itemRight[i].setRate(rate);



    //   const centerMargin = (sw - (itemW * 2)) * 0.2;

    //   Tween.instance.set(r, {
    //     x:sw * 0.5 - itemW * 1 - centerMargin,
    //     y:y
    //   })

    //   Tween.instance.set(l, {
    //     x:sw * 0.5 + centerMargin,
    //     y:y
    //   })
    // })


    const baseSh = sh * 0.5;
    const interval = baseSh / this._items.length;
    this._items.forEach((val,i) => {

      let y = interval * i + (sh - baseSh) * 0.5

      // const dist = Math.abs(my - y)
      // const rate = 1 - Math.pow(Util.instance.map(dist, 0, 1, 0, sh * 0.5), 2)
      // val.setRate(rate);

      // this._itemRight[i].setRate(rate);



      // const centerMargin = (sw - (itemW * 2)) * 0.2;

      Tween.instance.set(val.getEl(), {
        x:(sw - itemW) * 0.5,
        y:y
      })

      // Tween.instance.set(l, {
      //   x:sw * 0.5 + centerMargin,
      //   y:y
      // })
    })
  }
}