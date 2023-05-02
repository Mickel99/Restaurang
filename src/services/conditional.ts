import { getAllBookings } from "./handleBookingsAxios";

export interface ISittings {
  theFirstSitting: boolean;
  theSecondSitting: boolean;
}

export const checkAvailableTables = async (
  date: Date,
  numberOfGuests: number
) => {
  let isAvailable: ISittings = {
    theFirstSitting: true,
    theSecondSitting: true,
  };

  let response = await getAllBookings();
  let tablesAtLunch: number = 0;
  let tablesAtDinner: number = 0;

  for (let i = 0; i < response.length; i++) {
    let databaseDate = new Date(response[i].date);
    let inComingDate = new Date(date);

    if (databaseDate.getDate() === inComingDate.getDate()) {
      if (databaseDate.getTime() === inComingDate.getTime()) {
        if (response[i].time === "18:00") {
          tablesAtLunch = tablesAtLunch + 1;
          if (response[i].numberOfGuests > 6) {
            tablesAtLunch = tablesAtLunch + 1;
          }
        }
        if (response[i].time === "21:00") {
          tablesAtDinner = tablesAtDinner + 1;
          if (response[i].numberOfGuests > 6) {
            tablesAtDinner = tablesAtDinner + 1;
          }
        }
      }
    }

    const numberOfTablesForCurrentBooking = Math.ceil(numberOfGuests / 6);

    if (tablesAtLunch + numberOfTablesForCurrentBooking <= 15) {
      isAvailable.theFirstSitting = true;
    } else {
      isAvailable.theFirstSitting = false;
    }

    if (tablesAtDinner + numberOfTablesForCurrentBooking <= 15) {
      isAvailable.theSecondSitting = true;
    } else {
      isAvailable.theSecondSitting = false;
    }
  }

  console.log("Tables at lunch:", tablesAtLunch);
  console.log("Tables at dinner:", tablesAtDinner);

  return isAvailable;
};
