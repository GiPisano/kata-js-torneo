const fighters = [
  { name: "Freezer", power: 8000 },
  { name: "Vegeta", power: 8500 },
  { name: "Crilin", power: 500 },
  { name: "Mr Satan", power: 50 },
  { name: "Junior", power: 6000 },
  { name: "Goku", power: 9001 },
  { name: "Tensing", power: 450 },
  { name: "Videl", power: 300 },
  { name: "Bulma", power: 20 },
  { name: "C-18", power: 7800 },
  { name: "Gohan", power: 8900 },
  { name: "Trunks", power: 1250 },
];

const weapons = [
  { name: "Ventaglio della Musa", power: 15 },
  { name: "Scouter", power: 30 },
  { name: "Bastone Roshi", power: 60 },
  { name: "Fagioli Magici", power: 70 },
  { name: "Katana di Yajirobei", power: 85 },
  { name: "Spada del Dragone Azzurro", power: 115 },
  { name: "Armatura Saiyan", power: 145 },
  { name: "Cannone da braccio", power: 170 },
  { name: "Nuvola d'oro", power: 200 },
  { name: "Bastone Nyoi", power: 220 },
  { name: "Spada Z", power: 235 },
  { name: "Orecchini Potara", power: 250 },
];

// Milestone 1 - Scelta dell’arma:

// ogni combattente sceglierà casualmente un'arma dalla relativa lista.
// Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.

// funzione che restituisce un numero casuale.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function assignWeapons(weapons, fighters) {
  let availableWeapons = [...weapons]; //copia dell'array delle armi per tenere traccia di quelle disponibili.
  console.log("Inizio assegnazione delle armi ai combattenti.");

  fighters.forEach((fighter) => {
    if (availableWeapons.length > 0) {
      const randomIndex = getRandomInt(0, availableWeapons.length - 1);
      const chosenWeapon = availableWeapons[randomIndex];

      // assegno un'arma a ogni combattente e ne calcolo la sua potenza.
      fighter.weapon = chosenWeapon.name;
      fighter.totalPower = fighter.power + chosenWeapon.power;

      // rimuovo l'arma selezionata dalla lista delle armi disponibili.
      availableWeapons.splice(randomIndex, 1);

      console.log(
        `Il combattente ${fighter.name} con potenza ${fighter.power} ha scelto -> ${chosenWeapon.name} con potenza ${chosenWeapon.power} la sua potenza totale è ${fighter.totalPower}`
      );
    } else {
      // Se non ci sono più armi disponibili, il combattente rimane senza arma.
      console.log(`Nessuna arma disponibile per ${fighter.name}.`);
      fighter.weapon = "None";
      fighter.totalPower = fighter.power;
    }
  });

  return fighters;
}

const fightersWithWeapons = assignWeapons(weapons, fighters);

// Milestone 2 - Allenamento:

// ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no)
// la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.

function fightersTraining(fighters) {
  console.log("\nInizio allenamento dei combattenti.");
  fighters.forEach((fighter) => {
    const trainingMultiplier = getRandomInt(1, 100);
    fighter.trainedPower = fighter.totalPower * trainingMultiplier;
    console.log(
      `Il combattente ${fighter.name} si è allenato. Potenza originale: ${fighter.totalPower}, moltiplicatore: ${trainingMultiplier}, potenza allenata: ${fighter.trainedPower}`
    );
  });
}

fightersTraining(fightersWithWeapons);

// Milestone 3 - Qualificazione:

// escludiamo dal torneo chi, dopo l'allenamento non è riuscito a raggiungere una potenza di almeno 2000.

// combattenti qualificati.
const qualifiedFighters = fightersWithWeapons.filter(
  (fighter) => fighter.trainedPower >= 2000
);

// combattenti non qualificati.
const eliminatedFighters = fightersWithWeapons.filter(
  (fighter) => fighter.trainedPower < 2000
);

console.log("\nCombattenti qualificati:");
console.table(qualifiedFighters);

if (eliminatedFighters.length > 0) {
  console.log("\nCombattenti eliminati:");
  console.table(eliminatedFighters);
} else {
  console.log("Nessun combattente è stato eliminato");
}

// Milestone 4 - Combattimento:

// i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco,
// assicurandosi che ognuno combatta una sola volta.

// In ogni scontro vincerà il combattente con la potenza più alta.
// In caso di parità vincerà chi "gioca in casa", ossia chi viene prima nell'elenco.

// NB: bisogna assicurarsi che l'elenco contenga un numero pari di combattenti,
// altrimenti l'ultimo non avrebbe un avversario. Potrebbe essere necessario aggiungere un
// combattente "Robot" con potenza "4000" all'ultimo minuto.

// mescolo l'array dei combattenti
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const shuffledFighters = shuffleArray(qualifiedFighters);

// Controllo per un numero pari di combattenti.
if (shuffledFighters.length % 2 !== 0) {
  // Se il numero di combattenti è dispari, aggiungiamo un combattente "Robot" con potenza 4000.
  shuffledFighters.push({
    name: "Robot",
    trainedPower: 4000,
  });
}

// Svolgimento dei combattimenti.
console.log("\nSvolgimento dei combattimenti:");

for (let i = 0; i < shuffledFighters.length; i += 2) {
  const fighter1 = shuffledFighters[i];
  const fighter2 = shuffledFighters[i + 1];

  console.log(
    `\nScontro tra ${fighter1.name} (${fighter1.trainedPower}) e ${fighter2.name} (${fighter2.trainedPower}):`
  );

  if (fighter1.trainedPower > fighter2.trainedPower) {
    console.log(`${fighter1.name} vince lo scontro!`);
  } else if (fighter1.trainedPower < fighter2.trainedPower) {
    console.log(`${fighter2.name} vince lo scontro!`);
  } else {
    console.log(
      "Lo scontro è in pareggio! Vince il giocatore di casa:",
      fighter1.name
    );
  }
}

// Milestone 5 - Premiazione:

// tra tutti i vincitori degli scontri, saliranno sul podio i 3 combattenti
// con la potenza più alta, in ordine decrescente.

const winners = shuffledFighters
  .sort((a, b) => b.trainedPower - a.trainedPower)
  .slice(0, 3);

console.log("\nPodio dei vincitori:");
console.table(winners);
