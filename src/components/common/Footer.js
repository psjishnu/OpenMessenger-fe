import React from "react";

export default function Footer({ signUp }) {
    return (
        <div className="absolute bottom-0 w-full">
            <section className="bg-gray-200 py-3 w-full">
                <div className="container mx-auto px-8">
                    <a
                        href="http://mgmits.ac.in/departments/computer-science-and-engineering/"
                        className="block text-black text-center  font-bold text-sm sm:mb-2 hover:text-indigo-400 ">
                        Powered by MITS CSE
                    </a>
                </div>
            </section>
        </div>
    );
}
