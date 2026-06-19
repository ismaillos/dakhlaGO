export interface Review {
  id: string;
  name: string;
  product: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Fatima Z.',
    product: 'Toutia Ismailiya',
    rating: 5,
    text: 'Incroyable ! Je l\'utilise depuis 2 mois et je ne pourrai plus jamais retourner aux deodorants chimiques. Fraicheur naturelle toute la journee, meme apres le sport. Sans aluminium c\'est un vrai plus pour la sante.',
    date: '2025-05-15',
    avatar: 'F',
  },
  {
    id: 'r2',
    name: 'Amina B.',
    product: 'Secret d\'Atlas Shampoing',
    rating: 5,
    text: 'Mes cheveux ont completement change en 3 semaines ! Plus de pellicules, plus de demangeaisons, et une pousse visible. L\'odeur est divine, ca sent les plantes fraiches de l\'Atlas. Je recommande a 200%.',
    date: '2025-05-20',
    avatar: 'A',
  },
  {
    id: 'r3',
    name: 'Youssef M.',
    product: 'ELIXIR+ Vigueur',
    rating: 5,
    text: 'J\'etais sceptique au debut mais les resultats sont la. Plus d\'energie des le matin, moins de fatigue apres le travail. Les gelules sont faciles a avaler et je n\'ai eu aucun effet secondaire.',
    date: '2025-05-22',
    avatar: 'Y',
  },
  {
    id: 'r4',
    name: 'Sara K.',
    product: 'Masque Tresor du Desert',
    rating: 5,
    text: 'J\'avais les cheveux tres abimes apres des annees de lissage. Ce masque est un miracle ! Apres 4 utilisations mes pointes sont reparées, mes cheveux sont brillants et soyeux. L\'odeur de cacao est addictive.',
    date: '2025-05-25',
    avatar: 'S',
  },
  {
    id: 'r5',
    name: 'Nadia E.',
    product: 'MAX Biotin',
    rating: 5,
    text: 'Le meilleur complement capillaire que j\'ai jamais essaye ! Ma chute de cheveux post-accouchement s\'est arretee en 3 semaines. Au bout de 2 mois j\'avais une nouvelle pousse partout. Mes ongles sont aussi beaucoup plus forts.',
    date: '2025-05-28',
    avatar: 'N',
  },
  {
    id: 'r6',
    name: 'Khadija R.',
    product: 'Huile Secret d\'Atlas',
    rating: 5,
    text: 'Cette huile est magique ! Je l\'utilise comme serum avant chaque shampoing et mes cheveux n\'ont jamais ete aussi beaux. La texture est legere, ca ne graisse pas et l\'odeur est subtile et naturelle.',
    date: '2025-06-01',
    avatar: 'K',
  },
  {
    id: 'r7',
    name: 'Hassan T.',
    product: 'Floro Calm Huile',
    rating: 4,
    text: 'J\'ai des douleurs de dos chroniques et cette huile m\'aide beaucoup. L\'effet chauffant est immediat et dure plusieurs heures. Je l\'utilise matin et soir. Le seul bemol c\'est qu\'il faut laisser absorber avant de s\'habiller.',
    date: '2025-06-03',
    avatar: 'H',
  },
  {
    id: 'r8',
    name: 'Leila M.',
    product: 'Serum Zone Intime',
    rating: 5,
    text: 'Enfin un produit intime naturel qui fonctionne ! Mon teint est plus uniforme, la texture de ma peau est amelioree et je me sens plus confiante. Le pH equilibre est rassurant. Je recommande vivement.',
    date: '2025-06-05',
    avatar: 'L',
  },
  {
    id: 'r9',
    name: 'Omar F.',
    product: 'Spray Anti-Chute',
    rating: 5,
    text: 'Je perdais beaucoup de cheveux a cause du stress. Ce spray a completement stoppe ma chute en 1 mois. La sensation de fraicheur sur le cuir chevelu est agreable. J\'en reprends un deuxieme flacon.',
    date: '2025-06-08',
    avatar: 'O',
  },
  {
    id: 'r10',
    name: 'Samira D.',
    product: 'Serum Hydratant Cheveux',
    rating: 5,
    text: 'Mon indispensable quotidien ! J\'en applique quelques gouttes sur mes cheveux humides et ils sechent sans frisottis. Protege parfaitement de la chaleur du lisseur. Mes cheveux sont doux et brillants toute la journee.',
    date: '2025-06-10',
    avatar: 'S',
  },
];
