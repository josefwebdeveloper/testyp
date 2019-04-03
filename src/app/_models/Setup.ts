export interface Category {
  id: string;
  name: string;
  image: string;
  imageon: string;
  isSelected: boolean;
}

export interface Tag {
  id: string;
  name: string;
  image?: any;
  imageon?: any;
}

export interface Make {
  name: string;
  display: string;
  logo: string;
}

export interface Body {
  bodygroup: string;
  bodygroupdisplay: string;
  bodygroupicon: string;
  bodygroupiconon: string;
}

export interface CarConfig {
  years: number[];
  makes: Make[];
  bodies: Body[];
}

export interface Paging {
  feed: number;
  chat: number;
  profileproduct: number;
  foryouloveseller: number;
  foryouloveproduct: number;
  recentview: number;
  mostpopular: number;
}

export interface Aws {
  baseurl: string;
  bucket: string;
  fullpath: string;
  fullpathprofiles: string;
  fullpathproducts: string;
  profilesfolder: string;
  productsfolder: string;
  chatsfolder: string;
}

export interface ReportType {
  id: string;
  name: string;
  image?: any;
  imageon?: any;
}

export interface Rate {
  average: number;
  ratetext: string;
}

export interface Setup {
  categories: Category[];
  tags: Tag[];
  carconfig: CarConfig;
  currencysymbol: string;
  contactemail: string;
  customersupport: string;
  rateus: string;
  shareapp: string;
  terms: string;
  privacy: string;
  paging: Paging;
  aws: Aws;
  reporttypes: ReportType[];
  rates: Rate[];
}
