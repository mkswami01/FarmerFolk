export interface Worker {
  id: string;
  fullName: string;
  photo: string;
  bio: string;
  availability: string;
  marketsWorked: string[];
  verified: boolean;
  yearsExperience: number;
  skills: string[];
}

export const workers: Worker[] = [
  {
    id: "maria-gonzalez",
    fullName: "Maria Gonzalez",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria&backgroundColor=b6e3f4",
    bio: "Experienced booth operator with 3 years at Fort Collins markets. Reliable, great with customers, and comfortable handling cash and card payments. I love connecting with the community and helping vendors have a smooth market day.",
    availability: "Weekends",
    marketsWorked: ["Fort Collins Farmers Market", "Old Town Saturday Market", "Larimer County Farmers Market"],
    verified: true,
    yearsExperience: 3,
    skills: ["Cash handling", "Customer service", "Setup/teardown"],
  },
  {
    id: "james-whitfield",
    fullName: "James Whitfield",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=James&backgroundColor=c0aede",
    bio: "Former retail manager turned farmers market enthusiast. I bring strong organizational skills and a friendly attitude to every booth I work. Happy to handle inventory, customer questions, and end-of-day reconciliation.",
    availability: "Saturdays",
    marketsWorked: ["Fort Collins Farmers Market", "Windsor Farmers Market"],
    verified: true,
    yearsExperience: 2,
    skills: ["Inventory management", "Customer service", "Cash handling"],
  },
  {
    id: "sarah-chen",
    fullName: "Sarah Chen",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc",
    bio: "College student at CSU studying agriculture. I've worked at multiple markets around Northern Colorado and understand the flow of a busy market morning. Energetic, punctual, and always ready to help.",
    availability: "Flexible",
    marketsWorked: ["Fort Collins Farmers Market", "Loveland Farmers Market", "Old Town Saturday Market"],
    verified: true,
    yearsExperience: 1,
    skills: ["Customer service", "Setup/teardown", "Social media"],
  },
  {
    id: "mike-rodriguez",
    fullName: "Mike Rodriguez",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike&backgroundColor=d1f4d1",
    bio: "Retired chef who loves being around fresh produce and local food vendors. I bring food handling knowledge, a warm personality, and years of experience working with the public. Looking for weekend morning shifts.",
    availability: "Weekend mornings",
    marketsWorked: ["Larimer County Farmers Market", "Fort Collins Winter Market"],
    verified: true,
    yearsExperience: 4,
    skills: ["Food handling", "Customer service", "Product knowledge"],
  },
  {
    id: "emily-thompson",
    fullName: "Emily Thompson",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emily&backgroundColor=ffdfbf",
    bio: "Stay-at-home mom looking for flexible weekend work. I've helped friends at their booths for two seasons and decided to make it official. Friendly, organized, and great at upselling products.",
    availability: "Saturdays",
    marketsWorked: ["Fort Collins Farmers Market", "Windsor Farmers Market", "Loveland Farmers Market"],
    verified: true,
    yearsExperience: 2,
    skills: ["Sales", "Customer service", "Cash handling"],
  },
  {
    id: "david-park",
    fullName: "David Park",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=David&backgroundColor=b6e3f4",
    bio: "Freelance photographer who picks up booth shifts between gigs. I'm detail-oriented, comfortable with POS systems, and can also help vendors with product photography on the side.",
    availability: "Flexible",
    marketsWorked: ["Old Town Saturday Market", "Fort Collins Winter Market"],
    verified: true,
    yearsExperience: 1,
    skills: ["POS systems", "Customer service", "Photography"],
  },
  {
    id: "lisa-martinez",
    fullName: "Lisa Martinez",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa&backgroundColor=c0aede",
    bio: "Bilingual (English/Spanish) with experience in customer-facing roles. I've worked at farmers markets in both Colorado and New Mexico. I'm dependable and always show up early.",
    availability: "Weekends",
    marketsWorked: ["Fort Collins Farmers Market", "Larimer County Farmers Market", "Loveland Farmers Market"],
    verified: true,
    yearsExperience: 3,
    skills: ["Bilingual", "Customer service", "Cash handling", "Setup/teardown"],
  },
  {
    id: "tom-baker",
    fullName: "Tom Baker",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Tom&backgroundColor=d1f4d1",
    bio: "New to the farmers market scene but eager to learn. I have a background in hospitality and I'm looking to build a reputation as a reliable booth worker in the Fort Collins area.",
    availability: "Saturdays & Sundays",
    marketsWorked: ["Fort Collins Farmers Market"],
    verified: false,
    yearsExperience: 0,
    skills: ["Customer service", "Hospitality"],
  },
  {
    id: "rachel-nguyen",
    fullName: "Rachel Nguyen",
    photo: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rachel&backgroundColor=ffd5dc",
    bio: "Graduate student researching local food systems. Working at farmers markets combines my academic interest with practical experience. I'm knowledgeable about sustainable agriculture and love talking to customers about local food.",
    availability: "Saturday mornings",
    marketsWorked: ["Fort Collins Farmers Market", "Old Town Saturday Market"],
    verified: false,
    yearsExperience: 1,
    skills: ["Product knowledge", "Customer service", "Education"],
  },
];
