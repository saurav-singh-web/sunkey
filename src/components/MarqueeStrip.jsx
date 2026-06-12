import './MarqueeStrip.css'

const items = [
  '☀️ SPF 50+ Mineral Sunscreen',
  '✦ No White Cast',
  '🌿 Clean Ingredients',
  '✦ Reef Safe Formula',
  '☀️ Jeju & Tomato Extract',
  '✦ Dermatologist Tested',
  '🌿 Non-Comedogenic',
  '✦ Cruelty Free',
]

export default function MarqueeStrip() {
  return (
    <div className="marquee-strip">
      <div className="marquee-strip__track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-strip__item">{item}</span>
        ))}
      </div>
    </div>
  )
}
