import { Container, Section, SectionHeading } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { PhoneFrame } from '@/components/media/Players'

const SHOWCASE = [
  {
    src: '/media/clip-02.mp4',
    poster: '/media/clip-02-poster.webp',
    alt: 'A shopkeeper scanning a packet at the counter of a general store',
    title: 'At the kiryana counter',
    caption: 'Scan, bill, print — the queue keeps moving.',
  },
  {
    src: '/media/clip-05.mp4',
    poster: '/media/clip-05-poster.webp',
    alt: 'A pharmacy assistant scanning a product with a barcode scanner',
    title: 'In the pharmacy',
    caption: 'Thousands of items, found in a keystroke.',
  },
  {
    src: '/media/clip-04.mp4',
    poster: '/media/clip-04-poster.webp',
    alt: 'A business owner reviewing sales and inventory analytics on a desktop computer',
    title: 'After closing',
    caption: 'What sold, what it earned, what is running low.',
  },
]

export function Showcase() {
  return (
    <Section tone="mist" className="overflow-hidden">
      <Container className="relative">
        <SectionHeading
          eyebrow="In real shops"
          title="Working in shops like yours"
          description="Retail counters, pharmacies and supermarkets — the same software, set up for what each one sells."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SHOWCASE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <figure className="flex flex-col items-center gap-5">
                <div className="w-full max-w-[260px]">
                  <PhoneFrame src={item.src} poster={item.poster} alt={item.alt} />
                </div>
                <figcaption className="text-center">
                  <h3 className="text-h3 text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-navy-600">{item.caption}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
