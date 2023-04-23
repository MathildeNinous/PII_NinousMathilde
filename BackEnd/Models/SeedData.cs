using BackEnd.Data;

namespace BackEnd.Models;

public class SeedData
{
    public static void init()
    {
        using (var context = new BackEndContext())
        {
            if (context.Quizzes.Any())
            {
                return;   // DB has been seeded
            }

            // Add quizzes
            Quiz quiz1 = new Quiz
            {
                Title = "Culture générale 1",
                Description = "Testez vos connaissances en culture générale",
            };

            Quiz quiz2 = new Quiz
            {
                Title = "Culture générale 2",
                Description = "Testez vos connaissances en culture générale",
            };
            Quiz quiz3 = new Quiz
            {
                Title = "Chanteurs et chanteuses célèbres",
                Description = "Testez vos connaissances sur les chanteurs et chanteuses",
            };
            Quiz quiz4 = new Quiz
            {
                Title = "Quiz animaux",
                Description = "Testez vos connaissances sur le monde animalier"
            };
            Quiz quiz5 = new Quiz
            {
                Title = "Quiz Sport",
                Description = "Testez vos connaissances sur le domaine sportif"
            };
            Quiz quiz6 = new Quiz
            {
                Title = "Quiz Politique",
                Description = "Testez vos connaissances en matière de politique"
            };


            // Create questions
            Question question1 = new Question
            {
                Text = "Quel est le plus grand pays d'Amérique du Sud ?",
                Quiz = quiz1
            };

            Question question2 = new Question
            {
                Text = "Qui a écrit \"Les Misérables\" ?",
                Quiz = quiz1
            };

            Question question3 = new Question
            {
                Text = "Quel est le plus grand désert du monde ?",
                Quiz = quiz1
            };

            Question question4 = new Question
            {
                Text = "Dans quelle ville se trouve la tour Eiffel ?",
                Quiz = quiz1
            };

            Question question5 = new Question
            {
                Text = "Qui est l'auteur de \"La Divine Comédie\" ?",
                Quiz = quiz1
            };

            Question question6 = new Question
            {
                Text = "Qui a écrit \"Madame Bovary\" ?",
                Quiz = quiz2
            };

            Question question7 = new Question
            {
                Text = "Quel est le plus grand océan du monde ?",
                Quiz = quiz2
            };

            Question question8 = new Question
            {
                Text = "Quel est le plus grand pays du monde en superficie ?",
                Quiz = quiz2
            };

            Question question9 = new Question
            {
                Text = "Dans quel pays se trouve le Taj Mahal ?",
                Quiz = quiz2
            };

            Question question10 = new Question
            {
                Text = "Quel est le plus grand fleuve du monde ?",
                Quiz = quiz2
            };
            Question question11 = new Question
            {
                Text = " Qui est surnommé \"Le Roi de la pop\" ?",
                Quiz = quiz3
            };
            Question question12 = new Question
            {
                Text = "Qui a chanté \"La Vie en rose\" ?",
                Quiz = quiz3
            };
            Question question13 = new Question
            {
                Text = " Qui est le chanteur principal du groupe de rock Queen ?",
                Quiz = quiz3
            };
            Question question14 = new Question
            {
                Text = "De quelle chanteuse l'album \"Back to Black\" est-il sorti en 2006 ?",
                Quiz = quiz3
            };
            Question question15 = new Question
            {
                Text = "Qui est le chanteur principal du groupe de reggae Bob Marley and the Wailers ?",
                Quiz = quiz3
            };
            Question question16 = new Question
            {
                Text = "Quel est le plus grand mammifère terrestre ?",
                Quiz = quiz4
            };
            Question question17 = new Question
            {
                Text = "Dans quel pays peut-on trouver des kangourous sauvages ?",
                Quiz = quiz4
            };
            Question question18 = new Question
            {
                Text = "Quel est le plus petit oiseau du monde ?",
                Quiz = quiz4
            };
            Question question19 = new Question
            {
                Text = "Comment appelle-t-on le petit de la chèvre ?",
                Quiz = quiz4
            };
            Question question20 = new Question
            {
                Text = "De quel animal les dents sont les plus longues du monde ?",
                Quiz = quiz4
            };
            Question question21 = new Question
            {
                Text = "Qui est le joueur de basketball considéré comme le plus grand de tous les temps ?",
                Quiz = quiz5
            };
            Question question22 = new Question
            {
                Text = "Qui est le détenteur du record du monde du 100 mètres nage libre ?",
                Quiz = quiz5
            };
            Question question23 = new Question
            {
                Text = "Dans quelle ville se trouve le célèbre circuit de Formule 1, Monza ?",
                Quiz = quiz5
            };
            Question question24 = new Question
            {
                Text = "Dans quelle ville s'est déroulée la première édition des Jeux olympiques modernes ?",
                Quiz = quiz5
            };
            Question question25 = new Question
            {
                Text = "Qui est le joueur de tennis ayant remporté le plus de titres du Grand Chelem dans l'histoire du tennis masculin ?",
                Quiz = quiz5
            };
            Question question26 = new Question
            {
                Text = "Qui a été le premier président de la République française ?",
                Quiz = quiz6
            };
            Question question27 = new Question
            {
                Text = "Qui a été la première femme Premier ministre britannique ?",
                Quiz = quiz6
            };
            Question question28 = new Question
            {
                Text = "Dans quel pays était né Nelson Mandela ?",
                Quiz = quiz6
            };
            Question question29 = new Question
            {
                Text = "Qui a été le Premier ministre de l'Inde le plus longtemps en fonction ?",
                Quiz = quiz6
            };
            Question question30 = new Question
            {
                Text = "Qui a été le premier président noir de l'Afrique du Sud ?",
                Quiz = quiz6
            };

            // Add questions to the context
            context.Questions.AddRange(
                question1,
                question2,
                question3,
                question4,
                question5,
                question6,
                question7,
                question8,
                question9,
                question10,
                question11,
                question12,
                question13,
                question14,
                question15,
                question16,
                question17,
                question18,
                question19,
                question20,
                question21,
                question22,
                question23,
                question24,
                question25,
                question26,
                question27,
                question28,
                question29,
                question30
            );

            // Create propositions
            Proposition proposition1_1 = new Proposition
            {
                Text = "Brésil",
                IsCorrect = true,
                Question = question1
            };

            Proposition proposition1_2 = new Proposition
            {
                Text = "Argentine",
                IsCorrect = false,
                Question = question1
            };

            Proposition proposition1_3 = new Proposition
            {
                Text = "Pérou",
                IsCorrect = false,
                Question = question1
            };

            Proposition proposition2_1 = new Proposition
            {
                Text = "Victor Hugo",
                IsCorrect = true,
                Question = question2
            };

            Proposition proposition2_2 = new Proposition
            {
                Text = "Gustave Flaubert",
                IsCorrect = false,
                Question = question2
            };

            Proposition proposition2_3 = new Proposition
            {
                Text = "Emile Zola",
                IsCorrect = false,
                Question = question2
            };

            Proposition proposition3_1 = new Proposition
            {
                Text = "Le désert du Sahara",
                IsCorrect = true,
                Question = question3
            };

            Proposition proposition3_2 = new Proposition
            {
                Text = "Le désert de Gobi",
                IsCorrect = false,
                Question = question3
            };

            Proposition proposition3_3 = new Proposition
            {
                Text = "Le désert d'Atacama",
                IsCorrect = false,
                Question = question3
            };

            Proposition proposition4_1 = new Proposition
            {
                Text = "Berlin",
                IsCorrect = false,
                Question = question4
            };

            Proposition proposition4_2 = new Proposition
            {
                Text = "Londres",
                IsCorrect = false,
                Question = question4
            };

            Proposition proposition4_3 = new Proposition
            {
                Text = "Paris",
                IsCorrect = true,
                Question = question4
            };

            Proposition proposition5_1 = new Proposition
            {
                Text = "Dante Alighieri",
                IsCorrect = true,
                Question = question5
            };

            Proposition proposition5_2 = new Proposition
            {
                Text = "Francesco Petrarca",
                IsCorrect = false,
                Question = question5
            };

            Proposition proposition5_3 = new Proposition
            {
                Text = "Giovanni Boccaccio",
                IsCorrect = false,
                Question = question5
            };

            Proposition proposition6_1 = new Proposition
            {
                Text = "Marcel Proust",
                IsCorrect = false,
                Question = question6
            };

            Proposition proposition6_2 = new Proposition
            {
                Text = "Gustave Flaubert",
                IsCorrect = true,
                Question = question6
            };

            Proposition proposition6_3 = new Proposition
            {
                Text = "Emile Zola",
                IsCorrect = false,
                Question = question6
            };

            Proposition proposition7_1 = new Proposition
            {
                Text = "L'océan Pacifique",
                IsCorrect = true,
                Question = question7
            };

            Proposition proposition7_2 = new Proposition
            {
                Text = "L'océan Atlantique",
                IsCorrect = false,
                Question = question7
            };

            Proposition proposition7_3 = new Proposition
            {
                Text = "L'océan Indien",
                IsCorrect = false,
                Question = question7
            };

            Proposition proposition8_1 = new Proposition
            {
                Text = "Chine",
                IsCorrect = false,
                Question = question8
            };

            Proposition proposition8_2 = new Proposition
            {
                Text = "Canada",
                IsCorrect = false,
                Question = question8
            };

            Proposition proposition8_3 = new Proposition
            {
                Text = "Russie",
                IsCorrect = true,
                Question = question8
            };

            Proposition proposition9_1 = new Proposition
            {
                Text = "Inde",
                IsCorrect = true,
                Question = question9
            };

            Proposition proposition9_2 = new Proposition
            {
                Text = "Pakistan",
                IsCorrect = false,
                Question = question9
            };

            Proposition proposition9_3 = new Proposition
            {
                Text = "Bangladesh",
                IsCorrect = false,
                Question = question9
            };

            Proposition proposition10_1 = new Proposition
            {
                Text = "Nil",
                IsCorrect = false,
                Question = question10
            };

            Proposition proposition10_2 = new Proposition
            {
                Text = "Amazone",
                IsCorrect = true,
                Question = question10
            };

            Proposition proposition10_3 = new Proposition
            {
                Text = "Mississipi",
                IsCorrect = false,
                Question = question10
            };
            Proposition proposition11_1 = new Proposition
            {
                Text = "Michael Jackson",
                IsCorrect = false,
                Question = question11
            };

            Proposition proposition11_2 = new Proposition
            {
                Text = "Elvis Presley",
                IsCorrect = false,
                Question = question11
            };

            Proposition proposition11_3 = new Proposition
            {
                Text = "Prince",
                IsCorrect = true,
                Question = question11
            };
            Proposition proposition12_1 = new Proposition
            {
                Text = "Édith Piaf",
                IsCorrect = false,
                Question = question12
            };

            Proposition proposition12_2 = new Proposition
            {
                Text = "Serge Gainsbourg",
                IsCorrect = true,
                Question = question12
            };

            Proposition proposition12_3 = new Proposition
            {
                Text = "Jacques Brel",
                IsCorrect = false,
                Question = question12
            };
            Proposition proposition13_1 = new Proposition
            {
                Text = "Brian May",
                IsCorrect = false,
                Question = question13
            };
            Proposition proposition13_2 = new Proposition
            {
                Text = "Freddie Mercury",
                IsCorrect = false,
                Question = question13
            };
            Proposition proposition13_3 = new Proposition
            {
                Text = "Roger Taylor ",
                IsCorrect = true,
                Question = question13
            };
            Proposition proposition14_1 = new Proposition
            {
                Text = "Beyoncé",
                IsCorrect = false,
                Question = question14
            };
            Proposition proposition14_2 = new Proposition
            {
                Text = "Adele",
                IsCorrect = true,
                Question = question14
            };
            Proposition proposition14_3 = new Proposition
            {
                Text = "Amy Winehouse",
                IsCorrect = false,
                Question = question14
            };
            Proposition proposition15_1 = new Proposition
            {
                Text = "Bob Marley",
                IsCorrect = false,
                Question = question15
            };
            Proposition proposition15_2 = new Proposition
            {
                Text = "Jimmy Cliff",
                IsCorrect = true,
                Question = question15
            };
            Proposition proposition15_3 = new Proposition
            {
                Text = "Peter Tosh",
                IsCorrect = false,
                Question = question15
            };
            Proposition proposition16_1 = new Proposition
            {
                Text = "L'éléphant",
                IsCorrect = false,
                Question = question16
            };
            Proposition proposition16_2 = new Proposition
            {
                Text = "Le rhinocéros",
                IsCorrect = false,
                Question = question16
            };
            Proposition proposition16_3 = new Proposition
            {
                Text = "L'hippopotame",
                IsCorrect = true,
                Question = question16
            };
            Proposition proposition17_1 = new Proposition
            {
                Text = "Nouvelle-Zélande",
                IsCorrect = false,
                Question = question17
            };
            Proposition proposition17_2 = new Proposition
            {
                Text = "Papouasie-Nouvelle-Guinée",
                IsCorrect = true,
                Question = question17
            };
            Proposition proposition17_3 = new Proposition
            {
                Text = "Australie",
                IsCorrect = false,
                Question = question17
            };
            Proposition proposition18_1 = new Proposition
            {
                Text = "Le merle",
                IsCorrect = true,
                Question = question18
            };
            Proposition proposition18_2 = new Proposition
            {
                Text = "Le moineau",
                IsCorrect = false,
                Question = question18
            };
            Proposition proposition18_3 = new Proposition
            {
                Text = "Le colibri abeille",
                IsCorrect = false,
                Question = question18
            };
            Proposition proposition19_1 = new Proposition
            {
                Text = "Un veau",
                IsCorrect = true,
                Question = question19
            };
            Proposition proposition19_2 = new Proposition
            {
                Text = "Un agneau",
                IsCorrect = false,
                Question = question19
            };
            Proposition proposition19_3 = new Proposition
            {
                Text = "Un chevreau",
                IsCorrect = false,
                Question = question19
            };
            Proposition proposition20_1 = new Proposition
            {
                Text = "L'hippopotame",
                IsCorrect = false,
                Question = question20
            };
            Proposition proposition20_2 = new Proposition
            {
                Text = "Le narval",
                IsCorrect = false,
                Question = question20
            };
            Proposition proposition20_3 = new Proposition
            {
                Text = "Le tigre",
                IsCorrect = true,
                Question = question20
            };
            Proposition proposition21_1 = new Proposition
            {
                Text = "Michael Jordan",
                IsCorrect = false,
                Question = question21
            };
            Proposition proposition21_2 = new Proposition
            {
                Text = "LeBron James",
                IsCorrect = false,
                Question = question21
            };
            Proposition proposition21_3 = new Proposition
            {
                Text = "Wilt Chamberlain",
                IsCorrect = true,
                Question = question21
            };
            Proposition proposition22_1 = new Proposition
            {
                Text = "César Gómez",
                IsCorrect = true,
                Question = question22
            };
            Proposition proposition22_2 = new Proposition
            {
                Text = "Michael Phelps",
                IsCorrect = false,
                Question = question22
            };
            Proposition proposition22_3 = new Proposition
            {
                Text = "César Cielo",
                IsCorrect = false,
                Question = question22
            };
            Proposition proposition23_1 = new Proposition
            {
                Text = "Allemagne",
                IsCorrect = false,
                Question = question23
            };
            Proposition proposition23_2 = new Proposition
            {
                Text = "Italie",
                IsCorrect = true,
                Question = question23
            };
            Proposition proposition23_3 = new Proposition
            {
                Text = "Espagne",
                IsCorrect = false,
                Question = question23
            };
            Proposition proposition24_1 = new Proposition
            {
                Text = "Athènes",
                IsCorrect = true,
                Question = question24
            };
            Proposition proposition24_2 = new Proposition
            {
                Text = "Paris",
                IsCorrect = false,
                Question = question24
            };
            Proposition proposition24_3 = new Proposition
            {
                Text = "Rome",
                IsCorrect = false,
                Question = question24
            };
            Proposition proposition25_1 = new Proposition
            {
                Text = "Novak Djokovic",
                IsCorrect = true,
                Question = question25
            };
            Proposition proposition25_2 = new Proposition
            {
                Text = "Rafael Nadal",
                IsCorrect = false,
                Question = question25
            };
            Proposition proposition25_3 = new Proposition
            {
                Text = "Roger Federer",
                IsCorrect = false,
                Question = question25
            };
            Proposition proposition26_1 = new Proposition
            {
                Text = "François Mitterrand",
                IsCorrect = false,
                Question = question26
            };
            Proposition proposition26_2 = new Proposition
            {
                Text = "Charles de Gaulle",
                IsCorrect = false,
                Question = question26
            };
            Proposition proposition26_3 = new Proposition
            {
                Text = "Vincent Auriol",
                IsCorrect = true,
                Question = question26
            };
            Proposition proposition27_1 = new Proposition
            {
                Text = "Margaret Thatcher",
                IsCorrect = true,
                Question = question27
            };
            Proposition proposition27_2 = new Proposition
            {
                Text = "Theresa May",
                IsCorrect = false,
                Question = question27
            };
            Proposition proposition27_3 = new Proposition
            {
                Text = "Angela Merkel",
                IsCorrect = false,
                Question = question27
            };
            Proposition proposition28_1 = new Proposition
            {
                Text = "Afrique du Sud",
                IsCorrect = true,
                Question = question28
            };
            Proposition proposition28_2 = new Proposition
            {
                Text = "Kenya",
                IsCorrect = false,
                Question = question28
            };
            Proposition proposition28_3 = new Proposition
            {
                Text = "Égypte",
                IsCorrect = false,
                Question = question28
            };
            Proposition proposition29_1 = new Proposition
            {
                Text = "Jawaharlal Nehru",
                IsCorrect = false,
                Question = question29
            };
            Proposition proposition29_2 = new Proposition
            {
                Text = "Indira Gandhi",
                IsCorrect = false,
                Question = question29
            };
            Proposition proposition29_3 = new Proposition
            {
                Text = "Narendra Modi",
                IsCorrect = true,
                Question = question29
            };
            Proposition proposition30_1 = new Proposition
            {
                Text = "Jacob Zuma",
                IsCorrect = false,
                Question = question30
            };
            Proposition proposition30_2 = new Proposition
            {
                Text = "Nelson Mandela",
                IsCorrect = true,
                Question = question30
            };
            Proposition proposition30_3 = new Proposition
            {
                Text = "Cyril Ramaphosa",
                IsCorrect = false,
                Question = question30
            };


            // Add propositions to the context
            context.Propositions.AddRange(
                proposition1_1,
                proposition1_2,
                proposition1_3,
                proposition2_1,
                proposition2_2,
                proposition2_3,
                proposition3_1,
                proposition3_2,
                proposition3_3,
                proposition4_1,
                proposition4_2,
                proposition4_3,
                proposition5_1,
                proposition5_2,
                proposition5_3,
                proposition6_1,
                proposition6_2,
                proposition6_3,
                proposition7_1,
                proposition7_2,
                proposition7_3,
                proposition8_1,
                proposition8_2,
                proposition8_3,
                proposition9_1,
                proposition9_2,
                proposition9_3,
                proposition10_1,
                proposition10_2,
                proposition10_3,
                proposition11_1,
                proposition11_2,
                proposition11_3,
                proposition12_1,
                proposition12_2,
                proposition12_3,
                proposition13_1,
                proposition13_2,
                proposition13_3,
                proposition14_1,
                proposition14_2,
                proposition14_3,
                proposition15_1,
                proposition15_2,
                proposition15_3,
                proposition16_1,
                proposition16_2,
                proposition16_3,
                proposition17_1,
                proposition17_2,
                proposition17_3,
                proposition18_1,
                proposition18_2,
                proposition18_3,
                proposition19_1,
                proposition19_2,
                proposition19_3,
                proposition20_1,
                proposition20_2,
                proposition20_3,
                proposition21_1,
                proposition21_2,
                proposition21_3,
                proposition22_1,
                proposition22_2,
                proposition22_3,
                proposition23_1,
                proposition23_2,
                proposition23_3,
                proposition24_1,
                proposition24_2,
                proposition24_3,
                proposition25_1,
                proposition25_2,
                proposition25_3,
                proposition26_1,
                proposition26_2,
                proposition26_3,
                proposition27_1,
                proposition27_2,
                proposition27_3,
                proposition28_1,
                proposition28_2,
                proposition28_3,
                proposition29_1,
                proposition29_2,
                proposition29_3,
                proposition30_1,
                proposition30_2,
                proposition30_3
            );

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            // Add users
            User user1 = new User
            {
                Email = "leo@dinard.fr",
                Password = "leoD",
                FirstName = "Leo",
                LastName = "Dinard"
            };
            User user2 = new User
            {
                Email = "mathilde@test.fr",
                Password = "mathou",
                FirstName = "Mathilde",
                LastName = "Ninous"
            };

            // Add users to the context
            context.Users.AddRange(
                user1, user2
            );

            // Synchronize all changes with database
            context.SaveChanges();
        }
    }
}