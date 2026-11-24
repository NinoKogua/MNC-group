import type { LegalSection } from '@/app/(frontend)/components/common/LegalPage'
import type { Locale } from './seo'

type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] }

export const PRIVACY: Record<Locale, LegalDoc> = {
  ka: {
    title: 'კონფიდენციალურობის პოლიტიკა',
    updated: 'ბოლო განახლება: 2026 წლის ნოემბერი',
    intro:
      'MNC Group (შემდგომ „ჩვენ“) პატივს სცემს თქვენს პირადი მონაცემების უსაფრთხოებას. ეს პოლიტიკა განმარტავს, რა მონაცემებს ვაგროვებთ ვებგვერდის გამოყენებისას და როგორ ვიყენებთ მათ.',
    sections: [
      {
        title: 'რა მონაცემებს ვაგროვებთ',
        paragraphs: ['მონაცემებს ვაგროვებთ მხოლოდ მაშინ, როცა თქვენ თავად გვაწვდით მათ ფორმების მეშვეობით:'],
        list: [
          'რესტორნის დაჯავშნის ფორმა: სახელი, ტელეფონის ნომერი, ელფოსტა (არასავალდებულო), სტუმრების რაოდენობა, თარიღი და დრო;',
          'საკონტაქტო ფორმა და ზარი/ელფოსტა: სახელი, საკონტაქტო ინფორმაცია და თქვენი შეტყობინება;',
          'ტექნიკური მონაცემები, რომლებსაც ვებსერვერი ავტომატურად ინახავს (IP მისამართი, ბრაუზერის ტიპი, მოთხოვნის დრო) უსაფრთხოებისა და სტაბილურობის უზრუნველსაყოფად.',
        ],
      },
      {
        title: 'რისთვის ვიყენებთ',
        paragraphs: [],
        list: [
          'დაჯავშნის დასადასტურებლად და მომსახურების გასაწევად;',
          'თქვენს შეკითხვებზე პასუხის გასაცემად;',
          'ვებგვერდის უსაფრთხოებისა და ფუნქციონირების უზრუნველსაყოფად.',
        ],
      },
      {
        title: 'მონაცემების გაზიარება',
        paragraphs: [
          'თქვენს მონაცემებს არ ვყიდით. დაჯავშნის მონაცემები შესაძლოა დამუშავდეს ჩვენი სერვისის პროვაიდერების (მაგ., Google Calendar, ჰოსტინგი) მეშვეობით, მხოლოდ მომსახურების გასაწევად. კანონით გათვალისწინებულ შემთხვევებში მონაცემები შეიძლება გადაეცეს უფლებამოსილ ორგანოებს.',
        ],
      },
      {
        title: 'შენახვის ვადა',
        paragraphs: [
          'მონაცემებს ვინახავთ მხოლოდ იმ ვადით, რაც აუცილებელია მიზნის მისაღწევად ან კანონით არის დადგენილი, რის შემდეგაც ვშლით ან ვანონიმიზებთ.',
        ],
      },
      {
        title: 'თქვენი უფლებები',
        paragraphs: [
          'თქვენ გაქვთ უფლება მოითხოვოთ წვდომა თქვენს მონაცემებზე, მათი შესწორება, წაშლა ან დამუშავების შეზღუდვა, ასევე გამოიხმოთ თანხმობა. ამისთვის დაგვიკავშირდით საკონტაქტო გვერდზე მითითებული ელფოსტით ან ტელეფონით.',
        ],
      },
      {
        title: 'ქუქი-ფაილები',
        paragraphs: ['ქუქი-ფაილების შესახებ დეტალური ინფორმაცია იხილეთ ჩვენს ქუქი-ფაილების პოლიტიკაში.'],
      },
      {
        title: 'ცვლილებები',
        paragraphs: ['ამ პოლიტიკას შეიძლება დროდადრო ვანახლებდეთ. მოქმედი ვერსია ყოველთვის ამ გვერდზეა ხელმისაწვდომი.'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: November 2026',
    intro:
      'MNC Group ("we") respects your privacy. This policy explains what personal data we collect when you use our website and how we use it.',
    sections: [
      {
        title: 'Data we collect',
        paragraphs: ['We collect data only when you provide it to us through our forms:'],
        list: [
          'Restaurant reservation form: name, phone number, email (optional), number of guests, date and time;',
          'Contact form, calls and emails: name, contact details and your message;',
          'Technical data our web server records automatically (IP address, browser type, request time) to keep the site secure and stable.',
        ],
      },
      {
        title: 'How we use it',
        paragraphs: [],
        list: [
          'To confirm reservations and provide our services;',
          'To respond to your inquiries;',
          'To keep the website secure and working properly.',
        ],
      },
      {
        title: 'Sharing',
        paragraphs: [
          'We do not sell your data. Reservation data may be processed by service providers we use (e.g. Google Calendar, hosting) solely to deliver the service. Data may be disclosed to authorities where required by law.',
        ],
      },
      {
        title: 'Retention',
        paragraphs: [
          'We keep data only as long as needed for its purpose or as required by law, after which we delete or anonymise it.',
        ],
      },
      {
        title: 'Your rights',
        paragraphs: [
          'You may request access to, correction or deletion of your data, restrict its processing, or withdraw consent. Contact us using the email or phone number on our contact page.',
        ],
      },
      {
        title: 'Cookies',
        paragraphs: ['See our Cookie Policy for details about cookies.'],
      },
      {
        title: 'Changes',
        paragraphs: ['We may update this policy from time to time. The current version is always available on this page.'],
      },
    ],
  },
}

export const COOKIES: Record<Locale, LegalDoc> = {
  ka: {
    title: 'ქუქი-ფაილების პოლიტიკა',
    updated: 'ბოლო განახლება: 2026 წლის ნოემბერი',
    intro:
      'ქუქი-ფაილი არის მცირე ტექსტური ფაილი, რომელსაც საიტი თქვენს მოწყობილობაზე ინახავს. ამ გვერდზე აღწერილია, რას ვიყენებთ ჩვენ.',
    sections: [
      {
        title: 'რა ქუქი-ფაილებს ვიყენებთ',
        paragraphs: [
          'საჯარო ვებგვერდი არ იყენებს სარეკლამო ან ანალიტიკურ ქუქი-ფაილებს და არ აწარმოებს თქვენს თრექინგს.',
        ],
        list: [
          'აუცილებელი ქუქი-ფაილები: ადმინისტრატორის სისტემაში ავტორიზაციისთვის გამოიყენება სესიის ქუქი (payload-token). ის მხოლოდ ავტორიზებულ თანამშრომლებს ეძლევათ და ჩვეულებრივ ვიზიტორებს არ ეხებათ.',
        ],
      },
      {
        title: 'მესამე მხარის სერვისები',
        paragraphs: [
          'საკონტაქტო გვერდზე ჩაშენებულია Google Maps რუკა. რუკის ჩატვირთვისას Google-მა შეიძლება თავისი ქუქი-ფაილები განათავსოს. ამის შესახებ იხილეთ Google-ის კონფიდენციალურობის პოლიტიკა.',
        ],
      },
      {
        title: 'როგორ მართოთ ქუქი-ფაილები',
        paragraphs: [
          'ქუქი-ფაილების წაშლა ან დაბლოკვა შეგიძლიათ თქვენი ბრაუზერის პარამეტრებიდან. გაითვალისწინეთ, რომ ზოგიერთი ფუნქცია შესაძლოა შეიზღუდოს.',
        ],
      },
      {
        title: 'კონტაქტი',
        paragraphs: ['კითხვების შემთხვევაში დაგვიკავშირდით საკონტაქტო გვერდზე მითითებული ინფორმაციით.'],
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Last updated: November 2026',
    intro:
      'A cookie is a small text file a website stores on your device. This page describes what we use.',
    sections: [
      {
        title: 'Cookies we use',
        paragraphs: [
          'Our public website does not use advertising or analytics cookies and does not track you.',
        ],
        list: [
          'Strictly necessary: a session cookie (payload-token) is used to sign in to the administration system. It is only issued to authorised staff and does not affect regular visitors.',
        ],
      },
      {
        title: 'Third-party services',
        paragraphs: [
          'The contact page embeds a Google Maps map. When the map loads, Google may set its own cookies. See Google’s privacy policy for details.',
        ],
      },
      {
        title: 'Managing cookies',
        paragraphs: [
          'You can delete or block cookies in your browser settings. Note that some features may stop working.',
        ],
      },
      {
        title: 'Contact',
        paragraphs: ['If you have questions, reach us using the details on our contact page.'],
      },
    ],
  },
}
