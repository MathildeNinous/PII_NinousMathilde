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
                question10
            );

            // Create propositions
            Proposition proposition1_1 = new Proposition
            {
                Text = "Brésil",
                IsCorrect = false,
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
                IsCorrect = true,
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
                proposition10_3
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

            // Add users to the context
            context.Users.AddRange(
                user1
            );

            // Synchronize all changes with database
            context.SaveChanges();
        }
    }
}