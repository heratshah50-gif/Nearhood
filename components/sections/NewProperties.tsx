"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Bed, Bath, Maximize2, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getPropertyImage } from "@/lib/property-images";

const newListings = [
  { id: 1, title: "2 & 3 BHK Ready to Move Flats in Bopal", location: "Bopal, Ahmedabad", bhk: "3 BHK", rooms: 3, baths: 2, beds: 3, area: "1156 to 1859 sq ft", price: "₹ 6500 Per SqFt", type: "for sale", image: getPropertyImage(0, "400x300") },
  { id: 2, title: "4BHK Independent Floor in Vastrapur", location: "Vastrapur, Ahmedabad", bhk: "4 BHK", rooms: 4, baths: 3, beds: 4, area: "1800 sq ft", price: "₹ 97 Lakhs", type: "for sale", image: getPropertyImage(1, "400x300") },
  { id: 3, title: "3 & 4 BHK Flats in Bodakdev : Royal Crysta", location: "Bodakdev, Ahmedabad", bhk: "4 BHK", rooms: 4, baths: 4, beds: 4, area: "1411 to 1862 sq ft", price: "₹ 5500 Per Sq Ft", type: "for sale", image: getPropertyImage(2, "400x300") },
  { id: 4, title: "3BHK Flats in SG Highway: Dev Krishnam Heights", location: "SG Highway, Ahmedabad", bhk: "3 BHK", rooms: 3, baths: 3, beds: 3, area: "1400 - 1800 sq ft", price: "₹ 6500 Per SQFT", type: "for sale", image: getPropertyImage(3, "400x300") },
  { id: 5, title: "2, 3 & 4 BHK Ultra Luxury Flats in Thaltej", location: "Thaltej, Ahmedabad", bhk: "3 BHK", rooms: 3, baths: 2, beds: 3, area: "1350 - 1725 sq ft", price: "₹ 57 to 92 Lac", type: "for sale", image: getPropertyImage(4, "400x300") },
  { id: 6, title: "3BHK Flats in Prahlad Nagar", location: "Prahlad Nagar, Ahmedabad", bhk: "3 BHK", rooms: 3, baths: 3, beds: 3, area: "1573 Sqft", price: "₹ 90.75 Lac", type: "for sale", image: getPropertyImage(5, "400x300") },
];

function PropertyRow({ item, index }: { item: (typeof newListings)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-lg hover:border-primary-100 transition-all"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-72 h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-neutral-100 w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 288px"
          />
        </div>
        <div className="flex-1 p-5">
          <span className="inline-block px-2.5 py-1 rounded bg-primary-100 text-primary-700 text-xs font-semibold mb-2">
            {item.type}
          </span>
          <span className="ml-2 text-neutral-400 text-xs">{item.bhk}</span>
          <h3 className="font-bold text-neutral-800 mb-2 line-clamp-2" style={{ fontFamily: "var(--font-display)" }}>
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-neutral-500 text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{item.location}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-neutral-500 text-sm mb-4">
            <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {item.rooms} rooms</span>
            <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {item.baths} baths</span>
            <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {item.area}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold text-primary-600">{item.price}</p>
            <Link href="/listings" className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-1">
              <Phone className="w-4 h-4" /> View Number
            </Link>
            <Link href="/listings" className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> Make Enquiry
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NewProperties() {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50" id="new-properties">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2
            className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            New Properties in Ahmedabad
          </h2>
          <p className="text-neutral-500">We provide full service at every step.</p>
        </motion.div>

        <div className="space-y-6">
          {newListings.map((item, i) => (
            <PropertyRow key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
