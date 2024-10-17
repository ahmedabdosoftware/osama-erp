
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// we will stop this right now becase it need cloud function that need paid plan "money"
  // we will use just firestore and securty rules to handel permation until we go to paid plan in firebase
exports.createUserWithClaims = functions.https.onCall(async (data, context) => {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can add other users');
  }

  const { email, password, name, role } = data;

  // إنشاء المستخدم الجديد باستخدام Admin SDK
  const userRecord = await admin.auth().createUser({
    email,
    password,
    displayName: name
  });

  // تعيين الصلاحيات للمستخدم الجديد
  await admin.auth().setCustomUserClaims(userRecord.uid, { role });

  // إضافة المستخدم إلى Firestore
  await admin.firestore().collection('users').doc(userRecord.uid).set({
    name,
    email,
    role,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return {
    message: `Success! User created with UID: ${userRecord.uid} and role: ${role}`,
   // to use with update user docmrnt with imge
    userRecordId: userRecord.uid

  };
});
