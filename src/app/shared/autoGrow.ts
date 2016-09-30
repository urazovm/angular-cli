import {Directive, HostBinding, HostListener} from '@angular/core'

@Directive({
  selector: '[autoGrow]',
})
export class AutoGrow {
  @HostBinding('style.width.px')
  width:number = 120;

  @HostListener('focus')
  onFocus() {
    this.width=500;
  }

  @HostListener('blur')
  onBlur(){
    this.width = 120;
  }
}