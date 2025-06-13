import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Johnson",
    image: "https://physicaleducationandwellness.mit.edu/wp-content/uploads/Untitled-1.png",
    review:
      "Shopline has made my grocery shopping so much easier. Fast delivery and great quality products!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    image: "https://res.cloudinary.com/dxw0o8aaj/image/upload/c_crop/v1683954154/explorer_profiles/mike_chen.png",
    review:
     "Amazing customer service and the website is so easy to use , and the website. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    image: "https://m.media-amazon.com/images/M/MV5BZjhiOWFmYTQtNGNlOS00MjgxLThhOTMtOTY1YjkzYjhlNjI0XkEyXkFqcGc@._V1_.jpg",
    review:
      "Shopline has made my grocery shopping so much easier. Fast delivery and great quality products!",
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-100 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Don't just take our word for it – hear from our satisfied customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <div className="flex text-yellow-400 mb-4">
              {Array(r.rating)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} />
                ))}
            </div>
            <p className="text-gray-700 mb-6">{r.review}</p>

            <div className="flex items-center gap-4">
              <img
                src={r.image}
                alt={r.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-800">{r.name}</p>
                <p className="text-sm text-gray-500">Verified Customer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
