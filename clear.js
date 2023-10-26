const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./credentials.json')),
});

const db = admin.firestore();

const quizzesRef = db.collection('quizzes');

(async () => {
  const quizDocs = await quizzesRef.listDocuments();

  for (const quizDoc of quizDocs) {
    await quizDoc.delete();
  }
})();

const topicsRef = db.collection('topics');

(async () => {
  const topicsDocs = await topicsRef.listDocuments();

  for (const topicDoc of topicsDocs) {
    await topicDoc.delete();
  }
})();
