import firebase from "../../../utils/firebase";

export const addHabit = async (uid, habit) => {
  console.log("Habit added");
  try {
    const habitsRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits");
    const newHabit = {
      ...habit,
      createdAt: Date.now(),
    };
    await habitsRef.add(newHabit);
    console.log("Habit added");
  } catch (error) {
    console.error(error);
  }
};

export const getHabits = async (uid) => {
  try {
    const habitsRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits");
    const habitsSnapshot = await habitsRef.get();
    const habits = habitsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("Habits fetched", habits);
    return habits;
  } catch (error) {
    console.error(error);
  }
};

export const updateHabit = async (uid, habitId, updatedData) => {
  try {
    let updatedHabit = { name: updatedData };
    const habitsRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits");
    const habitRef = habitsRef.doc(habitId);
    const habitSnapshot = await habitRef.get();
    if (habitSnapshot.exists) {
      const newHabit = {
        ...habitSnapshot.data(),
        ...updatedHabit,
      };
      await habitRef.set(newHabit);
      console.log("Habit updated");
    } else {
      console.error("Habit not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteHabit = async (uid, habitId) => {
  try {
    console.log("Habit deleted", uid, habitId);
    const habitRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(habitId);
    console.log("Habit ref", habitRef);
    await habitRef.delete();
    console.log("Habit deleted");
  } catch (error) {
    console.error(error);
  }
};

export const toggleCompletion = async (uid, habitId) => {
  try {
    const habitRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(habitId);

    const habitSnapshot = await habitRef.get();
    const isCompleted = habitSnapshot.data().isCompleted;

    await habitRef.update({ isCompleted: !isCompleted });
  } catch (error) {
    console.error(error);
  }
};

export const maintainHabit = async (uid, habitId) => {
  try {
    const habitRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(habitId);

    const habitSnapshot = await habitRef.get();
    const habitData = habitSnapshot.data();
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (
      !habitData.previousDaysMaintained.includes(currentDate) &&
      currentDate !== habitData.lastMaintained
    ) {
      const newStreak =
        currentDate - habitData.lastMaintained === 24 * 60 * 60 * 1000
          ? habitData.streak + 1
          : 1;

      await habitRef.update({
        previousDaysMaintained: [
          ...habitData.previousDaysMaintained,
          currentDate,
        ],
        streak: newStreak,
        lastMaintained: currentDate,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetStreak = async (uid, habitId) => {
  try {
    const habitRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("habits")
      .doc(habitId);

    const habitSnapshot = await habitRef.get();
    const habitData = habitSnapshot.data();
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (currentDate - habitData.lastMaintained > 2 * 24 * 60 * 60 * 1000) {
      await habitRef.update({
        streak: 0,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
