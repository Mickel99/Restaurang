import React, { useState } from 'react'
import { checkAvailableTables, ISittings } from '../../services/conditional'
import { Controller, useForm } from 'react-hook-form'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './booking.scss'
import { createBooking } from '../../services/handleBookingsAxios'
import { useNavigate } from 'react-router-dom'

export const Booking = () => {
  const [step, setStep] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  const [isAvailable, setIsAvailable] = useState<ISittings>({
    theFirstSitting: false,
    theSecondSitting: false,
  })
  const [sitting, setSitting] = useState(0)

  const [time, setTime] = useState('')

  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    watch,
    register,

    formState: { errors },
  } = useForm()

  const [date, numberOfGuests, name, lastname, email, phone] = watch([
    'date',
    'numberOfGuests',
    'name',
    'lastname',
    'email',
    'phone',
  ])

  const HandleOnFirstSubmit = () => {
    setIsLoading(true)

    const checkAvailable = async () => {
      const isAvailableinDB = await checkAvailableTables(
        date.toLocaleDateString(),
        numberOfGuests,
      )
      setIsAvailable(isAvailableinDB)
    }
    checkAvailable()
    setStep(2)
    setIsLoading(false)
  }
  const HandleOnSecondSubmit = async () => {
    let booking = {
      restaurantId: '64089b0d76187b915f68e16f',
      date: date.toLocaleDateString(),
      time: time,
      numberOfGuests: Number(numberOfGuests),
      customer: {
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
      },
    }

    setIsLoading(true)

    createBooking(booking).then((resData) => {
      setIsLoading(false)
      navigate('/booking/thankyou/' + resData.insertedId)
    })

    console.log(booking)
  }

  return (
    <section className=" big-container">
      {isLoading ? (
        <div className="loadingDiv"></div>
      ) : (
        <div className="big-container__step">
          {step === 1 && (
            <>
              <h2 className="big-container__step__text">Reserve a table</h2>
              <form
                className="big-container__step__form1"
                onSubmit={handleSubmit(HandleOnFirstSubmit)}
              >
                <div className="big-container__step__form1__container1">
                  <div className="big-container__step__form1__container1__calender-div">
                    <label className="label">Select a date:</label>
                    <Controller
                      control={control}
                      name="date"
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                        <Calendar
                          className="calender"
                          onChange={onChange}
                          minDate={new Date()}
                          maxDate={new Date('2023-12-31')}
                        />
                      )}
                    />
                    {errors.date && <p className="error"> Select a date:</p>}
                  </div>

                  <div className="big-container__step__form1__container1__select-div">
                    <label className="label">Number of people</label>
                    <select
                      className="select"
                      {...register('numberOfGuests', {
                        required: true,
                        min: 1,
                        max: 6,
                      })}
                      defaultValue="0"
                    >
                      <option disabled value="0">
                        0
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                  
                    </select>

                    {errors.numberOfGuests && (
                      <span className="error">
                      Select number of people:</span>
                    )}
                    <div className="info">
                      <p className="info__p">
                      Max per table: 6<br />

                      </p>
                    </div>
                    <input
                      type="submit"
                      value={'Check availability'}
                      className=" btn primary"
                    />
                  </div>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="label">Available sessions:</h2>
              <div>
                <p className="result">
                  Din sökning: <br />
                  {date.toLocaleDateString()} <br />
                  {numberOfGuests} people
                </p>
              </div>
              <div>
                {isAvailable.theFirstSitting ? (
                  <button
                    className="book btn primary"
                    onClick={() => {
                      setSitting(1)
                      setStep(3)
                      setTime('18:00')
                    }}
                  >
                    Book 18:00
                  </button>
                ) : (
                  <p className="result">Lunch session is not available</p>
                )}

                {isAvailable.theSecondSitting ? (
                  <button
                    className="book btn primary"
                    onClick={() => {
                      setSitting(2)
                      setStep(3)
                      setTime('21:00')
                    }}
                  >
                    Book 21.00
                  </button>
                ) : (
                  <span className="result"> Dinner session is not available </span>
                )}
              </div>
              <div>
                <button className="btn primary" onClick={() => setStep(1)}>
                Start the search over
                </button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="label"> Your search is for:</h2>
              <div className="result">
                <p>
                  {date.toLocaleDateString()} <br />
                  {sitting === 1 ? '18.00 ' : '21.00 '}
                  <br />
                  {numberOfGuests} people </p>
              </div>
              <h2 className="label">Your information:</h2>
              <form
                className="form2"
                onSubmit={handleSubmit(HandleOnSecondSubmit)}
              >
                <div className="form2__container2">
                  <input
                    placeholder="First name"
                    className="form2__container2__input"
                    required
                    {...register('name', {
                      required: true,
                      minLength: 1,
                      maxLength: 30,
                    })}
                    type="text"
                  />
                  {errors.name && (
                    <p className="error"> Write your first name &#11105;</p>
                  )}
                  <input
                    placeholder="Last name"
                    className="form2__container2__input"
                    required
                    {...register('lastname', {
                      required: true,
                      minLength: 1,
                      maxLength: 30,
                    })}
                    type="text"
                  />
                  {errors.name && (
                    <p className="error"> Write your last name &#11105;</p>
                  )}
                  <input
                    placeholder="Email"
                    required
                    className="form2__container2__input"
                    value={email}
                    {...register('email', {
                      required: true,
                    })}
                    type="email"
                  />
                  {errors.email && (
                    <p className="error"> Write your email &#11105;</p>
                  )}
                  <input
                    placeholder="Phone number"
                    type="number"
                    value={phone}
                    className="form2__container2__input"
                    required
                    {...register('phone', {
                      required: true,
                      minLength: 10,
                      maxLength: 12,
                    })}
                  />
                  {errors.phone && (
                    <p className="error"> Write your phone number &#11105;</p>
                  )}
                  <div className="form2__container2__input__gdprContainer">
                    <p className="form2__container2__input__gdprContainer__consent">
                    By making a reservation, you agree that we process your personal data in accordance with GDPR.
                    </p>
                    <input
                      type="checkbox"
                      className="form2__container2__input__gdprContainer__check"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    value={'book'}
                    className=" form2__container2__send "
                  >
                    Book
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </section>
  )
}
