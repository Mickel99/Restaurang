import { useContext, useEffect, useState } from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { MdAccessTime, MdDateRange } from 'react-icons/md'
import { IBookingsResponse } from '../../../models/IBooking'
import { deleteBookingById } from '../../../services/handleBookingsAxios'
import { AdminBookingsContext } from '../../../contexts/AdminBookingsContext'
import './reservation.scss'
import { Link } from 'react-router-dom'

export const Reservation = () => {
  const [contextBookings, setContextBookings] = useState<IBookingsResponse[]>(
    [],
  )
  const bookings = useContext(AdminBookingsContext)

  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete the booking?')) {
      deleteBookingById(id)
        .then(() => {
          alert('The booking has been deleted.')

          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  useEffect(() => {
    const sortedList = bookings
      .slice(0)
      .sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      )
    if (contextBookings.length > 0) return
    setContextBookings(sortedList)
  }, [bookings, contextBookings.length])

  let html = contextBookings.map((reservation) => {
    return (
      <>
        <div className="big-container__container" key={reservation._id}>
          <p className="big-container__container__icons">
            <MdDateRange />
          </p>
          <span className="big-container__container__info">
            {reservation.date}
          </span>
          <p className="big-container__container__icons">
            <MdAccessTime />
          </p>
          <span className="big-container__container__info">
            {reservation.time}
          </span>
          <p className="big-container__container__icons">
            <BsFillPeopleFill />
          </p>
          <span className="  big-container__container__info">
            {reservation.numberOfGuests}
          </span>

          <div className="  big-container__container__btns">
            <button
              className=" btn primary big-container__container__btns"
              id="delete"
              onClick={() => {
                handleDeleteClick(reservation._id)
              }}
            >
             Delete
            </button>
            <Link to={`/bookingdetails/${reservation.customerId}`}>
              <button
                className=" btn primary big-container__container__btns"
                id="inspect"
              >
                Customer details
              </button>
            </Link>
            <Link to={`/edit/${reservation._id}`}>
              <button
                className=" btn primary big-container__container__btns"
                id="edit"
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  })

  return (
    <section>
      <h1 className="title">Booking overview</h1>
      <div className="big-container">
        <>{html}</>
      </div>
    </section>
  )
}
