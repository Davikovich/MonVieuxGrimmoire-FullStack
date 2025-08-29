// Fonction calculant la moyenne des nombres d'un tableau
exports.average = (array) => { 
    let sum = 0; //  // On initialise la somme à 0
    for (let nb of array) { // On parcourt le tableau
        sum += nb; // On ajoute chaque nombre à la somme
    }
    return (sum/array.length).toFixed(1); // On retourne la moyenne arrondie à 1 décimale
};
