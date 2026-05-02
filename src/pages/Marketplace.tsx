import { useState } from "react";
import { Store, MapPin, Phone, Mail, Package, Tag, Building2, TrendingUp, Search, Star, ExternalLink, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for Marketplace (20+ businesses)
const BUSINESSES = [
  {
    id: 1,
    name: "Apex Wholesalers",
    type: "Wholesaler",
    category: "FMCG",
    rating: 4.8,
    description: "Leading distributor of fast-moving consumer goods with a focus on beverages and snacks. Daily delivery available.",
    address: "123 Market Yard, APMC, Mumbai",
    contact: "+91 98765 43210",
    email: "sales@apexwholesale.in",
    pricing: "Bulk discount starting from ₹10,000 orders",
    products: ["Cold Drinks", "Chips", "Biscuits", "Chocolates", "Noodles"],
    verified: true,
  },
  {
    id: 2,
    name: "Sunlight Dairy Farms",
    type: "Manufacturer",
    category: "Dairy",
    rating: 4.6,
    description: "Direct-from-farm fresh dairy products including milk, paneer, and butter. High margins for retail partners.",
    address: "Plot 45, Dairy Hub, Anand, Gujarat",
    contact: "+91 91234 56789",
    email: "partner@sunlightdairy.com",
    pricing: "Fixed wholesale rates. Minimum order: 50L milk",
    products: ["Fresh Milk", "Paneer", "Butter", "Ghee", "Curd"],
    verified: true,
  },
  {
    id: 3,
    name: "Global Grain Suppliers",
    type: "Supplier",
    category: "Groceries",
    rating: 4.5,
    description: "Premium quality rice, wheat, and pulses sourced directly from farmers across India.",
    address: "G-Block, Wholesale Market, Vashi, Navi Mumbai",
    contact: "+91 99887 76655",
    email: "info@globalgrains.in",
    pricing: "Dynamic pricing based on market rates. Credit up to 30 days.",
    products: ["Basmati Rice", "Wheat Flour", "Toor Dal", "Moong Dal", "Sugar"],
    verified: false,
  },
  {
    id: 4,
    name: "Metro Plastic Wares",
    type: "Manufacturer",
    category: "Home Goods",
    rating: 4.2,
    description: "Durable and affordable plastic containers, buckets, and household items.",
    address: "Industrial Area Phase II, Delhi",
    contact: "+91 98111 22334",
    email: "sales@metroplastics.com",
    pricing: "20% off on MRP for retailers. MOQ: 5 cartons",
    products: ["Food Containers", "Buckets", "Mugs", "Storage Boxes"],
    verified: true,
  },
  {
    id: 5,
    name: "Spice Route Traders",
    type: "Wholesaler",
    category: "Spices",
    rating: 4.9,
    description: "Authentic whole and ground spices from Kerala and Karnataka. Export quality.",
    address: "Spice Market, Kochi, Kerala",
    contact: "+91 94444 55555",
    email: "trade@spiceroute.in",
    pricing: "Wholesale pricing for orders above 20kg",
    products: ["Black Pepper", "Cardamom", "Turmeric Powder", "Cumin", "Coriander"],
    verified: true,
  },
  {
    id: 6,
    name: "Green Leaf Organics",
    type: "Supplier",
    category: "Organic Food",
    rating: 4.7,
    description: "Certified organic pulses, grains, and cold-pressed oils for health-conscious customers.",
    address: "Organic Hub, Pune, Maharashtra",
    contact: "+91 97654 32109",
    email: "hello@greenleaforganic.in",
    pricing: "Premium pricing, 15% retail margin",
    products: ["Organic Toor Dal", "Cold Pressed Groundnut Oil", "Organic Jaggery"],
    verified: true,
  },
  {
    id: 7,
    name: "Supreme Bakeries",
    type: "Manufacturer",
    category: "Bakery",
    rating: 4.3,
    description: "Freshly baked breads, buns, and rusks delivered daily before 7 AM.",
    address: "Bakery Lane, Bandra, Mumbai",
    contact: "+91 98888 12345",
    email: "orders@supremebakery.com",
    pricing: "Daily fixed rate. No return on unsold stock.",
    products: ["Sliced Bread", "Burger Buns", "Pav", "Premium Rusk"],
    verified: false,
  },
  {
    id: 8,
    name: "CleanMate Chemicals",
    type: "Manufacturer",
    category: "Cleaning",
    rating: 4.4,
    description: "Floor cleaners, dishwashing liquids, and detergents at highly competitive wholesale rates.",
    address: "Chemical Zone, Vapi, Gujarat",
    contact: "+91 90000 11111",
    email: "sales@cleanmate.co.in",
    pricing: "35% margin on MRP. Bulk drums available.",
    products: ["Floor Cleaner", "Dish Wash Gel", "Toilet Cleaner", "Detergent Powder"],
    verified: true,
  },
  {
    id: 9,
    name: "City Fresh Produce",
    type: "Supplier",
    category: "Vegetables",
    rating: 4.1,
    description: "Daily supply of sorted and graded fresh vegetables and fruits.",
    address: "Sector 15 Market, Noida, UP",
    contact: "+91 93333 44444",
    email: "supply@cityfresh.in",
    pricing: "Daily mandi rates + 5% service charge",
    products: ["Onions", "Potatoes", "Tomatoes", "Seasonal Fruits"],
    verified: false,
  },
  {
    id: 10,
    name: "Royal Beverages",
    type: "Wholesaler",
    category: "Beverages",
    rating: 4.6,
    description: "Authorized distributor for major soft drink and energy drink brands.",
    address: "Godown No 5, Ring Road, Surat",
    contact: "+91 95555 66666",
    email: "distributor@royalbeverages.com",
    pricing: "Scheme-based pricing (Buy 10 cases, get 1 free)",
    products: ["Cola Cans", "Energy Drinks", "Mango Juice", "Mineral Water"],
    verified: true,
  },
  {
    id: 11,
    name: "Himalayan Personal Care",
    type: "Manufacturer",
    category: "Cosmetics",
    rating: 4.5,
    description: "Herbal soaps, shampoos, and face washes with natural ingredients.",
    address: "Industrial Estate, Dehradun",
    contact: "+91 98765 11111",
    email: "b2b@himalayancare.in",
    pricing: "25% retailer margin. 15 days credit.",
    products: ["Neem Soap", "Aloe Vera Shampoo", "Face Wash", "Body Lotion"],
    verified: true,
  },
  {
    id: 12,
    name: "A-1 Stationers",
    type: "Wholesaler",
    category: "Stationery",
    rating: 4.2,
    description: "School and office stationery items. Note books, pens, files, and more.",
    address: "Paper Market, Chawri Bazar, Delhi",
    contact: "+91 91111 22222",
    email: "sales@a1stationers.com",
    pricing: "Wholesale bulk rates. 40% margin on MRP.",
    products: ["Notebooks", "Ball Pens", "Chart Paper", "Geometry Boxes"],
    verified: false,
  },
  {
    id: 13,
    name: "NutriCrunch Snacks",
    type: "Manufacturer",
    category: "FMCG",
    rating: 4.8,
    description: "Healthy roasted snacks, makhanas, and dietary mixtures.",
    address: "Food Park, Indore, MP",
    contact: "+91 92222 33333",
    email: "orders@nutricrunch.in",
    pricing: "Flat 20% off MRP. Free display stand on first order.",
    products: ["Roasted Makhana", "Diet Chivda", "Oats Cookies", "Protein Bars"],
    verified: true,
  },
  {
    id: 14,
    name: "Golden Tea Traders",
    type: "Supplier",
    category: "Beverages",
    rating: 4.7,
    description: "Premium Assam and Darjeeling tea leaves sourced directly from estates.",
    address: "Tea Auction Center, Kolkata",
    contact: "+91 94444 11111",
    email: "trade@goldentea.com",
    pricing: "Tiered pricing based on quality grade.",
    products: ["CTC Tea", "Green Tea", "Darjeeling Leaf Tea"],
    verified: true,
  },
  {
    id: 15,
    name: "Pioneer Frozen Foods",
    type: "Wholesaler",
    category: "Frozen Food",
    rating: 4.4,
    description: "Frozen green peas, sweet corn, and ready-to-fry snacks.",
    address: "Cold Storage Lane, Pune",
    contact: "+91 96666 77777",
    email: "supply@pioneerfrozen.in",
    pricing: "Cold chain delivery included. MOQ: ₹5000",
    products: ["Frozen Peas", "Frozen Sweet Corn", "French Fries", "Aloo Tikki"],
    verified: true,
  },
  {
    id: 16,
    name: "Swift Packaging Solutions",
    type: "Manufacturer",
    category: "Packaging",
    rating: 4.3,
    description: "Paper bags, carry bags, and food container packaging for retail shops.",
    address: "Packaging Hub, Ahmedabad",
    contact: "+91 98888 99999",
    email: "sales@swiftpackaging.com",
    pricing: "Wholesale rates per 1000 pieces.",
    products: ["Brown Paper Bags", "Plastic Containers", "Sealing Tape", "Carry Bags"],
    verified: false,
  },
  {
    id: 17,
    name: "Desi Ghee Co.",
    type: "Manufacturer",
    category: "Dairy",
    rating: 4.9,
    description: "Traditional Bilona cow ghee made with authentic processes.",
    address: "Ghee Mandi, Karnal, Haryana",
    contact: "+91 91234 12345",
    email: "pure@desighee.in",
    pricing: "Premium pricing. High demand product.",
    products: ["A2 Cow Ghee", "Buffalo Ghee"],
    verified: true,
  },
  {
    id: 18,
    name: "Sunrise Agarbatti",
    type: "Manufacturer",
    category: "Pooja Needs",
    rating: 4.5,
    description: "Incense sticks, dhoop, and camphor with long-lasting fragrances.",
    address: "Incense Lane, Mysore",
    contact: "+91 99887 11223",
    email: "sales@sunriseagarbatti.com",
    pricing: "30% retailer margin. Festival schemes active.",
    products: ["Rose Agarbatti", "Sandalwood Dhoop", "Camphor Tablets"],
    verified: true,
  },
  {
    id: 19,
    name: "Elite Dry Fruits",
    type: "Wholesaler",
    category: "Groceries",
    rating: 4.7,
    description: "Imported almonds, cashews, raisins, and exotic dry fruits.",
    address: "Khari Baoli, Delhi",
    contact: "+91 97777 88888",
    email: "trade@elitedryfruits.in",
    pricing: "Daily market rates. Bulk 10kg cartons.",
    products: ["Almonds (California)", "Cashews (W320)", "Afghan Raisins", "Pistachios"],
    verified: true,
  },
  {
    id: 20,
    name: "Carewell Pharma Dist.",
    type: "Wholesaler",
    category: "OTC Medicines",
    rating: 4.6,
    description: "Over-the-counter pain relievers, antacids, and first-aid supplies.",
    address: "Dawa Bazar, Indore",
    contact: "+91 95555 44444",
    email: "sales@carewellpharma.com",
    pricing: "20% margin on MRP. Authorized license required.",
    products: ["Paracetamol", "Antacid Gel", "Band-Aids", "Cough Syrup"],
    verified: true,
  },
  {
    id: 21,
    name: "Maxx Batteries",
    type: "Supplier",
    category: "Electronics",
    rating: 4.1,
    description: "AA, AAA, and button cell batteries for daily electronics.",
    address: "Electronic City, Bangalore",
    contact: "+91 93333 22222",
    email: "info@maxxbatteries.in",
    pricing: "Card pricing (10 strips per box).",
    products: ["AA Alkaline", "AAA Zinc Carbon", "Lithium Coin Cells"],
    verified: false,
  }
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<typeof BUSINESSES[0] | null>(null);

  const filteredBusinesses = BUSINESSES.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Marketplace</h2>
          <p className="text-muted-foreground">Find and connect with local suppliers, manufacturers, and wholesalers.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, category, or type..."
          className="pl-10 h-12 max-w-md bg-card border-border/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBusinesses.map((business) => (
          <div
            key={business.id}
            className="group relative flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-glow hover:border-primary/20 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedBusiness(business)}
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary">
                  {business.type === "Manufacturer" ? (
                    <Building2 className="h-5 w-5" />
                  ) : business.type === "Wholesaler" ? (
                    <Package className="h-5 w-5" />
                  ) : (
                    <TrendingUp className="h-5 w-5" />
                  )}
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                  <Star className="h-3 w-3 fill-amber-500" />
                  {business.rating}
                </div>
              </div>
              
              <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors flex items-center gap-1.5">
                {business.name}
                {business.verified && <ShieldCheck className="h-4 w-4 text-emerald-500" />}
              </h3>
              
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px] uppercase bg-muted text-muted-foreground">
                  {business.type}
                </Badge>
                <Badge variant="outline" className="text-[10px] uppercase border-border/50">
                  {business.category}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {business.description}
              </p>
            </div>
            <div className="px-5 py-3 border-t border-border/50 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{business.address.split(',')[0]}</span>
              </div>
              <Button variant="ghost" size="sm" className="h-7 text-primary hover:bg-primary/10 hover:text-primary font-medium p-0 px-2">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedBusiness} onOpenChange={(open) => !open && setSelectedBusiness(null)}>
        {selectedBusiness && (
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 bg-card">
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 pb-4 border-b border-border/50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-primary/15 text-primary hover:bg-primary/15 border-none">
                      {selectedBusiness.type}
                    </Badge>
                    {selectedBusiness.verified && (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-none flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <DialogTitle className="text-2xl font-bold">{selectedBusiness.name}</DialogTitle>
                  <DialogDescription className="text-base mt-1 text-muted-foreground">
                    {selectedBusiness.category} Specialist
                  </DialogDescription>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-card border border-border/50 shadow-sm grid place-items-center text-primary text-2xl font-bold">
                  {selectedBusiness.name.charAt(0)}
                </div>
              </div>
            </div>
            
            <ScrollArea className="max-h-[60vh]">
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" /> About Business
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedBusiness.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{selectedBusiness.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-foreground font-medium">{selectedBusiness.contact}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-foreground">{selectedBusiness.email}</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" /> Pricing Terms
                    </h4>
                    <p className="text-sm font-medium text-foreground">
                      {selectedBusiness.pricing}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" /> Top Products Available
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusiness.products.map((product, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-sm text-foreground shadow-sm">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter className="p-4 border-t border-border/50 bg-muted/10 flex-row justify-end gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setSelectedBusiness(null)}>Close</Button>
              <Button className="gap-2">
                <Phone className="h-4 w-4" /> Contact Supplier
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
