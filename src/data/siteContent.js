// Static content of the page, kept out of the components
// so that each section is rendered with map().

export const navLinks = [
  { href: "#home", label: "HOME" },
  { href: "#shop", label: "SHOP" },
  { href: "#how-it-works", label: "HOW IT WORKS" },
  { href: "#quiz", label: "SKIN QUIZ" },
  { href: "#checker", label: "CREAM CHECK" },
  { href: "#reviews", label: "REVIEWS" },
  { href: "#contacts", label: "CONTACTS" }
];

export const steps = [
  {
    id: "discovery",
    number: "01",
    className: "step-one",
    label: "THE DISCOVERY",
    title: ["Let's talk", "about your skin."],
    text: "Tell us about your skin type, concerns, habits and budget. No two skin stories are the same."
  },
  {
    id: "match",
    number: "02",
    className: "step-two",
    label: "THE MATCH",
    title: ["Meet your", "skin soulmate."],
    text: "Discover your skincare profile and explore a routine selected around your preferences."
  },
  {
    id: "glow-up",
    number: "03",
    className: "step-three",
    label: "THE GLOW-UP",
    title: ["Your routine.", "Your rules."],
    text: "Explore Korean skincare essentials that fit your needs, your lifestyle and your budget."
  }
];

export const ingredients = [
  { id: "centella", name: "Centella Asiatica", text: "Helps soothe and comfort the skin.", image: "images/centella.jpg", alt: "Centella asiatica" },
  { id: "hyaluronic", name: "Hyaluronic Acid", text: "Helps attract and retain moisture.", image: "images/hyauloronic.jpeg", alt: "Hyaluronic acid serum" },
  { id: "niacinamide", name: "Niacinamide", text: "Supports the skin barrier.", image: "images/niacimide.jpg", alt: "Niacinamide serum" },
  { id: "green-tea", name: "Green Tea", text: "Contains antioxidant compounds.", image: "images/green-tea.jpg", alt: "Green tea leaves" },
  { id: "ceramides", name: "Ceramides", text: "Help protect the skin barrier.", image: "images/ceramides.jpg", alt: "Moisturising cream" },
  { id: "snail-mucin", name: "Snail Mucin", text: "Helps hydrate and soften the skin.", image: "images/snail-muccin.jpg", alt: "Snail mucin essence" },
  { id: "rice", name: "Rice Extract", text: "Used in skincare to soften and moisturise.", image: "images/rice-extract.jpg", alt: "Rice grains" },
  { id: "vitamin-c", name: "Vitamin C", text: "Helps brighten the appearance of the skin and improve uneven skin tone.", image: "images/vitamin-c.jpg", alt: "Vitamin C skincare serum" },
  { id: "collagen", name: "Collagen", text: "Helps hydrate and soften the skin, supporting a smoother-looking complexion.", image: "images/collagen.jpg", alt: "Collagen skincare serum" },
  { id: "salicylic", name: "Salicylic Acid (BHA)", text: "Exfoliates inside pores, helping reduce congestion and the appearance of blemishes.", image: "images/salicylic-acid.jpg", alt: "Salicylic acid skincare serum" },
  { id: "glycolic", name: "Glycolic Acid (AHA)", text: "Gently exfoliates the skin's surface, helping improve texture and radiance.", image: "images/glycolic-acid.jpg", alt: "Glycolic acid skincare treatment" },
  { id: "retinol", name: "Retinol", text: "Supports skin renewal and helps reduce the appearance of fine lines and wrinkles.", image: "images/retinol.jpg", alt: "Retinol skincare serum" },
  { id: "peptides", name: "Peptides", text: "Help support hydration and improve the appearance of skin firmness.", image: "images/peptides.jpg", alt: "Peptide skincare serum" }
];

export const shopFilters = [
  { id: "all", label: "All" },
  { id: "must-have", label: "Must Have" },
  { id: "hydration", label: "Hydration" },
  { id: "blemishes", label: "Blemishes" },
  { id: "glow", label: "Glow" },
  { id: "sensitive", label: "Sensitive skin" },
  { id: "anti-age", label: "Anti-age" }
];

// Label shown on the product photo for each category
export const categoryLabels = {
  hydration: "HYDRATION",
  blemishes: "BLEMISHES",
  glow: "GLOW",
  sensitive: "SENSITIVE SKIN",
  "anti-age": "ANTI-AGE"
};

export const reviews = [
  { id: "emma", name: "Emma", image: "images/emma.jpg", text: "I finally found a skincare routine that works for my skin. The recommendations are simple and easy to follow." },
  { id: "kevin", name: "Kevin", image: "images/kevin.jpg", text: "I love how the website helps me understand which ingredients are suitable for my skincare needs." },
  { id: "sara", name: "Sara", image: "images/sara.jpg", text: "The quiz made choosing my skincare products much easier. Everything feels more personalised." }
];

export const contactLinks = [
  { id: "email", number: "01", small: "DROP US A LINE", title: "Email", text: "iulm.group@skinmatch.com", href: "mailto:iulm.group@skinmatch.com" },
  { id: "whatsapp", number: "02", small: "LET'S CHAT", title: "WhatsApp", text: "Send us a message", href: "https://wa.me/393299764612" },
  { id: "instagram", number: "03", small: "FOLLOW THE GLOW", title: "Instagram", text: "@skinmatch", href: "https://www.instagram.com/skinmatch/" }
];

export const footerLinks = [
  { href: "#discover", number: "01", label: "About us" },
  { href: "#how-it-works", number: "02", label: "How it works" },
  { href: "#shop", number: "03", label: "Shop" },
  { href: "#community", number: "04", label: "Community" },
  { href: "#contacts", number: "05", label: "Contacts" }
];
