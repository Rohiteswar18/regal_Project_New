import React from "react";
import { HelpCircle } from "lucide-react";
import "../../styles/components/FAQ.css";

function FAQ() {
  const faqs = [
    {
      question: "How long does it take to sell cluster stock?",
      answer:
        "Weaned piglets typically match within 2–7 days; certified breeding batches and bulk meat contracts settle within 7–14 days.",
    },
    {
      question: "What veterinary & quality documents help speed up sales?",
      answer:
        "Vaccination records, veterinary health certificates, and IoT shed growth logs significantly improve buyer confidence.",
    },
    {
      question: "How do franchise & cluster settlements work?",
      answer:
        "Payments are coordinated via verified escrow milestones once buyer receipt or processing-hub intake is confirmed.",
    },
  ];

  return (
    <div className="faq-card">
      <div className="faq-head">
        <HelpCircle size={18} />
        <h3>Partner &amp; Cluster FAQs</h3>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.question} className="faq-item">
            <h4>{faq.question}</h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
