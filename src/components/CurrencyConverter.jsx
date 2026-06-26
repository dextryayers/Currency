import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

const regions = [
  {
    name: 'Americas',
    currencies: [
      { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
      { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
      { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
      { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
      { code: 'ARS', name: 'Argentine Peso', symbol: 'ARS$', flag: '🇦🇷' },
      { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', flag: '🇨🇱' },
      { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', flag: '🇨🇴' },
      { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
      { code: 'UYU', name: 'Uruguayan Peso', symbol: 'UYU$', flag: '🇺🇾' },
      { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', flag: '🇵🇾' },
      { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', flag: '🇧🇴' },
      { code: 'CRC', name: 'Costa Rican Colon', symbol: '₡', flag: '🇨🇷' },
      { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴' },
      { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹' },
      { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳' },
      { code: 'NIO', name: 'Nicaraguan Cordoba', symbol: 'C$', flag: '🇳🇮' },
      { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦' },
      { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲' },
      { code: 'TTD', name: 'Trinidad Dollar', symbol: 'TT$', flag: '🇹🇹' },
      { code: 'BSD', name: 'Bahamian Dollar', symbol: 'B$', flag: '🇧🇸' },
      { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', flag: '🇧🇧' },
      { code: 'BZD', name: 'Belize Dollar', symbol: 'BZ$', flag: '🇧🇿' },
      { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$', flag: '🇦🇬' },
      { code: 'HTG', name: 'Haitian Gourde', symbol: 'G', flag: '🇭🇹' },
      { code: 'SRD', name: 'Surinamese Dollar', symbol: 'SR$', flag: '🇸🇷' },
      { code: 'VED', name: 'Venezuelan Bolivar', symbol: 'Bs.S', flag: '🇻🇪' },
    ],
  },
  {
    name: 'Europe',
    currencies: [
      { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
      { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
      { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
      { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
      { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
      { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
      { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
      { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
      { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
      { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
      { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
      { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', flag: '🇮🇸' },
      { code: 'RSD', name: 'Serbian Dinar', symbol: 'din', flag: '🇷🇸' },
      { code: 'ALL', name: 'Albanian Lek', symbol: 'L', flag: '🇦🇱' },
      { code: 'MKD', name: 'Macedonian Denar', symbol: 'den', flag: '🇲🇰' },
      { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', flag: '🇧🇾' },
      { code: 'GEL', name: 'Georgian Lari', symbol: '₾', flag: '🇬🇪' },
      { code: 'AMD', name: 'Armenian Dram', symbol: '֏', flag: '🇦🇲' },
      { code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼', flag: '🇦🇿' },
      { code: 'MDL', name: 'Moldovan Leu', symbol: 'L', flag: '🇲🇩' },
      { code: 'BAM', name: 'Bosnian Mark', symbol: 'KM', flag: '🇧🇦' },
      { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
      { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
    ],
  },
  {
    name: 'Asia',
    currencies: [
      { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
      { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
      { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
      { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
      { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
      { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
      { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
      { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
      { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
      { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
      { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
      { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
      { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
      { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
      { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
      { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', flag: '🇳🇵' },
      { code: 'KZT', name: 'Kazakhstani Tenge', symbol: '₸', flag: '🇰🇿' },
      { code: 'UZS', name: 'Uzbekistani Som', symbol: "so'm", flag: '🇺🇿' },
      { code: 'TMT', name: 'Turkmenistani Manat', symbol: 'T', flag: '🇹🇲' },
      { code: 'KGS', name: 'Kyrgyzstani Som', symbol: 'som', flag: '🇰🇬' },
      { code: 'MNT', name: 'Mongolian Tugrik', symbol: '₮', flag: '🇲🇳' },
      { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K', flag: '🇲🇲' },
      { code: 'KHR', name: 'Cambodian Riel', symbol: '៛', flag: '🇰🇭' },
      { code: 'LAK', name: 'Lao Kip', symbol: '₭', flag: '🇱🇦' },
      { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'ރ.', flag: '🇲🇻' },
      { code: 'BND', name: 'Brunei Dollar', symbol: 'B$', flag: '🇧🇳' },
      { code: 'BTN', name: 'Bhutanese Ngultrum', symbol: 'Nu.', flag: '🇧🇹' },
    ],
  },
  {
    name: 'Middle East',
    currencies: [
      { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
      { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
      { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
      { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
      { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
      { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
      { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
      { code: 'IRR', name: 'Iranian Rial', symbol: '﷼', flag: '🇮🇷' },
      { code: 'IQD', name: 'Iraqi Dinar', symbol: 'ع.د', flag: '🇮🇶' },
      { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴' },
      { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', flag: '🇱🇧' },
      { code: 'SYP', name: 'Syrian Pound', symbol: '£S', flag: '🇸🇾' },
      { code: 'YER', name: 'Yemeni Rial', symbol: '﷼', flag: '🇾🇪' },
    ],
  },
  {
    name: 'Africa',
    currencies: [
      { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
      { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
      { code: 'EGP', name: 'Egyptian Pound', symbol: '£E', flag: '🇪🇬' },
      { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪' },
      { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', flag: '🇬🇭' },
      { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', flag: '🇹🇿' },
      { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬' },
      { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
      { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
      { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', flag: '🇹🇳' },
      { code: 'XAF', name: 'CFA Franc BEAC', symbol: 'FCFA', flag: '🇨🇲' },
      { code: 'XOF', name: 'CFA Franc BCEAO', symbol: 'CFA', flag: '🇧🇯' },
      { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', flag: '🇲🇬' },
      { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', flag: '🇲🇺' },
      { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲' },
      { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼' },
      { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', flag: '🇦🇴' },
      { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', flag: '🇪🇹' },
      { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', flag: '🇷🇼' },
      { code: 'SDG', name: 'Sudanese Pound', symbol: 'ج.س', flag: '🇸🇩' },
      { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh', flag: '🇸🇴' },
      { code: 'LYD', name: 'Libyan Dinar', symbol: 'ل.د', flag: '🇱🇾' },
      { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', flag: '🇸🇨' },
      { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$', flag: '🇨🇻' },
      { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', flag: '🇲🇿' },
      { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', flag: '🇬🇲' },
      { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk', flag: '🇪🇷' },
      { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu', flag: '🇧🇮' },
      { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', flag: '🇲🇼' },
      { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', flag: '🇬🇳' },
      { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le', flag: '🇸🇱' },
      { code: 'STN', name: 'Sao Tome Dobra', symbol: 'Db', flag: '🇸🇹' },
      { code: 'SSP', name: 'South Sudanese Pound', symbol: '£', flag: '🇸🇸' },
    ],
  },
  {
    name: 'Oceania',
    currencies: [
      { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
      { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
      { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯' },
      { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬' },
      { code: 'WST', name: 'Samoan Tala', symbol: 'WS$', flag: '🇼🇸' },
      { code: 'SBD', name: 'Solomon Dollar', symbol: 'SI$', flag: '🇸🇧' },
      { code: 'TOP', name: 'Tongan Paanga', symbol: 'T$', flag: '🇹🇴' },
      { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'Vt', flag: '🇻🇺' },
      { code: 'XPF', name: 'CFP Franc', symbol: 'Fr', flag: '🇵🇫' },
    ],
  },
]

const allCurrencies = regions.flatMap((r) => r.currencies)

function hashColor(code) {
  let h = 0
  for (let i = 0; i < code.length; i++) h = code.charCodeAt(i) + ((h << 5) - h)
  return 'hsl(' + (Math.abs(h) % 360) + ', 58%, 54%)'
}

const currencyColorCache = {}
allCurrencies.forEach((c) => { currencyColorCache[c.code] = hashColor(c.code) })

const popularPairs = [
  ['USD', 'IDR'], ['USD', 'EUR'], ['EUR', 'USD'],
  ['USD', 'JPY'], ['USD', 'SGD'], ['USD', 'MYR'],
  ['GBP', 'USD'], ['EUR', 'GBP'],
  ['USD', 'KRW'], ['USD', 'PHP'], ['USD', 'THB'],
  ['USD', 'VND'], ['USD', 'INR'], ['USD', 'CNY'],
]

const API_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1'
const FALLBACK_API = 'https://latest.currency-api.pages.dev/v1'

function fmt(n) {
  if (n == null || isNaN(n)) return '-'
  if (Math.abs(n) >= 1) {
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return n.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 })
}

function applyTheme(card, result, fc, tc) {
  if (card) {
    card.style.setProperty('--card-accent-1', fc + '30')
    card.style.setProperty('--card-accent-2', tc + '1e')
    card.style.setProperty('--c-card-border', fc + '18')
  }
  if (result) {
    result.style.setProperty('--result-accent', fc + '1a')
    result.style.setProperty('--result-accent-2', tc + '0c')
  }
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('1')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('IDR')
  const [rates, setRates] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayResult, setDisplayResult] = useState(null)

  const cardRef = useRef(null)
  const resultRef = useRef(null)
  const resultInnerRef = useRef(null)
  const swapRef = useRef(null)
  const fieldsRef = useRef([])
  const quickRef = useRef([])

  const animCounter = useRef({ value: 0 })
  const animFrame = useRef(null)

  const fromColor = currencyColorCache[from] || '#7c3aed'
  const toColor = currencyColorCache[to] || '#7c3aed'

  const fetchRates = useCallback(async () => {
    setLoading(true)
    setError(null)
    setDisplayResult(null)
    for (const url of [
      API_BASE + '/currencies/usd.json',
      FALLBACK_API + '/currencies/usd.json',
    ]) {
      try {
        const res = await fetch(url)
        if (!res.ok) continue
        const data = await res.json()
        const map = data.usd
        if (!map) continue
        const n = { USD: 1 }
        for (const [k, v] of Object.entries(map)) n[k.toUpperCase()] = v
        setRates(n)
        setLoading(false)
        return
      } catch (_) { continue }
    }
    setError('Unable to fetch exchange rates. Please try again later.')
    setLoading(false)
  }, [])

  useEffect(() => { fetchRates() }, [fetchRates])

  useEffect(() => {
    const interval = setInterval(() => fetchRates(), 120000)
    return () => clearInterval(interval)
  }, [fetchRates])

  useEffect(() => {
    try { if (cardRef.current) gsap.from(cardRef.current, { scale: 0.97, duration: 0.5, ease: 'power2.out' }) } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      const v = fieldsRef.current.filter(Boolean)
      if (v.length) gsap.from(v, { y: 10, duration: 0.35, stagger: 0.06, ease: 'power2.out', delay: 0.2 })
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      const v = quickRef.current.filter(Boolean)
      if (v.length) gsap.from(v, { scale: 0.9, duration: 0.25, stagger: 0.03, ease: 'back.out(1.4)', delay: 0.35 })
    } catch (_) {}
  }, [])

  useEffect(() => { applyTheme(cardRef.current, resultRef.current, fromColor, toColor) }, [fromColor, toColor])

  useEffect(() => {
    try {
      if (resultInnerRef.current && !loading && rates) gsap.from(resultInnerRef.current, { scale: 0.97, duration: 0.3, ease: 'power2.out' })
    } catch (_) {}
  }, [amount, from, to, loading, rates])

  useEffect(() => {
    if (loading || rates == null) return
    const fr = rates[from]
    const tr = rates[to]
    if (!fr || !tr) return
    const end = (parseFloat(amount) || 0) * (tr / fr)
    if (isNaN(end)) return
    try {
      if (animFrame.current) animFrame.current.kill()
      animFrame.current = gsap.to(animCounter.current, {
        value: end, duration: 0.5, ease: 'power2.out',
        onUpdate: () => { setDisplayResult(animCounter.current.value) },
        onComplete: () => { setDisplayResult(end) },
      })
    } catch (_) {}
  }, [rates, to, amount, loading])

  const handleSwap = () => {
    try {
      if (swapRef.current) {
        gsap.to(swapRef.current, {
          rotation: '+=180', duration: 0.35, ease: 'power2.inOut',
          onComplete: () => gsap.set(swapRef.current, { rotation: 0 }),
        })
      }
    } catch (_) {}
    const t = from; setFrom(to); setTo(t)
  }

  const numericAmount = parseFloat(amount) || 0
  const fromRate = rates ? rates[from] : null
  const toRate = rates ? rates[to] : null
  const rate = (fromRate && toRate) ? toRate / fromRate : null
  const frCurrency = allCurrencies.find((c) => c.code === from)
  const toCurrency = allCurrencies.find((c) => c.code === to)

  return (
    <div className="converter-card" ref={cardRef}>
      <div className="quick-pairs">
        {popularPairs.map(([pf, pt], i) => (
          <button key={pf + pt} ref={(el) => { quickRef.current[i] = el }}
            className={'btn-quick' + (from === pf && to === pt ? ' active' : '')}
            onClick={() => { try { setFrom(pf); setTo(pt) } catch (_) {} }}
          >{pf}/{pt}</button>
        ))}
      </div>

      <div className="field-group" ref={(el) => { fieldsRef.current[0] = el }}>
        <label htmlFor="amount">Amount</label>
        <div className="input-wrap">
          <span className="input-symbol">{frCurrency?.symbol || '$'}</span>
          <input id="amount" type="number" value={amount}
            onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="0" step="any" />
        </div>
      </div>

      <div className="field-group" ref={(el) => { fieldsRef.current[1] = el }}>
        <label htmlFor="fromCurrency"><span className="color-dot" style={{ background: fromColor }} />From</label>
        <div className="select-wrap">
          <select id="fromCurrency" value={from} onChange={(e) => setFrom(e.target.value)}>
            {regions.map((r) => (
              <optgroup key={r.name} label={r.name}>
                {r.currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      <div className="swap-btn-wrap" ref={(el) => { fieldsRef.current[2] = el }}>
        <button className="btn-swap" ref={swapRef} onClick={handleSwap} aria-label="Swap currencies" title="Swap currencies">⇅</button>
      </div>

      <div className="field-group" ref={(el) => { fieldsRef.current[3] = el }}>
        <label htmlFor="toCurrency"><span className="color-dot" style={{ background: toColor }} />To</label>
        <div className="select-wrap">
          <select id="toCurrency" value={to} onChange={(e) => setTo(e.target.value)}>
            {regions.map((r) => (
              <optgroup key={r.name} label={r.name}>
                {r.currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="loading-wrap">
          <div className="loading-spinner" />
          <span className="loading-text">Fetching latest exchange rates...</span>
        </div>
      )}

      {error && (
        <div className="error-msg">
          {error}
          <div><button className="retry-btn" onClick={() => fetchRates(from)}>Retry</button></div>
        </div>
      )}

      {!loading && !error && rates != null && (
        <div className="result-box" ref={resultRef}>
          <div className="result-box-inner" ref={resultInnerRef}>
            <div className="result-label">Converted Amount</div>
            <div className="result-amount">
              <span className="currency-flag">{toCurrency?.flag}</span>
              <span className="result-value">{displayResult != null ? fmt(displayResult) : '-'}</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-text-secondary)', marginLeft: '0.1rem' }}>{to}</span>
            </div>
            {rate != null && (
              <div className="result-details">
                <span className="rate">1 {from} = {fmt(rate)} {to}</span>
                <span className="divider" />
                <span className="updated">1 {to} = {fmt(1 / rate)} {from}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyConverter
