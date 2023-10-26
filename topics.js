const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
  credential: admin.credential.cert(require('./credentials.json')),
});

const db = admin.firestore();

const files = fs.readdirSync('topics');

files.forEach(async (file) => {
  const topicId = file.slice(0, -5);

  const json = yaml.load(`topics/${topicId}.yaml`);

  // console.log(JSON.stringify(json, null, 2));

  const ref = db.collection('topics').doc(topicId);

  await ref.set(json, { merge: true });

  console.log(topicId);
});
