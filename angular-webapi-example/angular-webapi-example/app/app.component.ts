import { Component } from "@angular/core";
@Component({
    selector: "contact-app",
    template: `               
                       <div class='container-fluid'>
                          
              <div class='container'>
                <router-outlet></router-outlet>
              </div>
             </div>          
`
})

export class AppComponent {

}