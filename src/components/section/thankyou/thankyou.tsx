import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IBooking } from "../../../models/IBooking";
import { getBookingById } from "../../../services/handleBookingsAxios";
import "../thankyou/thankyou.scss";
import { GiPartyPopper } from "react-icons/gi";

export const Thankyou = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking>();

  useEffect(() => {
    async function getBookingData() {
      if (id) {
        let response = await getBookingById(id);
        if (response.length > 0) {
          setBooking(response[0]);
        }
      }
    }
    if (booking) return;
    getBookingData();
  });

  return (
    <div className="thankyou">
      <div className="thankyou__container">
        <h1 className="thankyou__container__header">
          Thank you for your booking! <GiPartyPopper />
        </h1>
        <h4 className="thankyou__container__paragraph">
          See you on: {booking?.date} at {booking?.time}
        </h4>
        <Link to={"/"}>
          <button className="thankyou__button">Go to homepage</button>
        </Link>
      </div>
    </div>
  );
};
