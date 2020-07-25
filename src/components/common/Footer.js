import React from "react";

export default function Footer({ signUp }) {
    return (
        <div className="absolute bottom-0 w-full">
            <section className="bg-gray-200 py-3 w-full">
                <div className="container mx-auto px-8">
                    <a
                        href="http://github.com/psjishnu"
                        className="block text-black text-center  font-bold text-sm sm:mb-2 hover:text-indigo-400 ">
                        Made by psjishnu
                    </a>
                </div>
            </section>
        </div>
    );
}
