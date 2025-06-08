function Header({ cartCount = 0 }) {
  return (
    <header className="w-full flex items-center justify-between py-6 px-4 sm:px-12 bg-white shadow-sm mb-8">
      <a href="/">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Buyewon
        </h1>
      </a>
      <a href="/cart">
        <button
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
          aria-label="View cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v3"
            />
          </svg>
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5 py-0.5 font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </a>
    </header>
  );
}

export default Header;
