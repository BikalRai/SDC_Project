import React from "react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 4,
    comment: "Great product, really liked it!",
    createdAt: "2026-02-06T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    comment: "Amazing quality. Totally worth it.",
    createdAt: "2026-01-28T14:15:00Z",
  },
];

export default function ItemReviews() {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl bg-white p-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{review.name}</h4>
            <span className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-700">
            {review.comment}
          </p>

          <div className="mt-2 text-yellow-500">
            ⭐ {review.rating}/5
          </div>
        </div>
      ))}
    </div>
  );
}
