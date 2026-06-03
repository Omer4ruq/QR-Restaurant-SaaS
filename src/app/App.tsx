import {
  Activity,
  AlarmClock,
  ArrowLeft,
  Award,
  BarChart3,
  Bell,
  CheckCheck,
  CheckCircle,
  ChefHat,
  Circle,
  Clock,
  DollarSign,
  Filter,
  Flame,
  Hash,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  Navigation,
  Package,
  Phone,
  Plus,
  QrCode,
  Radio,
  Search,
  Send,
  Settings,
  Sparkles,
  Star,
  Table2,
  Timer,
  TrendingUp,
  Users,
  Utensils,
  UtensilsCrossed,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const RESTAURANTS = [
  {
    id: "r1",
    name: "Spice Garden",
    cuisine: "North Indian",
    rating: 4.8,
    reviews: 1240,
    price: "$$",
    location: "Koramangala, Bangalore",
    distance: "0.8 km",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=380&fit=crop&auto=format",
    tags: ["Spicy", "Halal", "Popular"],
    open: true,
    time: "25–35 min",
    avgSpend: 450,
  },
  {
    id: "r2",
    name: "Tokyo Ramen Co.",
    cuisine: "Japanese",
    rating: 4.6,
    reviews: 890,
    price: "$$$",
    location: "Indiranagar, Bangalore",
    distance: "1.2 km",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=380&fit=crop&auto=format",
    tags: ["Authentic", "Cozy"],
    open: true,
    time: "20–30 min",
    avgSpend: 680,
  },
  {
    id: "r3",
    name: "Il Forno",
    cuisine: "Italian",
    rating: 4.7,
    reviews: 2100,
    price: "$$$",
    location: "HSR Layout, Bangalore",
    distance: "2.1 km",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&h=380&fit=crop&auto=format",
    tags: ["Wood-fired", "Family"],
    open: false,
    time: "30–40 min",
    avgSpend: 820,
  },
  {
    id: "r4",
    name: "The Smoke House",
    cuisine: "BBQ & Grills",
    rating: 4.5,
    reviews: 650,
    price: "$$",
    location: "JP Nagar, Bangalore",
    distance: "3.4 km",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=380&fit=crop&auto=format",
    tags: ["BBQ", "Outdoor"],
    open: true,
    time: "35–45 min",
    avgSpend: 550,
  },
  {
    id: "r5",
    name: "Green Bowl",
    cuisine: "Healthy & Vegan",
    rating: 4.4,
    reviews: 420,
    price: "$$",
    location: "Whitefield, Bangalore",
    distance: "5.2 km",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=380&fit=crop&auto=format",
    tags: ["Vegan", "Organic"],
    open: true,
    time: "15–20 min",
    avgSpend: 320,
  },
  {
    id: "r6",
    name: "Taco Libre",
    cuisine: "Mexican",
    rating: 4.3,
    reviews: 780,
    price: "$",
    location: "Electronic City, Bangalore",
    distance: "7.8 km",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=380&fit=crop&auto=format",
    tags: ["Street Food", "Casual"],
    open: true,
    time: "20–25 min",
    avgSpend: 280,
  },
];

const MENU_CATEGORIES = [
  "All",
  "Starters",
  "Mains",
  "Biryani",
  "Breads",
  "Desserts",
  "Drinks",
];

const MENU_ITEMS = [
  {
    id: "m1",
    name: "Butter Chicken",
    desc: "Tender chicken in creamy tomato-butter sauce, house special",
    price: 349,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop&auto=format",
    mostOrdered: true,
    recommended: true,
    veg: false,
    spicy: true,
    rating: 4.9,
    orders: 2840,
  },
  {
    id: "m2",
    name: "Paneer Tikka",
    desc: "Smoky grilled cottage cheese with bell peppers & spices",
    price: 279,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop&auto=format",
    mostOrdered: true,
    recommended: false,
    veg: true,
    spicy: true,
    rating: 4.7,
    orders: 1920,
  },
  {
    id: "m3",
    name: "Chicken Biryani",
    desc: "Slow-cooked basmati rice with aromatic whole spices & saffron",
    price: 399,
    category: "Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&auto=format",
    mostOrdered: true,
    recommended: true,
    veg: false,
    spicy: true,
    rating: 4.8,
    orders: 3100,
  },
  {
    id: "m4",
    name: "Dal Makhani",
    desc: "Black lentils slow-cooked overnight in butter & cream",
    price: 249,
    category: "Mains",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format",
    mostOrdered: false,
    recommended: true,
    veg: true,
    spicy: false,
    rating: 4.6,
    orders: 980,
  },
  {
    id: "m5",
    name: "Garlic Naan",
    desc: "Soft oven-baked flatbread with fresh garlic & butter",
    price: 79,
    category: "Breads",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",
    mostOrdered: true,
    recommended: false,
    veg: true,
    spicy: false,
    rating: 4.5,
    orders: 4200,
  },
  {
    id: "m6",
    name: "Gulab Jamun",
    desc: "Rose-scented milk dumplings in warm sugar syrup, 2 pcs",
    price: 149,
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1571167480945-ec5f5e69fb96?w=400&h=300&fit=crop&auto=format",
    mostOrdered: false,
    recommended: true,
    veg: true,
    spicy: false,
    rating: 4.4,
    orders: 760,
  },
  {
    id: "m7",
    name: "Masala Chai",
    desc: "Spiced milk tea with ginger, cardamom & cinnamon",
    price: 89,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
    mostOrdered: false,
    recommended: false,
    veg: true,
    spicy: false,
    rating: 4.3,
    orders: 890,
  },
  {
    id: "m8",
    name: "Chicken 65",
    desc: "Crispy deep-fried chicken with curry leaves & green chili",
    price: 299,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop&auto=format",
    mostOrdered: false,
    recommended: false,
    veg: false,
    spicy: true,
    rating: 4.5,
    orders: 1100,
  },
];

const KITCHEN_INITIAL = [
  {
    id: "k1",
    table: 7,
    status: "new" as const,
    items: [
      { name: "Butter Chicken", qty: 2, note: "Extra spicy" },
      { name: "Garlic Naan", qty: 4 },
    ],
    elapsed: 2,
    priority: "high" as const,
  },
  {
    id: "k2",
    table: 3,
    status: "new" as const,
    items: [
      { name: "Chicken Biryani", qty: 1 },
      { name: "Dal Makhani", qty: 1, note: "Less salt" },
      { name: "Masala Chai", qty: 2 },
    ],
    elapsed: 5,
    priority: "normal" as const,
  },
  {
    id: "k3",
    table: 12,
    status: "cooking" as const,
    items: [
      { name: "Paneer Tikka", qty: 1 },
      { name: "Garlic Naan", qty: 2 },
    ],
    elapsed: 12,
    priority: "normal" as const,
  },
  {
    id: "k4",
    table: 5,
    status: "cooking" as const,
    items: [
      { name: "Chicken 65", qty: 2 },
      { name: "Butter Chicken", qty: 1 },
      { name: "Garlic Naan", qty: 3 },
    ],
    elapsed: 22,
    priority: "urgent" as const,
  },
  {
    id: "k5",
    table: 9,
    status: "ready" as const,
    items: [
      { name: "Gulab Jamun", qty: 2 },
      { name: "Masala Chai", qty: 1 },
    ],
    elapsed: 28,
    priority: "normal" as const,
  },
];

const TABLES_DATA = [
  { id: 1, cap: 2, status: "available" as const },
  {
    id: 2,
    cap: 4,
    status: "occupied" as const,
    guests: 3,
    order: "ord-010",
    value: 687,
    time: "38 min",
  },
  {
    id: 3,
    cap: 4,
    status: "ordering" as const,
    guests: 4,
    order: "k2",
    value: 0,
    time: "5 min",
  },
  { id: 4, cap: 6, status: "available" as const },
  {
    id: 5,
    cap: 4,
    status: "waiting" as const,
    guests: 4,
    order: "k4",
    value: 1247,
    time: "22 min",
  },
  { id: 6, cap: 2, status: "available" as const },
  {
    id: 7,
    cap: 4,
    status: "ordering" as const,
    guests: 2,
    order: "k1",
    value: 0,
    time: "2 min",
  },
  {
    id: 8,
    cap: 8,
    status: "occupied" as const,
    guests: 7,
    order: "ord-011",
    value: 2340,
    time: "15 min",
  },
  {
    id: 9,
    cap: 2,
    status: "occupied" as const,
    guests: 2,
    order: "k5",
    value: 387,
    time: "28 min",
  },
  { id: 10, cap: 4, status: "available" as const },
  { id: 11, cap: 6, status: "available" as const },
  {
    id: 12,
    cap: 4,
    status: "occupied" as const,
    guests: 3,
    order: "k3",
    value: 778,
    time: "12 min",
  },
];

const ADMIN_ORDERS = [
  {
    id: "k1",
    table: 7,
    status: "new" as const,
    ago: "2 min",
    items: 3,
    value: 727,
    mode: "pay-later",
  },
  {
    id: "k2",
    table: 3,
    status: "new" as const,
    ago: "5 min",
    items: 4,
    value: 736,
    mode: "pay-later",
  },
  {
    id: "k3",
    table: 12,
    status: "cooking" as const,
    ago: "12 min",
    items: 2,
    value: 358,
    mode: "pay-first",
  },
  {
    id: "k4",
    table: 5,
    status: "cooking" as const,
    ago: "22 min",
    items: 6,
    value: 1247,
    mode: "pay-later",
  },
  {
    id: "k5",
    table: 9,
    status: "ready" as const,
    ago: "28 min",
    items: 3,
    value: 387,
    mode: "pay-first",
  },
];

const AI_RESPONSES = [
  "For **₹500 budget for two**, head to **Spice Garden** — their Butter Chicken + Garlic Naan combo is ₹428 and is consistently voted the best value meal in Koramangala. Rated 4.8 with 1,240 reviews.",
  "For **vegetarian under ₹300**, **Green Bowl** is your best pick! Their Paneer Power Bowl is ₹280, certified organic, very filling, and loved by regulars. Open now, ready in 15 min.",
  "If you want **something fast (under 20 min)**, **Taco Libre** is nearest and serves fresh loaded tacos for two around ₹350. Very casual, great if you're in a hurry.",
  "**Tokyo Ramen Co.** is the right call for a cozy dinner with someone special — Tonkotsu Ramen is ₹420, portions are huge and the atmosphere is warm. Book early on weekends.",
  "For a **family dinner**, **Il Forno** offers wood-fired pizza platters for 4 around ₹1,600. Note — they're closed today, but open from 11am tomorrow. Reserve a table tonight.",
];

// ─── TYPES ───────────────────────────────────────────────────────────────────

type View = "landing" | "customer" | "admin" | "kitchen";
type MenuItem = (typeof MENU_ITEMS)[0];
interface CartItem {
  item: MenuItem;
  qty: number;
}
interface ChatMsg {
  role: "user" | "ai";
  text: string;
}
type KitchenOrder = (typeof KITCHEN_INITIAL)[0];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Badge({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const map: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-sky-100 text-sky-700",
    gray: "bg-muted text-muted-foreground",
    orange: "bg-orange-100 text-orange-700",
  };
  return (
    <span
      className={`text-xs font-mono font-medium px-2 py-0.5 rounded-full ${map[color] ?? map.gray}`}
    >
      {children}
    </span>
  );
}

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 ${veg ? "border-emerald-600" : "border-red-600"}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${veg ? "bg-emerald-600" : "bg-red-600"}`}
      />
    </span>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("landing");

  // customer state
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState<
    "preparing" | "cooking" | "ready" | null
  >(null);
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [payMode, setPayMode] = useState<"pay-first" | "pay-later">(
    "pay-later",
  );

  // admin state
  const [adminTab, setAdminTab] = useState<"tables" | "orders" | "analytics">(
    "tables",
  );
  const [selectedOrder, setSelectedOrder] = useState<string | null>("k1");

  // kitchen state
  const [kitchenOrders, setKitchenOrders] =
    useState<KitchenOrder[]>(KITCHEN_INITIAL);

  // landing state
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: "Hi! I'm **DineAI** — your personal dining assistant. Tell me your budget, location, and what you're craving. I'll find the perfect spot.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [aiIdx, setAiIdx] = useState(0);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!orderPlaced) return;
    const t1 = setTimeout(() => setOrderStatus("cooking"), 4000);
    const t2 = setTimeout(() => setOrderStatus("ready"), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [orderPlaced]);

  const addToCart = (item: MenuItem) =>
    setCart((prev) => {
      const ex = prev.find((c) => c.item.id === item.id);
      return ex
        ? prev.map((c) =>
            c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c,
          )
        : [...prev, { item, qty: 1 }];
    });

  const removeFromCart = (id: string) =>
    setCart((prev) => {
      const ex = prev.find((c) => c.item.id === id);
      if (!ex) return prev;
      return ex.qty > 1
        ? prev.map((c) => (c.item.id === id ? { ...c, qty: c.qty - 1 } : c))
        : prev.filter((c) => c.item.id !== id);
    });

  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const getQty = (id: string) => cart.find((c) => c.item.id === id)?.qty ?? 0;

  const placeOrder = () => {
    setCartOpen(false);
    setCart([]);
    setOrderPlaced(true);
    setOrderStatus("preparing");
  };

  const advanceOrder = (id: string) =>
    setKitchenOrders((prev) =>
      prev.map((o) =>
        o.id !== id
          ? o
          : {
              ...o,
              status:
                o.status === "new"
                  ? "cooking"
                  : ("ready" as KitchenOrder["status"]),
            },
      ),
    );

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const user: ChatMsg = { role: "user", text: chatInput };
    const ai: ChatMsg = {
      role: "ai",
      text: AI_RESPONSES[aiIdx % AI_RESPONSES.length],
    };
    setMessages((m) => [...m, user, ai]);
    setAiIdx((i) => i + 1);
    setChatInput("");
  };

  const filtered = RESTAURANTS.filter(
    (r) =>
      !query ||
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
      r.location.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredMenu =
    activeCat === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((m) => m.category === activeCat);

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* ── DEMO NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#131C2F]/90  ">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 h-14">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <QrCode className="w-4 h-4 text-[#0b1326]" />
            </div>
            <span
              className="text-lg font-semibold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              TableScan
            </span>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              DEMO
            </span>
          </div>
          <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
            {(["landing", "customer", "admin", "kitchen"] as View[]).map(
              (v) => {
                const labels: Record<View, string> = {
                  landing: "🌐  Platform",
                  customer: "📱  Customer",
                  admin: "🖥  Admin",
                  kitchen: "👨‍🍳  Kitchen",
                };
                return (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${view === v ? "bg-primary text-[#0b1326] shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {labels[v]}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </nav>

      {/* ── VIEWS ── */}
      {view === "landing" && (
        <SaaSLanding
          restaurants={filtered}
          query={query}
          onQuery={setQuery}
          chatOpen={chatOpen}
          onToggleChat={() => setChatOpen((c) => !c)}
          messages={messages}
          chatInput={chatInput}
          onChatInput={setChatInput}
          onSend={sendChat}
          chatEnd={chatEnd}
        />
      )}
      {view === "customer" && (
        <CustomerMenu
          categories={MENU_CATEGORIES}
          activeCat={activeCat}
          onCat={setActiveCat}
          menuItems={filteredMenu}
          allItems={MENU_ITEMS}
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          cartOpen={cartOpen}
          onCartOpen={() => setCartOpen(true)}
          onCartClose={() => setCartOpen(false)}
          onAdd={addToCart}
          onRemove={removeFromCart}
          getQty={getQty}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
          onPlaceOrder={placeOrder}
          orderPlaced={orderPlaced}
          orderStatus={orderStatus}
          waiterCalled={waiterCalled}
          onCallWaiter={() => setWaiterCalled(true)}
          payMode={payMode}
          onPayMode={setPayMode}
        />
      )}
      {view === "admin" && (
        <AdminDashboard
          tab={adminTab}
          onTab={setAdminTab}
          selectedOrder={selectedOrder}
          onSelectOrder={setSelectedOrder}
        />
      )}
      {view === "kitchen" && (
        <KitchenDisplay orders={kitchenOrders} onAdvance={advanceOrder} />
      )}
    </div>
  );
}

// ─── SAAS LANDING ─────────────────────────────────────────────────────────────

function SaaSLanding({
  restaurants,
  query,
  onQuery,
  chatOpen,
  onToggleChat,
  messages,
  chatInput,
  onChatInput,
  onSend,
  chatEnd,
}: {
  restaurants: typeof RESTAURANTS;
  query: string;
  onQuery: (q: string) => void;
  chatOpen: boolean;
  onToggleChat: () => void;
  messages: ChatMsg[];
  chatInput: string;
  onChatInput: (v: string) => void;
  onSend: () => void;
  chatEnd: React.RefObject<HTMLDivElement>;
}) {
  const steps = [
    {
      icon: QrCode,
      title: "Scan the QR Code",
      desc: "Each table has a unique code. Scan it with your phone camera — no app download needed.",
    },
    {
      icon: Utensils,
      title: "Browse & Order",
      desc: "Explore the full menu, see what's trending, read chef picks, and customize your order.",
    },
    {
      icon: CheckCircle,
      title: "Track & Enjoy",
      desc: "Get live status updates from kitchen to table. Call your waiter or pay — all from your phone.",
    },
  ];
  const stats = [
    { label: "Restaurants", value: "2,400+", icon: UtensilsCrossed },
    { label: "Orders/day", value: "18,000+", icon: Package },
    { label: "Happy diners", value: "94K+", icon: Users },
    { label: "Cities", value: "28", icon: Navigation },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1208]">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=600&fit=crop&auto=format"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C1208]/90 via-[#1C1208]/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-white/80 text-xs font-medium">
                AI-Powered Restaurant Discovery
              </span>
            </div>
            <h1
              className="text-5xl font-medium text-white leading-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your table,
              <br />
              your order,
              <br />
              <em className="text-accent not-italic">your way.</em>
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Scan. Browse. Order. No app. No waiting. Just food.
            </p>

            {/* SEARCH */}
            <div className="flex gap-2 max-w-md">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 shadow-lg">
                <Search className="w-4 h-4 text-muted-foreground shrink-0 text-[#0b1326]" />
                <input
                  value={query}
                  onChange={(e) => onQuery(e.target.value)}
                  placeholder="Search restaurants, cuisine, area…"
                  className="flex-1 py-3.5 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none text-[#0b1326]"
                />
                {query && (
                  <button onClick={() => onQuery("")}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <button className="bg-primary hover:bg-primary/90 text-[#0b1326] px-5 py-3.5 rounded-xl text-sm font-medium transition-colors shadow-lg flex items-center gap-2">
                <Navigation className="w-4 h-4" /> Near Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="w-5 h-5 text-[#0b1326]" />
              <div>
                <div className="text-[#0b1326] font-semibold text-lg leading-none">
                  {s.value}
                </div>
                <div className="text-[#0b1326] text-xs mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2
              className="text-3xl text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {query ? `Results for "${query}"` : "Restaurants Near You"}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {restaurants.length} places found · Dhaka
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-3 py-2 rounded-lg transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        {restaurants.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg">No restaurants match "{query}"</p>
            <p className="text-sm mt-1">Try a different cuisine or location</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className="bg-[#131C2F] rounded-2xl overflow-hidden  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {!r.open && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
                        Currently Closed
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {r.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-white/90 text-[#0b1326] text-foreground px-2 py-0.5 rounded-full font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button className="absolute top-3 left-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-3.5 h-3.5 text-muted-foreground text-[#0b1326]" />
                  </button>
                  <div className="absolute bottom-3 left-3 text-[#0b1326] bg-white/90 p-1 rounded-full  text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0b1326]" /> {r.time}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-foreground text-base">
                      {r.name}
                    </h3>
                    <span className="text-muted-foreground text-sm font-mono ">
                      {r.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs mb-3">
                    {r.cuisine}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {r.distance}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {r.rating}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({r.reviews.toLocaleString()})
                        </span>
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ~₹{r.avgSpend}/2
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2
              className="text-3xl text-foreground mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How it works
            </h2>
            <p className="text-muted-foreground">Three steps, zero friction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-mono text-primary mb-1">
                  0{i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR RESTAURANTS CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-foreground rounded-3xl px-10 py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-4">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-white/80 text-xs">
                For Restaurant Owners
              </span>
            </div>
            <h2
              className="text-3xl text-white mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to go digital?
              <br />
              Setup takes 10 minutes.
            </h2>
            <p className="text-white/60 leading-relaxed text-sm">
              Print QR codes for every table. Manage orders, track analytics,
              and let your staff focus on what matters — great food and
              hospitality.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button className="bg-primary hover:bg-primary/90 text-[#0b1326] px-6 py-3 rounded-xl font-medium transition-colors">
              Get Started Free
            </button>
            <button className="bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-medium transition-colors text-sm">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* AI CHAT BUTTON */}
      <button
        onClick={onToggleChat}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0b1326] px-4 py-3 rounded-full shadow-xl transition-all"
      >
        {chatOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {chatOpen ? "Close" : "Ask DineAI"}
        </span>
        {!chatOpen && (
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
        )}
      </button>

      {/* AI CHAT PANEL */}
      {chatOpen && (
        <div
          className="fixed bottom-20 right-6 z-50 w-80 bg-[#0b1326] border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: "460px" }}
        >
          <div className="bg-primary px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#0b1326]" />
            </div>
            <div>
              <div className="text-[#0b1326] font-semibold text-sm">DineAI</div>
              <div className="text-[#0b1326] text-xs flex items-center gap-1">
                <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />{" "}
                Online
              </div>
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto p-3 space-y-3"
            style={{ maxHeight: "300px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-[#0b1326] rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}
                >
                  {m.text
                    .split(/\*\*(.*?)\*\*/g)
                    .map((part, j) =>
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
                    )}
                </div>
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          <div className="border-t border-border p-3 flex gap-2">
            <input
              value={chatInput}
              onChange={(e) => onChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="Budget, cuisine, vibe…"
              className="flex-1 text-sm bg-muted rounded-lg px-3 py-2 outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={onSend}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4 text-[#0b1326]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CUSTOMER MENU ────────────────────────────────────────────────────────────

function CustomerMenu({
  categories,
  activeCat,
  onCat,
  menuItems,
  allItems,
  cart,
  cartCount,
  cartTotal,
  cartOpen,
  onCartOpen,
  onCartClose,
  onAdd,
  onRemove,
  getQty,
  selectedItem,
  onSelectItem,
  onPlaceOrder,
  orderPlaced,
  orderStatus,
  waiterCalled,
  onCallWaiter,
  payMode,
  onPayMode,
}: {
  categories: string[];
  activeCat: string;
  onCat: (c: string) => void;
  menuItems: MenuItem[];
  allItems: MenuItem[];
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
  onAdd: (i: MenuItem) => void;
  onRemove: (id: string) => void;
  getQty: (id: string) => number;
  selectedItem: MenuItem | null;
  onSelectItem: (i: MenuItem | null) => void;
  onPlaceOrder: () => void;
  orderPlaced: boolean;
  orderStatus: string | null;
  waiterCalled: boolean;
  onCallWaiter: () => void;
  payMode: string;
  onPayMode: (m: "pay-first" | "pay-later") => void;
}) {
  const mostOrdered = allItems.filter((i) => i.mostOrdered);
  const recommended = allItems.filter((i) => i.recommended);

  const statusMap = {
    preparing: {
      label: "Order Received",
      sub: "Your order is being prepared by the team",
      color: "bg-amber-500",
      icon: Package,
    },
    cooking: {
      label: "In the Kitchen",
      sub: "Your food is being cooked right now",
      color: "bg-orange-500",
      icon: Flame,
    },
    ready: {
      label: "Ready to Serve!",
      sub: "Your order is on its way to your table",
      color: "bg-emerald-500",
      icon: CheckCircle,
    },
  };

  return (
    <div className="flex justify-center items-start py-8 px-4 min-h-screen bg-muted/30">
      {/* PHONE FRAME */}
      <div
        className="w-[390px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden"
        style={{ height: "820px", position: "relative" }}
      >
        {/* STATUS BAR */}
        <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-card">
          <span className="text-xs font-mono text-muted-foreground">9:41</span>
          <div className="flex gap-1.5 items-center">
            <Wifi className="w-3 h-3 text-foreground" />
            <Radio className="w-3 h-3 text-foreground" />
          </div>
        </div>

        <div
          className="overflow-y-auto"
          style={{ height: "780px", scrollbarWidth: "none" }}
        >
          {/* RESTAURANT HEADER */}
          <div className="relative h-44 bg-muted">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=200&fit=crop&auto=format"
              alt="Restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-emerald-400" />
                  Open Now
                </span>
              </div>
              <h2
                className="text-white text-xl font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Spice Garden
              </h2>
              <div className="flex items-center gap-3 text-white/70 text-xs mt-1">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  4.8 · 1,240 reviews
                </span>
                <span>Table 07</span>
              </div>
            </div>
          </div>

          {/* ORDER STATUS BAR */}
          {orderPlaced && orderStatus && (
            <div
              className={`${statusMap[orderStatus as keyof typeof statusMap].color} px-5 py-3 flex items-center gap-3`}
            >
              {(() => {
                const I = statusMap[orderStatus as keyof typeof statusMap].icon;
                return <I className="w-5 h-5 text-white shrink-0" />;
              })()}
              <div>
                <div className="text-white font-semibold text-sm">
                  {statusMap[orderStatus as keyof typeof statusMap].label}
                </div>
                <div className="text-white/80 text-xs">
                  {statusMap[orderStatus as keyof typeof statusMap].sub}
                </div>
              </div>
            </div>
          )}

          {/* WAITER CALLED */}
          {waiterCalled && (
            <div className="mx-4 mt-3 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <Bell className="w-4 h-4 text-sky-600" />
              <span className="text-sky-700 text-sm font-medium">
                Waiter notified! Someone is on their way.
              </span>
            </div>
          )}

          {/* CATEGORIES */}
          <div className="px-4 pt-4 pb-2">
            <div
              className="flex gap-2 overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => onCat(c)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCat === c ? "bg-primary text-[#0b1326]" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* MOST ORDERED */}
          {activeCat === "All" && (
            <div className="px-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-foreground text-sm">
                  Most Ordered
                </h3>
              </div>
              <div
                className="flex gap-3 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {mostOrdered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="shrink-0 w-32 text-left"
                  >
                    <div className="w-32 h-24 rounded-xl overflow-hidden bg-muted mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-foreground leading-tight">
                      {item.name}
                    </div>
                    <div className="text-xs text-primary font-mono mt-0.5">
                      ₹{item.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHEF RECOMMENDS */}
          {activeCat === "All" && (
            <div className="px-4 mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-foreground text-sm">
                  Chef Recommends
                </h3>
              </div>
              <div className="space-y-2">
                {recommended.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="w-full bg-[#131C2F] rounded-xl p-3 flex gap-3 items-center text-left"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <VegDot veg={item.veg} />
                        <span className="text-xs font-semibold text-foreground truncate">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.desc}
                      </p>
                      <span className="text-xs text-primary font-mono font-medium">
                        ₹{item.price}
                      </span>
                    </div>
                    <div className="shrink-0">
                      {getQty(item.id) > 0 ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemove(item.id);
                            }}
                            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3 text-[#0b1326]" />
                          </button>
                          <span className="text-xs font-mono w-4 text-center">
                            {getQty(item.id)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd(item);
                            }}
                            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 text-[#0b1326]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd(item);
                          }}
                          className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3 text-[#0b1326]" />
                        </button>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FULL MENU LIST */}
          <div className="px-4 mt-5 pb-28">
            <h3 className="font-semibold text-foreground text-sm mb-3">
              {activeCat === "All" ? "Full Menu" : activeCat}
            </h3>
            <div className="space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b border-border pb-3 last:border-0"
                >
                  <button
                    onClick={() => onSelectItem(item)}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <VegDot veg={item.veg} />
                      {item.spicy && (
                        <Flame className="w-3 h-3 text-orange-500" />
                      )}
                      {item.mostOrdered && <Badge color="amber">Popular</Badge>}
                    </div>
                    <div className="font-semibold text-foreground text-sm">
                      {item.name}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-primary font-mono font-semibold">
                        ₹{item.price}
                      </span>
                      {getQty(item.id) > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemove(item.id)}
                            className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-3.5 h-3.5 text-[#0b1326]" />
                          </button>
                          <span className="text-sm font-mono font-medium w-4 text-center">
                            {getQty(item.id)}
                          </span>
                          <button
                            onClick={() => onAdd(item)}
                            className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5 text-[#0b1326]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAdd(item)}
                          className="flex items-center gap-1 bg-primary text-[#0b1326] text-xs px-3 py-1.5 rounded-full font-medium"
                        >
                          <Plus className="w-3 h-3 text-[#0b1326]" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CALL WAITER FAB */}
        <button
          onClick={onCallWaiter}
          className={`absolute bottom-20 right-4 flex items-center gap-2 px-3 py-2.5 rounded-full shadow-lg transition-all text-sm font-medium ${waiterCalled ? "bg-sky-500 text-white" : "bg-[#131C2F] border border-border text-foreground hover:bg-muted"}`}
        >
          <Bell className="w-4 h-4" />
          {waiterCalled ? "Called!" : "Call Waiter"}
        </button>

        {/* CART BAR */}
        {cartCount > 0 && !cartOpen && (
          <button
            onClick={onCartOpen}
            className="absolute bottom-4 left-4 right-4 bg-primary text-[#0b1326] rounded-2xl px-4 py-3 flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-mono font-bold">
                {cartCount}
              </span>
              <span className="font-medium text-sm">View Cart</span>
            </div>
            <span className="font-mono font-semibold">₹{cartTotal}</span>
          </button>
        )}

        {/* CART DRAWER */}
        {cartOpen && (
          <div className="absolute inset-0 bg-[#0b1326] z-20 flex items-end ">
            <div
              className="w-full bg-card rounded-t-3xl max-h-[85%] overflow-y-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Your Order</h3>
                <button onClick={onCartClose}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Payment mode toggle */}
              <div className="px-5 py-3 bg-[#131C2F] border-b border-border">
                <p className="text-xs text-muted-foreground mb-2 font-medium">
                  Payment preference
                </p>
                <div className="flex gap-2">
                  {(["pay-later", "pay-first"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => onPayMode(m)}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${payMode === m ? "bg-primary text-[#0b1326]" : "bg-muted text-muted-foreground"}`}
                    >
                      {m === "pay-later" ? "Pay After Eating" : "Pay Now"}
                    </button>
                  ))}
                </div>
                {payMode === "pay-first" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    You'll be prompted to pay via SSL/card before the order is
                    placed.
                  </p>
                )}
              </div>

              <div className="px-5 py-3 space-y-3">
                {cart.map((c) => (
                  <div key={c.item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img
                        src={c.item.image}
                        alt={c.item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">
                        {c.item.name}
                      </div>
                      <div className="text-xs text-primary font-mono">
                        ₹{c.item.price} × {c.qty}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemove(c.item.id)}
                        className="w-7 h-7 border border-border rounded-full flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-mono w-4 text-center">
                        {c.qty}
                      </span>
                      <button
                        onClick={() => onAdd(c.item)}
                        className="w-7 h-7 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3 text-[#0b1326]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-border">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono text-foreground">
                    ₹{cartTotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Taxes & charges</span>
                  <span className="font-mono text-foreground">
                    ₹{Math.round(cartTotal * 0.05)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold mb-4">
                  <span>Total</span>
                  <span className="font-mono text-primary">
                    ₹{cartTotal + Math.round(cartTotal * 0.05)}
                  </span>
                </div>
                <button
                  onClick={onPlaceOrder}
                  className="w-full bg-primary text-[#0b1326] py-3.5 rounded-2xl font-medium text-sm hover:bg-primary/90 transition-colors"
                >
                  {payMode === "pay-first"
                    ? "Pay & Place Order"
                    : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ITEM DETAIL MODAL */}
        {selectedItem && (
          <div
            className="absolute inset-0 bg-[#0b1326] z-30 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="relative h-52 bg-muted">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onSelectItem(null)}
                className="absolute top-4 left-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow"
              >
                <ArrowLeft className="w-4 h-4 text-foreground text-[#0b1326]" />
              </button>
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-1">
                <VegDot veg={selectedItem.veg} />
                {selectedItem.spicy && (
                  <Flame className="w-4 h-4 text-orange-500" />
                )}
                {selectedItem.mostOrdered && (
                  <Badge color="amber">
                    #{selectedItem.orders.toLocaleString()} orders
                  </Badge>
                )}
              </div>
              <h2
                className="text-xl font-medium text-foreground mt-1 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selectedItem.name}
              </h2>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm text-muted-foreground">
                  {selectedItem.rating} rating
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {selectedItem.desc}
              </p>
              <div className="bg-[#131C2F] rounded-xl p-3 mb-4">
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  Chef's note
                </p>
                <p className="text-sm text-foreground">
                  Pairs beautifully with Garlic Naan. Made fresh to order —
                  allow 15–20 minutes for best results.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold font-mono text-primary">
                  ₹{selectedItem.price}
                </span>
                {getQty(selectedItem.id) > 0 ? (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onRemove(selectedItem.id)}
                      className="w-9 h-9 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4 text-[#0b1326] " />
                    </button>
                    <span className="font-mono font-bold text-lg">
                      {getQty(selectedItem.id)}
                    </span>
                    <button
                      onClick={() => onAdd(selectedItem)}
                      className="w-9 h-9 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 text-[#0b1326]" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAdd(selectedItem);
                      onSelectItem(null);
                    }}
                    className="bg-primary text-[#0b1326] px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#0b1326]" /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTEXT LABEL */}
      <div className="text-center mt-4 text-muted-foreground text-xs font-mono">
        Customer view · Table 07 · Spice Garden
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────

function AdminDashboard({
  tab,
  onTab,
  selectedOrder,
  onSelectOrder,
}: {
  tab: "tables" | "orders" | "analytics";
  onTab: (t: "tables" | "orders" | "analytics") => void;
  selectedOrder: string | null;
  onSelectOrder: (id: string | null) => void;
}) {
  const statusColors = {
    available: "bg-emerald-100 border-emerald-200 text-emerald-700",
    occupied: "bg-sky-100 border-sky-200 text-sky-700",
    ordering: "bg-amber-100 border-amber-200 text-amber-700",
    waiting: "bg-orange-100 border-orange-200 text-orange-700",
  };

  const orderStatusColors = {
    new: {
      bg: "bg-[#131C2F] border-amber-200 text-white",
      badge: "amber",
      label: "New Order",
    },
    cooking: {
      bg: "bg-[#131C2F] border-orange-200 text-white",
      badge: "orange",
      label: "In Kitchen",
    },
    ready: {
      bg: "bg-[#131C2F] border-emerald-200 text-white",
      badge: "green",
      label: "Ready",
    },
  };

  const topMetrics = [
    {
      label: "Today's Revenue",
      value: "₹42,380",
      sub: "+12% vs yesterday",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      label: "Active Tables",
      value: "8 / 12",
      sub: "4 available right now",
      icon: Table2,
      color: "text-sky-600",
    },
    {
      label: "Open Orders",
      value: "5",
      sub: "2 new, 2 cooking, 1 ready",
      icon: Package,
      color: "text-amber-600",
    },
    {
      label: "Avg Order Value",
      value: "₹681",
      sub: "+8% this week",
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  const selected = ADMIN_ORDERS.find((o) => o.id === selectedOrder);

  return (
    <div className="flex h-[calc(100vh-56px)] bg-background">
      {/* SIDEBAR */}
      <aside className="w-56 border-r border-border bg-sidebar flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-[#0b1326]" />
            </div>
            <div>
              <div className="font-semibold text-sidebar-foreground text-sm">
                Spice Garden
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
                Live
              </div>
            </div>
          </div>
        </div>
        <nav className="p-3 flex-1">
          {[
            { id: "tables" as const, label: "Tables", icon: Table2 },
            { id: "orders" as const, label: "Orders", icon: Package },
            { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              className={`w-full flex  items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors ${tab === item.id ? "bg-primary text-[#0b1326]" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}
            >
              <item.icon className="w-4 h-4 " />
              {item.label}
              {item.id === "orders" && (
                <span className="ml-auto text-xs bg-primary text-[#0b1326] px-1.5 py-0.5 rounded-full font-mono">
                  5
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP METRICS */}
        <div className="grid grid-cols-4 gap-4 p-5 border-b border-border bg-[#131C2F]">
          {topMetrics.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}
              >
                <m.icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg font-mono leading-tight">
                  {m.value}
                </div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
                <div className={`text-xs ${m.color} font-medium`}>{m.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden flex">
          {tab === "tables" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-foreground">
                  Table Map
                </h2>
                <div className="flex items-center gap-3 text-xs">
                  {Object.entries({
                    available: "Available",
                    occupied: "Occupied",
                    ordering: "Ordering",
                    waiting: "Waiting",
                  }).map(([k, v]) => (
                    <span
                      key={k}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${statusColors[k as keyof typeof statusColors]}`}
                    >
                      <Circle className="w-2 h-2 fill-current" />
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {TABLES_DATA.map((table) => (
                  <div
                    key={table.id}
                    className={`rounded-2xl border-2 p-4 ${statusColors[table.status]} cursor-pointer hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-lg">
                        T{String(table.id).padStart(2, "0")}
                      </span>
                      <span className="text-xs opacity-70 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {table.cap}
                      </span>
                    </div>
                    <div className="text-xs capitalize font-medium opacity-80 mb-1">
                      {table.status}
                    </div>
                    {table.status !== "available" && (
                      <div className="text-xs opacity-70">
                        <div>
                          {table.guests} guests · {table.time}
                        </div>
                        {(table.value ?? 0) > 0 && (
                          <div className="font-mono font-medium mt-0.5">
                            ₹{table.value}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="flex-1 flex overflow-hidden">
              {/* ORDER LIST */}
              <div className="w-72 border-r border-border overflow-y-auto p-4 space-y-2">
                <h2 className="text-base font-semibold text-foreground mb-3">
                  Active Orders
                </h2>
                {ADMIN_ORDERS.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => onSelectOrder(o.id)}
                    className={`w-full text-left rounded-xl border-2 p-3 transition-all ${selectedOrder === o.id ? "border-primary " : `${orderStatusColors[o.status].bg} hover:shadow-sm`}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-foreground">
                        Table {o.table}
                      </span>
                      <Badge
                        color={
                          orderStatusColors[o.status].badge as
                            | "green"
                            | "amber"
                            | "orange"
                        }
                      >
                        {orderStatusColors[o.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {o.items} items · {o.ago}
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        ₹{o.value}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded font-medium ${o.mode === "pay-first" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}
                      >
                        {o.mode === "pay-first" ? "Paid" : "Pay later"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* ORDER DETAIL */}
              {selected ? (
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="max-w-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-foreground">
                          Table {selected.table}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          {selected.ago} · {selected.items} items
                        </p>
                      </div>
                      <Badge
                        color={
                          orderStatusColors[selected.status].badge as
                            | "green"
                            | "amber"
                            | "orange"
                        }
                      >
                        {orderStatusColors[selected.status].label}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-6">
                      {KITCHEN_INITIAL.find(
                        (k) => k.id === selected.id,
                      )?.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-white rounded text-xs font-mono flex items-center justify-center text-[#0b1326]">
                              {item.qty}
                            </span>
                            <span className="text-sm text-foreground">
                              {item.name}
                            </span>
                          </div>
                          {"note" in item && (
                            <span className="text-xs text-muted-foreground italic">
                              {item.note}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 mb-4">
                      <div className="flex justify-between text-sm mb-1 text-muted-foreground">
                        <span>Subtotal</span>
                        <span className="font-mono">₹{selected.value}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="font-mono text-primary">
                          ₹{selected.value + Math.round(selected.value * 0.05)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {selected.status === "new" && (
                        <button className="w-full bg-primary text-[#0b1326] py-2.5 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                          <ChefHat className="w-4 h-4" /> Forward to Kitchen
                        </button>
                      )}
                      {selected.status === "ready" && (
                        <button className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                          <CheckCheck className="w-4 h-4" /> Mark as Served
                        </button>
                      )}
                      <button className="w-full border border-border text-muted-foreground py-2.5 rounded-xl font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" /> Notify Table
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Select an order to view details</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "analytics" && (
            <div className="flex-1 p-6 overflow-y-auto">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Analytics
              </h2>
              <div className="grid grid-cols-4 gap-5 mb-6">
                {[
                  {
                    label: "Revenue this week",
                    value: "₹2,84,600",
                    change: "+18%",
                    icon: TrendingUp,
                  },
                  {
                    label: "Total orders today",
                    value: "142",
                    change: "+24 vs avg",
                    icon: Package,
                  },
                  {
                    label: "Top dish",
                    value: "Chicken Biryani",
                    change: "3,100 orders total",
                    icon: Award,
                  },
                  {
                    label: "Table turnover",
                    value: "4.2 / day",
                    change: "Sat avg: 5.1",
                    icon: Activity,
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-card border border-border rounded-2xl p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                        <m.icon className="w-4 h-4 text-[#0b1326]" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {m.label}
                      </span>
                    </div>
                    <div className="font-semibold text-foreground text-2xl font-mono">
                      {m.value}
                    </div>
                    <div className="text-xs text-emerald-600 mt-1 font-medium">
                      {m.change}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-4 text-sm">
                  Top 5 Items This Week
                </h3>
                {[
                  {
                    name: "Chicken Biryani",
                    orders: 284,
                    pct: 95,
                    revenue: "₹1,13,316",
                  },
                  {
                    name: "Butter Chicken",
                    orders: 231,
                    pct: 78,
                    revenue: "₹80,619",
                  },
                  {
                    name: "Garlic Naan",
                    orders: 398,
                    pct: 100,
                    revenue: "₹31,442",
                  },
                  {
                    name: "Paneer Tikka",
                    orders: 178,
                    pct: 60,
                    revenue: "₹49,722",
                  },
                  {
                    name: "Dal Makhani",
                    orders: 134,
                    pct: 45,
                    revenue: "₹33,366",
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-4 py-2.5 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-foreground w-40 truncate">
                      {item.name}
                    </span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                      {item.orders}
                    </span>
                    <span className="text-xs font-mono text-primary w-20 text-right">
                      {item.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── KITCHEN DISPLAY ──────────────────────────────────────────────────────────

function KitchenDisplay({
  orders,
  onAdvance,
}: {
  orders: KitchenOrder[];
  onAdvance: (id: string) => void;
}) {
  const cols: {
    status: KitchenOrder["status"];
    label: string;
    color: string;
    btn: string;
    btnBg: string;
  }[] = [
    {
      status: "new",
      label: "New Orders",
      color: "text-amber-400 border-amber-500/30",
      btn: "Accept & Start",
      btnBg: "bg-amber-500 hover:bg-amber-600",
    },
    {
      status: "cooking",
      label: "Cooking",
      color: "text-orange-400 border-orange-500/30",
      btn: "Mark Ready",
      btnBg: "bg-orange-500 hover:bg-orange-600",
    },
    {
      status: "ready",
      label: "Ready to Serve",
      color: "text-emerald-400 border-emerald-500/30",
      btn: "Served ✓",
      btnBg: "bg-emerald-500 hover:bg-emerald-600",
    },
  ];

  const priorityStyle = {
    urgent: "border-red-500/60 shadow-red-900/20",
    high: "border-amber-500/40",
    normal: "border-white/10",
  };

  const priorityBadge = {
    urgent: (
      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-mono animate-pulse">
        URGENT
      </span>
    ),
    high: (
      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono border border-amber-500/30">
        HIGH
      </span>
    ),
    normal: null,
  };

  return (
    <div
      className="min-h-screen bg-card text-white"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* KDS HEADER */}
      <div className="border border-white/10 px-6 py-3 flex items-center justify-between bg-[#131C2F]">
        <div className="flex items-center gap-3">
          <ChefHat className="w-5 h-5 text-accent" />
          <span className="font-semibold text-white tracking-wide text-sm">
            KITCHEN DISPLAY — SPICE GARDEN
          </span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-5 text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-amber-400 text-amber-400" />
            {orders.filter((o) => o.status === "new").length} New
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-orange-400 text-orange-400" />
            {orders.filter((o) => o.status === "cooking").length} Cooking
          </span>
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
            {orders.filter((o) => o.status === "ready").length} Ready
          </span>
          <span className="text-white/30">|</span>
          <AlarmClock className="w-4 h-4 text-white/30" />
          <span className="font-mono text-white/50">09:41 AM</span>
        </div>
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-3 gap-0 h-[calc(100vh-57px-56px)]">
        {cols.map((col) => {
          const colOrders = orders.filter((o) => o.status === col.status);
          return (
            <div
              key={col.status}
              className={`border-r border-white/8 last:border-0 flex flex-col`}
            >
              {/* COL HEADER */}
              <div
                className={`px-5 py-3 border-b ${col.color} border-opacity-30 flex items-center justify-between`}
                style={{
                  borderBottomColor: col.color.includes("amber")
                    ? "rgba(245,158,11,0.2)"
                    : col.color.includes("orange")
                      ? "rgba(249,115,22,0.2)"
                      : "rgba(52,211,153,0.2)",
                }}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-widest ${col.color.split(" ")[0]}`}
                >
                  {col.label}
                </span>
                <span
                  className={`text-xs font-mono ${col.color.split(" ")[0]} bg-white/5 px-2 py-0.5 rounded`}
                >
                  {colOrders.length}
                </span>
              </div>

              {/* TICKETS */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ scrollbarWidth: "none" }}
              >
                {colOrders.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-white/20 text-xs text-center">
                    <div>
                      <CheckCheck className="w-6 h-6 mx-auto mb-1 opacity-50" />
                      No {col.label.toLowerCase()}
                    </div>
                  </div>
                )}
                {colOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`rounded-xl border bg-white/5 ${priorityStyle[order.priority]} shadow-lg`}
                  >
                    <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-white font-bold text-lg">
                          Table {order.table}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {priorityBadge[order.priority]}
                        <div className="flex items-center gap-1 text-white/40 text-xs">
                          <Timer className="w-3 h-3" />
                          <span>{order.elapsed}m</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 space-y-1.5">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex gap-3 items-baseline">
                          <span className="text-white/50 text-xs w-4 text-right shrink-0">
                            {item.qty}×
                          </span>
                          <div>
                            <span className="text-white text-sm">
                              {item.name}
                            </span>
                            {"note" in item && item.note && (
                              <span className="ml-2 text-xs text-amber-400/80 italic">
                                — {item.note}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {col.status !== "ready" && (
                      <div className="px-4 pb-3">
                        <button
                          onClick={() => onAdvance(order.id)}
                          className={`w-full ${col.btnBg} text-white text-xs font-semibold py-2.5 rounded-lg transition-colors tracking-wide uppercase`}
                        >
                          {col.btn}
                        </button>
                      </div>
                    )}
                    {col.status === "ready" && (
                      <div className="px-4 pb-3">
                        <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold py-2.5 rounded-lg text-center tracking-wide">
                          ✓ Ready for service
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
