
export interface FeedResponse {
  meta: Meta;
  data: Product[];
}

export interface Meta {
  totalpages: number;
  totalitems: number;
  currentPage: number;
}

export interface Product {
  attributes: Attributes;
  id: string;
}

export interface Attributes {
  title: string;
  description?: any;
  descriptiondisplay: string;
  price: number;
  pricedisplay: string;
  images: Image[];
  thumbnail: Image;
  animation?: any;
  membername: string;
  memberimage: string;
  memberid: string;
  facebookid?: any;
  facebookcover?: any;
  categoryname: string;
  categoryid: string;
  addressline?: any;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  status: string;
  datecreated: number;
  distance: number;
  favorite: boolean;
  following: boolean;
  totalview: number;
  totalfavorites: number;
  totalshares: number;
  totalchats: number;
  totalrate: number;
  totalratetext: string;
  invoice: boolean;
  shipping: boolean;
  yappshop: boolean;
  tags: Tag[];
  car: Car;
  carmodel?: any;
}

export interface Image {
  url: string;
  height: number;
  width: number;
  dominantcolor?: any;
}
export interface Tag {
  id?: any;
  name: string;
  text: string;
  language: string;
  confidence: number;
}

export interface Car {
  modelid: string;
  modelname: string;
  modelgroup: string;
  makeid: string;
  makeidhe: string;
  body: string;
  bodygroup: string;
  bodygrouphe: string;
  color?: any;
  recog?: any;
  hand: number;
  year: number;
  km: number;
  warrantymonth: number;
  carownershiptype: number;
}
