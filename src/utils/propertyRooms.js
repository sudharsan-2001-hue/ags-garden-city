// Centralized Room-by-Room Imagery & Walkthrough Generator
// Ensures every property card has full side-arrow carousel:
// 1. Exterior Elevation -> 2. Living & Dining Hall -> 3. Master Bedroom -> 4. Modular Kitchen -> 5. Bathroom -> 6. Balcony

export const STANDARD_ROOM_ASSETS = {
  // Living Room & Dining Halls
  hall: [
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80'
  ],
  // Master Bedrooms
  bedroom: [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80'
  ],
  // Modular Kitchens
  kitchen: [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
  ],
  // Luxury Bathrooms
  bathroom: [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80'
  ],
  // Balcony / Scenic Terrace
  balcony: [
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507038772120-7fff76f79d74?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
  ],
  // Plot / Land Infrastructure
  plot: [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
  ]
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

export function getPropertyRoomList(property) {
  if (!property) return [];

  const mainImage = property.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
  const type = (property.type || property.propertyType || '').toLowerCase();
  const category = (property.category || '').toLowerCase();
  const seed = String(property.id || property._id || property.title || 'room');

  const isPlot = category === 'plot' || type.includes('plot') || type.includes('land');

  // If the property already has an explicit rich roomsGallery with 3 or more rooms, use it
  if (Array.isArray(property.roomsGallery) && property.roomsGallery.length >= 3) {
    const list = [
      {
        name: 'Exterior Elevation',
        tag: '🏢 Main Elevation',
        image: mainImage,
        desc: 'Front architectural facade & landscaping'
      }
    ];

    property.roomsGallery.forEach((r) => {
      if (r && r.image && r.image !== mainImage) {
        list.push({
          name: r.name || 'Room View',
          tag: r.tag || (r.name ? ('📸 ' + r.name) : '🏠 Room View'),
          image: r.image,
          desc: r.desc || 'High definition verified interior photography'
        });
      }
    });

    if (list.length >= 3) {
      return list;
    }
  }

  // Pick deterministic distinct images for each room
  const hallIdx = getSeedIndex(seed + '-hall', STANDARD_ROOM_ASSETS.hall.length);
  const bedIdx = getSeedIndex(seed + '-bed', STANDARD_ROOM_ASSETS.bedroom.length);
  const kitchIdx = getSeedIndex(seed + '-kitch', STANDARD_ROOM_ASSETS.kitchen.length);
  const bathIdx = getSeedIndex(seed + '-bath', STANDARD_ROOM_ASSETS.bathroom.length);
  const balcIdx = getSeedIndex(seed + '-balc', STANDARD_ROOM_ASSETS.balcony.length);

  if (isPlot) {
    return [
      {
        name: 'Main Plot Frontage',
        tag: '🌳 Plot Frontage',
        image: mainImage,
        desc: 'Front roadside elevation & clear boundary demarcation'
      },
      {
        name: 'Gated Entrance Arch',
        tag: '🚪 Grand Entry Arch',
        image: STANDARD_ROOM_ASSETS.plot[hallIdx % STANDARD_ROOM_ASSETS.plot.length],
        desc: 'Secured gated community entrance with 24/7 security booth'
      },
      {
        name: 'Blacktop Avenue Roads',
        tag: '🛣️ 40ft Internal Roads',
        image: STANDARD_ROOM_ASSETS.plot[(bedIdx + 1) % STANDARD_ROOM_ASSETS.plot.length],
        desc: 'Wide internal tar roads with underground cabling & streetlights'
      },
      {
        name: 'Township Community Park',
        tag: '🎪 Parks & Greenery',
        image: STANDARD_ROOM_ASSETS.plot[(kitchIdx + 2) % STANDARD_ROOM_ASSETS.plot.length],
        desc: 'Landscaped children play area & landscaped walking promenade'
      },
      {
        name: 'Surrounding Corridor Access',
        tag: '🗺️ Prime Highway Access',
        image: STANDARD_ROOM_ASSETS.plot[(bathIdx + 3) % STANDARD_ROOM_ASSETS.plot.length],
        desc: 'Close connectivity to metro station, IT parks and arterial highways'
      }
    ];
  }

  // Standard Residential (Apartment, Villa, House, Penthouse)
  return [
    {
      name: 'Exterior Elevation',
      tag: '🏢 Main Elevation',
      image: mainImage,
      desc: 'Architectural front facade & landscaped entrance'
    },
    {
      name: 'Living & Dining Hall',
      tag: '🍽️ Living Room & Hall',
      image: STANDARD_ROOM_ASSETS.hall[hallIdx],
      desc: 'Spacious open hall with vitrified marble flooring, chandelier & false ceiling'
    },
    {
      name: 'Master Bedroom',
      tag: '🛏️ Master Bedroom',
      image: STANDARD_ROOM_ASSETS.bedroom[bedIdx],
      desc: 'King size bed suite with Italian wooden flooring & built-in teak wardrobe'
    },
    {
      name: 'Modular Kitchen',
      tag: '🍳 Modular Kitchen',
      image: STANDARD_ROOM_ASSETS.kitchen[kitchIdx],
      desc: 'Granite countertop, chimney, stainless sink & soft-close cabinets'
    },
    {
      name: 'Luxury Bathroom',
      tag: '🚿 Bathroom & Pipes',
      image: STANDARD_ROOM_ASSETS.bathroom[bathIdx],
      desc: 'Rain shower, glass partition, anti-skid tiles & chrome high-pressure fittings'
    },
    {
      name: 'Scenic Balcony',
      tag: '🌅 Balcony & View',
      image: STANDARD_ROOM_ASSETS.balcony[balcIdx],
      desc: 'Open scenic balcony with panoramic outdoor view & fresh breeze'
    }
  ];
}
