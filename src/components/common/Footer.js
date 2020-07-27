import React from "react";

export default function Footer({ signUp }) {
    return (
        <div className="bottom-0 w-full">
            <section className="py-3 w-full">
                <div className="container mx-auto px-8">
                    <a
                        href="http://github.com/openmessenger"
                        target="_blank"
                        className="block text-black text-center  font-bold text-sm sm:mb-2 hover:text-green-700 ">
                        Contribute on Github
                    </a>
                </div>
            </section>
        </div>
    );
}
