/* Première table : List */

-- On démarre une transaction afin de s'assurer de la cohérence gloabale de la BDD
BEGIN;

-- D'abord on supprime les table 'si elle existe"
DROP TABLE IF EXISTS "user";

-- après le DROP, aucune chance que les tables existent

-- Ensuite on la (re)crée

-- SERIAL = int auto-incrémenté
-- PRIMARY KEY implique NOT NULL, pas besoin de l'écrire
CREATE TABLE "user" (
  -- on utilise le nouveau type qui est un standart SQL alors que SERIAL est un pseudo-type de PG
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "firstname" TEXT NOT NULL DEFAULT '',
  "password" TEXT NOT NULL DEFAULT '',
  "email" TEXT NOT NULL DEFAULT '',
  "admin" BOOLEAN NOT NULL DEFAULT 'false',
  -- pour avoir la date et l'heure on utilise le type "timestamp", et pour être le plus précis possible on utilisera plutôt le type "timestampz" qui contient en plus de la date et de l'heure le fuseau horaire défini dans les locales du serveur
  -- pensez à la réunion Meet avec les collègues internationaux
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);




/* une fois les tables crées, on va les remplir */

-- les tables viennent d'être créées, leur serial commencera donc à 1, aucun doute là-dessus

-- je peux me permettre de supposer que les id commenceront à 1 car :
-- les tables existantes sont droppées avant d'être recréées
-- toutes les instructions dans la même transaction donc tout passe ou rien ne passe

INSERT INTO "user" ("name", "password", "email")
VALUES ('administrateur','123', 'a@gmail.com' );

INSERT INTO "user" ("name", "firstname", "password", "email")
VALUES ('leponge', 'Bob', '123', 'boblepong@gmale.coum' );





COMMIT;

/*
Pour créer 2 cartes, une blanche et l'autre rouge

a) laisser la couleur par défaut
INSERT INTO card (color, name) VALUES ('#f00', 'carte rouge');
INSERT INTO card (name) VALUES ('carte blanche');

b) donner toutes les infos
INSERT INTO card (color, name)
VALUES ('#f00', 'carte rouge'),
       ('#fff', 'carte blanche');

c) utiliser le mot-clé DEFAULT
INSERT INTO card (color, name)
VALUES ('#f00', 'carte rouge'),
       (DEFAULT, 'carte blanche');

*/