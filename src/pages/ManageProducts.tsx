import { useState } from "react";
import { products as initialProducts, Product } from "@/lib/mockData";
import { Search, Plus, Edit2, CheckCircle2, Eye, EyeOff, Save, X, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Extend the Product type locally to include a "visible" flag for the storefront
type StoreProduct = Product & { visible: boolean };

const STORE_PRODUCTS: StoreProduct[] = initialProducts.map(p => ({
  ...p,
  visible: true // All visible by default for mock purposes
}));

export default function ManageProducts() {
  const [productList, setProductList] = useState<StoreProduct[]>(STORE_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);

  // Form state for editing
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState(0);
  const [editVisible, setEditVisible] = useState(true);

  const [addProductOpen, setAddProductOpen] = useState(false);

  const filteredProducts = productList.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (product: StoreProduct) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditVisible(product.visible);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    setProductList(prev => prev.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: editName,
          price: editPrice,
          visible: editVisible
        };
      }
      return p;
    }));
    
    toast.success("Product details updated successfully!");
    setEditingProduct(null);
  };

  const toggleVisibility = (id: string, currentStatus: boolean) => {
    setProductList(prev => prev.map(p => 
      p.id === id ? { ...p, visible: !currentStatus } : p
    ));
    toast.success(currentStatus ? "Product hidden from store" : "Product visible in store");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Catalog</h2>
          <p className="text-muted-foreground">Manage which products are visible to your customers for online ordering.</p>
        </div>
        <Button className="shrink-0 gap-2" onClick={() => setAddProductOpen(true)}>
          <Plus className="h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products by name..."
          className="pl-10 h-12 max-w-md bg-card border-border/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`group relative flex flex-col bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${product.visible ? 'border-border/50 hover:shadow-glow' : 'border-border/30 opacity-75'}`}
          >
            <div className="absolute top-3 right-3 z-10 flex gap-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className={`h-8 w-8 rounded-full shadow-sm ${product.visible ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(product.id, product.visible);
                }}
                title={product.visible ? "Hide from customers" : "Show to customers"}
              >
                {product.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>

            <div className="h-40 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center border-b border-border/50">
               {/* Using Emoji as a placeholder for Product Photo */}
               <span className="text-7xl drop-shadow-sm filter group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  {product.category}
                </Badge>
                {!product.visible && (
                  <Badge variant="secondary" className="text-[10px] uppercase font-semibold bg-alert/10 text-alert">
                    Hidden
                  </Badge>
                )}
              </div>
              
              <h3 className="font-bold text-lg leading-tight mb-1">
                {product.name}
              </h3>
              
              <div className="mt-auto pt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Price</span>
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-2 border-border/50 hover:bg-muted"
                  onClick={() => handleEditClick(product)}
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product Details</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                className="bg-muted/50 focus-visible:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Selling Price (₹)</Label>
              <Input 
                id="price" 
                type="number" 
                value={editPrice} 
                onChange={(e) => setEditPrice(Number(e.target.value))} 
                className="bg-muted/50 focus-visible:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="visible" className="text-base">Visible to Customers</Label>
                <p className="text-xs text-muted-foreground">Allow customers to see and order this item.</p>
              </div>
              <Switch 
                id="visible" 
                checked={editVisible} 
                onCheckedChange={setEditVisible} 
              />
            </div>
          </div>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setEditingProduct(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {addProductOpen && (
        <AddProductModal 
          onClose={() => setAddProductOpen(false)} 
          onAdd={(newProduct) => {
            initialProducts.unshift(newProduct);
            setProductList([{ ...newProduct, visible: true }, ...productList]);
            toast.success("Product added successfully!");
            setAddProductOpen(false);
          }} 
        />
      )}
    </div>
  );
}

function AddProductModal({ onClose, onAdd }: { onClose: () => void, onAdd: (p: any) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [emoji, setEmoji] = useState("📦");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) return toast.error("Please fill all fields");
    
    const newProduct = {
      id: `p${Date.now()}`,
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      minStock: 10,
      unit: "pcs",
      emoji
    };
    onAdd(newProduct);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-fade-up">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-elevated border border-border/60 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-gradient-primary text-primary-foreground">
          <Package className="h-5 w-5" />
          <h2 className="font-bold text-lg flex-1">Add New Product</h2>
          <button onClick={onClose} className="h-8 w-8 grid place-items-center rounded-full hover:bg-white/20 transition-smooth text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Product Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm" placeholder="e.g. Aashirvaad Atta" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Price (₹)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm" placeholder="100" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Current Stock</label>
              <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full p-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm" placeholder="25" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <input value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm" placeholder="Grocery" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Emoji</label>
              <input value={emoji} onChange={e => setEmoji(e.target.value)} className="w-full p-2.5 rounded-xl bg-muted/60 border border-transparent focus:bg-card focus:border-primary outline-none transition-smooth text-sm" placeholder="📦" required />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-muted">Cancel</button>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-md">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
