export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  photo: string;
  products: string;
  marketsActive: string[];
  ownerEmail: string;
  bio: string;
}

export const vendors: Vendor[] = [
  {
    id: "saffron-scoops",
    businessName: "Saffron Scoops n' Bites",
    ownerName: "Manoj Kumar",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=SS&backgroundColor=F4A228",
    products: "Saffron ice cream, Indian street food bites",
    marketsActive: ["Fort Collins Farmers Market", "Old Town Saturday Market"],
    ownerEmail: "manoj@saffronscoops.com",
    bio: "Bringing authentic Indian flavors to Northern Colorado farmers markets since 2023. Our saffron ice cream is a crowd favorite!",
  },
  {
    id: "green-acre-farms",
    businessName: "Green Acre Farms",
    ownerName: "Linda & Tom Patterson",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=GA&backgroundColor=2D6A4F",
    products: "Organic vegetables, herbs, microgreens",
    marketsActive: ["Fort Collins Farmers Market", "Larimer County Farmers Market", "Windsor Farmers Market"],
    ownerEmail: "linda@greenacrefarms.co",
    bio: "Family-owned organic farm just outside Fort Collins. We've been growing for the community for over 15 years.",
  },
  {
    id: "mountain-honey-co",
    businessName: "Mountain Honey Co.",
    ownerName: "Bear Jackson",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=MH&backgroundColor=F4A228",
    products: "Raw honey, beeswax candles, honeycomb",
    marketsActive: ["Fort Collins Farmers Market", "Loveland Farmers Market"],
    ownerEmail: "bear@mountainhoney.com",
    bio: "Small-batch raw honey from hives in the foothills west of Fort Collins. Every jar is pure, unprocessed Colorado gold.",
  },
  {
    id: "poudre-valley-bakery",
    businessName: "Poudre Valley Bakery",
    ownerName: "Claire Dubois",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=PV&backgroundColor=2D6A4F",
    products: "Sourdough bread, pastries, seasonal pies",
    marketsActive: ["Fort Collins Farmers Market", "Old Town Saturday Market", "Fort Collins Winter Market"],
    ownerEmail: "claire@poudrevalleybakery.com",
    bio: "Artisan bakery specializing in naturally leavened sourdough and seasonal pastries. Everything is made from scratch using local flour.",
  },
  {
    id: "wild-roots-pottery",
    businessName: "Wild Roots Pottery",
    ownerName: "Jesse Morales",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=WR&backgroundColor=F4A228",
    products: "Handmade ceramics, planters, mugs",
    marketsActive: ["Old Town Saturday Market", "Fort Collins Winter Market"],
    ownerEmail: "jesse@wildrootspottery.com",
    bio: "Handcrafted pottery inspired by the landscapes of Northern Colorado. Each piece is wheel-thrown and glazed in my studio in Old Town.",
  },
  {
    id: "northern-co-salsa",
    businessName: "Northern CO Salsa Co.",
    ownerName: "Ana Reyes",
    photo: "https://api.dicebear.com/9.x/initials/svg?seed=NC&backgroundColor=2D6A4F",
    products: "Fresh salsas, hot sauces, chips",
    marketsActive: ["Fort Collins Farmers Market", "Larimer County Farmers Market", "Loveland Farmers Market"],
    ownerEmail: "ana@norcosalsa.com",
    bio: "Family recipes passed down through generations, made with locally sourced peppers and tomatoes. Our ghost pepper salsa has a cult following!",
  },
];
