/**
 * FAQ content.
 *
 * Doubles as long-tail SEO: these are phrased the way Pakistani buyers actually
 * search, including the Roman-Urdu forms ("POS system ki qeemat", "dukan ka
 * software") that carry real volume here. The same array feeds FAQPage JSON-LD,
 * so answers are written to stand alone in a search result.
 *
 * Answers must stay factual. Where something depends on the client's own
 * commercial policy rather than the software, the answer points to a
 * conversation instead of inventing a number.
 */
export type Faq = { question: string; answer: string }

export const POS_FAQS: Faq[] = [
  {
    question: 'What is the price of a POS system in Pakistan?',
    answer:
      'Apex POS starts at PKR 30,000 as a one-time price and goes up to PKR 80,000 for the Enterprise package. There is no monthly fee — you buy the licence once and the software is yours. The first year of support and updates is included.',
  },
  {
    question: 'POS system ki qeemat kya hai?',
    answer:
      'Apex POS ki qeemat PKR 30,000 se shuru hoti hai (one-time). Business package PKR 55,000 aur Enterprise package PKR 80,000 ka hai. Koi monthly fee nahi hai, aur pehle saal ki support included hai.',
  },
  {
    question: 'Does the POS software work without internet?',
    answer:
      'Yes. Apex POS is a Windows application installed on your own computer, not a website you log into. Billing, inventory, receipts and reports all work with no internet connection at all, which means load-shedding and connection problems do not stop you from serving customers.',
  },
  {
    question: 'Is there a monthly or yearly fee?',
    answer:
      'No monthly fee. The licence is a one-time purchase and the first year of support and updates is included. After the first year, continued support and updates are optional at PKR 8,000 per year — the software keeps working whether or not you renew.',
  },
  {
    question: 'Can it handle udhaar and customer credit?',
    answer:
      'Yes. Credit sales are recorded against a customer name and phone number, and a Due Balances screen shows every outstanding amount, when the last sale was, and the total owed to you. When a customer settles, you mark it as paid.',
  },
  {
    question: 'Does it accept JazzCash and EasyPaisa?',
    answer:
      'Apex POS records payments taken by cash, bank transfer, JazzCash, EasyPaisa and card, and can split one sale across several of these at once with a reference for each. Payments are recorded and reported by method — the software does not process the transaction itself, so you take payment as you do now and log it against the sale.',
  },
  {
    question: 'What computer do I need to run it?',
    answer:
      'A standard Windows 10 or Windows 11 PC or laptop is enough. The application is around 38 MB. If you want to print receipts you will need a thermal receipt printer, and a barcode scanner makes billing faster — we can advise on both.',
  },
  {
    question: 'Will my staff be able to see my profit and purchase prices?',
    answer:
      'Only if you let them. Worker accounts can bill and serve customers, while purchase prices, profit figures and the financial reports sit behind a separate password that only the owner holds.',
  },
  {
    question: 'What happens to my data if the computer fails?',
    answer:
      'The database copies itself automatically to a folder you choose, every two hours, and receipts are backed up separately. Restoring on a new machine is done by selecting the backup file. We recommend pointing the backup folder at a USB drive or a synced cloud folder.',
  },
  {
    question: 'Dukan ka software Urdu mein chalta hai?',
    answer:
      'Software ka interface English mein hai, lekin hamari poori support aur training Urdu mein hoti hai. Aap hamein WhatsApp par message kar sakte hain aur hum aapko Urdu mein sab samjha denge.',
  },
  {
    question: 'How long does installation and training take?',
    answer:
      'Remote installation over AnyDesk usually takes under an hour, including setting up your product list and printer. Training is a single session for the counter staff, and we stay available on WhatsApp afterwards for questions.',
  },
  {
    question: 'Can you move my existing product and stock list into it?',
    answer:
      'Yes. If your current records are in Excel, another POS, or even a written list, we can bring the product names, prices and stock quantities across. Data migration is included with the Enterprise package and available separately for the others.',
  },
]

export const COMPANY_FAQS: Faq[] = [
  {
    question: 'Where is APEX TECHNOLOGY based?',
    answer:
      'We are a Pakistani software studio serving businesses nationwide, including Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan and Peshawar. Installation, training and support are all available remotely across Pakistan.',
  },
  {
    question: 'Do you build software other than POS?',
    answer:
      'Yes. Alongside Apex POS and Apex Gym we build websites, Android and iOS applications, and custom business software such as inventory, billing and management systems built around how a particular business already works.',
  },
  {
    question: 'How do I get a demo?',
    answer:
      'Message us on WhatsApp at +92 335 7583554 and we will walk you through the full software on a screen share, answer questions, and give you a straight price for your shop. There is no charge for the demo.',
  },
]
