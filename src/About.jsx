import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Helmet>
        <title>Антология отрывков философских текстов</title>
        <meta
          name="description"
          content="Антология отрывков философских текстов"
        />
      </Helmet>
      <header>
        <div className="links">
          <div className="link link__github">
            <a href="https://github.com/siebentod/philosophy-extracts">
              Github{' '}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ fontSize: '9px' }}
              ></i>
            </a>
          </div>
          <div className="link link__about">
            <Link to="/">Home</Link>
          </div>
        </div>
      </header>
      <div className="about">
        <div className="about__main">
          <p>
            Антология отрывков философских текстов.
            <br />
            Источник текстов:{' '}
            <a href="https://iphlib.ru/library/collection/antology/page/about">
              https://iphlib.ru/...{' '}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ fontSize: '9px' }}
              ></i>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
