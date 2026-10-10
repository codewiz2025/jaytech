export type Category = "AI & Technology" | "Education" | "E-commerce" | "Business Websites" | "Creative Projects";

export const CATEGORIES: ("All" | Category)[] = ["All", "AI & Technology", "Education", "E-commerce", "Business Websites", "Creative Projects"];

export type Project = {
  id: number;
  name: string;
  url: string;
  category: Category;
  description: string;
  featured?: boolean;
  /** Optional real screenshot, e.g. "/projects/j2bot.jpg" (drop the file in /public/projects). */
  image?: string;
  /** Two accent hues used for the representative visual (not a screenshot). */
  hue: [number, number];
  tags: string[];
};

// Names, URLs and descriptions are preserved exactly as supplied by JayTech.
export const PROJECTS: Project[] = [
  { id: 1, name: "J2 Bot Chat App", url: "https://j2bot.netlify.app", category: "AI & Technology", featured: true, hue: [215, 265], tags: ["AI", "Chat"], description: "An AI-powered chat platform designed to provide interactive conversations and intelligent assistance." },
  { id: 2, name: "Edunova Learning", url: "https://edunova2026.netlify.app", category: "Education", featured: true, hue: [160, 205], tags: ["Education", "LMS"], description: "An educational platform designed to support student learning, school management, and digital education." },
  { id: 3, name: "Becky Apparel Store", url: "https://codewiz2025.github.io", category: "E-commerce", hue: [330, 20], tags: ["Fashion", "Store"], description: "A fashion e-commerce website for showcasing clothing collections and helping customers explore apparel products." },
  { id: 4, name: "D37 Fashion Atelier", url: "https://codewiz2025.github.io", category: "E-commerce", hue: [285, 330], tags: ["Fashion", "Bookings"], description: "A fashion website showcasing designs, promoting the brand, and providing a convenient way for customers to make bookings." },
  { id: 5, name: "Peach Glow Studio", url: "https://peachglow.netlify.app", category: "Creative Projects", hue: [18, 350], tags: ["Design", "Branding"], description: "A creative design platform showcasing services such as flyer design, logo creation, and business branding." },
  { id: 6, name: "Viora Handmade", url: "https://chiworld-studio.netlify.app", category: "E-commerce", hue: [35, 12], tags: ["Handmade", "Store"], description: "An online storefront for handmade crafts, allowing customers to explore unique and creative products." },
  { id: 7, name: "Grain Rich", url: "https://codewiz2025.github.io", category: "Business Websites", hue: [95, 140], tags: ["Food", "Organic"], description: "A food-focused business website promoting organic food products, grains, and delicacies." },
  { id: 8, name: "J2Bot Pro", url: "https://j2botpro.lovable.app", category: "AI & Technology", featured: true, hue: [250, 200], tags: ["AI", "Chatbot"], description: "An advanced AI chatbot platform designed to deliver intelligent assistance and an enhanced conversational experience." },
  { id: 9, name: "JayTech Football", url: "https://jayfp.lovable.app", category: "AI & Technology", hue: [140, 175], tags: ["Football", "Stats"], description: "A football-focused platform for football management, statistics, and related football information." },
  { id: 10, name: "Echo Earth Explorer", url: "https://echoearth26.lovable.app", category: "AI & Technology", hue: [150, 195], tags: ["Environment", "Data"], description: "An environmental exploration platform focused on presenting information about nature, the environment, and the Earth." },
  { id: 11, name: "Glory & Honour Academy", url: "https://glory-honour-academy.lovable.app", category: "Education", featured: true, hue: [225, 45], tags: ["School", "Resources"], description: "An educational website designed to support a school's online presence and provide useful resources for students and teachers." },
  { id: 12, name: "JayTech Site AI", url: "https://jaytech-siteai.lovable.app", category: "AI & Technology", featured: true, hue: [205, 280], tags: ["AI", "Builder"], description: "An AI-powered website-building platform intended to simplify website creation and help users develop digital experiences." },
  { id: 13, name: "Salon Web Template", url: "https://jaytech-salon-template.lovable.app", category: "Business Websites", hue: [320, 25], tags: ["Salon", "Template"], description: "A modern salon website template for displaying services, showcasing the business, and supporting appointment bookings." },
  { id: 14, name: "Siftora Kids", url: "https://kids.siftora.com", category: "Education", hue: [45, 190], tags: ["Kids", "Learning"], description: "A child-focused educational platform designed to make learning and educational resources more accessible to young learners." },
  { id: 15, name: "Dave Tech", url: "https://dave-tech.mobirisesite.com", category: "Business Websites", hue: [200, 235], tags: ["Technology", "Brand"], description: "A technology business website presenting the brand and its technology-related offerings." },
  { id: 16, name: "Knaps Academy", url: "https://www.knapsacademy.com", category: "Education", hue: [260, 215], tags: ["Academy", "Promo"], description: "A promotional website created to showcase Knaps Academy, communicate its offerings, and strengthen its online presence." },
  { id: 17, name: "Pekaf", url: "https://www.pekaf.com", category: "Business Websites", hue: [10, 40], tags: ["Brand", "Promo"], description: "A promotional business website designed to introduce the Pekaf brand, highlight its offerings, and improve its digital visibility." },
  { id: 18, name: "Mathplus Virtual Classes", url: "https://www.mathplus.club", category: "Education", featured: true, hue: [190, 250], tags: ["Maths", "Virtual classes"], description: "An online learning platform providing a digital medium for virtual classes and mathematics-focused learning." },
  { id: 19, name: "PeachPie", url: "https://peachpie.jaytech.online", category: "E-commerce", hue: [24, 345], tags: ["Handmade", "Nigeria"], description: "Peach Creations — a JayTech-built storefront presenting trendy, elegant and affordable handmade pieces made with love in Nigeria." },
  { id: 20, name: "PeachTech", url: "https://peachtech.jaytech.online", category: "Business Websites", hue: [20, 220], tags: ["Software", "Cloud & AI"], description: "A JayTech-hosted company website for PeachTech, presenting its web, mobile, cloud and AI engineering services with pages for About, Services, Solutions and Contact." },
];
