import React, { useState, useEffect } from "react";
import { PrimeIcons } from "primereact/api";

export function HeroSlider() {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000",
            title: "Welcome to Blog Site",
            subtitle: "A modern platform for sharing your thoughts",
        },
        {
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000",
            title: "Share Your Story",
            subtitle: "Connect with readers worldwide",
        },
        {
            image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=2000",
            title: "Discover New Ideas",
            subtitle: "Explore our latest articles",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                        <div className="max-w-3xl px-4">
                            <h1 className="text-5xl font-bold text-white mb-4">
                                {slide.title}
                            </h1>
                            <p className="text-xl text-white/90">
                                {slide.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
                <i className="pi pi-chevron-left h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
                <i className="pi pi-chevron-right h-6 w-6" />
            </button>
        </div>
    );
}
