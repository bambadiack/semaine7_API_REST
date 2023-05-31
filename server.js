const express = require('express')
const db = require('./db.js')

const { get } = require('http')
const { error } = require('console')

const app = express()

//middleware qui permet de traitr les donnes de la request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const PORT = 3000


//pagination
const blog = [{
        id: 1,
        Titre: "SÉCURITÉ WEB",
        description: "C’est un processus de protection des sites ou applications web et d’autres ressources en ligne contre les acteurs malveillants.",
        Contenu: "Développement et sécurité web: Comment sécuriser son site web ?",
        detail: "Ces deux domaines sont indissociables ; l'un ne va pas sans l'autre. C'est-à-dire que la sécurité web et le développement web sont étroitement liés. Pour cette raison, il est important de comprendre comment ces deux interagissent l'un dans l'autre et quelles méthodes adoptées pour réussir à protéger vos sites web.",
        Auteur: "Mouhamadou Timera by xarala",
        DateCree: "Publié 15 Mai 2023",
        DateMjs: "29 mai 2023"
    },
    {
        id: 2,
        Titre: "prospection B2B",
        description: "B2B C'est le point de départ pour chaque transaction concluable ",
        Contenu: "les 11 meilleures methodes a exploiter",
        detail: "Il est difficile d'exagérer l'importance de la prospection B2B dans le contexte de la plupart des processus de vente B2B. C'est le point de départ pour chaque transaction concluable - et le faire efficacement peut faire la différence entre le maintien d'un flux constant d'opportunités productives et votre processus de vente ne jamais décoller.",
        Ateur: "jay fuchs",
        DateCree: "11/1/23",
        dateMaj: "29 mai 2023"
    },
    {
        id: 3,
        Titre: "COMMUNITY MAANAGEMENT ",
        description: "Les community managers sont responsables de la création, de la gestion et de la maintenance d'une communauté en ligne.",
        Contenu: "Comment obtenir plus de clients avec les médias sociaux",
        detail: "Si vous êtes un entrepreneur désireux de développer votre entreprise, les médias sociaux sont un outil essentiel. En utilisant les plateformes de médias...",
        Ateur: "Maalik Jallo",
        DateCree: "Pblie: 23 Avr. 2023",
        dateMaj: "29 mai 2023"
    },
    {
        id: 4,
        Titre: "Conception Web IA ",
        description: "Pour récapituler rapidement, lorsque nous parlons de « conception Web IA », nous parlons de l'utilisation d'outils et de technologies d'IA pour optimiser le processus de conception (et de développement) de sites Web.",
        Contenu: "tout ce que vous devez savoir ",
        detail: "Ce n'est un secret pour personne que l'intelligence artificielle (IA) bouleverse complètement notre façon de travailler et de créer. La conception de sites Web IA ne fait pas exception. ",
        Auteur: "Madison Zoey Vetorino",
        DateCree: "Publié : 30 mai 2023",
        dateMaj: "01 juin 2023"
    },
    {
        id: 5,
        Titre: "Activité du site Web",
        Description: "Suivre de près et comprendre l'activité de votre site Web",
        Contenu: "20 outils et tactiques pour suivre les utilisateurs",
        Detail: "Les sites Web de commerce électronique peuvent bénéficier de l'activité de suivi des sites Web. Pourquoi? Pour apprendre à connaître leurs clients, les entreprises en ligne doivent adopter des approches différentes de celles des magasins traditionnels. Ainsi, ils utilisent un logiciel pour surveiller la façon dont les gens utilisent les fonctionnalités du site.",
        Auteur: "Jay Fuchs",
        DateCree: "Pblie: 30 mai 2023 ",
        dateMaj: "01 juin 2023"
    },
    {
        id: 6,
        Titre: "Automatisez votre travail",
        description: " L'automatisation correspond à l'utilisation de technologies pour effectuer certaines tâches avec une intervention humaine réduite.",
        Contenu: "libérez la puissance des flux de travail",
        detail: "Apprenez du fondateur de Jotform comment l 'exploration de vos flux de travail peut vous aider avec tout, de e ...",
        Auteur: "diacketoile7",
        DateCree: "Publie: 29/05/23",
        dateMaj: "30 mai 2023"
    },
    {
        id: 7,
        Titre: "Developement Web",
        description: "Apparu avec Internet, le développement web fait référence au processus d'écriture d'un site ou d'une page web dans un langage technique. ",
        Contenu: "Comment commencer à coder : le guide ultime pour les programmeurs débutants",
        detail: "Le codage est l'une des compétences les plus précieuses que vous puissiez développer. Si vous cherchez comment apprendre à coder peut-être parce que vous voulez faire avancer votre carrière.",
        Auteur: "Jamie Juviler",
        DateCree: "Publié : 29 juin 2022",
        dateMaj: "29 mai 2023"
    },
    {
        id: 8,
        Titre: " Fonctions MySQL",
        description: "blablabla",
        Contenu: "définitions et exemples",
        detail: "Dans cet article, nous allons explorer les fonctions MySQL les plus couramment utilisées avec des définitions et des exemples pratiques pour vous aider à mieux les comprendre et les utiliser dans vos projets...",
        Auteur: "Clint Fontanelle",
        DateCree: "Publié : 30 mai 2023",
        dateMaj: "02/06/2023"
    },
    {
        id: 9,
        Titre: "les reseaux sociaux",
        description: "les reseaux sociaux sont devenus un outil incontornable...",
        Contenu: "comment tiliser les nouvelles technologies",
        detail: "Les médias sociaux permettent de communiquer auprès de sa communauté à tout moment, même en situation de mobilité. A l'heure des smartphones et tablettes, votre ..",
        Auteur: "Diack Etoile7",
        DateCree: "Publié : 29 mai 2023",
        dateMaj: "30 mai 2023"
    },
    {
        id: 10,
        Titre: "Comment verrouiller des cellules dans Google Sheets",
        description: "Imaginez passer des heures à créer une feuille de calcul Google à partager avec votre équipe, pour découvrir qu'un membre de l'équipe a accidentellement supprimé une colonne, une ligne, une cellule ou, pire encore, une feuille entière.",
        Contenu: "Comment verrouiller des cellules dans Google Sheets",
        detail: "Google Sheets permet aux utilisateurs de verrouiller les cellules contre l'édition, ce qui signifie que vous pouvez protéger votre feuille contre tout accident potentiel, y compris l'édition et la suppression",
        Auteur: "Diack Etoile7",
        DateCree: "Publié : 29 mai 2023",
        dateMaj: "30 mai 2023"
    }
];

//le point de terminaision
app.get('/api/articles/blog', (req, res) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {};

    if (endIndex < blog.length) {
        results.next = {
            page: page + 1,
            limit: limit,
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        };
    }
    results.results = blog.slice(startIndex, endIndex);

    res.json(results);


})


//lister les articles
app.get('/api/articles', (req, res) => {
    const sql = 'SELECT * FROM article'
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }
        res.json({ message: "listes des articles", data: rows });
    })
})

//afficher un article avec son ID

app.get("/api/articles/:id", (req, res) => {
    const { id: articleId } = req.params
    const sql = "SELECT * FROM article WHERE id = ?";
    const params = [articleId]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }
        res.json({
            message: `Afficher l'articles ${articleId}`,
            data: row
        });
    });
});



//cree un nouveau Article
app.post('/api/articles', (req, res) => {

    const { title, description, contenu, auteur, dateCree, dateMaj } = req.body

    if (!title || !description || !contenu || !auteur || !dateCree || !dateMaj) {
        res.status(400).json({
            error: "MERCI DE RAMPLIRE TOUS LES CHAMPS"
        })
        return
    }

    const article = { title, description, contenu, auteur, dateCree, dateMaj }
    const sql =
        "INSERT INTO article (title, description, contenu, auteur,dateCree,dateMaj) VALUES (?,?,?,?,?,?)";
    const params = [article.title, article.description, article.contenu, article.auteur, article.dateCree, article.dateMaj]
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return
        }
        res.status(201).json({ MESSAGE: "Article Creé", data: article });

    })

})


//Modifier un article
app.put('/api/articles/:id', (req, res) => {
    const { id: articleId } = req.params
    const { title, description, contenu, auteur, dateCree, dateMaj } = req.body

    if (!title || !description || !contenu || !auteur || !dateCree || !dateMaj) {
        res.status(400).json({
            error: "MERCI DE RAMPLIRE TOUS LES CHAMPS"
        })
        return
    }

    const article = { title, description, contenu, auteur, dateCree, dateMaj }
    const sql = "UPDATE article SET title = ?, description = ?, contenu = ?, auteur = ?, dateCree = ?, dateMaj = ? WHERE id = ?";
    const params = [article.title, article.description, article.contenu, article.auteur, article.dateCree, article.dateMaj, articleId]
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
            return
        }
        res.status(201).json({
            MESSAGE: `Article ${articleId} modifier`,
            data: article,
        });

    })

})

//lancer le server
app.listen(PORT, function() {
    console.log(`server demarre sur: ${PORT}`)
})