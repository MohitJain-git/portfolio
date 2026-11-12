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
    elevation: "7,000 ft",
    accentHex: "#FF7A59",
    badgeClass: "border-[#FF7A59]/45 bg-[#FF7A59]/15 text-[#FFB4A1]",
    glowStyle: "radial-gradient(circle, rgba(255,122,89,0.28) 0%, rgba(245,158,11,0.12) 60%, transparent 100%)",
    story:
      "Setting out north from Tempe across the Colorado Plateau to the Mile-Deep chasm of the Grand Canyon — two billion years of geological strata glowing warm terracotta under the Arizona sun.",
    photos: [
      {
        id: "az-grand-canyon",
        title: "Mather Point Chasm & Red Terraces",
        location: "Grand Canyon South Rim, Arizona",
        state: "AZ",
        coordinates: "36.0603° N, 112.1069° W",
        dateLabel: "Leg 01 · May 11",
        src: "/photos/usa/az-grand-canyon.jpg",
        orientation: "portrait",
        caption:
          "Miles of layered Vishnu schist and Kaibab limestone dropping into the Colorado River gorge.",
        gradeProfile: "Kodachrome 64 · Warm Canyon Split-Tone",
      },
      {
        id: "az-watchtower",
        title: "Desert View Watchtower Frame",
        location: "Eastern South Rim, Arizona",
        state: "AZ",
        coordinates: "36.0442° N, 111.8262° W",
        dateLabel: "Leg 01 · May 11",
        src: "/photos/usa/az-watchtower-canyon.jpg",
        orientation: "portrait",
        caption:
          "Looking out through Mary Colter’s stone watchtower window toward the Painted Desert.",
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
    elevation: "6,500 ft",
    accentHex: "#F97316",
    badgeClass: "border-orange-400/45 bg-orange-500/15 text-orange-200",
    glowStyle: "radial-gradient(circle, rgba(249,115,22,0.28) 0%, rgba(234,88,12,0.12) 60%, transparent 100%)",
    story:
      "Crossing the Utah border into Zion Canyon, where 2,000-foot Navajo sandstone monoliths rise sheer above the Virgin River valley.",
    photos: [
      {
        id: "ut-zion-towers",
        title: "Towers of the Virgin Monoliths",
        location: "Zion Canyon Scenic Drive, Utah",
        state: "UT",
        coordinates: "37.2128° N, 112.9613° W",
        dateLabel: "Leg 02 · May 12",
        src: "/photos/usa/ut-zion-towers.jpg",
        orientation: "portrait",
        caption:
          "Crimson and ivory sandstone peaks towering above the lush desert floor in Zion National Park.",
        gradeProfile: "Ektar 100 · Red Rock Vibrance Grade",
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
      "Descending from Utah’s red rock canyons into the Mojave neon oasis — trading sandstone monoliths for the 580,000-sq-ft programmable LED exosphere of The Sphere.",
    photos: [
      {
        id: "nv-vegas-sphere",
        title: "The Sphere Geodesic Exosphere",
        location: "Paradise / Las Vegas Strip, Nevada",
        state: "NV",
        coordinates: "36.1220° N, 115.1628° W",
        dateLabel: "Leg 03 · May 13",
        src: "/photos/usa/nv-vegas-sphere.jpg",
        orientation: "portrait",
        caption:
          "1.2 million LED pucks rendering swirling psychedelic art across the world’s largest spherical structure.",
        gradeProfile: "Cinestill 800T · Neon Twilight Grade",
      },
      {
        id: "nv-vegas-luxor",
        title: "Luxor Sky Beam Into the Stratosphere",
        location: "South Las Vegas Strip, Nevada",
        state: "NV",
        coordinates: "36.0955° N, 115.1761° W",
        dateLabel: "Leg 03 · May 13",
        src: "/photos/usa/nv-vegas-luxor.jpg",
        orientation: "portrait",
        caption:
          "39 xenon lamps projecting a 42.3-billion-candela beam straight into the Mojave night sky.",
        gradeProfile: "Cinestill 800T · Cobalt Night Grade",
      },
    ],
  },
  {
    id: "death-valley",
    legNumber: "04",
    stopName: "Death Valley Badlands",
    shortLabel: "Death Valley",
    routeTransition: "Vegas ➔ Death Valley, California",
    stateCode: "CA",
    milesCumulative: "795 mi",
    elevation: "-190 ft to 710 ft",
    accentHex: "#FBBF24",
    badgeClass: "border-amber-400/45 bg-amber-500/15 text-amber-200",
    glowStyle: "radial-gradient(circle, rgba(251,191,36,0.28) 0%, rgba(245,158,11,0.12) 60%, transparent 100%)",
    story:
      "Driving west into the hottest, driest basin in North America — sculpted golden mudstone badlands at Zabriskie Point and endless ribbons of desert asphalt.",
    photos: [
      {
        id: "ca-death-valley-zabriskie",
        title: "Zabriskie Point Golden Badlands",
        location: "Death Valley National Park, California",
        state: "CA",
        coordinates: "36.4206° N, 116.8119° W",
        dateLabel: "Leg 04 · May 14",
        src: "/photos/usa/ca-death-valley-zabriskie.jpg",
        orientation: "landscape",
        caption:
          "Eroded Furnace Creek lakebed sediments rippled like golden sand dunes beneath the Panamint Range.",
        gradeProfile: "Gold 200 · Desert Ochre & Cobalt Grade",
      },
      {
        id: "ca-death-valley-highway",
        title: "CA-190 Desert Horizon Line",
        location: "Panamint Springs Approach, California",
        state: "CA",
        coordinates: "36.3821° N, 117.1842° W",
        dateLabel: "Leg 04 · May 14",
        src: "/photos/usa/ca-death-valley-highway.jpg",
        orientation: "portrait",
        caption:
          "Miles of shimmering heat haze and open highway cutting straight across the Mojave basin.",
        gradeProfile: "Gold 200 · Warm Desert Highlight Grade",
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
      "Climbing over 7,000 vertical feet out of the desert floor into the Giant Forest of the Sierra Nevada — standing beneath 2,200-year-old Sequoiadendron giganteum trunks.",
    photos: [
      {
        id: "ca-sequoia-canopy",
        title: "Sunbeams Through the Giant Forest",
        location: "Giant Forest, Sequoia National Park",
        state: "CA",
        coordinates: "36.5647° N, 118.7734° W",
        dateLabel: "Leg 05 · May 15",
        src: "/photos/usa/ca-sequoia-canopy.jpg",
        orientation: "portrait",
        caption:
          "Looking straight up 275-foot cinnamon-barked Giant Sequoias catching high-altitude Sierra sunlight.",
        gradeProfile: "Portra 400 · Lush Forest & Warm Sunburst",
      },
      {
        id: "ca-sequoia-sierra",
        title: "Moro Rock & High Sierra Crest",
        location: "Generals Highway Vista, Sequoia NP",
        state: "CA",
        coordinates: "36.5042° N, 118.8091° W",
        dateLabel: "Leg 05 · May 15",
        src: "/photos/usa/ca-sequoia-sierra.jpg",
        orientation: "landscape",
        caption:
          "Granite domes and deep forested ridges stretching toward the Great Western Divide.",
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
      "Continuing north along the Sierra Nevada to Yosemite — snowmelt roaring down Upper Yosemite Falls and the sheer granite face of Half Dome from Glacier Point.",
    photos: [
      {
        id: "ca-yosemite-half-dome",
        title: "Half Dome from Glacier Point",
        location: "Glacier Point (7,214 ft), Yosemite NP",
        state: "CA",
        coordinates: "37.7306° N, 119.5737° W",
        dateLabel: "Leg 06 · May 16",
        src: "/photos/usa/ca-yosemite-half-dome.jpg",
        orientation: "landscape",
        caption:
          "Standing 3,200 feet above Yosemite Valley face-to-face with Half Dome and the High Sierra backcountry.",
        gradeProfile: "Portra 400 · Crisp Granite & Sky Grade",
      },
      {
        id: "ca-yosemite-falls",
        title: "Upper Yosemite Falls Peak Snowmelt",
        location: "Yosemite Valley, California",
        state: "CA",
        coordinates: "37.7446° N, 119.5886° W",
        dateLabel: "Leg 06 · May 16",
        src: "/photos/usa/ca-yosemite-falls.jpg",
        orientation: "portrait",
        caption:
          "2,425 feet of thundering spring snowmelt plunging down sheer glacially carved granite.",
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
      "Trading granite peaks for the Pacific coast — watching golden hour light up the 746-foot International Orange towers of the Golden Gate Bridge above the Bay.",
    photos: [
      {
        id: "ca-sf-golden-gate",
        title: "Golden Gate Tower at Golden Hour",
        location: "Battery Spencer, Marin Headlands, CA",
        state: "CA",
        coordinates: "37.8288° N, 122.4860° W",
        dateLabel: "Leg 07 · May 18",
        src: "/photos/usa/ca-sf-golden-gate.jpg",
        orientation: "portrait",
        caption:
          "International Orange steel cables glowing against the San Francisco skyline as evening fog rolls in.",
        gradeProfile: "Kodachrome 64 · International Orange Grade",
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
        coordinates: "36.1598° N, 121.6724° W",
        dateLabel: "Leg 08 · May 21",
        src: "/photos/usa/ca-big-sur-mcway.jpg",
        orientation: "portrait",
        caption:
          "An 80-foot perennial tidefall cascading off coastal cliffs into a sheltered turquoise cove along Big Sur.",
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
          "Warm California tangerine dusk settling behind Mount Lee and the Hollywood Sign ridge.",
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
        location: "San Diego Coast, California",
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
