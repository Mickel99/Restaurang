import React from "react";
import "./home.scss";

export const Home = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="home__container">
          <h1 className="home__container__header">Welcome to ITALIANO ROM</h1>
        </div>
        <div className="home__presentationContainer"></div>
      </section>

      <section className="menu-container">
        <h1 className="menu-container__title">Menu</h1>
        <article className="menu-container__article">
          <h3 className="menu-container__article__title">Lunch</h3>
          <h5 className="menu-container__article__name">
            Lasagne alla Bolognese
          </h5>
          <span className="menu-container__article__is">
            Traditional Lasagna with Bolognese Sauce)A traditional dish from
            Emilia-Romagna, this traditional Lasagne alla Bolognese recipe calls
            for egg pasta, creamy béchamel, and Bolognese ragù.
          </span>
          <span className="menu-container__article__price"></span>
          <h5 className="menu-container__article__name">
            Pasta al pomodoroPasta
          </h5>
          <span className="menu-container__article__is">
            al pomodoro is an Italian food typically prepared with pasta, olive
            oil, fresh tomatoes, basil, and various other fresh ingredients.
          </span>
          <span className="menu-container__article__price"></span>
        </article>
        <article className="menu-container__article">
          <h3 className="menu-container__article__title">Dinner</h3>
          <h5 className="menu-container__article__name">Margherita PizzaA </h5>
          <span className="menu-container__article__is">
            traditional Neapolitan Margherita pizza recipe is tomato sauce with
            fresh tomatoes, mozzarella cheese and basil which represent the
            colours of the Italian flag – white cheese, green basil and red
            tomato.
          </span>
          <span className="menu-container__article__price"></span>
          <h5 className="menu-container__article__name">Salami Pizzaan</h5>
          <span className="menu-container__article__is">
            incredible and simple twist on the classic pepperoni pizza, but
            instead you top it with salami
          </span>
          <span className="menu-container__article__price"></span>
        </article>
      </section>
    </>
  );
};
