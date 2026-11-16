import { STANDARD_ROOM_ASSETS } from './propertyRooms';

const CATEGORY_META = {
  apartment: { label: 'Smart Apartment', type: 'Apartment', beds: 2, baths: 2, sqft: '1,050' },
  villa: { label: 'Luxury Villa', type: 'Premium Villa', beds: 3, baths: 3, sqft: '1,800' },
  'sea-view': { label: 'Sea View Residence', type: 'Sea View Apartment', beds: 3, baths: 2, sqft: '1,200' },
  penthouse: { label: 'Premium Penthouse', type: 'Penthouse', beds: 3, baths: 3, sqft: '1,650' },
  commercial: { label: 'Commercial Suite', type: 'Commercial', beds: 0, baths: 0, sqft: '2,400' },
  plot: { label: 'CMDA Approved Plot', type: 'Residential Plot', beds: 0, baths: 0, sqft: '1,500' }
};

const BUDGET_PRICES = {
  '< 50L': { priceVal: 4200000, tokenAmount: 15000 },
  '50L - 1Cr': { priceVal: 7800000, tokenAmount: 20000 },
  '1Cr - 2Cr': { priceVal: 14500000, tokenAmount: 35000 },
  '2Cr - 3.5Cr': { priceVal: 26500000, tokenAmount: 50000 },
  '> 3.5Cr': { priceVal: 42000000, tokenAmount: 75000 }
};

function getSeedIndex(seedStr, max) {
  if (!seedStr) return 0;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

function buildFiveRoomGallery(category, seed) {
  const isPlot = category === 'plot';
  const plotAssets = STANDARD_ROOM_ASSETS.plot;
  const hallIdx = getSeedIndex(seed + '-hall', STANDARD_ROOM_ASSETS.hall.length);
  const bedIdx = getSeedIndex(seed + '-bed', STANDARD_ROOM_ASSETS.bedroom.length);
  const kitchIdx = getSeedIndex(seed + '-kitch', STANDARD_ROOM_ASSETS.kitchen.length);
  const bathIdx = getSeedIndex(seed + '-bath', STANDARD_ROOM_ASSETS.bathroom.length);

  if (isPlot) {
    return [
      { name: 'Gated Entrance Arch', tag: '🚪 Grand Entry Arch', image: plotAssets[hallIdx % plotAssets.length], desc: 'Secured gated community entrance with 24/7 security booth' },
      { name: 'Blacktop Avenue Roads', tag: '🛣️ 40ft Internal Roads', image: plotAssets[(bedIdx + 1) % plotAssets.length], desc: 'Wide internal tar roads with underground cabling & streetlights' },
      { name: 'Township Community Park', tag: '🎪 Parks & Greenery', image: plotAssets[(kitchIdx + 2) % plotAssets.length], desc: 'Landscaped children play area & walking promenade' },
      { name: 'Surrounding Corridor Access', tag: '🗺️ Prime Highway Access', image: plotAssets[(bathIdx + 3) % plotAssets.length], desc: 'Close connectivity to metro, IT parks and arterial highways' }
    ];
  }

  return [
    { name: 'Living & Dining Hall', tag: '🍽️ Living Room & Hall', image: STANDARD_ROOM_ASSETS.hall[hallIdx], desc: 'Spacious open hall with vitrified marble flooring & false ceiling' },
    { name: 'Master Bedroom', tag: '🛏️ Master Bedroom', image: STANDARD_ROOM_ASSETS.bedroom[bedIdx], desc: 'King size bed suite with wooden flooring & built-in wardrobe' },
    { name: 'Modular Kitchen', tag: '🍳 Modular Kitchen', image: STANDARD_ROOM_ASSETS.kitchen[kitchIdx], desc: 'Granite countertop, chimney & soft-close cabinets' },
    { name: 'Luxury Bathroom', tag: '🚿 Bathroom & Pipes', image: STANDARD_ROOM_ASSETS.bathroom[bathIdx], desc: 'Rain shower, anti-skid tiles & chrome high-pressure fittings' }
  ];
}

export function buildLocationSlotListing({ location, category = 'all', budget = 'All', searchTerm = '' }) {
  const locName = (location && location !== 'All' ? location : searchTerm.trim()) || 'Chennai';
  const cat = category === 'all' ? 'apartment' : category;
  const meta = CATEGORY_META[cat] || CATEGORY_META.apartment;
  const budgetInfo = BUDGET_PRICES[budget] || { priceVal: 6500000, tokenAmount: 20000 };
  const seed = `${locName}-${cat}`.toLowerCase();
  const hallIdx = getSeedIndex(seed, STANDARD_ROOM_ASSETS.hall.length);
  const mainImage = cat === 'plot'
    ? STANDARD_ROOM_ASSETS.plot[hallIdx % STANDARD_ROOM_ASSETS.plot.length]
    : STANDARD_ROOM_ASSETS.hall[hallIdx];

  const priceFormatted = `₹${budgetInfo.priceVal.toLocaleString('en-IN')}`;

  return {
    id: `loc-slot-${seed.replace(/\s+/g, '-')}`,
    title: `${locName} Verified ${meta.label}`,
    price: priceFormatted,
    priceVal: budgetInfo.priceVal,
    tokenAmount: budgetInfo.tokenAmount,
    pricePerSqft: `₹${Math.round(budgetInfo.priceVal / (Number(String(meta.sqft).replace(/,/g, '')) || 1200)).toLocaleString('en-IN')}/sq.ft`,
    location: `${locName}, Chennai`,
    city: 'Chennai',
    area: locName,
    type: meta.type,
    category: cat,
    purpose: 'buy',
    beds: meta.beds,
    baths: meta.baths,
    sqft: meta.sqft,
    image: mainImage,
    roomsGallery: buildFiveRoomGallery(cat, seed),
    maxRoomCount: 5,
    badge: budget === '< 50L' ? 'UNDER 50L' : 'VERIFIED SLOT',
    status: 'For Sale',
    verified: true,
    rating: 4.8,
    isLocationSlot: true,
    description: `100% CMDA & TN RERA verified ${meta.label.toLowerCase()} in ${locName}. Book an inspection slot with refundable token advance.`
  };
}

export function hasActiveLocationSearch(selectedLocation, searchTerm) {
  return selectedLocation !== 'All' || Boolean(searchTerm.trim());
}
