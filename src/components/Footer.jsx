export const Footer = () => {
  return (
    <footer className="mt-10 bg-dark py-8 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white">
            <span className="font-display-alt text-lg leading-none">CL</span>
          </div>
          <div>
            <div className="font-display-alt text-lg font-semibold text-white">
              CraveLane
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em]">
              Night owls • Street grills • Chai breaks
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-muted">
          <span className="hover:text-orange-100 cursor-pointer">
            About
          </span>
          <span className="hover:text-orange-100 cursor-pointer">
            Help & support
          </span>
          <span className="hover:text-orange-100 cursor-pointer">
            Terms
          </span>
          <span className="hover:text-orange-100 cursor-pointer">
            Privacy
          </span>
        </div>
      </div>
    </footer>
  )
}

