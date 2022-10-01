import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jausenholer';
  constructor(){

    console.log(  "███████╗██████╗  █████╗ ███╗   ██╗███████╗\n██╔════╝██╔══██╗██╔══██╗████╗  ██║╚══███╔╝\n█████╗  ██████╔╝███████║██╔██╗ ██║  ███╔╝\n██╔══╝  ██╔══██╗██╔══██║██║╚██╗██║ ███╔╝\n██║     ██║  ██║██║  ██║██║ ╚████║███████╗\n╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝\n\n");
console.log(" Franz Mühringer | 2022 | hyphe.at")
  }
}
