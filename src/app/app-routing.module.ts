import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './home/pages/feed/feed.component';
import { ProductComponent } from './home/pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FeedComponent
      },
      // {
      //   path: 'search/:term',
      //   component: FeedComponent
      // },
      {
        path: 'category/:id',
        component: FeedComponent
      },
      // {
      //   path: 'category/:id/search/:term',
      //   component: FeedComponent
      // },
      {
        path: 'product/:id',
        component: ProductComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled', // Add options right here
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
