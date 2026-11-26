import React, { useState } from "react";
import {
  Wheat,
  Layers,
  FlaskConical,
  Droplets,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  Star,
  Stethoscope,
} from "lucide-react";
import "../styles/pages/PigNutrition.css";

const PigNutritionComplete = () => {
  const [activeSection, setActiveSection] = useState("nutritionalRequirements");
  const [selectedStage, setSelectedStage] = useState("piglets");

  const nutritionalRequirements = {
    piglets: {
      weight: "1.5–20 kg",
      age: "0–8 weeks",
      requirements: {
        crudeProtein: { min: 20, max: 22, unit: "%" },
        lysine: { min: 1.5, max: 1.8, unit: "%" },
        metabolizableEnergy: { min: 3400, max: 3600, unit: "kcal/kg" },
        calcium: { min: 0.8, max: 1.0, unit: "%" },
        phosphorus: { min: 0.6, max: 0.8, unit: "%" },
        crudeFiber: { min: 2, max: 4, unit: "%" },
        salt: { min: 0.25, max: 0.4, unit: "%" },
      },
      feedingGuidelines: [
        "Creep feeding from 7–10 days of age",
        "Feed 4–6 small meals daily to protect gut villi",
        "Provide 1.5–2.0 kg starter feed per piglet weekly",
        "Maintain ingredient digestibility above 85%",
        "Include milk replacer support for large litters",
      ],
      specialConsiderations: [
        "Use highly digestible protein sources (soy isolate / fish meal)",
        "Include organic acidifiers for gastric pH balance",
        "Supplement probiotics for early microbiome resilience",
        "Ensure Day-3 iron injection protocol to prevent anemia",
      ],
    },
    growers: {
      weight: "20–50 kg",
      age: "8–14 weeks",
      requirements: {
        crudeProtein: { min: 18, max: 20, unit: "%" },
        lysine: { min: 1.1, max: 1.3, unit: "%" },
        metabolizableEnergy: { min: 3200, max: 3400, unit: "kcal/kg" },
        calcium: { min: 0.7, max: 0.9, unit: "%" },
        phosphorus: { min: 0.55, max: 0.7, unit: "%" },
        crudeFiber: { min: 3, max: 5, unit: "%" },
        salt: { min: 0.3, max: 0.5, unit: "%" },
      },
      feedingGuidelines: [
        "Ad libitum feeding via automated hoppers",
        "Target daily weight gain of 650–800 g/day",
        "Monitor hopper flow & IoT intake curves daily",
        "Adjust energy density for seasonal heat stress",
        "Ensure unrestricted clean water via nipple drinkers",
      ],
      specialConsiderations: [
        "Prioritize lean muscle accretion & lysine balance",
        "Implement two-phase grower ration transitions",
        "Track FCR weekly against ML benchmark (2.2–2.5:1)",
      ],
    },
    finishers: {
      weight: "50–120 kg",
      age: "14–24 weeks",
      requirements: {
        crudeProtein: { min: 14, max: 16, unit: "%" },
        lysine: { min: 0.9, max: 1.0, unit: "%" },
        metabolizableEnergy: { min: 3200, max: 3300, unit: "kcal/kg" },
        calcium: { min: 0.6, max: 0.8, unit: "%" },
        phosphorus: { min: 0.5, max: 0.6, unit: "%" },
        crudeFiber: { min: 4, max: 6, unit: "%" },
        salt: { min: 0.4, max: 0.6, unit: "%" },
      },
      feedingGuidelines: [
        "Controlled energy-to-protein ratio for lean carcasses",
        "Feed 2.5–3.0 kg/day depending on backfat target",
        "Monitor backfat thickness & primal yield readiness",
        "Apply withdrawal & clean-gut protocol pre-processing",
      ],
      specialConsiderations: [
        "Optimize feed conversion efficiency (largest feed cost phase)",
        "Avoid abrupt ration switches in the final 4 weeks",
        "Align slaughter weight (110–120 kg) with processing plant specs",
      ],
    },
    sows: {
      weight: "180–250 kg",
      age: "Breeding Adults",
      requirements: {
        gestationProtein: { min: 12, max: 14, unit: "%" },
        gestationLysine: { min: 0.55, max: 0.65, unit: "%" },
        gestationEnergy: { min: 3000, max: 3200, unit: "kcal/kg" },
        lactationProtein: { min: 16, max: 18, unit: "%" },
        lactationLysine: { min: 0.9, max: 1.1, unit: "%" },
        lactationEnergy: { min: 3300, max: 3500, unit: "kcal/kg" },
      },
      feedingGuidelines: [
        "Gestation: 2.0–2.5 kg/day restricted ration",
        "Lactation: Ad libitum feeding to maximize milk yield",
        "Step up intake gradually 48h post-farrowing",
        "Track Body Condition Score (target 3.0 / 5.0)",
      ],
      specialConsiderations: [
        "Flush feeding 10 days prior to breeding for ovulation rate",
        "Provide dietary fiber during gestation for satiety",
        "Supplement vitamin E & selenium for reproductive vigor",
      ],
    },
  };

  const feedIngredients = {
    energySources: [
      { name: "Corn (Maize)", energy: 3400, protein: 8.5, lysine: 0.24, fiber: 2.3, cost: "Medium" },
      { name: "Wheat", energy: 3200, protein: 13.0, lysine: 0.35, fiber: 2.5, cost: "Medium-High" },
      { name: "Barley", energy: 2800, protein: 11.5, lysine: 0.4, fiber: 5.5, cost: "Medium" },
      { name: "Sorghum", energy: 3300, protein: 9.0, lysine: 0.2, fiber: 2.7, cost: "Low" },
      { name: "Wheat Bran", energy: 2500, protein: 15.5, lysine: 0.65, fiber: 11.0, cost: "Low" },
    ],
    proteinSources: [
      { name: "Soybean Meal (44%)", energy: 2400, protein: 44.0, lysine: 2.9, fiber: 7.0, cost: "High" },
      { name: "Soybean Meal (48%)", energy: 2450, protein: 48.0, lysine: 3.1, fiber: 6.0, cost: "High" },
      { name: "Canola Meal", energy: 2200, protein: 36.0, lysine: 1.95, fiber: 12.0, cost: "Medium" },
      { name: "Sunflower Meal", energy: 2100, protein: 28.0, lysine: 1.1, fiber: 28.0, cost: "Medium" },
      { name: "Fish Meal", energy: 2950, protein: 65.0, lysine: 5.0, fiber: 1.0, cost: "Very High" },
    ],
    supplements: [
      { name: "Limestone", purpose: "Calcium source (Ca: 38%)" },
      { name: "Dicalcium Phosphate", purpose: "Calcium (22%) & Phosphorus (18.5%)" },
      { name: "Salt (NaCl)", purpose: "Electrolyte balance (Na: 39%, Cl: 60%)" },
      { name: "Vitamin & Trace Mineral Premix", purpose: "Immunity & bone mineralization" },
      { name: "L-Lysine HCl", purpose: "Synthetic amino acid (Lys: 78.8%)" },
    ],
  };

  const feedFormulations = [
    {
      name: "Starter Diet (Piglets)",
      costPerKg: "₹68/kg",
      ingredients: [
        "Corn: 55%",
        "Soybean meal (48%): 25%",
        "Whey powder: 10%",
        "Fish meal: 5%",
        "Soybean oil: 2%",
        "Limestone & DCP: 2.0%",
        "Salt & Premix: 1.0%",
      ],
      nutritionalValue: {
        crudeProtein: "21.5%",
        lysine: "1.65%",
        metabolizableEnergy: "3450 kcal/kg",
        calcium: "0.85%",
        phosphorus: "0.65%",
      },
    },
    {
      name: "Grower Diet",
      costPerKg: "₹52/kg",
      ingredients: [
        "Corn: 65%",
        "Soybean meal (44%): 25%",
        "Wheat bran: 5%",
        "Vegetable oil: 2%",
        "Limestone & DCP: 1.8%",
        "Salt & Premix: 1.2%",
      ],
      nutritionalValue: {
        crudeProtein: "18.2%",
        lysine: "1.15%",
        metabolizableEnergy: "3250 kcal/kg",
        calcium: "0.75%",
        phosphorus: "0.60%",
      },
    },
    {
      name: "Finisher Diet",
      costPerKg: "₹46/kg",
      ingredients: [
        "Corn: 70%",
        "Soybean meal (44%): 20%",
        "Barley: 5%",
        "Energy fat blend: 2%",
        "Limestone & DCP: 1.6%",
        "Salt & Premix: 1.4%",
      ],
      nutritionalValue: {
        crudeProtein: "15.5%",
        lysine: "0.95%",
        metabolizableEnergy: "3300 kcal/kg",
        calcium: "0.70%",
        phosphorus: "0.55%",
      },
    },
  ];

  const waterRequirements = [
    { stage: "Piglets (1–10 kg)", amount: "1–2 L/day", ratio: "3 : 1 (water : feed)" },
    { stage: "Growers (20–50 kg)", amount: "4–8 L/day", ratio: "2.5 : 1 (water : feed)" },
    { stage: "Finishers (50–120 kg)", amount: "8–15 L/day", ratio: "2 : 1 (water : feed)" },
    { stage: "Gestating Sows", amount: "12–20 L/day", ratio: "4 : 1 (water : feed)" },
    { stage: "Lactating Sows", amount: "20–35 L/day", ratio: "3 : 1 (water : feed)" },
  ];

  const performanceMetrics = {
    growthRates: [
      { stage: "Nursery (3–10 kg)", target: "350–450 g/day" },
      { stage: "Grower (10–50 kg)", target: "700–850 g/day" },
      { stage: "Finisher (50–120 kg)", target: "800–950 g/day" },
    ],
    feedEfficiency: [
      { stage: "Piglets", fcr: "1.5–1.8 : 1" },
      { stage: "Growers", fcr: "2.2–2.5 : 1" },
      { stage: "Finishers", fcr: "2.8–3.2 : 1" },
      { stage: "Herd Average", fcr: "2.5–2.8 : 1" },
    ],
    economicIndicators: [
      { parameter: "Feed cost / kg weight gain", value: "₹125 – ₹150" },
      { parameter: "Feed share of farm cost", value: "60% – 70%" },
      { parameter: "Optimal slaughter weight", value: "110 – 120 kg" },
      { parameter: "Days to market", value: "160 – 180 days" },
    ],
  };

  const nutritionalDisorders = [
    {
      name: "Porcine Gastric Ulcer Syndrome",
      causes: ["Overly fine feed grinding", "Low dietary fiber", "Irregular meal timing"],
      symptoms: ["Reduced feed intake", "Dark tarry feces", "Pale mucous membranes"],
      prevention: ["Maintain optimal particle size (600–750 µm)", "Include 3–5% balanced fiber", "Ensure uninterrupted hopper access"],
    },
    {
      name: "Osteomalacia & Leg Weakness",
      causes: ["Calcium deficiency", "Skewed Ca:P ratio", "Vitamin D3 insufficiency"],
      symptoms: ["Lameness & stiffness", "Reluctance to stand at feeders", "Bone deformities"],
      prevention: ["Calibrate Ca:P ratio between 1.2:1 and 1.5:1", "Verify mineral premix dosing", "Routine veterinary locomotion checks"],
    },
    {
      name: "Piglet Iron-Deficiency Anemia",
      causes: ["Low sow-milk iron stores", "Rapid early weight gain", "Concrete flooring isolation"],
      symptoms: ["Pale ears & gums", "Slowed growth rate", "Labored breathing"],
      prevention: ["200 mg iron dextran injection at Day 3", "Iron-fortified creep feed from Day 7", "Veterinary neonatal checkup"],
    },
  ];

  const tabs = [
    { id: "nutritionalRequirements", label: "Stage Requirements", icon: Layers },
    { id: "feedIngredients", label: "Feed Ingredients", icon: Wheat },
    { id: "feedFormulations", label: "LLP Formulations", icon: FlaskConical },
    { id: "waterManagement", label: "Water Quality", icon: Droplets },
    { id: "performance", label: "KPI Benchmarks", icon: TrendingUp },
    { id: "disorders", label: "Veterinary Care", icon: ShieldAlert },
  ];

  const currentStage = nutritionalRequirements[selectedStage];

  return (
    <div className="rf-nutrition-page">
      <div className="rf-page-banner">
        <div className="rf-page-banner-inner">
          <span className="rf-eyebrow rf-eyebrow-gold">
            <Stethoscope size={14} />
            Feed Supply &amp; Veterinary Support System
          </span>
          <h1>Swine Nutrition &amp; Herd Health Protocols</h1>
          <p>
            Stage-calibrated feed formulations, raw ingredient benchmarks, water quality standards, and preventive veterinary protocols supporting every partner farm.
          </p>

          <div className="rf-nutri-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`rf-nutri-tab ${activeSection === tab.id ? "active" : ""}`}
                  onClick={() => setActiveSection(tab.id)}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rf-nutri-container">
        {activeSection === "nutritionalRequirements" && (
          <div>
            <div className="rf-stage-bar">
              <div>
                <h2>Select Growth Stage</h2>
                <p>
                  Active stage: <strong>{selectedStage.toUpperCase()}</strong> • Weight:{" "}
                  {currentStage.weight} • Age: {currentStage.age}
                </p>
              </div>
              <div className="rf-stage-pills">
                {Object.keys(nutritionalRequirements).map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className={`rf-stage-pill ${selectedStage === stage ? "active" : ""}`}
                    onClick={() => setSelectedStage(stage)}
                  >
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="rf-nutri-grid-2">
              <div className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>Nutrient Targets</h3>
                </div>
                <div className="rf-nutri-card-body">
                  {Object.entries(currentStage.requirements).map(([nutrient, data]) => {
                    const pct = Math.min(100, (data.min / (data.max * 1.15)) * 100);
                    const label = nutrient
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase());
                    return (
                      <div key={nutrient} className="rf-req-row">
                        <div className="rf-req-top">
                          <span>{label}</span>
                          <strong>
                            {data.min}–{data.max} {data.unit}
                          </strong>
                        </div>
                        <div className="rf-req-track">
                          <div className="rf-req-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rf-nutri-stack">
                <div className="rf-nutri-card">
                  <div className="rf-nutri-card-head">
                    <h3>Feeding Guidelines</h3>
                  </div>
                  <div className="rf-nutri-card-body">
                    <ul className="rf-nutri-list">
                      {currentStage.feedingGuidelines.map((g) => (
                        <li key={g}>
                          <CheckCircle2 size={16} className="emerald" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rf-nutri-card">
                  <div className="rf-nutri-card-head">
                    <h3>Veterinary &amp; Biosecurity Notes</h3>
                  </div>
                  <div className="rf-nutri-card-body">
                    <ul className="rf-nutri-list">
                      {currentStage.specialConsiderations.map((c) => (
                        <li key={c}>
                          <Star size={16} className="gold" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "feedIngredients" && (
          <div className="rf-nutri-stack">
            {[
              { title: "Energy Sources", rows: feedIngredients.energySources },
              { title: "Protein Sources", rows: feedIngredients.proteinSources },
            ].map((group) => (
              <div key={group.title} className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>{group.title}</h3>
                </div>
                <div className="rf-nutri-table-wrap">
                  <table className="rf-nutri-table">
                    <thead>
                      <tr>
                        <th>Ingredient</th>
                        <th>Energy (kcal/kg)</th>
                        <th>Protein (%)</th>
                        <th>Lysine (%)</th>
                        <th>Fiber (%)</th>
                        <th>Cost Tier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((ing) => (
                        <tr key={ing.name}>
                          <td><strong>{ing.name}</strong></td>
                          <td>{ing.energy}</td>
                          <td>{ing.protein}</td>
                          <td>{ing.lysine}</td>
                          <td>{ing.fiber}</td>
                          <td>
                            <span className="rf-cost-pill">{ing.cost}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="rf-nutri-card">
              <div className="rf-nutri-card-head">
                <h3>Minerals &amp; Amino Acid Supplements</h3>
              </div>
              <div className="rf-supplements-grid">
                {feedIngredients.supplements.map((s) => (
                  <div key={s.name} className="rf-supp-box">
                    <h4>{s.name}</h4>
                    <p>{s.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "feedFormulations" && (
          <div className="rf-nutri-grid-3">
            {feedFormulations.map((form) => (
              <div key={form.name} className="rf-nutri-card">
                <div className="rf-nutri-card-head flex-between">
                  <h3>{form.name}</h3>
                  <span className="rf-price-badge">{form.costPerKg}</span>
                </div>
                <div className="rf-nutri-card-body">
                  <h4 className="rf-sub-h4">Composition</h4>
                  <div className="rf-chip-list">
                    {form.ingredients.map((item) => (
                      <span key={item} className="rf-ing-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <h4 className="rf-sub-h4">Guaranteed Analysis</h4>
                  <div className="rf-kv-list">
                    {Object.entries(form.nutritionalValue).map(([k, v]) => (
                      <div key={k} className="rf-kv-row">
                        <span>
                          {k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                        </span>
                        <strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === "waterManagement" && (
          <div className="rf-nutri-grid-2">
            <div className="rf-nutri-card">
              <div className="rf-nutri-card-head">
                <h3>Daily Water Requirements</h3>
              </div>
              <div className="rf-nutri-table-wrap">
                <table className="rf-nutri-table">
                  <thead>
                    <tr>
                      <th>Growth Stage</th>
                      <th>Daily Volume</th>
                      <th>Water : Feed Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waterRequirements.map((w) => (
                      <tr key={w.stage}>
                        <td><strong>{w.stage}</strong></td>
                        <td>{w.amount}</td>
                        <td>{w.ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rf-nutri-card">
              <div className="rf-nutri-card-head">
                <h3>Water Quality &amp; Biosecurity Standards</h3>
              </div>
              <div className="rf-nutri-card-body">
                <div className="rf-kv-list">
                  <div className="rf-kv-row"><span>pH Range</span><strong>6.5 – 7.5</strong></div>
                  <div className="rf-kv-row"><span>Total Dissolved Solids</span><strong>&lt; 3,000 ppm</strong></div>
                  <div className="rf-kv-row"><span>Nitrate Nitrogen</span><strong>&lt; 100 ppm</strong></div>
                  <div className="rf-kv-row"><span>Coliform Bacteria</span><strong>&lt; 50 CFU/mL</strong></div>
                  <div className="rf-kv-row"><span>Drinker Provision</span><strong>1 nipple per 10–15 pigs</strong></div>
                  <div className="rf-kv-row"><span>Line Pressure</span><strong>20 – 40 psi</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "performance" && (
          <div className="rf-nutri-stack">
            <div className="rf-nutri-grid-3">
              <div className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>Growth Targets</h3>
                </div>
                <div className="rf-nutri-card-body">
                  <div className="rf-kv-list">
                    {performanceMetrics.growthRates.map((m) => (
                      <div key={m.stage} className="rf-kv-row">
                        <span>{m.stage}</span>
                        <strong>{m.target}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>Feed Conversion Ratio</h3>
                </div>
                <div className="rf-nutri-card-body">
                  <div className="rf-kv-list">
                    {performanceMetrics.feedEfficiency.map((m) => (
                      <div key={m.stage} className="rf-kv-row">
                        <span>{m.stage}</span>
                        <strong>{m.fcr}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>Cluster Economics</h3>
                </div>
                <div className="rf-nutri-card-body">
                  <div className="rf-kv-list">
                    {performanceMetrics.economicIndicators.map((m) => (
                      <div key={m.parameter} className="rf-kv-row">
                        <span>{m.parameter}</span>
                        <strong>{m.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "disorders" && (
          <div className="rf-nutri-grid-3">
            {nutritionalDisorders.map((d) => (
              <div key={d.name} className="rf-nutri-card">
                <div className="rf-nutri-card-head">
                  <h3>{d.name}</h3>
                </div>
                <div className="rf-nutri-card-body">
                  <h4 className="rf-sub-h4">Primary Causes</h4>
                  <ul className="rf-plain-list">
                    {d.causes.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <h4 className="rf-sub-h4">Clinical Signs</h4>
                  <ul className="rf-plain-list">
                    {d.symptoms.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <h4 className="rf-sub-h4">Veterinary Prevention</h4>
                  <ul className="rf-plain-list">
                    {d.prevention.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PigNutritionComplete;
