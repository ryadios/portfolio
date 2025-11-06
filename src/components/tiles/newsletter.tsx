import { moranga } from "@/app/fonts";

export function Newsletter() {
    return (
        <>
            <div className="py-[40px] px-[44px] size-full flex flex-col justify-between items-center">
                <div>
                    <h2
                        className={`${moranga.className} font-bold text-2xl mb-1`}
                    >
                        Shall I keep you in the loop?
                    </h2>
                    <p className="leading-[26px]">
                        Content includes articles, early access to products, and
                        ongoing learnings.
                    </p>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="no-drag w-full bg-transparent border-0 border-b-2 border-b-[rgb(240,242,248)] py-3 px-0 mb-2 rounded-none focus:outline-none"
                />
                <div className="w-full flex justify-between items-center">
                    <button className="no-drag font-medium h-9 flex items-center px-3 rounded-xl text-sm [box-shadow:0_0_0_2px_rgb(240,242,248)] cursor-pointer transition-shadow duration-200 ease-out hover:[box-shadow:0_0_0_5px_rgb(240,242,248)]">
                        Subscribe
                    </button>
                    <p className="text-[#8a949e] tracking-tight font-medium text-sm">
                        <span className="hidden lg:inline">
                            You&apos;ll be subscriber number{" "}
                        </span>
                        <span
                            className={`${moranga.className} font-bold text-2xl text-black`}
                        >
                            0
                        </span>
                        <span className="inline lg:hidden"> subscribers</span>
                    </p>
                </div>
            </div>
        </>
    );
}
