export function ConstructionBanner() {
    return (
        <div className="w-full border-border border-b bg-card">
            <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
                <svg
                    aria-hidden="true"
                    fill="#000000"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 size-5 dark:invert"
                >
                    <g data-name="Layer 2">
                        <g data-name="alert-circle">
                            <rect width="24" height="24" opacity="0" />
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                            <circle cx="12" cy="16" r="1" />
                            <path d="M12 7a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" />
                        </g>
                    </g>
                </svg>
                <p className="font-medium text-foreground text-sm">
                    This portfolio is under construction. Check back soon for
                    updates!
                </p>
            </div>
        </div>
    );
}
