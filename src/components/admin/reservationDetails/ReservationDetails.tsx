import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ICustomer } from '../../../models/ICustomer'
import { getCustomerById } from '../../../services/handleBookingsAxios'
import './reservationDetails.scss'

export const ReservationDetails = () => {
  const { id } = useParams()
  const [customer, setCustomer] = useState<ICustomer>()

  useEffect(() => {
    async function getCustomerData() {
      if (id) {
        let response = await getCustomerById(id)
        setCustomer(response[0])
      }
    }
    getCustomerData()
  }, [id])

  return (
    <>
      <article className="details-page">
        <article className="details-page__container">
          <h3 className="details-page__container__title">Customer details</h3>
          <p className="details-page__container__text">Name:</p>
          <span className="details-page__container__text__info">
            {customer?.name} {customer?.lastname}
          </span>
          <p className="details-page__container__text">Email:</p>
          <span className="details-page__container__text__info">
            {customer?.email}
          </span>
          <p className="details-page__container__text">Phone:</p>
          <span className="details-page__container__text__info">
            {customer?.phone}
          </span>
        </article>
      </article>
    </>
  )
}
