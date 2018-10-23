import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuddiesComponent } from "./buddies.component";


const routes: Routes = [
    { path: "buddies", component: BuddiesComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BuddiesRoutingModule { }