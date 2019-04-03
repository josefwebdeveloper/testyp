import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { Product } from '../../../_models/Feed';
import { Category, Setup } from '../../../_models/Setup';
import { DataService } from '../../../_services/data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, AfterViewInit, OnDestroy {

  categoryTokenSub: Subscription;
  feedTokenSub: Subscription;
  products: Product[];
  currentPage: number;
  totalPages: number;
  categories: Category[];
  selectedCategoryId = '';
  searchTerm = '';
  isSearch = false;
  isLoading = false;
  hasMore = false;

  isSelected: false;
  @ViewChild('categoryList') categoryList: ElementRef;
  UrlInput: string;

  constructor(private api: ApiService, private data: DataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return true;
    };

    this.categoryTokenSub = this.data.getToken().subscribe(token => {
      if (token) {
        this.getCategories();
      }
    });
  }

  ngOnInit() {
    console.log('feedcomponent oninit');

    this.activatedRoute.params.subscribe(routeParams => {
      console.log('routeParams.id', routeParams.id);
      this.selectedCategoryId = routeParams.id;
      if (routeParams.id) {
        this.currentPage = 1;
        this.getFeed();
        if (this.categories) {
          this.refreshCategoryButtons();
        }
      } else {
        this.currentPage = 1;
        this.getFeed();
        if (this.categories) {
          this.refreshCategoryButtons();
        }
      }
    });

    this.currentPage = 1;
    this.getFeed();
  }

  submitSearch() {
    console.log('UrlInput', this.UrlInput, this.selectedCategoryId);
    const search = this.UrlInput;
    this.UrlInput = '';
    this.isSearch = false;
    if (this.selectedCategoryId) {
      this.router.navigate([`/category/${this.selectedCategoryId}/search/${search}`]);

    } else {
      this.router.navigate(['/search', search]);
    }
    // return this.UrlInput;
  }

  goToProductChangeStrategy(productId) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.router.navigate(['/product', productId]);
  }

  // onHover(imgUrl) {
  //   this.currentImage = imgUrl;
  // }

  ngAfterViewInit(): void {
    console.log('categoryList', this.categoryList);
  }

  getCategories() {
    this.data.getSetup().subscribe(setup => {
      this.categories = setup.categories;
      if (setup) {
        this.refreshCategoryButtons();
      }
      console.log('categories', this.categories);
    });
  }

  getFeed(): void {
    this.feedTokenSub = this.data.getToken().subscribe(token => {
      if (token) {
        this.api.getFeed(this.searchTerm, this.selectedCategoryId, this.currentPage, 20).subscribe((res) => {
          this.currentPage = res.meta.currentPage;
          this.totalPages = res.meta.totalpages;

          this.hasMore = this.currentPage < this.totalPages;

          if (this.currentPage === 1) {
            this.products = res.data;
          } else {
            this.products.push(...res.data);
          }

          this.isLoading = false;
        });
      }
    });
  }

  refreshCategoryButtons() {
    for (const c of this.categories) {
      c.isSelected = c.id === this.selectedCategoryId;
      console.log('selectedCategoryId==', this.selectedCategoryId);
    }
  }

  showMore() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.currentPage++;
      this.getFeed();
    }
  }

  slideLeft() {
    this.categoryList.nativeElement.scrollLeft += 60;
  }

  slideRight() {
    this.categoryList.nativeElement.scrollLeft -= 60;
  }

  ngOnDestroy(): void {
    this.categoryTokenSub.unsubscribe();
    this.feedTokenSub.unsubscribe();
  }

}
