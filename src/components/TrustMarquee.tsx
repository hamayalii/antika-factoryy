interface TrustLogo {
  name: string;
  src: string;
}

export const TRUST_LOGOS: TrustLogo[] = [
  {
    name: "Faruk Medical City",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-24.jpg",
  },
  {
    name: "Asiacell",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-28.jpg",
  },
  {
    name: "KIIB Bank",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-43.jpg",
  },
  {
    name: "Rayhana Park",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-38.jpg",
  },
  {
    name: "Pio",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-33.jpg",
  },
  {
    name: "Italian Pasta",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-42.jpg",
  },
  {
    name: "Faleh Abu Al-Amba",
    src: "/whose-who-trust-us/photo_2026-09-23_11-17-46.jpg",
  },
  {
    name: "Italia Ice Cream",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-46.jpg",
  },
  {
    name: "Millennium Hotels and Resorts",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-51.jpg",
  },
  {
    name: "DIYALAND",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-55.jpg",
  },
  {
    name: "Ashur Resort",
    src: "/whose-who-trust-us/photo_2026-09-23_10-45-59.jpg",
  },
  {
    name: "Every Sunny Day",
    src: "/whose-who-trust-us/photo_2026-09-24_11-14-53.jpg",
  },
  {
    name: "Copthorne Hotel Baranan",
    src: "/whose-who-trust-us/photo_2026-09-24_11-02-41.jpg",
  },
  {
    name: "Millennium Kurdistan Hotel & Spa",
    src: "/whose-who-trust-us/photo_2026-09-24_11-02-30.jpg",
  },
  {
    name: "Kurdish Restaurant Merwari",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-51.jpg",
  },
  {
    name: "Road Runner",
    src: "/whose-who-trust-us/photo_2026-09-25_21-51-46.jpg",
  },
  {
    name: "Fenk All Day Dining",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-06.jpg",
  },
  {
    name: "Phoenicia Lebanese Restaurant",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-28.jpg",
  },
  {
    name: "360 Revolving Restaurant",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-35.jpg",
  },
  {
    name: "VVIP",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-41.jpg",
  },
  {
    name: "Dubliner Slemani",
    src: "/whose-who-trust-us/photo_2026-09-25_21-52-46.jpg",
  },
  {
    name: "Huawei",
    src: "/whose-who-trust-us/photo_2026-09-25_21-54-41.jpg",
  },
];

// Split logos into 2 different rows
const ROW1_LOGOS = TRUST_LOGOS.slice(0, Math.ceil(TRUST_LOGOS.length / 2));
const ROW2_LOGOS = TRUST_LOGOS.slice(Math.ceil(TRUST_LOGOS.length / 2));

// Double chunk per track to guarantee 100% seamless continuity across any screen size
const CHUNK_ROW1 = [...ROW1_LOGOS, ...ROW1_LOGOS];
const CHUNK_ROW2 = [...ROW2_LOGOS, ...ROW2_LOGOS];

// Logo item shared between primary and secondary chunks
function LogoItem({ logo, prefix, idx }: { logo: { name: string; src: string }; prefix: string; idx: number }) {
  const isRoundCircleLogo = logo.src.includes("photo_2026-09-24_11-14-53") || logo.src.includes("photo_2026-09-23_10-46-03");

  if (isRoundCircleLogo) {
    return (
      <div
        key={`${prefix}-${idx}`}
        style={{
          padding: "0 36px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div
          style={{
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transform: "scale(1.1)",
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      key={`${prefix}-${idx}`}
      style={{
        padding: "0 36px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        decoding="async"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{
          height: "75px",
          width: "auto",
          maxWidth: "200px",
          objectFit: "contain",
          display: "block",
          borderRadius: "8px",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      />
    </div>
  );
}

export function TrustMarquee() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        paddingTop: "56px",
        paddingBottom: "64px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          margin: "0 auto 40px",
          maxWidth: "1280px",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ff5a00",
          }}
        >
          <span style={{ display: "inline-block", height: "2px", width: "24px", borderRadius: "9999px", background: "#ff5a00" }} />
          ئەو شوێنانەی متمانەیان بە ئێمەکردووە
          <span style={{ display: "inline-block", height: "2px", width: "24px", borderRadius: "9999px", background: "#ff5a00" }} />
        </span>
        <h2
          style={{
            margin: "12px auto 0",
            maxWidth: "600px",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            lineHeight: 1.3,
            color: "#111827",
            fontSize: "clamp(26px, 3.5vw, 42px)",
          }}
        >
          جێگای متمانەی گەورەترین کۆمپانیا و هۆتێلەکانی عێراقین!
        </h2>
        <p
          style={{
            margin: "12px auto 0",
            maxWidth: "520px",
            fontSize: "15px",
            color: "#4b5563",
            lineHeight: 1.7,
          }}
        >
          شانازی دەکەین بە هاوبەشی و جێبەجێکردنی پڕۆژە بۆ دیارترین کۆمپانیا، هوتێل، نەخۆشخانە، چێشتخانە و شوێنە گەشتیارییەکان
        </p>
      </div>

      {/* Marquee track - Row 1 */}
      <div
        dir="ltr"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 auto 0 0",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to right, #fff 30%, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 0 0 auto",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to left, #fff 30%, transparent)",
          }}
        />

        {/* Animated strip */}
        <div className="animate-marquee-ltr" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
          {/* Primary chunk */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
            {CHUNK_ROW1.map((logo, idx) => (
              <LogoItem key={`p1-${idx}`} logo={logo} prefix="p1" idx={idx} />
            ))}
          </div>
          {/* Secondary chunk (identical, for seamless loop) */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }} aria-hidden="true">
            {CHUNK_ROW1.map((logo, idx) => (
              <LogoItem key={`s1-${idx}`} logo={logo} prefix="s1" idx={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee track - Row 2 */}
      <div
        dir="ltr"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          userSelect: "none",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 auto 0 0",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to right, #fff 30%, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: "0 0 0 auto",
            zIndex: 10,
            width: "140px",
            background: "linear-gradient(to left, #fff 30%, transparent)",
          }}
        />

        {/* Animated strip */}
        <div className="animate-marquee-ltr" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
          {/* Primary chunk */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }}>
            {CHUNK_ROW2.map((logo, idx) => (
              <LogoItem key={`p2-${idx}`} logo={logo} prefix="p2" idx={idx} />
            ))}
          </div>
          {/* Secondary chunk (identical, for seamless loop) */}
          <div style={{ display: "flex", flexShrink: 0, alignItems: "center" }} aria-hidden="true">
            {CHUNK_ROW2.map((logo, idx) => (
              <LogoItem key={`s2-${idx}`} logo={logo} prefix="s2" idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
