/**
 * FAQ content.
 *
 * Written in simple English for a reader who is comfortable with basic to
 * intermediate English and is probably on a phone. Short sentences, familiar
 * words, no marketing language.
 *
 * Doubles as long-tail SEO and as AI-answer material: each answer is written to
 * stand alone if it is quoted with no surrounding page. The Roman-Urdu
 * questions are kept because that is genuinely how many buyers here search.
 *
 * Every answer describes a verified capability. Where something depends on
 * commercial policy rather than the software, the answer says so instead of
 * inventing a number.
 */
export type Faq = { question: string; answer: string }

export const POS_FAQS: Faq[] = [
  {
    question: 'Does Apex POS work without internet?',
    answer:
      'Yes. Apex POS is installed on your own computer, not on a website. Billing, stock, receipts, udhaar and reports all work with no internet at all. This means load-shedding and connection problems do not stop you from serving customers.',
  },
  {
    question: 'Is there a monthly fee?',
    answer:
      'No. You pay once, starting from PKR 30,000, and the software is yours. The first year of support and updates is included. After that, support is optional at PKR 8,000 per year — and if you do not renew, the software keeps working.',
  },
  {
    question: 'What is the price of a POS system in Pakistan?',
    answer:
      'Apex POS has three one-time packages: PKR 30,000, PKR 55,000 and PKR 80,000. The difference is which features you need, not how long you can use it. Installation, training and the first year of support are included in every package.',
  },
  {
    question: 'POS system ki qeemat kya hai?',
    answer:
      'Apex POS ki qeemat PKR 30,000 se shuru hoti hai. Business package PKR 55,000 aur Enterprise package PKR 80,000 ka hai. Yeh one-time payment hai — koi monthly fee nahi. Installation, training aur pehle saal ki support included hai.',
  },
  {
    question: 'Is Apex POS an application installed on my computer?',
    answer:
      'Yes. Apex POS is a POS application that installs on your own Windows PC or laptop — it is not a website you log into. That is why it keeps working with no internet, and why your sales and customer data stay on your machine rather than on a company server somewhere else.',
  },
  {
    question: 'Do you have POS software for a small shop?',
    answer:
      'Yes. The Starter package at PKR 30,000 is built for a single counter — barcode billing, stock, receipts and the daily dashboard. Many small shops never need more than that. If you later add a second counter or want udhaar and full reports, you can move up without starting again.',
  },
  {
    question: 'Which businesses can use Apex POS?',
    answer:
      'General stores, super stores, mobile shops, pharmacies, restaurants and cafes, garments, bakeries, hardware stores, cosmetics and electronics shops. Items can be sold by piece or by kilogram, and mobile shops can record an IMEI number for each handset.',
  },
  {
    question: 'Can I manage my inventory?',
    answer:
      'Yes. You add products with a purchase price and a selling price, and Apex shows profit per item. You set a low-stock level, and the dashboard counts how many items are below it and how many have finished. You can also export your stock list to CSV.',
  },
  {
    question: 'Can I manage customer udhaar?',
    answer:
      'Yes. A credit sale is saved against a customer name and phone number. One screen shows every customer who owes you, how much, when their last purchase was, and the total outstanding across everyone. When a customer pays, you mark it as paid.',
  },
  {
    question: 'Can I manage staff?',
    answer:
      'Yes. Workers get their own login so they can bill customers. Purchase prices, profit figures and the financial reports sit behind a separate password that only the owner has, so staff can run the counter without seeing your margins.',
  },
  {
    question: 'Can I print receipts?',
    answer:
      'Yes. Apex POS prints on a normal thermal receipt printer and saves a copy of every bill. You can search saved receipts by date, customer or product, view any of them, and print again if a customer asks.',
  },
  {
    question: 'How does data backup work?',
    answer:
      'Apex copies your database to a folder you choose, automatically, every two hours. Receipts are backed up separately. To restore, you select the backup file. We recommend choosing a USB drive or a synced cloud folder so a copy exists off the computer.',
  },
  {
    question: 'Can I use it on multiple computers?',
    answer:
      'One licence covers one computer. If you have a second counter or another shop, that needs its own licence. Tell us how many counters you have and we will quote for all of them together.',
  },
  {
    question: 'What computer do I need?',
    answer:
      'A normal Windows 10 or Windows 11 PC or laptop is enough — the software is around 38 MB. For faster billing you will also want a thermal receipt printer and a barcode scanner. We can advise on both.',
  },
  {
    question: 'How long does installation take?',
    answer:
      'Usually under an hour. We install remotely over AnyDesk, set up your product list and printer, and train your staff in one session. We stay available on WhatsApp afterwards for questions.',
  },
  {
    question: 'Can you move my existing product list into Apex?',
    answer:
      'Yes. If your products are in Excel, in another POS, or even on paper, we can bring the names, prices and stock quantities across. This is included with the Enterprise package and available separately with the others.',
  },
  {
    question: 'Which package is right for my business?',
    answer:
      'Starter suits a single counter that mainly needs billing and stock. Business adds udhaar, expenses and full reports, which is what most shops choose. Enterprise adds per-kilogram items, IMEI tracking and data migration. Tell us about your shop and we will recommend one — including the cheapest one if that is the right fit.',
  },
  {
    question: 'How can I get a demo?',
    answer:
      'Message us on WhatsApp at +92 335 7583554. We will show you the full software on a screen share, answer your questions, and give you a straight price for your shop. The demo is free and there is no obligation to buy.',
  },
  {
    question: 'Dukan ka software Urdu mein chalta hai?',
    answer:
      'Software ka interface English mein hai, lekin hamari training aur support Urdu mein hoti hai. Aap WhatsApp par message karein aur hum aapko Urdu mein sab samjha denge.',
  },
]

export const COMPANY_FAQS: Faq[] = [
  {
    question: 'Where is APEX TECHNOLOGY based?',
    answer:
      'We are a Pakistani software studio and we work with businesses across the country — Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and elsewhere. Installation, training and support are all done remotely, so your city does not change the price.',
  },
  {
    question: 'Do you build software other than POS?',
    answer:
      'Yes. Along with Apex POS and Apex Gym, we build websites, Android and iOS apps, and custom business software such as inventory, billing and management systems built around how a business already works.',
  },
  {
    question: 'How can I get a demo?',
    answer:
      'Message us on WhatsApp at +92 335 7583554. We will walk you through the software on a screen share, answer your questions, and give you a straight price. There is no charge for the demo or the quote.',
  },
  {
    question: 'Can you build a website on a low budget?',
    answer:
      'Often, yes. We agree a fixed price before any work starts, so tell us your budget and we will tell you honestly what it covers. A small starter site built properly — fast, mobile-friendly and able to be found on Google — costs far less than a large one, and it can be extended later without rebuilding it.',
  },
]
