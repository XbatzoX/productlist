import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  path = '';
  btn_text = 'Neues Produkt';
  ngOnInit(){
    this.path = '';
    if(this.path == 'detail'){
      this.btn_text = 'zurück zur Liste';
    }
  }
}
