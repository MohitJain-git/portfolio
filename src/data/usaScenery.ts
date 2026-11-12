export interface SceneryPhoto {
  id: string;
  title: string;
  location: string;
  state: string;
  coordinates: string;
  dateLabel: string;
  src: string;
  orientation: "landscape" | "portrait";
  caption: string;
  gradeProfile: string;
}

export interface RoadTripStop {
  id: string;
  legNumber: string;
  stopName: string;
  shortLabel: string;
  routeTransition: string;
  stateCode: string;
  milesCumulative: string;
  elevation: string;
  accentHex: string;
  badgeClass: string;
  glowStyle: string;
  story: string;
  photos: SceneryPhoto[];
}

export const ROAD_TRIP_STOPS: RoadTripStop[] = [
  {
    id: "arizona",
    legNumber: "01",
    stopName: "Grand Canyon South Rim",
    shortLabel: "Arizona",
    routeTransition: "Origin · Arizona High Country",
    stateCode: "AZ",
    milesCumulative: "230 mi",
    elevation: "7,400 ft",
    accentHex: "#FF7A59",
    badgeClass: "border-[#FF7A59]/45 bg-[#FF7A59]/15 text-[#FFB4A1]",
    glowStyle: "radial-gradient(circle, rgba(255,122,89,0.28) 0%, rgba(245,158,11,0.12) 60%, transparent 100%)",
    story:
      "Setting out north from Tempe across the Colorado Plateau to the South Rim along Desert View Drive — overlooking Horseshoe Mesa from Grandview Point and the Colorado River bend at Desert View.",
    photos: [
      {
        id: "az-grand-canyon",
        title: "Grandview Point & Horseshoe Mesa",
        location: "Grandview Point Overlook, South Rim, AZ",
        state: "AZ",
        coordinates: "35.9985° N, 111.9877° W",
        dateLabel: "Leg 01 · Grand Canyon",
        src: "/photos/usa/az-grand-canyon.jpg",
        orientation: "landscape",
        caption:
          "Overlooking the flat-topped Redwall limestone plateau of Horseshoe Mesa and the inner gorge from Grandview Point (7,400 ft).",
        gradeProfile: "Kodachrome 64 · Warm Canyon Split-Tone",
      },
      {
        id: "az-watchtower",
        title: "Desert View Overlook & Colorado River Bend",
        location: "Desert View Point, Eastern South Rim, AZ",
        state: "AZ",
        coordinates: "36.0443° N, 111.8261° W",
        dateLabel: "Leg 01 · Grand Canyon",
        src: "/photos/usa/az-watchtower-canyon.jpg",
        orientation: "landscape",
        caption:
          "Looking across the Unkar Creek basin from Desert View Point where the Colorado River bends north toward the Palisades of the Desert.",
        gradeProfile: "Kodachrome 64 · Deep Shadow Contrast",
      },
    ],
  },
  {
    id: "zion",
    legNumber: "02",
    stopName: "Zion National Park",
    shortLabel: "Zion",
    routeTransition: "Arizona ➔ Zion, Utah",
    stateCode: "UT",
    milesCumulative: "485 mi",
    elevation: "5,580 ft",
    accentHex: "#F97316",
    badgeClass: "border-orange-400/45 bg-orange-500/15 text-orange-200",
    glowStyle: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, rgba(234,88,12,0.12) 60%, transparent 100%)",
    story:
      "Crossing the Utah border into Zion National Park, where 2,000-foot Navajo sandstone monoliths and cross-bedded Jurassic slickrock domes rise sheer above the Virgin River valley.",
    photos: [
      {
        id: "ut-zion-towers",
        title: "Towers of the Virgin & West Temple",
        location: "Canyon Junction, Zion National Park, UT",
        state: "UT",
        coordinates: "37.2128° N, 112.9613° W",
        dateLabel: "Leg 02 · May 12",
        src: "/photos/usa/ut-zion-towers.jpg",
        orientation: "landscape",
        caption:
          "Crimson and ivory Navajo sandstone walls of the Towers of the Virgin rising above the high-desert floor in Zion Canyon.",
        gradeProfile: "Ektar 100 · Red Rock Vibrance Grade",
      },
      {
        id: "ut-zion-checkerboard",
        title: "East Zion Cross-Bedded Slickrock Domes",
        location: "Zion-Mount Carmel Highway (UT-9), Utah",
        state: "UT",
        coordinates: "37.2303° N, 112.8788° W",
        dateLabel: "Leg 02 · May 12",
        src: "/photos/usa/ut-zion-checkerboard.jpg",
        orientation: "landscape",
        caption:
          "Fossilized Jurassic sand dunes etched with horizontal bedding planes and vertical weathering grooves along East Zion.",
        gradeProfile: "Ektar 100 · High Desert Ochre Grade",
      },
    ],
  },
  {
    id: "vegas",
    legNumber: "03",
    stopName: "Las Vegas Strip",
    shortLabel: "Vegas",
    routeTransition: "Zion ➔ Las Vegas, Nevada",
    stateCode: "NV",
    milesCumulative: "655 mi",
    elevation: "2,001 ft",
    accentHex: "#A78BFA",
    badgeClass: "border-violet-400/45 bg-violet-500/15 text-violet-200",
    glowStyle: "radial-gradient(circle, rgba(167,139,250,0.28) 0%, rgba(236,72,153,0.12) 60%, transparent 100%)",
    story:
      "Descending from Utah’s red rock canyons into the Mojave neon oasis — experiencing The Sphere’s 580,000-sq-ft exterior LED exosphere and 16K interior dome before walking the Strip past the Luxor Sky Beam.",
    photos: [
      {
        id: "nv-vegas-sphere",
        title: "The Sphere: 580K-sq-ft Exosphere & 16K Dome",
        location: "Paradise / Las Vegas Strip, Nevada",
        state: "NV",
        coordinates: "36.1220° N, 115.1628° W",
        dateLabel: "Leg 03 · May 13",
        src: "/photos/usa/nv-vegas-sphere.jpg",
        orientation: "landscape",
        caption:
          "1.2 million exterior LED pucks wrapped around a 160,000-sq-ft 16K × 16K interior wraparound LED dome.",
        gradeProfile: "Cinestill 800T · Neon Daylight Grade",
      },
      {
        id: "nv-vegas-luxor",
        title: "Luxor Sky Beam & Great Sphinx at Night",
        location: "South Las Vegas Strip, Nevada",
        state: "NV",
        coordinates: "36.0955° N, 115.1738° W",
        dateLabel: "Leg 03 · May 13",
        src: "/photos/usa/nv-vegas-luxor.jpg",
        orientation: "portrait",
        caption:
          "A 42.3-billion-candela xenon light beam piercing the Mojave night sky behind the 110-foot Great Sphinx of Giza replica.",
        gradeProfile: "Cinestill 800T · Tungsten Halation Grade",
      },
    ],
  },
  {
    id: "death-valley",
    legNumber: "04",
    stopName: "Death Valley National Park",
    shortLabel: "Death Valley",
    routeTransition: "Vegas ➔ Death Valley, California",
    stateCode: "CA",
    milesCumulative: "795 mi",
    elevation: "-282 ft",
    accentHex: "#FBBF24",
    badgeClass: "border-amber-400/45 bg-amber-500/15 text-amber-200",
    glowStyle: "radial-gradient(circle, rgba(251,191,36,0.28) 0%, rgba(245,158,11,0.12) 60%, transparent 100%)",
    story:
      "Driving west into the lowest, hottest basin in North America — sculpted golden mudstone badlands at Zabriskie Point and the blinding white salt flats of Badwater Basin 282 feet below sea level.",
    photos: [
      {
        id: "ca-death-valley-zabriskie",
        title: "Zabriskie Point Golden Mudstone Badlands",
        location: "Zabriskie Point, Death Valley NP, CA",
        state: "CA",
        coordinates: "36.4206° N, 116.8119° W",
        dateLabel: "Leg 04 · May 14",
        src: "/photos/usa/ca-death-valley-zabriskie.jpg",
        orientation: "landscape",
        caption:
          "Eroded five-million-year-old Furnace Creek lakebed sediments rippled like golden dunes beneath the Panamint Range.",
        gradeProfile: "Gold 200 · Desert Ochre & Cobalt Grade",
      },
      {
        id: "ca-death-valley-badwater",
        title: "Badwater Basin White Salt Flats (-282 ft)",
        location: "Badwater Basin, Death Valley NP, CA",
        state: "CA",
        coordinates: "36.2300° N, 116.7687° W",
        dateLabel: "Leg 04 · May 14",
        src: "/photos/usa/ca-death-valley-badwater.jpg",
        orientation: "landscape",
        caption:
          "Walking across vast crystalline halite salt plains at the lowest elevation in North America (-282 ft) beneath Telescope Peak.",
        gradeProfile: "Gold 200 · High-Key Salt Flat Grade",
      },
    ],
  },
  {
    id: "sequoia",
    legNumber: "05",
    stopName: "Sequoia & Kings Canyon",
    shortLabel: "Sequoia",
    routeTransition: "Death Valley ➔ Sequoia, California",
    stateCode: "CA",
    milesCumulative: "1,150 mi",
    elevation: "6,900 ft",
    accentHex: "#34D399",
    badgeClass: "border-emerald-400/45 bg-emerald-500/15 text-emerald-200",
    glowStyle: "radial-gradient(circle, rgba(52,211,153,0.26) 0%, rgba(16,185,129,0.12) 60%, transparent 100%)",
    story:
      "Climbing over 7,000 vertical feet out of the desert floor into the Giant Forest of the Sierra Nevada — standing beneath 2,000-year-old Giant Sequoias and overlooking Moro Rock and Castle Rocks.",
    photos: [
      {
        id: "ca-sequoia-canopy",
        title: "Sunbeams Through the Giant Forest",
        location: "Giant Forest, Sequoia National Park, CA",
        state: "CA",
        coordinates: "36.5647° N, 118.7734° W",
        dateLabel: "Leg 05 · May 15",
        src: "/photos/usa/ca-sequoia-canopy.jpg",
        orientation: "portrait",
        caption:
          "Looking straight up 250+ feet of cinnamon-red Sequoiadendron giganteum trunks piercing the high-Sierra canopy.",
        gradeProfile: "Portra 400 · Lush Forest & Warm Sunburst",
      },
      {
        id: "ca-sequoia-sierra",
        title: "Castle Rocks & Moro Rock Granite Crest",
        location: "Generals Highway Overlook, Sequoia NP, CA",
        state: "CA",
        coordinates: "36.5042° N, 118.8091° W",
        dateLabel: "Leg 05 · May 15",
        src: "/photos/usa/ca-sequoia-sierra.jpg",
        orientation: "landscape",
        caption:
          "Jagged granite spires of Castle Rocks (9,145 ft) and the rounded dome of Moro Rock rising above the Kaweah River gorge.",
        gradeProfile: "Portra 400 · Alpine Emerald Grade",
      },
    ],
  },
  {
    id: "yosemite",
    legNumber: "06",
    stopName: "Yosemite National Park",
    shortLabel: "Yosemite",
    routeTransition: "Sequoia ➔ Yosemite, California",
    stateCode: "CA",
    milesCumulative: "1,330 mi",
    elevation: "7,214 ft",
    accentHex: "#2DD4BF",
    badgeClass: "border-teal-400/45 bg-teal-500/15 text-teal-200",
    glowStyle: "radial-gradient(circle, rgba(45,212,191,0.26) 0%, rgba(56,189,248,0.12) 60%, transparent 100%)",
    story:
      "Continuing north along the Sierra Nevada to Yosemite — standing eye-to-eye with Half Dome at Glacier Point and looking east through Tunnel View as spring snowmelt powers Bridalveil Fall.",
    photos: [
      {
        id: "ca-yosemite-half-dome",
        title: "Half Dome from Glacier Point (7,214 ft)",
        location: "Glacier Point, Yosemite National Park, CA",
        state: "CA",
        coordinates: "37.7306° N, 119.5737° W",
        dateLabel: "Leg 06 · May 16",
        src: "/photos/usa/ca-yosemite-half-dome.jpg",
        orientation: "landscape",
        caption:
          "Standing 3,200 feet above Yosemite Valley floor face-to-face with the sheer northwest granite face of Half Dome (8,842 ft).",
        gradeProfile: "Portra 400 · Crisp Granite & Sky Grade",
      },
      {
        id: "ca-yosemite-falls",
        title: "Tunnel View: Bridalveil Fall & Half Dome",
        location: "Tunnel View Overlook (WA-41), Yosemite NP",
        state: "CA",
        coordinates: "37.7159° N, 119.6774° W",
        dateLabel: "Leg 06 · May 16",
        src: "/photos/usa/ca-yosemite-falls.jpg",
        orientation: "landscape",
        caption:
          "Looking east from Tunnel View as Bridalveil Fall plunges 620 feet down Cathedral Rocks with Half Dome rising in the distance.",
        gradeProfile: "Portra 400 · Deep Cobalt & Mist Grade",
      },
    ],
  },
  {
    id: "sf",
    legNumber: "07",
    stopName: "San Francisco & Marin",
    shortLabel: "San Francisco",
    routeTransition: "Yosemite ➔ San Francisco, CA",
    stateCode: "CA",
    milesCumulative: "1,520 mi",
    elevation: "520 ft",
    accentHex: "#FB7185",
    badgeClass: "border-rose-400/45 bg-rose-500/15 text-rose-200",
    glowStyle: "radial-gradient(circle, rgba(251,113,133,0.26) 0%, rgba(251,146,60,0.12) 60%, transparent 100%)",
    story:
      "Trading granite peaks for the Pacific coast — watching golden hour light up the full span of the Golden Gate Bridge from the Marin Headlands after visiting the Pier 39 waterfront.",
    photos: [
      {
        id: "ca-sf-golden-gate",
        title: "Golden Gate Bridge & Skyline from Marin",
        location: "Conzelman Road, Marin Headlands, CA",
        state: "CA",
        coordinates: "37.8323° N, 122.4914° W",
        dateLabel: "Leg 07 · May 18",
        src: "/photos/usa/ca-sf-golden-gate.jpg",
        orientation: "landscape",
        caption:
          "The full 1.7-mile International Orange suspension span stretching across the Golden Gate strait toward downtown San Francisco.",
        gradeProfile: "Kodachrome 64 · International Orange Grade",
      },
      {
        id: "ca-sf-bay-waterfront",
        title: "Pier 39 Sea Lion Docks & Golden Gate Horizon",
        location: "Pier 39 K-Dock, San Francisco, CA",
        state: "CA",
        coordinates: "37.8106° N, 122.4112° W",
        dateLabel: "Leg 07 · May 18",
        src: "/photos/usa/ca-sf-bay-waterfront.jpg",
        orientation: "landscape",
        caption:
          "California sea lions basking on Pier 39’s floating K-Dock with the Golden Gate Bridge and Marin Headlands silhouetted in the distance.",
        gradeProfile: "Kodachrome 64 · Bay Maritime Grade",
      },
    ],
  },
  {
    id: "big-sur-la",
    legNumber: "08",
    stopName: "Big Sur & Los Angeles",
    shortLabel: "Big Sur ➔ LA",
    routeTransition: "SF ➔ Big Sur Highway 1 ➔ LA",
    stateCode: "CA",
    milesCumulative: "1,910 mi",
    elevation: "380 ft",
    accentHex: "#38BDF8",
    badgeClass: "border-sky-400/45 bg-sky-500/15 text-sky-200",
    glowStyle: "radial-gradient(circle, rgba(56,189,248,0.26) 0%, rgba(251,146,60,0.15) 60%, transparent 100%)",
    story:
      "Winding south along Highway 1 past Big Sur’s McWay Falls plunging directly into a turquoise Pacific cove, before arriving in Los Angeles for sunset over Mount Lee.",
    photos: [
      {
        id: "ca-big-sur-mcway",
        title: "McWay Falls Turquoise Cove, Big Sur",
        location: "Julia Pfeiffer Burns State Park, Highway 1",
        state: "CA",
        coordinates: "36.1596° N, 121.6720° W",
        dateLabel: "Leg 08 · May 21",
        src: "/photos/usa/ca-big-sur-mcway.jpg",
        orientation: "portrait",
        caption:
          "An 80-foot perennial tidefall cascading off coastal cliffs into a sheltered turquoise cove along California’s Highway 1.",
        gradeProfile: "Ektar 100 · Pacific Turquoise & Cypress Grade",
      },
      {
        id: "ca-la-hollywood",
        title: "Mount Lee & Santa Monica Mountains Dusk",
        location: "Griffith Observatory Overlook, Los Angeles",
        state: "CA",
        coordinates: "34.1184° N, 118.3009° W",
        dateLabel: "Leg 08 · May 22",
        src: "/photos/usa/ca-la-hollywood.jpg",
        orientation: "landscape",
        caption:
          "Warm California tangerine dusk settling behind Mount Lee and the Hollywood Hills from Griffith Park.",
        gradeProfile: "Kodachrome 64 · Sunset Tangerine Grade",
      },
    ],
  },
  {
    id: "san-diego",
    legNumber: "09",
    stopName: "San Diego Pacific Finale",
    shortLabel: "San Diego",
    routeTransition: "LA ➔ San Diego Coast Finale",
    stateCode: "CA",
    milesCumulative: "2,040 mi",
    elevation: "15 ft",
    accentHex: "#F59E0B",
    badgeClass: "border-amber-400/45 bg-amber-500/15 text-amber-200",
    glowStyle: "radial-gradient(circle, rgba(245,158,11,0.28) 0%, rgba(244,63,94,0.14) 60%, transparent 100%)",
    story:
      "The final stop of the West Coast road trip — watching the sun sink into the Pacific Ocean at the southernmost beach pier in California.",
    photos: [
      {
        id: "ca-sd-pacific-pier",
        title: "Imperial Beach Pier Sunset Horizon",
        location: "Imperial Beach, San Diego, California",
        state: "CA",
        coordinates: "32.5775° N, 117.1326° W",
        dateLabel: "Leg 09 · May 24",
        src: "/photos/usa/ca-sd-pacific-pier.jpg",
        orientation: "landscape",
        caption:
          "Golden Pacific surf reflecting the final sunset of the 2,000+ mile Southwest & California journey.",
        gradeProfile: "Kodachrome 64 · Pacific Gold Finale",
      },
    ],
  },
];
