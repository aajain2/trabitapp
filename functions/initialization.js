const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function initializeFirestore() {
  const habitsData = [
    { id: 'drinkWater', name: 'Drink Water', prompts: ['Take a photo of your filled water bottle', 'Snap your glass as you drink the last sip'] },
    { id: 'readBooks', name: 'Read Books', prompts: ['Capture your current reading spot', 'Show off the book you are currently reading'] },
    { id: 'morningRun', name: 'Morning Run', prompts: ['Take a selfie during your morning run', 'Photo of your running shoes post-run'] },
    { id: 'studySession', name: 'Study Session', prompts: ['Photograph your study area', 'Take a picture of your notes today'] },
    { id: 'meditate', name: 'Meditate', prompts: ['A serene snap of your meditation space', 'Capture a calming element during meditation'] },
    { id: 'eatFruits', name: 'Eat Fruits', prompts: ['Share a picture of today\'s fruit snack', 'Snap a shot of you eating a fruit'] },
    { id: 'playInstrument', name: 'Play an Instrument', prompts: ['Photo of your music practice session', 'Capture your instrument setup'] },
    { id: 'exercise', name: 'Exercise', prompts: ['Post-workout selfie', 'Take a photo of your gym gear'] },
    { id: 'cookMeals', name: 'Cook Meals', prompts: ['Showcase your cooking process', 'Plate presentation of your meal today'] },
    { id: 'bikeRiding', name: 'Bike Riding', prompts: ['Capture a scene from your bike ride', 'Photo with your bicycle after the ride'] }
  ];

  // Start batch write
  const batch = db.batch();

  // Populate Habits and Prompts
  habitsData.forEach(habit => {
    const habitRef = db.collection('Habits').doc(habit.id);
    batch.set(habitRef, { name: habit.name });

    habit.prompts.forEach((prompt, index) => {
      const promptRef = habitRef.collection('Prompts').doc(`prompt${index + 1}`);
      batch.set(promptRef, { description: prompt });
    });
  });

  // Sample Users with Friends and Habits
  const users = [
    { id: 'user1', firstName: 'Alice', lastName: 'Smith', username: 'alice', email: 'alice@example.com', profilePicUrl: '', selectedHabit: 'drinkWater', birthday: '1990-01-01' },
    { id: 'user2', firstName: 'Bob', lastName: 'Johnson', username: 'bob', email: 'bob@example.com', profilePicUrl: '', selectedHabit: 'readBooks', birthday: '1992-02-02' }
  ];

  users.forEach(user => {
    const userRef = db.collection('Users').doc(user.id);
    batch.set(userRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      profilePicUrl: user.profilePicUrl,
      selectedHabit: user.selectedHabit,
      birthday: user.birthday // Including birthday in user initialization
    });

    // Adding friend relationships
    users.forEach(friend => {
      if (friend.id !== user.id) {
        const friendRef = userRef.collection('Friends').doc(friend.id);
        batch.set(friendRef, {
          status: 'pending',
          addedOn: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    });

    // Sample daily habit tracking
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    const habitsTrackingRef = userRef.collection('Habits').doc(today);
    batch.set(habitsTrackingRef, {
      habitId: user.selectedHabit,
      completed: false,
      promptId: 'prompt1',
      photoUrl: '',
      streak: 0
    });
  });

  // Execute the batch write
  try {
    await batch.commit();
    console.log('Firestore has been fully initialized with initial data.');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
}

initializeFirestore().catch(console.error);