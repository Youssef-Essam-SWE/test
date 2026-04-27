export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "living-room" | "bedroom" | "dining" | "office"
  featured?: boolean
  inStock: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Velvet Sofa",
    description:
      "Luxurious three-seater sofa with deep cushions and solid oak legs. Upholstered in premium velvet fabric.",
    price: 1299,
    image: "/modern-velvet-sofa-living-room.jpg",
    category: "living-room",
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Minimalist Coffee Table",
    description: "Sleek marble-top coffee table with brass legs. Perfect centerpiece for contemporary living spaces.",
    price: 499,
    image: "/marble-coffee-table-brass-legs.jpg",
    category: "living-room",
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Upholstered Bed Frame",
    description: "King-size upholstered bed with tufted headboard. Features solid wood slats and elegant linen fabric.",
    price: 899,
    image: "/upholstered-bed-tufted-headboard.jpg",
    category: "bedroom",
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Oak Dining Table",
    description: "Handcrafted solid oak dining table seats 6-8. Natural wood grain finish with protective coating.",
    price: 1599,
    image: "/oak-dining-table-wooden.jpg",
    category: "dining",
    featured: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description: "Premium leather office chair with lumbar support. Adjustable height and tilt mechanism.",
    price: 599,
    image: "/leather-office-chair-ergonomic.jpg",
    category: "office",
    inStock: true,
  },
  {
    id: "6",
    name: "Walnut Bookshelf",
    description: "Five-tier bookshelf in rich walnut finish. Open design with reinforced shelves.",
    price: 449,
    image: "/walnut-bookshelf-five-tier.jpg",
    category: "office",
    inStock: true,
  },
  {
    id: "7",
    name: "Scandinavian Armchair",
    description: "Mid-century inspired armchair with tapered legs. Comfortable cushioning in neutral fabric.",
    price: 399,
    image: "/scandinavian-armchair-midcentury.jpg",
    category: "living-room",
    inStock: true,
  },
  {
    id: "8",
    name: "Platform Nightstand",
    description: "Two-drawer nightstand with soft-close mechanism. Matte finish with gold hardware.",
    price: 299,
    image: "/modern-nightstand-two-drawer.jpg",
    category: "bedroom",
    inStock: true,
  },
  {
    id: "9",
    name: "Extendable Dining Table",
    description: "Space-saving dining table extends from 6 to 10 seats. Durable laminate top.",
    price: 1199,
    image: "/extendable-dining-table.png",
    category: "dining",
    inStock: true,
  },
  {
    id: "10",
    name: "Velvet Dining Chairs",
    description: "Set of 2 dining chairs with curved backs. Plush velvet upholstery and chrome legs.",
    price: 399,
    image: "/velvet-dining-chairs-chrome.jpg",
    category: "dining",
    inStock: true,
  },
  {
    id: "11",
    name: "Executive Desk",
    description: "Large executive desk with cable management. Three drawers and solid wood construction.",
    price: 799,
    image: "/executive-desk-wooden-drawers.jpg",
    category: "office",
    inStock: true,
  },
  {
    id: "12",
    name: "Tufted Ottoman",
    description: "Large square ottoman with button tufting. Doubles as storage and extra seating.",
    price: 349,
    image: "/tufted-ottoman-storage.jpg",
    category: "living-room",
    inStock: false,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (!category) return products
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}
