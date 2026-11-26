import { CheckCircle2, Building2, Stethoscope, Cpu, PackageCheck } from "lucide-react";
import "../styles/components/Mission.css";

export function Mission() {
  const pillars = [
    {
      icon: Building2,
      title: "Pig Farming, Genetics & Infrastructure",
      text: "Scientific breeding and genetic improvement programs supported by modern farm infrastructure and balanced animal feed supply.",
    },
    {
      icon: Stethoscope,
      title: "Veterinary Care, Clusters & Capacity Building",
      text: "Franchise and cluster-based farming models backed by veterinary support, technical training programs, and assured market linkages.",
    },
    {
      icon: Cpu,
      title: "Digital Commerce, IoT & Machine Learning",
      text: "Online trading of livestock and farm inputs powered by IoT shed monitoring and ML health, productivity, and price forecasting.",
    },
    {
      icon: PackageCheck,
      title: "Processing, Packaging & Cold-Chain Distribution",
      text: "Hygienic slaughtering, processing, packaging, marketing, and distribution for a sustainable, organized livestock supply chain.",
    },
  ];

  return (
    <section className="mission">
      <div className="mission-container">
        <div className="mission-content">
          <span className="rf-eyebrow rf-eyebrow-navy">
            <CheckCircle2 size={14} />
            Object of the LLP
          </span>
          <h2 className="mission-title">
            Building an Organized, Tech-Enabled &amp; Sustainable Livestock Supply Chain
          </h2>
          <p className="mission-description">
            Regal Pork Farms LLP carries on the business of animal husbandry with a dedicated focus on modern pig farming—integrating every link from superior breeding stock and farmer empowerment to precision IoT analytics and hygienic meat retail.
          </p>

          <div className="mission-pillars">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="mission-pillar-item">
                  <div className="mission-pillar-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mission-media-col">
          <div className="mission-image-frame">
            <img
              src="missions image.png"
              alt="Regal Pork Farms LLP farmer cluster collaboration and capacity building"
              className="mission-img"
            />
            <div className="mission-floating-card">
              <span className="mission-floating-label">LLP Core Mandate</span>
              <strong>End-to-End Pork &amp; Livestock Value Chain</strong>
              <p>Genetics • Infrastructure • IoT &amp; ML • Processing • Distribution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
