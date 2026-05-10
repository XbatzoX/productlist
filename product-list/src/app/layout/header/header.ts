import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
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
