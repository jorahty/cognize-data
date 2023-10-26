const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
  credential: admin.credential.cert(require('./credentials.json')),
});

const db = admin.firestore();

const files = fs.readdirSync('quizzes');

files.forEach(async (file) => {
  const quizId = file.slice(0, -5);

  const json = yaml.load(`quizzes/${quizId}.yaml`);

  // console.log(JSON.stringify(json, null, 2));

  const ref = db.collection('quizzes').doc(quizId);

  await ref.set(json, { merge: true });

  console.log(quizId);
});
