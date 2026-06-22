const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Admin account
  const hashed = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!", 10);
  await prisma.admin.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL || "admin@abenezerfurniture.com" },
    update: {},
    create: {
      name: "Abenezer Admin",
      email: process.env.SEED_ADMIN_EMAIL || "admin@abenezerfurniture.com",
      password: hashed,
    },
  });

  const categories = [
    "Beds", "Sofas", "Dining Tables", "Chairs",
    "Wardrobes", "Doors", "Office Furniture", "Custom Furniture",
  ];

  const catRecords = {};
  for (const name of categories) {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    catRecords[name] = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  const sample = [
    { name: "Modern King Bed Frame", cat: "Beds", price: 18500, code: "BED-001", size: "King 200x180cm" },
    { name: "Classic Leather Sofa Set", cat: "Sofas", price: 42000, code: "SOF-001", size: "3+2 Seater" },
    { name: "Solid Wood Dining Table (6-Seat)", cat: "Dining Tables", price: 25000, code: "DIN-001", size: "180x90cm" },
    { name: "Executive Office Chair", cat: "Office Furniture", price: 7500, code: "OFC-001", size: "Standard" },
    { name: "Mahogany Wardrobe", cat: "Wardrobes", price: 21000, code: "WRD-001", size: "200x150x60cm" },
    { name: "Carved Wooden Door", cat: "Doors", price: 9800, code: "DOR-001", size: "200x90cm" },
  ];

  for (const p of sample) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.product.upsert({
      where: { code: p.code },
      update: {},
      create: {
        code: p.code,
        name: p.name,
        slug,
        description: `${p.name} — handcrafted by Abenezer Furniture in Dessie, Ethiopia using premium materials. Built to order with attention to detail and durability.`,
        price: p.price,
        size: p.size,
        quantity: 5,
        images: ["/uploads/placeholder.jpg"],
        featured: true,
        categoryId: catRecords[p.cat].id,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
