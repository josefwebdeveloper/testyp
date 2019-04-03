import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../../_services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  ProductSub: Subscription;
  product;
  categories;
  currentCategoryImage: string;

  CategoriesSub: Subscription;
  currentRelatedProductNumber: number;
  relatedProd;
  leftButtonSellerDisabled = false;
  rightButtonSellerDisabled = false;
  productMain;
  dots;

  constructor(private api: ApiService, private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {

      return false;
    };

    this.ProductSub = this.data.getToken().subscribe(token => {
      if (token) {
        this.activatedRoute.params.subscribe(routeParams => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
          };
          this.getProduct(routeParams.id);
        });
      }
    });

  }

  ngOnInit() {
  }

  changeMainImage(image) {
    this.product.mainImage = image.url;
  }

  nextRelatedProduct() {
    if (this.currentRelatedProductNumber < this.relatedProd.length - 1) {

      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return true;
      };
      this.currentRelatedProductNumber += 1;
      const productId = this.relatedProd[this.currentRelatedProductNumber].id;
      this.product = this.relatedProd[this.currentRelatedProductNumber];
      this.product.mainImage = this.product.attributes.images[0].url;
      this.dots[this.currentRelatedProductNumber] = {'value': 'redDot'};
      this.dots[this.currentRelatedProductNumber - 1] = {'value': 'dot'};

      this.router.navigate(['/product', productId]);
    }

  }

  prevRelatedProduct() {
    if (this.currentRelatedProductNumber > 0) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return true;
      };
      this.currentRelatedProductNumber -= 1;
      const productId = this.relatedProd[this.currentRelatedProductNumber].id;
      this.product = this.relatedProd[this.currentRelatedProductNumber];
      this.product.mainImage = this.product.attributes.images[0].url;
      this.dots[this.currentRelatedProductNumber + 1] = {'value': 'dot'};
      this.dots[this.currentRelatedProductNumber] = {'value': 'redDot'};

      this.router.navigate(['/product', productId]);
    }
  }

  getProduct(productId) {

    if (!this.currentRelatedProductNumber && this.currentRelatedProductNumber !== 0) {
      // debugger;
      this.api.getProduct(productId).subscribe(product => {
        this.product = product.data[0];
        this.product.mainImage = this.product.attributes.images[0].url;
        this.CategoriesSub = this.data.getSetup().subscribe(categories => {
          this.categories = categories.categories;
          if (this.categories) {
            const currentCategory = this.categories.find(el => el.id === this.product.attributes.categoryid);
            this.currentCategoryImage = currentCategory.image;
          }
        });
        this.api.memberProductRelated(this.product.attributes.memberid, this.product.id).subscribe(relatedProd => {
          this.relatedProd = relatedProd.data;
          if (relatedProd.data) {
            this.relatedProd = relatedProd.data;
            this.relatedProd.unshift(this.product);
            this.currentRelatedProductNumber = 0;
            this.dots = Array(this.relatedProd.length).fill({'value': 'dot'});
            this.dots[0] = {'value': 'redDot'};
            // this.dots.push({'value': 'redDot'});
          }


        });
      });
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.CategoriesSub.unsubscribe();
    this.ProductSub.unsubscribe();
  }


}
