export type StepId =
  | 'intro' | number | 'outro';
type Item = {
  id: string;
  name: string;
  description?: string;
  value: number;
  next?: StepId;
};

type Step = {
  id: StepId;
  heading: string;
  description: string;
  type:
  | 'radio'
  | 'check'
  | 'intro'
  | 'summary'
  | 'description'
  | 'contact'
  | 'outro';
  value?: number;
  items?: Item[];
  next?: StepId;
};

type TranslationStep = {
  heading: string;
  headingShort: string;
  description: string;
  items: Item[];
};

export type TranslationSteps = Record<StepId, TranslationStep>;

export type Steps = Record<StepId, Step>;

const basicReply: Item[] = [
  {
    name: 'Stimme überhaupt nicht zu',
    id: 'stimme_überhaupt_nicht_zu',
    value: 0
  },
  {
    name: 'Stimme eher nicht zu',
    id: 'stimme_eher_nicht_zu',
    value: 1
  },
  {
    name: 'Stimme teilweise zu',
    id: 'stimme_teilweise_zu',
    value: 2
  },
  {
    name: 'Stimme eher zu',
    id: 'stimme_eher_zu',
    value: 3
  },
  {
    name: 'Stimme völlig zu',
    id: 'stimme_völlig_zu',
    value: 4
  },
]


export function getConfiguratorSteps() {
  const steps: Steps = {
    intro: {
      id: 'intro',
      type: 'intro',
      next: 1,
      heading: 'Einleitung',
      description: 'Die folgenden 10 bis 13 Aussagen beziehen sich auf Deine Nutzung Sozialer Medien. Damit sind Plattformen gemeint, auf denen Du aktiv kommunizierst, postest, kommentierst und „likest“, zum Beispiel Instagram, TikTok, Snapchat, WhatsApp, Telegram usw. Wenn Du an die letzten 12 Monate denkst, wie sehr stimmst Du den folgenden Aussagen zu?'
    },
    1: {
      id: 1,
      type: 'radio',
      heading: 'Häufigkeit',
      description: 'Ich bin in sozialen Medien häufig öfter und länger, als ich mir vornehme, oder es z.B. mit meinen Eltern abgesprochen war.',
      next: 2,
      items: basicReply
    },
    2: {
      id: 2,
      type: 'radio',
      heading: 'Selbstregulation',
      description: 'Ich kann oft nicht aufhören, mich mit sozialen Medien zu beschäftigen, obwohl ich vernünftigerweise besser aufhören sollte oder z.B. meine Eltern mir gesagt haben, dass ich aufhören soll.',
      next: 3,
      items: basicReply
    },
    3: {
      id: 3,
      type: 'radio',
      heading: 'Interessenverschiebung',
      description: 'Ich verfolge oft keine Interessen außerhalb der digitalen Welt, weil ich lieber in sozialen Medien unterwegs sein möchte. Zum Beispiel treffe ich keine Freunde oder Freundinnen in der wirklichen Welt, besuche keinen Verein, mache keinen Sport oder Musik oder lese nicht mehr wegen der Nutzung sozialer Medien.',
      next: 4,
      items: basicReply
    },
    4: {
      id: 4,
      type: 'radio',
      heading: 'Alltagsvernachlässigung',
      description: 'Ich vernachlässige oft alltägliche Aufgaben, weil ich lieber in sozialen Medien unterwegs sein möchte. Damit gemeint sind Aufgaben wie Einkaufen, Saubermachen, hinter mir aufräumen, Zimmer ordentlich halten, Pflichten für Schule/Ausbildung/Job.',
      next: 5,
      items: basicReply
    },
    5: {
      id: 5,
      type: 'radio',
      heading: 'Konfliktpotenzial',
      description: 'Ich beschäftige mich weiter mit sozialen Medien, selbst wenn ich dadurch Stress mit anderen bekomme. Gemeint ist Stress z.B. mit Eltern, Geschwistern, fester Freund/ feste Freundin, mit Freunden/Freundinnen, Lehrerinnen/Lehrern oder Vorgesetzten durch die Nutzung sozialer Medien',
      next: 6,
      items: basicReply
    },
    6: {
      id: 6,
      type: 'radio',
      heading: 'Leistungsbeeinträchtigung',
      description: 'Ich beschäftige mich weiter mit sozialen Medien, obwohl die Schule (oder Ausbildung/ Job) darunter leidet. Zum Beispiel komme ich wegen der Nutzung sozialer Medien zu spät, mache nicht im Unterricht mit, mache keine Hausaufgaben und bekomme schlechtere Noten.',
      next: 7,
      items: basicReply
    },
    7: {
      id: 7,
      type: 'radio',
      heading: 'Selbstfürsorge',
      description: 'Durch die Beschäftigung mit sozialen Medien vernachlässige ich mein Aussehen, meineKörperpflege und/oder meine Gesundheit. Z.B. schlafe ich durch die Nutzung sozialer Medien weniger, ernähre mich ungesund und bewege mich kaum.',
      next: 8,
      items: basicReply
    },
    8: {
      id: 8,
      type: 'radio',
      heading: 'Kontaktverlust',
      description: 'Durch die Beschäftigung mit sozialen Medien gefährde ich wichtige Kontakte oder habe diese bereits verloren. Hierzu zählen Kontakte mit festem Freund/ fester Freundin, Freundinnen/ Freunden, Bekannten oder Familie.',
      next: 9,
      items: basicReply
    },
    9: {
      id: 9,
      type: 'radio',
      heading: 'Zukunftsperspektive',
      description: 'Durch die Beschäftigung mit sozialen Medien erlebe ich Nachteile in der Schule oder in der Ausbildung/ im Job. Zum Beispiel habe ich durch die Beschäftigung mit sozialen Medien schlechtere Noten, meine Versetzung ist gefährdet oder ich bin nicht versetzt worden, ich habe keinen Abschluss oder keinen Ausbildungs-/ Studienplatz bekommen, habe ein schlechtes Praktikumszeugnis oder eine Abmahnung oder Kündigung erhalten.',
      next: 10,
      items: basicReply
    },
    10: {
      id: 10,
      type: 'radio',
      heading: 'Zeitkriterium',
      description: 'Wie häufig hattest Du im letzten Jahr die in den vorhin beschriebenen Aussagen Konflikte oder Schwierigkeiten wegen der Nutzung sozialer Medien? Kam das nur an einzelnen Tagen vor, gab es längere Phasen von Wochen oder Monaten oder war das nahezu täglich?',
      items: [
        {
          id: 'ueberhaupt_nicht',
          name: 'Überhaupt nicht',
          next: 'outro',
          value: 0
        },
        {
          id: 'nur_an_einzelnen_tagen',
          name: 'Nur an einzelnen Tagen',
          next: 'outro',
          value: 1
        },
        {
          id: 'ueber_laengere_phasen',
          name: 'Über längere Phasen',
          next: 11,
          value: 2
        },
        {
          id: 'nahezu_taeglich',
          name: 'nahezu täglich',
          next: 11,
          value: 3
        },
      ]
    },
    11: {
      id: 11,
      type: 'radio',
      heading: 'Bezugsrahmen',
      description: 'Erlebst Du die zuvor genannten Probleme, Konflikte und Schwierigkeiten durch die Nutzung sozialer Medien seit mindestens einem Jahr?',
      next: 12,
      items: [
        {
          id: 'ja',
          name: 'Ja',
          value: 0
        },
        {
          id: 'nein',
          name: 'Nein',
          value: 1
        }
      ]
    },
    12: {
      id: 12,
      type: 'radio',
      heading: 'Verlaufskriterium',
      description: 'Hattest Du solch längere Phasen mit Problemen, Konflikten oder Schwierigkeiten wegen der Nutzung sozialer Medien häufiger oder kam das nur einmal vor?',
      next: 13,
      items: [
        {
          id: 'einmal',
          name: 'Einmal',
          value: 0
        },
        {
          id: 'haufiger_als_einmal',
          name: 'Häufiger als einmal',
          value: 1
        }
      ]
    },
    13: {
      id: 13,
      type: 'radio',
      heading: 'Dauer der Symptomphase',
      description: 'Wie lange dauerte eine solche Phase, in der Du über einen längeren Zeitraum Probleme, Konflikte oder Schwierigkeiten wegen Deiner Nutzung sozialer Medien hattest, maximal an?',
      next: 'outro',
      items: [
        {
          id: 'weniger_als_eine_woche',
          name: 'Weniger als eine Woche',
          value: 0
        },
        {
          id: 'eine_woche_bis_weniger_als_ein_Monat',
          name: 'Eine Woche bis weniger als ein Monat',
          value: 1
        },
        {
          id: 'ein_monat_bis_weniger_als_drei_monate',
          name: 'Ein Monat bis weniger als drei Monate',
          value: 2
        },
        {
          id: 'drei_bis_weniger_als_neun_monate',
          name: 'Drei bis weniger als neun Monate',
          value: 3
        },
        {
          id: 'neun_monate_und_mehr',
          name: 'Neun Monate und mehr',
          value: 4
        }
      ]
    },
    outro: {
      id: 'outro',
      type: 'outro',
      heading: 'Auswertung',
      description: 'Auswertung'
    }
  };

  return steps;
}

