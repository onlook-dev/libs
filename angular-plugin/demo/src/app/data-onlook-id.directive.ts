import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: 'data-onlook'
})
export class DataOnlookIdDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.setAttributes(this.el.nativeElement);
  }

  private setAttributes(element: HTMLElement) {
    const filePath = element.ownerDocument.URL;
    const lineNumber = '1';
    this.renderer.setAttribute(element, 'data-onlook-id', `${filePath}:${lineNumber}`);
    Array.from(element.children).forEach((child: Element) => {
      this.setAttributes(child as HTMLElement);
    });
  }
}