import React from "react";

const teamMembers = [
  {
    name: "John Smith",
    title: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    description:
      "With over 15 years in e-commerce, John leads Bazarly with a vision for exceptional customer service.",
  },
  {
    name: "Sarah Johnson",
    title: "Chief Technology Officer",
    image: "https://www.materialculture.nl/sites/default/files/styles/hero_mobile/public/photo%20for%20website.jpg?h=c6d1cd02&itok=gNnwaqIU",
    description:
      "Sarah ensures our platform runs smoothly and securely, bringing innovative solutions to online shopping.",
  },
  {
    name: "Mike Chen",
    title: "Chief Operations Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    description:
      "Mike oversees our supply chain and logistics, ensuring fast and reliable delivery to our customers.",
  },
];

function TeamCard({ member }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
      <img
        src={member.image}
        alt={member.name}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-600"
      />
      <h3 className="text-xl font-semibold">{member.name}</h3>
      <p className="text-indigo-600 font-medium mb-2">{member.title}</p>
      <p className="text-gray-600 text-sm">{member.description}</p>
    </div>
  );
}

export default function AboutTeamSection() {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600">
          The passionate people behind Bazarly who work hard to bring you the
          best shopping experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}
