import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuddiesComponent } from "./buddies.component";
import { AuthProtected } from "../services/auth-protected.service";


const routes: Routes = [
    { path: "buddies", component: BuddiesComponent, canActivate: [AuthProtected] }];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BuddiesRoutingModule { }