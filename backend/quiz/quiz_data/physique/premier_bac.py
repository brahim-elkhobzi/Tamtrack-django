
# # Math Quiz Questions for Premier Bac Level
# questions_by_topic = {
#     "Fonctions": [
#         {
#             "question": "Le domaine de f(x) = 1/x est :",
#             "options": ["ℝ", "ℝ\\{0}", "[0,∞)", "[-1,1]"],
#             "correct": "ℝ\\{0}",
#             "explanation": "x ≠ 0 pour éviter division par 0.",
#             "level": "Premier Bac",
#             "topic": "Fonctions"
#         },
#         {
#             "question": "f(x) = x² est-elle injective ?",
#             "options": ["Non", "Oui", "Sur ℝ⁺", "Sur ℝ⁻"],
#             "correct": "Non",
#             "explanation": "f(-x) = f(x), donc pas injective.",
#             "level": "Premier Bac",
#             "topic": "Fonctions"
#         },
#         {
#             "question": "Si f(x) = 2x + 3, alors f(1) = ?",
#             "options": ["5", "3", "4", "6"],
#             "correct": "5",
#             "explanation": "f(1) = 2×1 + 3 = 5.",
#             "level": "Premier Bac",
#             "topic": "Fonctions"
#         },
#         # ... 17 more questions
#         {
#             "question": "f(x) = |x| est-elle surjective sur ℝ ?",
#             "options": ["Non", "Oui", "Sur ℝ⁺", "Sur ℝ⁻"],
#             "correct": "Non",
#             "explanation": "Image de f(x) = |x| est ℝ⁺, pas ℝ.",
#             "level": "Premier Bac",
#             "topic": "Fonctions"
#         }
#     ],
#     "Barycentre": [
#         {
#             "question": "Barycentre de A(1,1) et B(3,3) avec poids 1:1 ?",
#             "options": ["(2,2)", "(1,3)", "(3,1)", "(4,4)"],
#             "correct": "(2,2)",
#             "explanation": "Moyenne des coordonnées.",
#             "level": "Premier Bac",
#             "topic": "Barycentre"
#         },
#         {
#             "question": "Barycentre de A(0,0) et B(4,0) avec poids 2:1 ?",
#             "options": ["(4/3,0)", "(8/3,0)", "(2,0)", "(1,0)"],
#             "correct": "(8/3,0)",
#             "explanation": "x = (2×0 + 1×4)/(2+1).",
#             "level": "Premier Bac",
#             "topic": "Barycentre"
#         },
#         {
#             "question": "Barycentre de A(1,2), B(5,4) avec poids 3:1 ?",
#             "options": ["(2,5/2)", "(3,3)", "(4,3)", "(2,3)"],
#             "correct": "(2,5/2)",
#             "explanation": "x = (3×1 + 1×5)/(3+1), y = (3×2 + 1×4)/(3+1).",
#             "level": "Premier Bac",
#             "topic": "Barycentre"
#         },
#         # ... 17 more questions
#         {
#             "question": "Si G(3,2) est barycentre de A(2,1), B(x,y), poids 2:1, alors B = ?",
#             "options": ["(5,4)", "(4,3)", "(3,2)", "(6,5)"],
#             "correct": "(5,4)",
#             "explanation": "x = (2×2 + 1×x)/(2+1) = 3, y = (2×1 + 1×y)/(2+1) = 2.",
#             "level": "Premier Bac",
#             "topic": "Barycentre"
#         }
#     ],
#     "Produit scalaire": [
#         {
#             "question": "Produit scalaire u·v, u(1,2), v(3,4) ?",
#             "options": ["11", "7", "5", "9"],
#             "correct": "11",
#             "explanation": "u·v = 1×3 + 2×4 = 11.",
#             "level": "Premier Bac",
#             "topic": "Produit scalaire"
#         },
#         {
#             "question": "u et v orthogonaux si u(1,0), v(0,1) ?",
#             "options": ["Oui", "Non", "Parfois", "Jamais"],
#             "correct": "Oui",
#             "explanation": "u·v = 0.",
#             "level": "Premier Bac",
#             "topic": "Produit scalaire"
#         },
#         {
#             "question": "Norme de u(2,3) ?",
#             "options": ["√13", "5", "√5", "7"],
#             "correct": "√13",
#             "explanation": "||u|| = √(2² + 3²) = √13.",
#             "level": "Premier Bac",
#             "topic": "Produit scalaire"
#         },
#         # ... 17 more questions
#         {
#             "question": "Produit scalaire u·v, u(2,0), v(0,3) ?",
#             "options": ["0", "6", "2", "3"],
#             "correct": "0",
#             "explanation": "u·v = 2×0 + 0×3 = 0.",
#             "level": "Premier Bac",
#             "topic": "Produit scalaire"
#         }
#     ],
#     "Suites numériques": [
#         {
#             "question": "Si u_n = 2n + 1, alors u_3 =",
#             "options": ["7", "5", "9", "6"],
#             "correct": "7",
#             "explanation": "u_3 = 2×3 + 1 = 7.",
#             "level": "Premier Bac",
#             "topic": "Suites numériques"
#         },
#         {
#             "question": "Suite géométrique : 2, 4, 8, …, raison =",
#             "options": ["2", "4", "1", "3"],
#             "correct": "2",
#             "explanation": "4/2 = 8/4 = 2.",
#             "level": "Premier Bac",
#             "topic": "Suites numériques"
#         },
#         {
#             "question": "Si u_1 = 1, u_{n+1} = 3u_n, alors u_3 = ?",
#             "options": ["9", "3", "6", "1"],
#             "correct": "9",
#             "explanation": "u_2 = 3×1 = 3, u_3 = 3×3 = 9.",
#             "level": "Premier Bac",
#             "topic": "Suites numériques"
#         },
#         # ... 17 more questions
#         {
#             "question": "u_n = n² est-elle croissante pour n ≥ 1 ?",
#             "options": ["Oui", "Non", "Parfois", "Jamais"],
#             "correct": "Oui",
#             "explanation": "u_{n+1} - u_n = 2n + 1 > 0 pour n ≥ 1.",
#             "level": "Premier Bac",
#             "topic": "Suites numériques"
#         }
#     ],
#     "Calcul trigonométrique": [
#         {
#             "question": "Valeur de sin(π/6) ?",
#             "options": ["1/2", "√3/2", "1", "0"],
#             "correct": "1/2",
#             "explanation": "Valeur usuelle de sin(30°).",
#             "level": "Premier Bac",
#             "topic": "Calcul trigonométrique"
#         },
#         {
#             "question": "cos²(x) + sin²(x) =",
#             "options": ["1", "0", "2", "-1"],
#             "correct": "1",
#             "explanation": "Identité trigonométrique fondamentale.",
#             "level": "Premier Bac",
#             "topic": "Calcul trigonométrique"
#         },
#         {
#             "question": "Valeur de tan(π/3) ?",
#             "options": ["√3", "1", "1/√3", "0"],
#             "correct": "√3",
#             "explanation": "Valeur usuelle de tan(60°).",
#             "level": "Premier Bac",
#             "topic": "Calcul trigonométrique"
#         },
#         # ... 17 more questions
#         {
#             "question": "Si sin(x) = √2/2, alors x = ? (0 ≤ x ≤ π/2)",
#             "options": ["π/4", "π/6", "π/3", "π/2"],
#             "correct": "π/4",
#             "explanation": "sin(x) = √2/2 pour x = π/4 dans [0,π/2].",
#             "level": "Premier Bac",
#             "topic": "Calcul trigonométrique"
#         }
#     ],
#     "Rotation": [
#         {
#             "question": "Rotation de 90° autour de O, A(1,0) ?",
#             "options": ["(0,1)", "(-1,0)", "(0,-1)", "(1,0)"],
#             "correct": "(0,1)",
#             "explanation": "Rotation 90° : (x,y) → (-y,x).",
#             "level": "Premier Bac",
#             "topic": "Rotation"
#         },
#         {
#             "question": "Rotation de 180° autour de O, A(2,3) ?",
#             "options": ["(-2,-3)", "(2,-3)", "(-2,3)", "(3,2)"],
#             "correct": "(-2,-3)",
#             "explanation": "Rotation 180° : (x,y) → (-x,-y).",
#             "level": "Premier Bac",
#             "topic": "Rotation"
#         },
#         {
#             "question": "Rotation de 90° autour de (1,1), A(2,1) ?",
#             "options": ["(1,2)", "(2,2)", "(1,0)", "(0,1)"],
#             "correct": "(1,2)",
#             "explanation": "Translation, rotation 90°, translation inverse.",
#             "level": "Premier Bac",
#             "topic": "Rotation"
#         },
#         # ... 17 more questions
#         {
#             "question": "Rotation de -90° autour de O, A(1,1) ?",
#             "options": ["(1,-1)", "(-1,1)", "(-1,-1)", "(0,0)"],
#             "correct": "(1,-1)",
#             "explanation": "Rotation -90° : (x,y) → (y,-x).",
#             "level": "Premier Bac",
#             "topic": "Rotation"
#         }
#     ],
#     "Limites": [
#         {
#             "question": "Limite de f(x) = 1/x quand x → ∞ ?",
#             "options": ["0", "1", "∞", "-∞"],
#             "correct": "0",
#             "explanation": "1/x → 0 quand x → ∞.",
#             "level": "Premier Bac",
#             "topic": "Limites"
#         },
#         {
#             "question": "Limite de f(x) = x² quand x → 0 ?",
#             "options": ["0", "1", "∞", "-∞"],
#             "correct": "0",
#             "explanation": "x² → 0 quand x → 0.",
#             "level": "Premier Bac",
#             "topic": "Limites"
#         },
#         {
#             "question": "Limite de f(x) = (x²-4)/(x-2) quand x → 2 ?",
#             "options": ["4", "2", "0", "Indéfini"],
#             "correct": "4",
#             "explanation": "(x²-4)/(x-2) = x+2, limite = 4.",
#             "level": "Premier Bac",
#             "topic": "Limites"
#         },
#         # ... 17 more questions
#         {
#             "question": "Limite de f(x) = (2x+1)/(x-1) quand x → ∞ ?",
#             "options": ["2", "1", "∞", "0"],
#             "correct": "2",
#             "explanation": "Diviser par x, limite = 2/1 = 2.",
#             "level": "Premier Bac",
#             "topic": "Limites"
#         }
#     ],
#     "Dérivation": [
#         {
#             "question": "Dérivée de f(x) = x² ?",
#             "options": ["2x", "x", "2", "x²"],
#             "correct": "2x",
#             "explanation": "f'(x) = 2x.",
#             "level": "Premier Bac",
#             "topic": "Dérivation"
#         },
#         {
#             "question": "Dérivée de f(x) = sin(x) ?",
#             "options": ["cos(x)", "-sin(x)", "sin(x)", "-cos(x)"],
#             "correct": "cos(x)",
#             "explanation": "f'(x) = cos(x).",
#             "level": "Premier Bac",
#             "topic": "Dérivation"
#         },
#         {
#             "question": "Dérivée de f(x) = 3x² - 2x ?",
#             "options": ["6x - 2", "3x - 2", "6x", "3x"],
#             "correct": "6x - 2",
#             "explanation": "f'(x) = 6x - 2.",
#             "level": "Premier Bac",
#             "topic": "Dérivation"
#         },
#         # ... 17 more questions
#         {
#             "question": "Dérivée de f(x) = cos(x) ?",
#             "options": ["-sin(x)", "sin(x)", "cos(x)", "-cos(x)"],
#             "correct": "-sin(x)",
#             "explanation": "f'(x) = -sin(x).",
#             "level": "Premier Bac",
#             "topic": "Dérivation"
#         }
#     ],
#     "Étude des fonctions": [
#         {
#             "question": "Signe de f(x) = x² - 4 pour x > 2 ?",
#             "options": ["Positif", "Négatif", "Nul", "Indéfini"],
#             "correct": "Positif",
#             "explanation": "x² - 4 > 0 pour x > 2.",
#             "level": "Premier Bac",
#             "topic": "Étude des fonctions"
#         },
#         {
#             "question": "f(x) = x³ est-elle croissante ?",
#             "options": ["Oui", "Non", "Sur ℝ⁺", "Sur ℝ⁻"],
#             "correct": "Oui",
#             "explanation": "f'(x) = 3x² ≥ 0, donc croissante.",
#             "level": "Premier Bac",
#             "topic": "Étude des fonctions"
#         },
#         {
#             "question": "Minimum de f(x) = x² - 4x + 3 ?",
#             "options": ["x = 2", "x = 1", "x = 0", "Aucun"],
#             "correct": "x = 2",
#             "explanation": "f'(x) = 2x - 4, f''(2) > 0, min en x = 2.",
#             "level": "Premier Bac",
#             "topic": "Étude des fonctions"
#         },
#         # ... 17 more questions
#         {
#             "question": "Asymptote horizontale de f(x) = (3x)/(x+2) ?",
#             "options": ["y = 3", "y = 0", "y = 2", "Aucune"],
#             "correct": "y = 3",
#             "explanation": "Limite quand x → ±∞ donne y = 3.",
#             "level": "Premier Bac",
#             "topic": "Étude des fonctions"
#         }
#     ],
#     "Géométrie dans l’espace": [
#         {
#             "question": "Distance entre A(1,0,0) et B(0,1,0) ?",
#             "options": ["√2", "1", "2", "√3"],
#             "correct": "√2",
#             "explanation": "d = √((1-0)² + (0-1)² + (0-0)²).",
#             "level": "Premier Bac",
#             "topic": "Géométrie dans l’espace"
#         },
#         {
#             "question": "Vecteur AB si A(1,1,1), B(2,3,4) ?",
#             "options": ["(1,2,3)", "(2,3,4)", "(1,1,1)", "(3,4,5)"],
#             "correct": "(1,2,3)",
#             "explanation": "AB = (2-1, 3-1, 4-1).",
#             "level": "Premier Bac",
#             "topic": "Géométrie dans l’espace"
#         },
#         {
#             "question": "Équation paramétrique de la droite passant par (0,0,0), vecteur (1,2,3) ?",
#             "options": ["x = t, y = 2t, z = 3t", "x = t, y = t, z = t", "x = 0, y = t, z = 0", "x = t, y = 0, z = 0"],
#             "correct": "x = t, y = 2t, z = 3t",
#             "explanation": "Paramétrique : x = t, y = 2t, z = 3t.",
#             "level": "Premier Bac",
#             "topic": "Géométrie dans l’espace"
#         },
#         # ... 17 more questions
#         {
#             "question": "Produit scalaire u·v, u(1,0,1), v(0,1,0) ?",
#             "options": ["0", "1", "2", "3"],
#             "correct": "0",
#             "explanation": "u·v = 1×0 + 0×1 + 1×0 = 0.",
#             "level": "Premier Bac",
#             "topic": "Géométrie dans l’espace"
#         }
#     ]
# }
# Quiz Data for Physique-Chimie - Premier Bac

questions_by_topic = {
        # ========= PARTIE MÉCANIQUE =========
        "Rotation d'un solide autour d'un axe fixe": [
            {
                "question": "Quelle est l'unité de la vitesse angulaire (ω) dans le Système International ?",
                "options": ["m/s", "rad/s", "tours/min", "Hz"],
                "correct": "rad/s",
                "explanation": "La vitesse angulaire (ω) est l'angle parcouru par unité de temps, son unité SI est donc le radian par seconde.",
                "level": "premier bac", "topic": "Rotation d'un solide autour d'un axe fixe"
            },
            {
                "question": "Si un point d'un solide en rotation a une vitesse linéaire v et se trouve à une distance r de l'axe, quelle est la relation avec la vitesse angulaire ω ?",
                "options": ["v = ω / r", "v = r / ω", "v = ω * r", "v = ω * r²"],
                "correct": "v = ω * r",
                "explanation": "La vitesse linéaire d'un point est le produit de la vitesse angulaire et de son rayon (la distance à l'axe).",
                "level": "premier bac", "topic": "Rotation d'un solide autour d'un axe fixe"
            },
        ],
        "Travail et énergie cinétique": [
            {
                "question": "Le théorème de l'énergie cinétique énonce que la variation de l'énergie cinétique ΔEc est égale à :",
                "options": ["La somme des travaux des forces intérieures", "La somme des travaux de toutes les forces appliquées", "L'énergie potentielle", "La puissance des forces"],
                "correct": "La somme des travaux de toutes les forces appliquées",
                "explanation": "ΔEc = Σ W(F). Ce théorème relie la variation d'énergie due au mouvement à l'action des forces.",
                "level": "premier bac", "topic": "Travail et énergie cinétique"
            },
            {
                "question": "L'énergie cinétique d'un objet de masse 'm' se déplaçant à la vitesse 'v' est donnée par :",
                "options": ["Ec = m * v²", "Ec = 2 * m * v²", "Ec = 1/2 * m * v", "Ec = 1/2 * m * v²"],
                "correct": "Ec = 1/2 * m * v²",
                "explanation": "L'énergie cinétique est proportionnelle à la masse et au carré de la vitesse.",
                "level": "premier bac", "topic": "Travail et énergie cinétique"
            }
        ],
        "Énergie potentielle et énergie mécanique": [
            {
                "question": "L'énergie mécanique (Em) d'un système en l'absence de frottements :",
                "options": ["Augmente toujours", "Diminue toujours", "Se conserve", "Dépend de la température"],
                "correct": "Se conserve",
                "explanation": "S'il n'y a que des forces conservatives (comme le poids), l'énergie mécanique, somme de l'énergie cinétique et potentielle, est constante.",
                "level": "premier bac", "topic": "Énergie potentielle et énergie mécanique"
            },
            {
                "question": "Le travail du poids ne dépend que :",
                "options": ["Du chemin suivi", "De la vitesse initiale", "De la différence d'altitude entre le point de départ et d'arrivée", "Du temps du parcours"],
                "correct": "De la différence d'altitude entre le point de départ et d'arrivée",
                "explanation": "Le poids est une force conservative. Son travail ne dépend pas du chemin parcouru, mais uniquement des positions de départ et d'arrivée.",
                "level": "premier bac", "topic": "Énergie potentielle et énergie mécanique"
            },
        ],
        # ========= PARTIE CHIMIE : Solutions et Réactions =========
        "Grandeurs liées à la quantité de matière": [
            {
                "question": "Que représente la constante d'Avogadro Nₐ ?",
                "options": ["Le nombre d'atomes dans 1 gramme de Carbone 12", "La masse d'une mole de particules", "Le nombre d'entités (atomes, molécules) dans une mole", "Le volume occupé par une mole de gaz"],
                "correct": "Le nombre d'entités (atomes, molécules) dans une mole",
                "explanation": "La constante d'Avogadro (≈ 6.022 × 10²³ mol⁻¹) est le nombre de particules constituant une mole.",
                "level": "premier bac", "topic": "Grandeurs liées à la quantité de matière"
            }
        ],
        "La concentration et les solutions électrolytiques": [
            {
                "question": "La relation entre la concentration molaire (C) et la concentration massique (Cm) d'un soluté de masse molaire (M) est :",
                "options": ["C = Cm / M", "C = Cm * M", "Cm = C / M", "C et Cm ne sont pas liées"],
                "correct": "C = Cm / M",
                "explanation": "La concentration molaire (mol/L) est égale à la concentration massique (g/L) divisée par la masse molaire (g/mol).",
                "level": "premier bac", "topic": "La concentration et les solutions électrolytiques"
            }
        ],
        "Les réactions acido-basiques": [
            {
                "question": "Le pH d'une solution aqueuse est défini par la relation :",
                "options": ["pH = -log[H₃O⁺]", "pH = log[H₃O⁺]", "pH = -ln[H₃O⁺]", "pH = 14 + log[H₃O⁺]"],
                "correct": "pH = -log[H₃O⁺]",
                "explanation": "Le potentiel Hydrogène (pH) est le cologarithme décimal de la concentration en ions oxonium [H₃O⁺].",
                "level": "premier bac", "topic": "Les réactions acido-basiques"
            },
            {
                "question": "Dans le couple H₂O/HO⁻, l'ion hydroxyde HO⁻ est :",
                "options": ["Un acide", "Une base", "Amphotère", "Un oxydant"],
                "correct": "Une base",
                "explanation": "HO⁻ est la base conjuguée de l'acide H₂O, car il est capable de capter un proton H⁺ pour former H₂O.",
                "level": "premier bac", "topic": "Les réactions acido-basiques"
            },
        ],
        "Les réactions d'oxydo-réduction": [
            {
                "question": "Qu'est-ce qu'un réducteur ?",
                "options": ["Une espèce qui capte des électrons", "Une espèce qui perd des électrons", "Le résultat d'une réduction", "Un synonyme d'acide"],
                "correct": "Une espèce qui perd des électrons",
                "explanation": "Un réducteur est une espèce chimique qui subit une oxydation, c'est-à-dire une perte d'électrons.",
                "level": "premier bac", "topic": "Les réactions d'oxydo-réduction"
            }
        ],
        # ========= PARTIE ÉLECTRICITÉ ET MAGNÉTISME =========
        "Transfert d'énergie dans un circuit électrique": [
            {
                "question": "Dans un générateur, l'énergie électrique fournie au circuit est donnée par :",
                "options": ["W_elec = U_PN * I * Δt", "W_elec = r * I² * Δt", "W_elec = P / Δt", "W_elec = U_PN / I"],
                "correct": "W_elec = U_PN * I * Δt",
                "explanation": "L'énergie électrique fournie est le produit de la tension à ses bornes, de l'intensité et de la durée de fonctionnement.",
                "level": "premier bac", "topic": "Transfert d'énergie dans un circuit électrique"
            }
        ],
        "Le champ magnétique": [
            {
                "question": "L'unité du champ magnétique B dans le Système International est le :",
                "options": ["Volt (V)", "Ampère (A)", "Weber (Wb)", "Tesla (T)"],
                "correct": "Tesla (T)",
                "explanation": "Le Tesla (T) est l'unité dérivée d'induction magnétique (ou de densité de flux magnétique) du SI.",
                "level": "premier bac", "topic": "Le champ magnétique"
            }
        ],
        "Les forces électromagnétiques - La loi de Laplace": [
            {
                "question": "La direction de la force de Laplace est donnée par :",
                "options": ["La règle du tire-bouchon", "La règle de la main droite (ou du bonhomme d'Ampère)", "La loi d'Ohm", "La loi de Lenz"],
                "correct": "La règle de la main droite (ou du bonhomme d'Ampère)",
                "explanation": "La direction de la force est perpendiculaire au plan formé par le conducteur (vecteur I·L) et le champ magnétique (B), et son sens est donné par la règle des trois doigts de la main droite.",
                "level": "premier bac", "topic": "Les forces électromagnétiques - La loi de Laplace"
            }
        ],
        # ========= PARTIE OPTIQUE =========
        "Les images formées par un miroir plan": [
            {
                "question": "L'image A' d'un point objet A donnée par un miroir plan est :",
                "options": ["Le symétrique de A par rapport au miroir", "Réelle et à la même distance que A", "Inversée et plus petite", "Au foyer du miroir"],
                "correct": "Le symétrique de A par rapport au miroir",
                "explanation": "L'image formée par un miroir plan est virtuelle, droite, de même taille que l'objet, et située symétriquement par rapport au plan du miroir.",
                "level": "premier bac", "topic": "Les images formées par un miroir plan"
            }
        ],
        "Les images formées par une lentille mince convergente": [
            {
                "question": "Un rayon lumineux passant par le centre optique O d'une lentille mince convergente :",
                "options": ["Est dévié vers l'axe optique", "Émerge parallèlement à l'axe optique", "N'est pas dévié", "Passe par le foyer image F'"],
                "correct": "N'est pas dévié",
                "explanation": "Tout rayon passant par le centre optique d'une lentille mince n'est pas dévié.",
                "level": "premier bac", "topic": "Les images formées par une lentille mince convergente"
            }
        ],
        # ========= PARTIE CHIMIE ORGANIQUE =========
        "Les molécules organiques et les squelettes carbonés": [
            {
                "question": "Les alcanes sont des hydrocarbures :",
                "options": ["Insaturés avec des doubles liaisons", "Aromatiques", "Saturés ne contenant que des liaisons simples", "Cycliques uniquement"],
                "correct": "Saturés ne contenant que des liaisons simples",
                "explanation": "Les alcanes ont la formule générale CnH2n+2 et ne sont constitués que de liaisons simples C-C et C-H.",
                "level": "premier bac", "topic": "Les molécules organiques et les squelettes carbonés"
            },
            {
                "question": "Quelle est la formule brute du propane ?",
                "options": ["C₂H₆", "CH₄", "C₃H₈", "C₄H₁₀"],
                "correct": "C₃H₈",
                "explanation": "Le propane est un alcane avec 3 atomes de carbone, sa formule est donc C₃H₂(₃)+₂, soit C₃H₈.",
                "level": "premier bac", "topic": "Les molécules organiques et les squelettes carbonés"
            }
        ],
        "Les groupes caractéristiques en chimie organique": [
            {
                "question": "Le groupe caractéristique des alcools est le groupe :",
                "options": ["Carbonyle (-C=O)", "Hydroxyle (-OH)", "Carboxyle (-COOH)", "Amine (-NH₂)"],
                "correct": "Hydroxyle (-OH)",
                "explanation": "Le groupe fonctionnel hydroxyle -OH, lié à un atome de carbone saturé, caractérise la famille des alcools.",
                "level": "premier bac", "topic": "Les groupes caractéristiques en chimie organique"
            }
        ],
        "Les isomères en chimie organique": [
            {
                "question": "Les isomères de constitution diffèrent par :",
                "options": ["Leur formule brute", "Leur formule semi-développée", "Leur configuration spatiale", "Leur masse molaire"],
                "correct": "Leur formule semi-développée",
                "explanation": "Les isomères de constitution ont la même formule brute mais des formules semi-développées différentes, reflétant des connexions différentes entre les atomes.",
                "level": "premier bac", "topic": "Les isomères en chimie organique"
            }
        ]

}