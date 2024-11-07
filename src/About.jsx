import { Helmet } from 'react-helmet';
import LinksIcons from './LinksIcons';

function About() {
  return (
    <>
      <Helmet>
        <title>Антология отрывков философских текстов | Extracts</title>
        <meta name="description" content="С возможностью поиска" />
      </Helmet>
      <LinksIcons noabout home />
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
