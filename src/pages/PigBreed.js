import React, { useState } from "react";
import { Dna, MapPin, Scale, Clock, TrendingUp } from "lucide-react";
import "../styles/pages/PigBreed.css";

const PIG_BREEDS = [
  {
    name: "Large White (Yorkshire)",
    category: "Commercial",
    role: "Primary Maternal Nucleus Line",
    origin: "England",
    avgWeight: "250–350 kg",
    lifespan: "10–15 years",
    feedRatio: "1 : 3.0",
    image:
      "https://www.chestnutmill.co.uk/cdn/shop/articles/Large_WHite_Pig_1200x797.jpg?v=1723676818",
    text: [
      "The Large White Yorkshire pig forms the backbone of commercial pork production due to its adaptability, strong frame, and rapid growth rate.",
      "This breed efficiently converts feed into high-quality lean meat, making it economically valuable across Regal Pork Farms LLP's cluster and nucleus units.",
      "Sows deliver large, uniform litters with strong maternal instincts, boosting piglet survival and overall cluster productivity.",
    ],
    growth: { piglet: 30, grower: 140, finisher: 320 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "3–5 mo",
      finisher: "6–8 mo",
    },
  },
  {
    name: "Landrace",
    category: "Commercial",
    role: "F1 Crossbreeding Maternal Line",
    origin: "Denmark",
    avgWeight: "270–320 kg",
    lifespan: "12–15 years",
    feedRatio: "1 : 3.0",
    image:
      "https://i.pinimg.com/474x/33/f0/d7/33f0d71692418d24d68a9349ed1c8848.jpg",
    text: [
      "Landrace pigs are recognized by their elongated body length and drooping ears, bred for controlled farming environments focused on carcass consistency.",
      "The breed excels in lean meat yield and is extensively used in crossbreeding programs with Yorkshire lines to produce high-vigor F1 sows.",
      "Exceptional milk production and litter size make Landrace indispensable to structured genetic improvement programs.",
    ],
    growth: { piglet: 28, grower: 135, finisher: 310 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "3–5 mo",
      finisher: "6–8 mo",
    },
  },
  {
    name: "Duroc",
    category: "Commercial",
    role: "Terminal Sire Line",
    origin: "United States",
    avgWeight: "300–360 kg",
    lifespan: "10–13 years",
    feedRatio: "1 : 3.0",
    image: "https://www.britishpigs.org.uk/images/2020/03/03/duroc-main.jpg",
    text: [
      "Duroc pigs are known for their reddish-brown coat, muscular conformation, and resilience across diverse Indian climatic conditions.",
      "Highly valued for producing well-marbled, tender, and flavorful pork tailored to premium processed meat markets.",
      "Commonly deployed as terminal sires to maximize daily weight gain and carcass efficiency in crossbred finisher batches.",
    ],
    growth: { piglet: 32, grower: 150, finisher: 340 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "3–5 mo",
      finisher: "6–8 mo",
    },
  },
  {
    name: "Berkshire",
    category: "Heritage",
    role: "Specialty Marbled Pork Line",
    origin: "England",
    avgWeight: "230–300 kg",
    lifespan: "8–12 years",
    feedRatio: "1 : 3.2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAuDfikE30U1PNSfDtqMVDz4f8DYggNEn9g&s",
    text: [
      "Berkshire pigs are one of the oldest recorded breeds, globally respected for superior meat quality and culinary tenderness.",
      "Produces richly marbled pork with high pH stability, ideal for gourmet cold-chain cuts and specialty retail packaging.",
      "Slower growing than commercial hybrids, yet commands premium market pricing in curated supply chains.",
    ],
    growth: { piglet: 25, grower: 120, finisher: 280 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "4–6 mo",
      finisher: "7–9 mo",
    },
  },
  {
    name: "Hampshire",
    category: "Commercial",
    role: "Lean Carcass Terminal Line",
    origin: "United States",
    avgWeight: "280–340 kg",
    lifespan: "10–12 years",
    feedRatio: "1 : 3.0",
    image:
      "https://www.britishpigs.org.uk/images/2020/04/30/hampshire-breed.jpg",
    text: [
      "Hampshire pigs feature a distinctive black coat with a white belt across the shoulders and strong muscling.",
      "Efficient feed converters prized for high lean-meat percentage and minimal backfat thickness.",
      "Widely used in terminal crossbreeding to boost primal cut yield for processing plants.",
    ],
    growth: { piglet: 27, grower: 130, finisher: 300 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "3–5 mo",
      finisher: "6–8 mo",
    },
  },
  {
    name: "Large Black",
    category: "Heritage",
    role: "Pasture & Outdoor Cluster Line",
    origin: "England",
    avgWeight: "250–300 kg",
    lifespan: "10–14 years",
    feedRatio: "1 : 3.2",
    image:
      "https://static.wixstatic.com/media/b58747_ce41e57fd7ce4d3b88e023dde0ca6218.jpg/v1/fill/w_276,h_199,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b58747_ce41e57fd7ce4d3b88e023dde0ca6218.jpg",
    text: [
      "Large Black pigs are a hardy heritage breed recognized by their solid black coat and large drooping ears.",
      "Exceptional foragers suited to semi-intensive and pasture-integrated rural farming clusters.",
      "Valued for docile temperament, heat resilience, and flavorful traditional pork.",
    ],
    growth: { piglet: 24, grower: 115, finisher: 275 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "4–6 mo",
      finisher: "7–9 mo",
    },
  },
  {
    name: "Tamworth",
    category: "Heritage",
    role: "Free-Range & Bacon Line",
    origin: "England",
    avgWeight: "180–280 kg",
    lifespan: "10–12 years",
    feedRatio: "1 : 3.2",
    image: "https://www.mindenpictures.com/cache/pcache/80099715.jpg",
    text: [
      "Tamworth pigs feature a golden-red coat and robust foraging instincts suited to open-range systems.",
      "Hardy skin pigmentation makes them resilient against sunburn in tropical and subtropical clusters.",
      "Delivers lean, firm-textured pork preferred for artisanal bacon and cured products.",
    ],
    growth: { piglet: 22, grower: 110, finisher: 260 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "4–6 mo",
      finisher: "8–10 mo",
    },
  },
  {
    name: "KuneKune",
    category: "Heritage",
    role: "Smallholder & Educational Line",
    origin: "New Zealand",
    avgWeight: "60–200 kg",
    lifespan: "8–12 years",
    feedRatio: "1 : 3.5",
    image:
      "https://img1.wsimg.com/isteam/ip/fca6cfa5-0c5d-4727-bb61-6aa2dfb97f68/IMG_9111.jpeg/:/cr=t:12.41%25,l:0%25,w:100%25,h:75.19%25/rs=w:600,h:451.12781954887214,cg:true",
    text: [
      "KuneKune pigs are a compact, gentle breed originally reared by the Māori people.",
      "Low-maintenance grazers well-suited for demonstration farms, training centers, and smallholder setups.",
      "Used in capacity-building workshops for safe beginner handling and sustainable husbandry education.",
    ],
    growth: { piglet: 20, grower: 80, finisher: 160 },
    growthAges: {
      piglet: "1–2 mo",
      grower: "4–7 mo",
      finisher: "9–12 mo",
    },
  },
];

function GrowthLineChart({ growth, growthAges }) {
  const maxWeight = 360;
  const stages = Object.entries(growth);
  const width = 420;
  const height = 190;
  const padL = 42;
  const padR = 26;
  const padT = 26;
  const padB = 42;

  const coords = stages.map(([stage, val], idx) => {
    const x = padL + (idx / (stages.length - 1)) * (width - padL - padR);
    const y = height - padB - (val / maxWeight) * (height - padT - padB);
    return { stage, val, x, y };
  });

  const pathD = coords
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaD = `${pathD} L ${coords[coords.length - 1].x.toFixed(1)} ${
    height - padB
  } L ${coords[0].x.toFixed(1)} ${height - padB} Z`;

  return (
    <div className="rf-breed-chart-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="rf-breed-svg">
        <defs>
          <linearGradient id="breedArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[0, 120, 240, 360].map((tick) => {
          const y = height - padB - (tick / maxWeight) * (height - padT - padB);
          return (
            <g key={tick}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray="3 3"
              />
              <text
                x={padL - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fill="#64748B"
              >
                {tick}kg
              </text>
            </g>
          );
        })}

        <path d={areaD} fill="url(#breedArea)" />
        <path
          d={pathD}
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coords.map((p) => (
          <g key={p.stage}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5.5"
              fill="#D4AF37"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <text
              x={p.x}
              y={p.y - 11}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="#0B1F3A"
            >
              {p.val} kg
            </text>
            <text
              x={p.x}
              y={height - 20}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight="700"
              fill="#0B1F3A"
            >
              {p.stage.charAt(0).toUpperCase() + p.stage.slice(1)}
            </text>
            <text
              x={p.x}
              y={height - 6}
              textAnchor="middle"
              fontSize="9.5"
              fill="#64748B"
            >
              {growthAges[p.stage]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function PigBreedsScroll() {
  const [filter, setFilter] = useState("All");

  const visibleBreeds =
    filter === "All"
      ? PIG_BREEDS
      : PIG_BREEDS.filter((b) => b.category === filter);

  return (
    <div className="rf-breeds-page">
      <div className="rf-page-banner">
        <div className="rf-page-banner-inner">
          <span className="rf-eyebrow rf-eyebrow-gold">
            <Dna size={14} />
            Breeding &amp; Genetic Improvement Program
          </span>
          <h1>Swine Genetics &amp; Breed Profiles</h1>
          <p>
            Scientific breed selection powering Regal Pork Farms LLP&apos;s maternal nucleus herds, terminal sire crossbreeding, and cluster farm productivity.
          </p>

          <div className="rf-breed-filters">
            {["All", "Commercial", "Heritage"].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`rf-breed-filter-btn ${filter === cat ? "active" : ""}`}
                onClick={() => setFilter(cat)}
              >
                {cat === "All"
                  ? "All Registered Breeds (8)"
                  : cat === "Commercial"
                  ? "Commercial Nucleus Lines"
                  : "Heritage & Cluster Lines"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rf-breeds-list">
        {visibleBreeds.map((pig, i) => {
          const totalGrowth = pig.growth.finisher - pig.growth.piglet;
          const dailyGain = totalGrowth / 150;

          return (
            <article
              key={pig.name}
              className={`rf-breed-card ${i % 2 === 1 ? "reversed" : ""}`}
            >
              <div className="rf-breed-info">
                <div className="rf-breed-badges">
                  <span className="rf-breed-cat">{pig.category} Line</span>
                  <span className="rf-breed-role">{pig.role}</span>
                </div>

                <h2>{pig.name}</h2>

                <div className="rf-breed-meta-row">
                  <span>
                    <MapPin size={14} /> Origin: {pig.origin}
                  </span>
                  <span>
                    <Scale size={14} /> Avg Weight: {pig.avgWeight}
                  </span>
                  <span>
                    <Clock size={14} /> Lifespan: {pig.lifespan}
                  </span>
                </div>

                <div className="rf-breed-copy">
                  {pig.text.map((t, idx) => (
                    <p key={idx}>{t}</p>
                  ))}
                </div>

                <div className="rf-breed-growth-box">
                  <div className="rf-growth-box-head">
                    <TrendingUp size={16} />
                    <h3>Growth Trajectory &amp; Feed Efficiency</h3>
                  </div>

                  <GrowthLineChart
                    growth={pig.growth}
                    growthAges={pig.growthAges}
                  />

                  <div className="rf-breed-metrics">
                    <div>
                      <span>Net Growth</span>
                      <strong>{totalGrowth} kg</strong>
                    </div>
                    <div>
                      <span>Est. Daily Gain</span>
                      <strong>{dailyGain.toFixed(2)} kg/day</strong>
                    </div>
                    <div>
                      <span>Target Feed Ratio</span>
                      <strong>{pig.feedRatio}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rf-breed-media">
                <img src={pig.image} alt={pig.name} loading="lazy" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
